export type PatientStatus = "active" | "inactive" | "archived";

export interface PatientWallet {
  balance: number;
  total_indications: number;
  total_rewards: number;
  last_indication_at: string | null;
  last_redemption_at: string | null;
}

export interface Patient {
  id: string;
  clinic_id: string | null;
  name: string;
  cpf: string | null;
  email: string | null;
  phone: string | null;
  birth_date: string | null;
  status: PatientStatus;
  balance: number;
  referral_code: string | null;
  referral_slug: string | null;
  last_indication_at: string | null;
  last_redemption_at: string | null;
  total_indications: number;
  total_rewards: number;
  created_at: string;
  updated_at: string;
}

export interface PatientForm {
  name: string;
  cpf?: string | null;
  email?: string | null;
  phone?: string | null;
  birth_date?: string | null;
  status?: PatientStatus;
  clinic_id?: string | null;
  balance?: number;
}

export interface PatientCreateInput extends PatientForm {}

export interface PatientUpdateInput extends Partial<PatientForm> {}
