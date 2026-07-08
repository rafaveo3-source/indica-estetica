import {
  LayoutDashboard,
  Building2,
  Users,
  Gift,
  Wallet,
  Megaphone,
  Settings,
} from "lucide-react";

export const masterNavigation = [
  {
    title: "Dashboard",
    href: "/master",
    icon: LayoutDashboard,
  },
  {
    title: "Clínicas",
    href: "/master/clinicas",
    icon: Building2,
  },
  {
    title: "Pacientes",
    href: "/master/pacientes",
    icon: Users,
  },
  {
    title: "Indicações",
    href: "/master/indicacoes",
    icon: Gift,
  },
  {
    title: "Carteira",
    href: "/master/carteira",
    icon: Wallet,
  },
  {
    title: "Promoções",
    href: "/master/promocoes",
    icon: Megaphone,
  },
  {
    title: "Configurações",
    href: "/master/configuracoes",
    icon: Settings,
  },
];