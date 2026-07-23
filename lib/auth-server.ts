import "server-only";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { pool, query } from "@/lib/db";
import type { AuthUser, Role, UserProfile } from "@/lib/types";

export const SESSION_COOKIE = "zra_session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const ROLE_PREFIX: Record<Role, string> = {
  taxpayer: "TP",
  tax_practitioner: "PR",
  zra_consultant: "CN",
  tsa_admin: "TSA",
  boz_executive: "BOZ",
  mofnp_admin: "MOF",
};

export function generateRegistrationNumber(role: Role) {
  return `ZRA-${ROLE_PREFIX[role]}-${Math.floor(100000 + Math.random() * 900000)}`;
}

export function generateUserCode() {
  return `UID-${Math.floor(10000000 + Math.random() * 90000000)}`;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export interface SessionRow {
  id: string;
  username: string;
  email: string;
  role: Role;
  registration_number: string;
  user_code: string;
}

async function loadProfile(row: SessionRow): Promise<UserProfile> {
  const base = {
    username: row.username,
    email: row.email,
  };

  if (row.role === "taxpayer") {
    const { rows } = await query(`select * from taxpayer_profiles where user_id = $1`, [row.id]);
    const p = rows[0];
    return {
      role: "taxpayer",
      ...base,
      nrcNumber: p.nrc_number,
      firstName: p.first_name,
      middleName: p.middle_name ?? undefined,
      surname: p.surname,
      dateOfBirth: p.date_of_birth,
      gender: p.gender,
      mobileNumber: p.mobile_number,
      physicalAddress: p.physical_address,
      province: p.province,
      district: p.district,
      tpin: p.tpin,
      taxpayerType: p.taxpayer_type,
      businessName: p.business_name ?? undefined,
      businessRegistrationNumber: p.business_registration_number ?? undefined,
      projectedAnnualTurnover: p.projected_annual_turnover?.toString(),
    } as UserProfile;
  }

  if (row.role === "tax_practitioner") {
    const { rows } = await query(`select * from practitioner_profiles where user_id = $1`, [row.id]);
    const p = rows[0];
    return {
      role: "tax_practitioner",
      ...base,
      nrcNumber: p.nrc_number,
      firstName: p.first_name,
      middleName: p.middle_name ?? undefined,
      surname: p.surname,
      dateOfBirth: p.date_of_birth,
      mobileNumber: p.mobile_number,
      physicalAddress: p.physical_address,
      province: p.province,
      district: p.district,
      category: p.category,
      membershipNumber: p.membership_number,
      professionalBody: p.professional_body,
      highestQualification: p.highest_qualification,
      yearsOfExperience: p.years_of_experience?.toString(),
      currentEmployer: p.current_employer,
      tpin: p.tpin,
      criminalRecordClearance: p.criminal_record_clearance ? "Yes" : "No",
      educationLevel: p.education_level,
    } as UserProfile;
  }

  if (row.role === "zra_consultant") {
    const { rows } = await query(`select * from consultant_profiles where user_id = $1`, [row.id]);
    const p = rows[0];
    return {
      role: "zra_consultant",
      ...base,
      nrcNumber: p.nrc_number,
      firstName: p.first_name,
      middleName: p.middle_name ?? undefined,
      surname: p.surname,
      dateOfBirth: p.date_of_birth,
      mobileNumber: p.mobile_number,
      physicalAddress: p.physical_address,
      province: p.province,
      district: p.district,
      consultantNumber: p.consultant_number,
      region: p.region,
    } as UserProfile;
  }

  const { rows } = await query(`select * from institutional_profiles where user_id = $1`, [row.id]);
  const p = rows[0];
  return {
    role: row.role,
    ...base,
    firstName: p.first_name,
    surname: p.surname,
    title: p.title,
    institution: p.institution,
  } as UserProfile;
}

export async function toAuthUser(row: SessionRow): Promise<AuthUser> {
  return {
    id: row.id,
    registrationNumber: row.registration_number,
    userCode: row.user_code,
    profile: await loadProfile(row),
  };
}

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  await query(`insert into sessions (token, user_id, expires_at) values ($1, $2, $3)`, [token, userId, expiresAt]);
  return { token, expiresAt };
}

export async function deleteSession(token: string) {
  await query(`delete from sessions where token = $1`, [token]);
}

export async function getUserByToken(token: string): Promise<AuthUser | null> {
  const { rows } = await query<SessionRow & { expires_at: string }>(
    `select u.id, u.username, u.email, u.role, u.registration_number, u.user_code, s.expires_at
     from sessions s
     join users u on u.id = s.user_id
     where s.token = $1`,
    [token]
  );
  const row = rows[0];
  if (!row) return null;
  if (new Date(row.expires_at) < new Date()) {
    await deleteSession(token);
    return null;
  }
  return toAuthUser(row);
}

export async function findUserByUsername(username: string) {
  const { rows } = await query<SessionRow & { password_hash: string }>(
    `select id, username, email, role, registration_number, user_code, password_hash
     from users where lower(username) = lower($1)`,
    [username]
  );
  return rows[0] ?? null;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  profile: UserProfile;
}

export async function createUser({ username, email, password, profile }: CreateUserInput): Promise<AuthUser> {
  const client = await pool.connect();
  try {
    await client.query("begin");

    const existing = await client.query(`select 1 from users where lower(username) = lower($1)`, [username]);
    if (existing.rowCount) {
      throw new Error("USERNAME_TAKEN");
    }

    const passwordHash = await hashPassword(password);
    const registrationNumber = generateRegistrationNumber(profile.role);
    const userCode = generateUserCode();

    const { rows } = await client.query(
      `insert into users (username, email, password_hash, role, registration_number, user_code)
       values ($1, $2, $3, $4, $5, $6) returning id`,
      [username, email, passwordHash, profile.role, registrationNumber, userCode]
    );
    const userId = rows[0].id as string;

    if (profile.role === "taxpayer") {
      await client.query(
        `insert into taxpayer_profiles
           (user_id, nrc_number, first_name, middle_name, surname, date_of_birth, gender, mobile_number,
            physical_address, province, district, tpin, taxpayer_type, business_name,
            business_registration_number, projected_annual_turnover)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
        [
          userId,
          profile.nrcNumber,
          profile.firstName,
          profile.middleName ?? null,
          profile.surname,
          profile.dateOfBirth,
          profile.gender,
          profile.mobileNumber,
          profile.physicalAddress,
          profile.province,
          profile.district,
          profile.tpin,
          profile.taxpayerType,
          profile.businessName ?? null,
          profile.businessRegistrationNumber ?? null,
          profile.projectedAnnualTurnover ? Number(profile.projectedAnnualTurnover) : null,
        ]
      );
    } else if (profile.role === "tax_practitioner") {
      await client.query(
        `insert into practitioner_profiles
           (user_id, nrc_number, first_name, middle_name, surname, date_of_birth, mobile_number,
            physical_address, province, district, category, membership_number, professional_body,
            highest_qualification, years_of_experience, current_employer, tpin, criminal_record_clearance,
            education_level)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`,
        [
          userId,
          profile.nrcNumber,
          profile.firstName,
          profile.middleName ?? null,
          profile.surname,
          profile.dateOfBirth,
          profile.mobileNumber,
          profile.physicalAddress,
          profile.province,
          profile.district,
          profile.category,
          profile.membershipNumber,
          profile.professionalBody,
          profile.highestQualification,
          Number(profile.yearsOfExperience) || 0,
          profile.currentEmployer,
          profile.tpin,
          profile.criminalRecordClearance === "Yes",
          profile.educationLevel,
        ]
      );
    } else if (profile.role === "zra_consultant") {
      await client.query(
        `insert into consultant_profiles
           (user_id, nrc_number, first_name, middle_name, surname, date_of_birth, mobile_number,
            physical_address, province, district, consultant_number, region)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        [
          userId,
          profile.nrcNumber,
          profile.firstName,
          profile.middleName ?? null,
          profile.surname,
          profile.dateOfBirth,
          profile.mobileNumber,
          profile.physicalAddress,
          profile.province,
          profile.district,
          profile.consultantNumber,
          profile.region,
        ]
      );
    } else {
      await client.query(
        `insert into institutional_profiles (user_id, first_name, surname, title, institution)
         values ($1,$2,$3,$4,$5)`,
        [userId, profile.firstName, profile.surname, profile.title, profile.institution]
      );
    }

    await client.query("commit");
    return { id: userId, registrationNumber, userCode, profile };
  } catch (err) {
    await client.query("rollback");
    throw err;
  } finally {
    client.release();
  }
}
