export type RewardStatus = "draft" | "active" | "inactive";
export type RewardType = "points" | "discount";

export interface Reward {
  id: string;
  clinic_id: string;
  title: string;
  description: string | null;
  type: RewardType;
  points: number;
  status: RewardStatus;
  created_at: string;
  updated_at: string;
}

export interface RewardCreateInput {
  clinic_id: string;
  title: string;
  description?: string | null;
  type?: RewardType;
  points?: number;
  status?: RewardStatus;
}

export interface RewardUpdateInput {
  clinic_id?: string;
  title?: string;
  description?: string | null;
  type?: RewardType;
  points?: number;
  status?: RewardStatus;
}
