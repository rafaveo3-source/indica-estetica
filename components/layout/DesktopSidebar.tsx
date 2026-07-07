import Link from "next/link";
import { LayoutDashboard, Building2, Users, Gift, Wallet, Megaphone, Settings } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";

const items = [
  { href: "/master", label: "Dashboard", icon: LayoutDashboard },
  { href: "/master/clinicas", label: "Clínicas", icon: Building2 },
  { href: "/master/pacientes", label: "Pacientes", icon: Users },
  { href: "/master/indicacoes", label: "Indicações", icon: Gift },
  { href: "/master/carteira", label: "Carteira", icon: Wallet },
  { href: "/master/promocoes", label: "Promoções", icon: Megaphone },
  { href: "/master/configuracoes", label: "Configurações", icon: Settings },
];

export function DesktopSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-border bg-white lg:flex lg:flex-col">
      <div className="flex h-24 items-center gap-4 px-8">
        <LogoMark size={42} />
        <div>
          <h1 className="text-lg font-bold">Indica Estética</h1>
          <p className="text-sm text-muted-foreground">Painel Master</p>
        </div>
      </div>

      <nav className="flex-1 px-4">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}