import { ReactNode } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomBar } from "./MobileBottomBar";
import { MobileHeader } from "./MobileHeader";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />

      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <DesktopSidebar />

        <main className="flex-1 px-6 py-8 pb-24 lg:px-10 lg:pb-10">
          {children}
        </main>
      </div>

      <MobileBottomBar />
    </div>
  );
}