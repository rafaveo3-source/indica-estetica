export type PatientStatus = "active" | "inactive" | "archived";

export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  birth_date: string | null;
  status: PatientStatus;
  clinic_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface PatientCreateInput {
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  birth_date?: string | null;
  status?: PatientStatus;
  clinic_id?: string | null;
}

export interface PatientUpdateInput {
  first_name?: string;
  last_name?: string;
  email?: string | null;
  phone?: string | null;
  birth_date?: string | null;
  status?: PatientStatus;
  clinic_id?: string | null;
}
