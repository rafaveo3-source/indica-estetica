import { useCallback, useEffect, useState } from "react";
import {
  createPatient,
  deletePatient,
  listPatients,
  updatePatient,
} from "@/services/patients";
import type {
  Patient,
  PatientCreateInput,
  PatientUpdateInput,
} from "@/types/patient";

export interface UsePatientsResult {
  patients: Patient[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  createPatient: (input: PatientCreateInput) => Promise<Patient>;
  updatePatient: (id: string, input: PatientUpdateInput) => Promise<Patient>;
  deletePatient: (id: string) => Promise<void>;
  searchPatients: (query: string) => Promise<Patient[]>;
}

export function usePatients(): UsePatientsResult {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await listPatients();
      setPatients(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load patients"));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreatePatient = useCallback(async (input: PatientCreateInput) => {
    const createdPatient = await createPatient(input);
    setPatients((current) => [createdPatient, ...current]);
    return createdPatient;
  }, []);

  const handleUpdatePatient = useCallback(
    async (id: string, input: PatientUpdateInput) => {
      const updatedPatient = await updatePatient(id, input);
      setPatients((current) =>
        current.map((patient) => (patient.id === id ? updatedPatient : patient)),
      );
      return updatedPatient;
    },
    [],
  );

  const handleDeletePatient = useCallback(async (id: string) => {
    await deletePatient(id);
    setPatients((current) => current.filter((patient) => patient.id !== id));
  }, []);

  const searchPatients = useCallback(
    async (query: string) => {
      const normalizedQuery = query.trim().toLowerCase();

      if (!normalizedQuery) {
        await refresh();
        return patients;
      }

      const results = patients.filter((patient) => {
        const haystack = [
          patient.name,
          patient.cpf,
          patient.email,
          patient.phone,
          patient.referral_code,
        ]
          .filter((value): value is string => Boolean(value))
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      });

      setPatients(results);
      return results;
    },
    [patients, refresh],
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    patients,
    loading,
    error,
    refresh,
    createPatient: handleCreatePatient,
    updatePatient: handleUpdatePatient,
    deletePatient: handleDeletePatient,
    searchPatients,
  };
}
