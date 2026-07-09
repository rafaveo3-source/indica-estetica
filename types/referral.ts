export type ReferralStatus = "pending" | "approved" | "rejected";

export type ReferralPipelineStage =
  | "new"
  | "contacted"
  | "scheduled"
  | "completed"
  | "credited";

export interface Referral {
  id: string;
  clinic_id: string;
  patient_id: string | null;
  patient_name: string | null;
  referred_name: string;
  referred_phone: string | null;
  referred_email: string | null;
  reward_amount: number;
  status: ReferralStatus;
  pipeline_stage: ReferralPipelineStage;
  approved_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReferralCreateInput {
  patient_id: string;
  clinic_id: string;
  status?: ReferralStatus;
  pipeline_stage?: ReferralPipelineStage;
  notes?: string | null;
}

export interface ReferralUpdateInput {
  patient_id?: string;
  clinic_id?: string;
  status?: ReferralStatus;
  pipeline_stage?: ReferralPipelineStage;
  notes?: string | null;
}
