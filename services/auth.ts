export interface AuthUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number | null;
  user: AuthUser;
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthSession> {
  throw new Error("Not implemented");
}

export async function signOut(): Promise<void> {
  throw new Error("Not implemented");
}

export async function getCurrentSession(): Promise<AuthSession | null> {
  throw new Error("Not implemented");
}
