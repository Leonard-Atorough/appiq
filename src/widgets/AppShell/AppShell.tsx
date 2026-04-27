import type { AppShellProps } from "./appShell.types";

export function AppShell({ header, nav, children }: AppShellProps) {
  return (
    <div className="flex flex-col h-screen bg-base">
      {header}
      <div className="flex flex-1 overflow-hidden">
        {nav}
        <main className="flex-1 overflow-y-auto p-lg">{children}</main>
      </div>
    </div>
  );
}
