export type ClinicStatus = "active" | "inactive";
export type ClinicPlan = "trial" | "premium";

export interface Clinic {
  id: string;
  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
  plan: ClinicPlan;
  status: ClinicStatus;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}
