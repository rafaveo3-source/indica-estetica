import { useCallback, useEffect, useState } from "react";
import { listPatients } from "@/services/patients";
import type { Patient } from "@/types/patient";

export interface UseCollectionResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function usePatients(): UseCollectionResult<Patient> {
  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await listPatients();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load patients"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
