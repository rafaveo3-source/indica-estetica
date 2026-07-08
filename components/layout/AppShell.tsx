import type { ReactNode } from "react";

import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomBar } from "./MobileBottomBar";
import { MobileHeader } from "./MobileHeader";

type Props = {
  children: ReactNode;
};

export function AppShell({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-background">

      <div className="mx-auto flex min-h-screen max-w-[1700px]">

        <DesktopSidebar />

        <div className="flex flex-1 flex-col">

          <MobileHeader />

          <main className="flex-1 px-6 py-8 pb-28 lg:px-10 lg:py-10">

            {children}

          </main>

        </div>

      </div>

      <MobileBottomBar />

    </div>
  );
}