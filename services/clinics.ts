import { supabase as browserSupabase } from "@/lib/supabase/client";
import type {
  Clinic,
  ClinicCreateInput,
  ClinicUpdateInput,
} from "@/types/clinic";

const TABLE = "clinics";

async function getSupabaseClient() {
  return browserSupabase;
}

export async function listClinics(): Promise<Clinic[]> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as Clinic[];
}

export async function getClinic(id: string): Promise<Clinic> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Clinic;
}

export async function createClinic(input: ClinicCreateInput): Promise<Clinic> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .insert(input)
    .select("*")
    .single();

  if (error) throw error;

  return data as Clinic;
}

export async function updateClinic(
  id: string,
  input: ClinicUpdateInput,
): Promise<Clinic> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  return data as Clinic;
}

export async function deleteClinic(id: string): Promise<void> {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw error;
}
