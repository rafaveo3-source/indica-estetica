import type {
  Patient,
  PatientCreateInput,
  PatientUpdateInput,
} from "@/types/patient";

export async function listPatients(): Promise<Patient[]> {
  throw new Error("Not implemented");
}

export async function getPatient(id: string): Promise<Patient> {
  throw new Error("Not implemented");
}

export async function createPatient(input: PatientCreateInput): Promise<Patient> {
  throw new Error("Not implemented");
}

export async function updatePatient(
  id: string,
  input: PatientUpdateInput,
): Promise<Patient> {
  throw new Error("Not implemented");
}

export async function deletePatient(id: string): Promise<void> {
  throw new Error("Not implemented");
}
