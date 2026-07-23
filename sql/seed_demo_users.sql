-- Demo account seed data for the ZRA Integrated Digital Tax Return System.
-- Run this in the Neon SQL Editor AFTER sql/schema.sql has been applied.
-- All accounts use the password: demo123 (bcrypt hash below is precomputed for that password).

do $$
declare
  demo_password_hash text := '$2b$10$f6.pCYUnGZEnNBDxrr8.neDEzB3i4k3hJMHWH/XA/uuX5wBV8yuY.';
  v_taxpayer_id uuid;
  v_practitioner_id uuid;
  v_consultant_id uuid;
  v_tsa_id uuid;
  v_boz_id uuid;
  v_mofnp_id uuid;
begin
  insert into users (username, email, password_hash, role, registration_number, user_code)
  values ('taxpayer', 'john.taxpayer@example.com', demo_password_hash, 'taxpayer', 'ZRA-TP-100001', 'UID-10000001')
  returning id into v_taxpayer_id;

  insert into taxpayer_profiles
    (user_id, nrc_number, first_name, surname, date_of_birth, gender, mobile_number,
     physical_address, province, district, tpin, taxpayer_type, business_name,
     business_registration_number, projected_annual_turnover)
  values
    (v_taxpayer_id, '123456/10/1', 'John', 'Taxpayer', '1988-04-12', 'Male', '0977000001',
     'Plot 14, Kabulonga', 'Lusaka', 'Lusaka', '12345678', 'Company', 'JT Enterprises Limited',
     'PACRA-2019-4521', 1500000);

  insert into users (username, email, password_hash, role, registration_number, user_code)
  values ('practitioner', 'sarah.williams@example.com', demo_password_hash, 'tax_practitioner', 'ZRA-PR-200001', 'UID-20000001')
  returning id into v_practitioner_id;

  insert into practitioner_profiles
    (user_id, nrc_number, first_name, surname, date_of_birth, mobile_number, physical_address,
     province, district, category, membership_number, professional_body, highest_qualification,
     years_of_experience, current_employer, tpin, criminal_record_clearance, education_level)
  values
    (v_practitioner_id, '234567/11/1', 'Sarah', 'Williams', '1985-09-03', '0977000002', '15 Cairo Road',
     'Lusaka', 'Lusaka', 'GTP', 'ZICA-88213', 'ZICA', 'ACCA', 9, 'Mwansa & Associates', '23456789', true,
     'Bachelor''s Degree');

  insert into users (username, email, password_hash, role, registration_number, user_code)
  values ('consultant', 'grace.mulenga@zra.org.zm', demo_password_hash, 'zra_consultant', 'ZRA-CN-300001', 'UID-30000001')
  returning id into v_consultant_id;

  insert into consultant_profiles
    (user_id, nrc_number, first_name, surname, date_of_birth, mobile_number, physical_address,
     province, district, consultant_number, region)
  values
    (v_consultant_id, '345678/12/1', 'Grace', 'Mulenga', '1980-01-20', '0977000003',
     'ZRA Headquarters, Kabwe Road', 'Lusaka', 'Lusaka', 'TC-10045', 'Lusaka');

  insert into users (username, email, password_hash, role, registration_number, user_code)
  values ('tsaadmin', 'tsa.admin@mofnp.gov.zm', demo_password_hash, 'tsa_admin', 'ZRA-TSA-400001', 'UID-40000001')
  returning id into v_tsa_id;

  insert into institutional_profiles (user_id, first_name, surname, title, institution)
  values (v_tsa_id, 'TSA', 'Admin', 'Administrator', 'Ministry of Finance and National Planning');

  insert into users (username, email, password_hash, role, registration_number, user_code)
  values ('bozexec', 'governor.office@boz.zm', demo_password_hash, 'boz_executive', 'ZRA-BOZ-500001', 'UID-50000001')
  returning id into v_boz_id;

  insert into institutional_profiles (user_id, first_name, surname, title, institution)
  values (v_boz_id, 'BOZ', 'Executive', 'Governor', 'Bank of Zambia');

  insert into users (username, email, password_hash, role, registration_number, user_code)
  values ('mofnpadmin', 'admin@mofnp.gov.zm', demo_password_hash, 'mofnp_admin', 'ZRA-MOF-600001', 'UID-60000001')
  returning id into v_mofnp_id;

  insert into institutional_profiles (user_id, first_name, surname, title, institution)
  values (v_mofnp_id, 'MoFNP', 'Admin', 'Administrator', 'Ministry of Finance and National Planning');
end $$;
