export type WalletType = "credit" | "debit";

export type WalletSource = "referral" | "redemption" | "manual";

export interface WalletTransaction {
  id: string;
  clinic_id: string;
  patient_id: string;
  type: WalletType;
  source: WalletSource;
  reference_id: string | null;
  amount: number;
  description: string | null;
  created_by: string | null;
  created_at: string;
}

export interface WalletBalance {
  balance: number;
  totalCredits: number;
  totalDebits: number;
}

export interface WalletTotals {
  totalCredits: number;
  totalDebits: number;
  currentBalance: number;
}

export interface WalletStatement {
  transactions: WalletTransaction[];
  balance: number;
  totals: WalletTotals;
}

export interface WalletCreditInput {
  clinic_id: string;
  patient_id: string;
  amount: number;
  description?: string | null;
  reference_id?: string | null;
  source?: WalletSource;
  created_by?: string | null;
}

export interface WalletDebitInput {
  clinic_id: string;
  patient_id: string;
  amount: number;
  description?: string | null;
  reference_id?: string | null;
  source?: WalletSource;
  created_by?: string | null;
}
