import { ReactNode } from 'react';

interface MainWorkspaceProps {
  children: ReactNode;
}

export default function MainWorkspace({ children }: MainWorkspaceProps) {
  return (
    <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-20 space-y-8 md:space-y-12 relative z-10">
      {children}
    </main>
  );
}
