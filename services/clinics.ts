import { createClient } from "@/lib/supabase/server";
import type {
  Clinic,
  ClinicCreateInput,
  ClinicUpdateInput,
} from "@/types/clinic";

const TABLE = "clinics";

export async function listClinics(): Promise<Clinic[]> {
  const supabase = await createClient();

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
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Clinic;
}

export async function createClinic(input: ClinicCreateInput): Promise<Clinic> {
  throw new Error("Not implemented");
}

export async function updateClinic(
  id: string,
  input: ClinicUpdateInput,
): Promise<Clinic> {
  throw new Error("Not implemented");
}

export async function deleteClinic(id: string): Promise<void> {
  throw new Error("Not implemented");
}
