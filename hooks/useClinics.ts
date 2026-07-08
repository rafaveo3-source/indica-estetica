import { useCallback, useEffect, useState } from "react";
import {
  createClinic,
  deleteClinic,
  listClinics,
  updateClinic,
} from "@/services/clinics";
import type { Clinic, ClinicCreateInput, ClinicUpdateInput } from "@/types/clinic";

export interface UseClinicsResult {
  clinics: Clinic[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  createClinic: (input: ClinicCreateInput) => Promise<Clinic>;
  updateClinic: (id: string, input: ClinicUpdateInput) => Promise<Clinic>;
  deleteClinic: (id: string) => Promise<void>;
}

export function useClinics(): UseClinicsResult {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await listClinics();
      setClinics(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load clinics"));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateClinic = useCallback(async (input: ClinicCreateInput) => {
    const createdClinic = await createClinic(input);
    setClinics((current) => [createdClinic, ...current]);
    return createdClinic;
  }, []);

  const handleUpdateClinic = useCallback(
    async (id: string, input: ClinicUpdateInput) => {
      const updatedClinic = await updateClinic(id, input);
      setClinics((current) =>
        current.map((clinic) => (clinic.id === id ? updatedClinic : clinic)),
      );
      return updatedClinic;
    },
    [],
  );

  const handleDeleteClinic = useCallback(async (id: string) => {
    await deleteClinic(id);
    setClinics((current) => current.filter((clinic) => clinic.id !== id));
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    clinics,
    loading,
    error,
    refresh,
    createClinic: handleCreateClinic,
    updateClinic: handleUpdateClinic,
    deleteClinic: handleDeleteClinic,
  };
}
