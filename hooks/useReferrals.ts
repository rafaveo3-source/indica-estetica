import { useCallback, useEffect, useState } from "react";
import {
  approveReferral,
  createReferral,
  deleteReferral,
  listReferrals,
  rejectReferral,
  updatePipelineStage,
  updateReferral,
} from "@/services/referrals";
import type {
  Referral,
  ReferralCreateInput,
  ReferralPipelineStage,
  ReferralUpdateInput,
} from "@/types/referral";

export interface UseReferralsResult {
  referrals: Referral[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  createReferral: (input: ReferralCreateInput) => Promise<Referral>;
  updateReferral: (id: string, input: ReferralUpdateInput) => Promise<Referral>;
  deleteReferral: (id: string) => Promise<void>;
  updatePipelineStage: (id: string, pipelineStage: ReferralPipelineStage) => Promise<Referral>;
  approveReferral: (id: string) => Promise<Referral>;
  rejectReferral: (id: string) => Promise<Referral>;
}

export function useReferrals(): UseReferralsResult {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await listReferrals();
      setReferrals(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load referrals"));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateReferral = useCallback(async (input: ReferralCreateInput) => {
    const createdReferral = await createReferral(input);
    setReferrals((current) => [createdReferral, ...current]);
    return createdReferral;
  }, []);

  const handleUpdateReferral = useCallback(
    async (id: string, input: ReferralUpdateInput) => {
      const updatedReferral = await updateReferral(id, input);
      setReferrals((current) =>
        current.map((referral) => (referral.id === id ? updatedReferral : referral)),
      );
      return updatedReferral;
    },
    [],
  );

  const handleDeleteReferral = useCallback(async (id: string) => {
    await deleteReferral(id);
    setReferrals((current) => current.filter((referral) => referral.id !== id));
  }, []);

  const handleUpdatePipelineStage = useCallback(
    async (id: string, pipelineStage: ReferralPipelineStage) => {
      const updatedReferral = await updatePipelineStage(id, pipelineStage);
      setReferrals((current) =>
        current.map((referral) => (referral.id === id ? updatedReferral : referral)),
      );
      return updatedReferral;
    },
    [],
  );

  const handleApproveReferral = useCallback(async (id: string) => {
    const updatedReferral = await approveReferral(id);
    setReferrals((current) =>
      current.map((referral) => (referral.id === id ? updatedReferral : referral)),
    );
    return updatedReferral;
  }, []);

  const handleRejectReferral = useCallback(async (id: string) => {
    const updatedReferral = await rejectReferral(id);
    setReferrals((current) =>
      current.map((referral) => (referral.id === id ? updatedReferral : referral)),
    );
    return updatedReferral;
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    referrals,
    loading,
    error,
    refresh,
    createReferral: handleCreateReferral,
    updateReferral: handleUpdateReferral,
    deleteReferral: handleDeleteReferral,
    updatePipelineStage: handleUpdatePipelineStage,
    approveReferral: handleApproveReferral,
    rejectReferral: handleRejectReferral,
  };
}
