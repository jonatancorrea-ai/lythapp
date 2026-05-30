import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div
      style={{ background: '#0f071e' }}
      className="min-h-screen text-white font-sans overflow-y-auto overflow-x-hidden relative flex flex-col pt-0 pb-[env(safe-area-inset-bottom,40px)]"
    >
      {children}
    </div>
  );
}
