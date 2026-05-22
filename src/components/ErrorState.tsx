import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-red-500/15 bg-red-950/[0.03] rounded-[28px]">
      <div className="w-10 h-10 rounded-full bg-red-500/[0.05] border border-red-550/15 flex items-center justify-center text-red-400 mb-3.5">
        <AlertTriangle size={15} />
      </div>
      <h3 className="text-zinc-200 font-sans font-semibold text-sm tracking-tight">
        Algo interrumpió la matriz cognitiva
      </h3>
      <p className="text-zinc-500 text-xs mt-1 max-w-sm font-sans leading-relaxed">
        {message || "No se pudo obtener una respuesta estable del motor. Intente de nuevo."}
      </p>
    </div>
  );
}
