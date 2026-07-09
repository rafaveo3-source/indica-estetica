import { getReferral, approveReferral as approveReferralService } from "@/services/referrals";
import type { Referral } from "@/types/referral";
import { registerReferralCredit } from "./registerReferralCredit";

export async function approveReferral(referralId: string): Promise<Referral> {
  let referral: Referral;

  try {
    referral = await getReferral(referralId);
  } catch {
    throw new Error("Referral not found");
  }

  if (referral.status === "approved") {
    throw new Error("Referral is already approved");
  }

  if (referral.status === "rejected") {
    throw new Error("Referral is already rejected");
  }

  const approvedReferral = await approveReferralService(referralId);

  if (!approvedReferral.patient_id) {
    throw new Error("Referral requires an associated patient");
  }

  await registerReferralCredit({
    clinicId: approvedReferral.clinic_id,
    patientId: approvedReferral.patient_id,
    referralId: approvedReferral.id,
    amount: 100,
  });

  // TODO: publicar Domain Event ReferralApproved no futuro.
  return approvedReferral;
}
