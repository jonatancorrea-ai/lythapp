import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#000000] text-[#EAEAEA] font-sans selection:bg-[#2997ff]/20 overflow-y-auto overflow-x-hidden relative flex flex-col pt-0 pb-[env(safe-area-inset-bottom,40px)] select-none">
      {children}
    </div>
  );
}
