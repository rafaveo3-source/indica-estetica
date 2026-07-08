import { useCallback, useEffect, useState } from "react";
import { listRewards } from "@/services/rewards";
import type { Reward } from "@/types/reward";

export interface UseCollectionResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useRewards(): UseCollectionResult<Reward> {
  const [data, setData] = useState<Reward[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await listRewards();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load rewards"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
