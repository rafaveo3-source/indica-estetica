import {
  House,
  Gift,
  Wallet,
  Megaphone,
  User,
} from "lucide-react";

export const patientNavigation = [
  {
    title: "Início",
    href: "/patient",
    icon: House,
  },
  {
    title: "Indicações",
    href: "/patient/indicacoes",
    icon: Gift,
  },
  {
    title: "Carteira",
    href: "/patient/carteira",
    icon: Wallet,
  },
  {
    title: "Promoções",
    href: "/patient/promocoes",
    icon: Megaphone,
  },
  {
    title: "Perfil",
    href: "/patient/perfil",
    icon: User,
  },
];