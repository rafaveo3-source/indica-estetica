import { Logo } from "@/components/brand/Logo";
import { AppButton } from "@/components/shared/AppButton";
import { AppCard } from "@/components/shared/AppCard";
import { AppInput } from "@/components/shared/AppInput";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <AppCard className="w-full max-w-md">

        <Logo />

        <form className="mt-10 space-y-5">

          <AppInput
            type="email"
            placeholder="E-mail"
          />

          <AppInput
            type="password"
            placeholder="Senha"
          />

          <AppButton>
            Entrar
          </AppButton>

        </form>

      </AppCard>
    </main>
  );
}