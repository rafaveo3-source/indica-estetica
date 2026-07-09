import { supabase as browserSupabase } from "@/lib/supabase/client";
import type {
  WalletBalance,
  WalletCreditInput,
  WalletDebitInput,
  WalletStatement,
  WalletTotals,
  WalletTransaction,
  WalletType,
} from "@/types/wallet";

const TABLE = "wallet_transactions";

async function getSupabaseClient() {
  return browserSupabase;
}

function calculateTotals(transactions: WalletTransaction[]): WalletTotals {
  const totalCredits = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const totalDebits = transactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  return {
    totalCredits,
    totalDebits,
    currentBalance: totalCredits - totalDebits,
  };
}

function buildTransactionPayload(
  input: WalletCreditInput | WalletDebitInput,
  type: WalletType,
): WalletTransaction {
  const transactionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return {
    id: transactionId,
    clinic_id: input.clinic_id,
    patient_id: input.patient_id,
    type,
    source: input.source ?? "manual",
    reference_id: input.reference_id ?? null,
    amount: Number(input.amount),
    description: input.description ?? null,
    created_by: input.created_by ?? null,
    created_at: new Date().toISOString(),
  };
}

export async function listTransactions(): Promise<WalletTransaction[]> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as WalletTransaction[];
}

export async function credit(input: WalletCreditInput): Promise<WalletTransaction> {
  const supabase = await getSupabaseClient();
  const payload = buildTransactionPayload(input, "credit");

  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;

  return data as WalletTransaction;
}

export async function debit(input: WalletDebitInput): Promise<WalletTransaction> {
  const supabase = await getSupabaseClient();
  const payload = buildTransactionPayload(input, "debit");

  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;

  return data as WalletTransaction;
}

export async function getBalance(): Promise<WalletBalance> {
  const transactions = await listTransactions();
  const totals = calculateTotals(transactions);

  return {
    balance: totals.currentBalance,
    totalCredits: totals.totalCredits,
    totalDebits: totals.totalDebits,
  };
}

export async function getTotals(): Promise<WalletTotals> {
  const transactions = await listTransactions();
  return calculateTotals(transactions);
}

export async function getStatement(): Promise<WalletStatement> {
  const transactions = await listTransactions();
  const totals = calculateTotals(transactions);

  return {
    transactions,
    balance: totals.currentBalance,
    totals,
  };
}
