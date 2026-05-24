import { Copy, Check, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { StrategyRow } from '../types';
import ResultCard from './ResultCard';

interface ResultsSectionProps {
  strategies: StrategyRow[];
  platform: string;
  copiedAll: boolean;
  onCopyAll: () => void;
  onDownloadPDF: () => void;
  onCopyHook: (text: string, index: number) => void;
  onCopyRow: (row: StrategyRow, index: number) => void;
}

export default function ResultsSection({
  strategies,
  platform,
  copiedAll,
  onCopyAll,
  onDownloadPDF,
  onCopyHook,
  onCopyRow
}: ResultsSectionProps) {
  if (strategies.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="space-y-6 relative z-10 w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="space-y-1 text-center sm:text-left select-none">
          <h3 className="text-lg font-semibold font-sans tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
            <span>Matriz Estratégica de Contenido</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2997ff]/10 text-[9.5px] font-mono font-bold tracking-normal text-[#2997ff] border border-[#2997ff]/15 uppercase">
              {platform}
            </span>
          </h3>
          <p className="text-xs text-zinc-500 font-medium font-sans">
            Curación sofisticada calibrada por motores inteligentes. Calidad de nivel de autor.
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono font-bold tracking-wider text-amber-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Beta · Curación estratégica interna
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 select-none">
          <button
            type="button"
            onClick={onCopyAll}
            className={`h-9 px-4 rounded-full text-xs font-semibold flex items-center gap-2 transition-all duration-300 cursor-pointer border ${
              copiedAll
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-md'
                : 'bg-white/[0.03] text-zinc-350 hover:bg-white/[0.05] hover:text-white border-white/10'
            }`}
          >
            {copiedAll ? <Check size={12} className="animate-pulse" /> : <Copy size={12} />}
            <span>{copiedAll ? '¡Copiado Todo!' : 'Copiar Matriz (Markdown)'}</span>
          </button>
          <button
            type="button"
            onClick={onDownloadPDF}
            className="h-9 px-4 rounded-full text-xs font-semibold bg-white/[0.03] text-zinc-350 hover:bg-white/[0.05] hover:text-white border border-white/10 flex items-center gap-2 transition-all duration-300 cursor-pointer"
          >
            <Download size={12} />
            <span>Descargar PDF</span>
          </button>
        </div>
      </div>
      <div className="space-y-5">
        {strategies.map((row, idx) => (
          <ResultCard
            key={idx}
            strategy={row}
            index={idx}
            platform={platform}
            onCopyHook={onCopyHook}
            onCopyRow={onCopyRow}
          />
        ))}
      </div>
    </motion.section>
  );
}
