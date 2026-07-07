import Link from "next/link";
import { House, Gift, Wallet, User } from "lucide-react";

export function MobileBottomBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white lg:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        <Link href="/">
          <House size={22} />
        </Link>

        <Link href="/indicacoes">
          <Gift size={22} />
        </Link>

        <Link href="/carteira">
          <Wallet size={22} />
        </Link>

        <Link href="/perfil">
          <User size={22} />
        </Link>
      </div>
    </nav>
  );
}