import type {
  Reward,
  RewardCreateInput,
  RewardUpdateInput,
} from "@/types/reward";

export async function listRewards(): Promise<Reward[]> {
  throw new Error("Not implemented");
}

export async function getReward(id: string): Promise<Reward> {
  throw new Error("Not implemented");
}

export async function createReward(input: RewardCreateInput): Promise<Reward> {
  throw new Error("Not implemented");
}

export async function updateReward(
  id: string,
  input: RewardUpdateInput,
): Promise<Reward> {
  throw new Error("Not implemented");
}

export async function deleteReward(id: string): Promise<void> {
  throw new Error("Not implemented");
}
