export type ReferralStatus = "pending" | "approved" | "rejected";

export interface Referral {
  id: string;
  patient_id: string;
  clinic_id: string;
  status: ReferralStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReferralCreateInput {
  patient_id: string;
  clinic_id: string;
  status?: ReferralStatus;
  notes?: string | null;
}

export interface ReferralUpdateInput {
  patient_id?: string;
  clinic_id?: string;
  status?: ReferralStatus;
  notes?: string | null;
}
