import { getReferral, rejectReferral as rejectReferralService } from "@/services/referrals";
import type { Referral } from "@/types/referral";

export async function rejectReferral(referralId: string): Promise<Referral> {
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

  return rejectReferralService(referralId);
}
