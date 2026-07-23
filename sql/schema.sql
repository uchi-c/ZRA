-- ZRA Integrated Digital Tax Return System — core schema
-- Plain Postgres, custom auth (bcrypt password hashes + DB-backed sessions).

create extension if not exists pgcrypto;

create type user_role as enum (
  'taxpayer',
  'tax_practitioner',
  'zra_consultant',
  'tsa_admin',
  'boz_executive',
  'mofnp_admin'
);

create type taxpayer_type as enum (
  'Individual', 'Sole Trader', 'SME', 'Partnership', 'Company', 'NGO'
);

create type practitioner_category as enum ('TTP', 'GTP', 'MTP');

create type professional_body as enum ('ZICA', 'SAIT', 'FPI', 'Other');

-- ---------------------------------------------------------------------------
-- Auth
-- ---------------------------------------------------------------------------

create table users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  email text unique not null,
  password_hash text not null,
  role user_role not null,
  registration_number text unique not null,
  user_code text unique not null,
  created_at timestamptz not null default now()
);

create table sessions (
  token text primary key,
  user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index sessions_user_id_idx on sessions(user_id);

-- ---------------------------------------------------------------------------
-- Role profiles (1:1 with users, shape mirrors lib/types.ts)
-- ---------------------------------------------------------------------------

create table taxpayer_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  nrc_number text not null,
  first_name text not null,
  middle_name text,
  surname text not null,
  date_of_birth date not null,
  gender text not null,
  mobile_number text not null,
  physical_address text not null,
  province text not null,
  district text not null,
  tpin text unique not null,
  taxpayer_type taxpayer_type not null,
  business_name text,
  business_registration_number text,
  projected_annual_turnover numeric
);

create table practitioner_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  nrc_number text not null,
  first_name text not null,
  middle_name text,
  surname text not null,
  date_of_birth date not null,
  mobile_number text not null,
  physical_address text not null,
  province text not null,
  district text not null,
  category practitioner_category not null,
  membership_number text not null,
  professional_body professional_body not null,
  highest_qualification text not null,
  years_of_experience integer not null,
  current_employer text not null,
  tpin text unique not null,
  criminal_record_clearance boolean not null default false,
  education_level text not null
);

create table consultant_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  nrc_number text not null,
  first_name text not null,
  middle_name text,
  surname text not null,
  date_of_birth date not null,
  mobile_number text not null,
  physical_address text not null,
  province text not null,
  district text not null,
  consultant_number text unique not null,
  region text not null
);

create table institutional_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  first_name text not null,
  surname text not null,
  title text not null,
  institution text not null
);

-- ---------------------------------------------------------------------------
-- Practitioner <-> Taxpayer relationships
-- ---------------------------------------------------------------------------

create table practitioner_clients (
  practitioner_id uuid not null references users(id) on delete cascade,
  taxpayer_id uuid not null references users(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (practitioner_id, taxpayer_id)
);

-- ---------------------------------------------------------------------------
-- Tax domain
-- ---------------------------------------------------------------------------

create table tax_returns (
  id uuid primary key default gen_random_uuid(),
  taxpayer_id uuid not null references users(id) on delete cascade,
  period text not null,
  status text not null default 'Draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (taxpayer_id, period)
);

create table income_declarations (
  id uuid primary key default gen_random_uuid(),
  tax_return_id uuid not null references tax_returns(id) on delete cascade,
  category text not null,
  amount numeric not null default 0
);

create table expense_declarations (
  id uuid primary key default gen_random_uuid(),
  tax_return_id uuid not null references tax_returns(id) on delete cascade,
  category text not null,
  amount numeric not null default 0
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  taxpayer_id uuid not null references users(id) on delete cascade,
  tax_type text not null,
  amount numeric not null,
  status text not null default 'Pending',
  reference text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table refunds (
  id uuid primary key default gen_random_uuid(),
  taxpayer_id uuid not null references users(id) on delete cascade,
  amount numeric not null,
  status text not null default 'Requested',
  requested_at timestamptz not null default now(),
  processed_at timestamptz
);

create table tax_clearance_certificates (
  id uuid primary key default gen_random_uuid(),
  taxpayer_id uuid not null references users(id) on delete cascade,
  certificate_no text unique not null,
  issued_on date not null,
  expires_on date not null,
  purpose text not null,
  status text not null default 'Valid'
);

-- ---------------------------------------------------------------------------
-- Consultant oversight
-- ---------------------------------------------------------------------------

create table compliance_cases (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid references users(id) on delete set null,
  subject_id uuid references users(id) on delete cascade,
  case_type text not null,
  status text not null default 'Open',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Notifications
-- ---------------------------------------------------------------------------

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  description text,
  tone text not null default 'info',
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index notifications_user_id_idx on notifications(user_id);
