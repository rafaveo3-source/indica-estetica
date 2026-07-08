import type {
  Referral,
  ReferralCreateInput,
  ReferralUpdateInput,
} from "@/types/referral";

export async function listReferrals(): Promise<Referral[]> {
  throw new Error("Not implemented");
}

export async function getReferral(id: string): Promise<Referral> {
  throw new Error("Not implemented");
}

export async function createReferral(input: ReferralCreateInput): Promise<Referral> {
  throw new Error("Not implemented");
}

export async function updateReferral(
  id: string,
  input: ReferralUpdateInput,
): Promise<Referral> {
  throw new Error("Not implemented");
}

export async function deleteReferral(id: string): Promise<void> {
  throw new Error("Not implemented");
}
