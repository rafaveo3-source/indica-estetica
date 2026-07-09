import { credit } from "@/services/wallet";
import type { WalletTransaction } from "@/types/wallet";

export interface RegisterReferralCreditInput {
  clinicId: string;
  patientId: string;
  referralId: string;
  amount: number;
}

export async function registerReferralCredit(
  input: RegisterReferralCreditInput,
): Promise<WalletTransaction> {
  return credit({
    clinic_id: input.clinicId,
    patient_id: input.patientId,
    amount: input.amount,
    source: "referral",
    reference_id: input.referralId,
    description: "Indicação aprovada",
  });
}
