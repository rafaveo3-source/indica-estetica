export const ROLES = {
  MASTER: "MASTER",
  CLINIC_ADMIN: "CLINIC_ADMIN",
  PATIENT: "PATIENT",
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]