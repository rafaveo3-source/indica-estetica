import { supabase as browserSupabase } from "@/lib/supabase/client";
import type {
  Referral,
  ReferralCreateInput,
  ReferralPipelineStage,
  ReferralUpdateInput,
} from "@/types/referral";

const TABLE = "referrals";

interface ReferralRow extends Omit<Referral, "patient_name"> {
  patients?: {
    name: string | null;
  } | null;
}

async function getSupabaseClient() {
  return browserSupabase;
}

function mapReferralRow(row: ReferralRow): Referral {
  return {
    ...row,
    patient_name: row.patients?.name ?? null,
  };
}

export async function listReferrals(): Promise<Referral[]> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select(`
      *,
      patients(name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map((row) => mapReferralRow(row as ReferralRow));
}

export async function getReferral(id: string): Promise<Referral> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Referral not found");

  return data as Referral;
}

export async function createReferral(input: ReferralCreateInput): Promise<Referral> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .insert(input)
    .select("*")
    .single();

  if (error) throw error;

  return data as Referral;
}

export async function updateReferral(
  id: string,
  input: ReferralUpdateInput,
): Promise<Referral> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  return data as Referral;
}

export async function deleteReferral(id: string): Promise<void> {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw error;
}

export async function updatePipelineStage(
  id: string,
  pipelineStage: ReferralPipelineStage,
): Promise<Referral> {
  return updateReferral(id, { pipeline_stage: pipelineStage });
}

export async function approveReferral(id: string): Promise<Referral> {
  return updateReferral(id, { status: "approved" });
}

export async function rejectReferral(id: string): Promise<Referral> {
  return updateReferral(id, { status: "rejected" });
}
