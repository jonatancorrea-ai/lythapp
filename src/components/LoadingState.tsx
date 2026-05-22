import { motion } from 'motion/react';
import StrategyLoader from './StrategyLoader';

interface LoadingStateProps {
  nicheName?: string;
  customTopic?: string;
}

export default function LoadingState({ nicheName, customTopic }: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, y: -12 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <StrategyLoader nicheName={nicheName} customTopic={customTopic} />
    </motion.div>
  );
}
