import { useCallback, useEffect, useState } from "react";
import { listReferrals } from "@/services/referrals";
import type { Referral } from "@/types/referral";

export interface UseCollectionResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useReferrals(): UseCollectionResult<Referral> {
  const [data, setData] = useState<Referral[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await listReferrals();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load referrals"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
