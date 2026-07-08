import { createClient } from "@/lib/supabase/server";
import type { Clinic } from "@/types/clinic";

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

export async function getClinic(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Clinic;
}
