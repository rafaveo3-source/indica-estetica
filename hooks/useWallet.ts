import { useCallback, useEffect, useState } from "react";
import {
  credit as createCredit,
  debit as createDebit,
  getBalance,
  getStatement,
  getTotals,
  listTransactions,
} from "@/services/wallet";
import type {
  WalletBalance,
  WalletCreditInput,
  WalletDebitInput,
  WalletStatement,
  WalletTotals,
  WalletTransaction,
} from "@/types/wallet";

export interface UseWalletResult {
  transactions: WalletTransaction[];
  statement: WalletStatement | null;
  balance: WalletBalance | null;
  totals: WalletTotals | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  credit: (input: WalletCreditInput) => Promise<WalletTransaction>;
  debit: (input: WalletDebitInput) => Promise<WalletTransaction>;
}

export function useWallet(): UseWalletResult {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [statement, setStatement] = useState<WalletStatement | null>(null);
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [totals, setTotals] = useState<WalletTotals | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [nextTransactions, nextStatement, nextBalance, nextTotals] =
        await Promise.all([
          listTransactions(),
          getStatement(),
          getBalance(),
          getTotals(),
        ]);

      setTransactions(nextTransactions);
      setStatement(nextStatement);
      setBalance(nextBalance);
      setTotals(nextTotals);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load wallet"));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCredit = useCallback(async (input: WalletCreditInput) => {
    const createdTransaction = await createCredit(input);
    setTransactions((current) => [createdTransaction, ...current]);
    await refresh();
    return createdTransaction;
  }, [refresh]);

  const handleDebit = useCallback(async (input: WalletDebitInput) => {
    const createdTransaction = await createDebit(input);
    setTransactions((current) => [createdTransaction, ...current]);
    await refresh();
    return createdTransaction;
  }, [refresh]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    transactions,
    statement,
    balance,
    totals,
    loading,
    error,
    refresh,
    credit: handleCredit,
    debit: handleDebit,
  };
}
