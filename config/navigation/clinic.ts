import {
  LayoutDashboard,
  Users,
  Gift,
  Wallet,
  Megaphone,
  Settings,
} from "lucide-react";

export const clinicNavigation = [
  {
    title: "Dashboard",
    href: "/clinic",
    icon: LayoutDashboard,
  },
  {
    title: "Pacientes",
    href: "/clinic/pacientes",
    icon: Users,
  },
  {
    title: "Indicações",
    href: "/clinic/indicacoes",
    icon: Gift,
  },
  {
    title: "Carteira",
    href: "/clinic/carteira",
    icon: Wallet,
  },
  {
    title: "Promoções",
    href: "/clinic/promocoes",
    icon: Megaphone,
  },
  {
    title: "Configurações",
    href: "/clinic/configuracoes",
    icon: Settings,
  },
];