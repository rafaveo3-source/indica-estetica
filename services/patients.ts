import { supabase as browserSupabase } from "@/lib/supabase/client";
import type {
  Patient,
  PatientCreateInput,
  PatientUpdateInput,
} from "@/types/patient";

const TABLE = "patients";

async function getSupabaseClient() {
  return browserSupabase;
}

function buildReferralCode(): string {
  const prefix = "IE-";
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = prefix;

  for (let index = 0; index < 6; index += 1) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}

async function generateUniqueReferralCode(supabase: typeof browserSupabase): Promise<string> {
  let referralCode = buildReferralCode();

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("referral_code")
      .eq("referral_code", referralCode)
      .maybeSingle();

    if (!error && !data) {
      return referralCode;
    }

    referralCode = buildReferralCode();
  }

  throw new Error("Unable to generate a unique referral code");
}

export async function listPatients(): Promise<Patient[]> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as Patient[];
}

export async function getPatient(id: string): Promise<Patient> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Patient not found");

  return data as Patient;
}

export async function createPatient(input: PatientCreateInput): Promise<Patient> {
  const supabase = await getSupabaseClient();
  const referralCode = await generateUniqueReferralCode(supabase);

  const payload = {
    ...input,
    referral_code: referralCode,
    balance: input.balance ?? 0,
  };

  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;

  return data as Patient;
}

export async function updatePatient(
  id: string,
  input: PatientUpdateInput,
): Promise<Patient> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  return data as Patient;
}

export async function deletePatient(id: string): Promise<void> {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw error;
}

export async function findPatientByCpf(cpf: string): Promise<Patient | null> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("cpf", cpf)
    .maybeSingle();

  if (error) throw error;

  return data as Patient | null;
}

export async function findPatientByPhone(phone: string): Promise<Patient | null> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("phone", phone)
    .maybeSingle();

  if (error) throw error;

  return data as Patient | null;
}

export async function findPatientByReferralCode(
  referralCode: string,
): Promise<Patient | null> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("referral_code", referralCode)
    .maybeSingle();

  if (error) throw error;

  return data as Patient | null;
}
