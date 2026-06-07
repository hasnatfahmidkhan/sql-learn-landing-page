import { motion } from 'framer-motion';
import { CodeBlock } from './CodeBlock';

type ColorScheme = 'cyan' | 'emerald' | 'violet' | 'orange' | 'amber' | 'pink' | 'rose';

interface ConceptSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  code: string;
  resultCols?: string[];
  resultData?: string[][];
  color?: ColorScheme;
  compact?: boolean;
}

const colorClasses: Record<ColorScheme, {
  bg: string;
  border: string;
  icon: string;
  title: string;
}> = {
  cyan: {
    bg: 'from-cyan-500/10 to-transparent',
    border: 'border-cyan-500/20',
    icon: 'text-cyan-400',
    title: 'text-cyan-300',
  },
  emerald: {
    bg: 'from-emerald-500/10 to-transparent',
    border: 'border-emerald-500/20',
    icon: 'text-emerald-400',
    title: 'text-emerald-300',
  },
  violet: {
    bg: 'from-violet-500/10 to-transparent',
    border: 'border-violet-500/20',
    icon: 'text-violet-400',
    title: 'text-violet-300',
  },
  orange: {
    bg: 'from-orange-500/10 to-transparent',
    border: 'border-orange-500/20',
    icon: 'text-orange-400',
    title: 'text-orange-300',
  },
  amber: {
    bg: 'from-amber-500/10 to-transparent',
    border: 'border-amber-500/20',
    icon: 'text-amber-400',
    title: 'text-amber-300',
  },
  pink: {
    bg: 'from-pink-500/10 to-transparent',
    border: 'border-pink-500/20',
    icon: 'text-pink-400',
    title: 'text-pink-300',
  },
  rose: {
    bg: 'from-rose-500/10 to-transparent',
    border: 'border-rose-500/20',
    icon: 'text-rose-400',
    title: 'text-rose-300',
  },
};

export function ConceptSection({
  icon,
  title,
  description,
  code,
  resultCols,
  resultData,
  color = 'cyan',
  compact = false,
}: ConceptSectionProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative group ${compact ? 'p-6' : 'p-8'} rounded-3xl bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-sm`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-slate-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl bg-slate-800/50 ${colors.icon}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${colors.title} mb-1`}>{title}</h3>
            <p className="text-slate-400">{description}</p>
          </div>
        </div>

        <div className={compact ? 'mt-4' : 'mt-6'}>
          <CodeBlock code={code} compact={compact} />
        </div>

        {resultCols && resultData && !compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 overflow-x-auto"
          >
            <div className="inline-block min-w-full rounded-xl bg-slate-900/50 border border-slate-700/50 overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-slate-800/50">
                    {resultCols.map((col) => (
                      <th
                        key={col}
                        className={`px-4 py-3 text-left text-sm font-semibold ${colors.title}`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resultData.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="border-t border-slate-700/30"
                    >
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-3 text-sm text-slate-300">
                          {cell}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
