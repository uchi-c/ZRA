export type Role =
  | "taxpayer"
  | "tax_practitioner"
  | "zra_consultant"
  | "tsa_admin"
  | "boz_executive"
  | "mofnp_admin";

export type TaxpayerType =
  | "Individual"
  | "Sole Trader"
  | "SME"
  | "Partnership"
  | "Company"
  | "NGO";

export type PractitionerCategory = "TTP" | "GTP" | "MTP";

export type ProfessionalBody = "ZICA" | "SAIT" | "FPI" | "Other";

export type TaxStatus = "Compliant" | "Pending Review" | "Outstanding Taxes";

export type ComplianceBadge = "Compliant" | "Pending" | "Outstanding";

export interface BaseProfile {
  nrcNumber: string;
  firstName: string;
  middleName?: string;
  surname: string;
  dateOfBirth: string;
  mobileNumber: string;
  email: string;
  physicalAddress: string;
  province: string;
  district: string;
  username: string;
}

export interface TaxpayerProfile extends BaseProfile {
  role: "taxpayer";
  gender: string;
  tpin: string;
  taxpayerType: TaxpayerType;
  businessName?: string;
  businessRegistrationNumber?: string;
  projectedAnnualTurnover?: string;
}

export interface PractitionerProfile extends BaseProfile {
  role: "tax_practitioner";
  category: PractitionerCategory;
  membershipNumber: string;
  professionalBody: ProfessionalBody;
  highestQualification: string;
  yearsOfExperience: string;
  currentEmployer: string;
  tpin: string;
  criminalRecordClearance: "Yes" | "No";
  educationLevel: string;
}

export interface ConsultantProfile extends BaseProfile {
  role: "zra_consultant";
  consultantNumber: string;
  region: string;
}

export interface InstitutionalProfile {
  role: "tsa_admin" | "boz_executive" | "mofnp_admin";
  firstName: string;
  surname: string;
  email: string;
  username: string;
  title: string;
  institution: string;
}

export type UserProfile =
  | TaxpayerProfile
  | PractitionerProfile
  | ConsultantProfile
  | InstitutionalProfile;

export interface AuthUser {
  id: string;
  registrationNumber: string;
  userCode: string;
  profile: UserProfile;
}
