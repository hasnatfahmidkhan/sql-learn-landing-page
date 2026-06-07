import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const writeOrder = [
  { step: 1, name: 'SELECT', desc: 'Choose columns', color: 'cyan' },
  { step: 2, name: 'FROM', desc: 'Choose table', color: 'emerald' },
  { step: 3, name: 'WHERE', desc: 'Filter rows', color: 'violet' },
  { step: 4, name: 'GROUP BY', desc: 'Group data', color: 'pink' },
  { step: 5, name: 'HAVING', desc: 'Filter groups', color: 'rose' },
  { step: 6, name: 'ORDER BY', desc: 'Sort results', color: 'orange' },
  { step: 7, name: 'LIMIT', desc: 'Limit rows', color: 'amber' },
];

const execOrder = [
  { step: 1, name: 'FROM', desc: 'Load table', color: 'emerald' },
  { step: 2, name: 'WHERE', desc: 'Filter rows', color: 'violet' },
  { step: 3, name: 'GROUP BY', desc: 'Group data', color: 'pink' },
  { step: 4, name: 'HAVING', desc: 'Filter groups', color: 'rose' },
  { step: 5, name: 'SELECT', desc: 'Choose columns', color: 'cyan' },
  { step: 6, name: 'ORDER BY', desc: 'Sort results', color: 'orange' },
  { step: 7, name: 'LIMIT', desc: 'Limit rows', color: 'amber' },
];

const colorMap: Record<string, string> = {
  cyan: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300',
  emerald: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
  violet: 'bg-violet-500/20 border-violet-500/30 text-violet-300',
  pink: 'bg-pink-500/20 border-pink-500/30 text-pink-300',
  rose: 'bg-rose-500/20 border-rose-500/30 text-rose-300',
  orange: 'bg-orange-500/20 border-orange-500/30 text-orange-300',
  amber: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
};

const textColorMap: Record<string, string> = {
  cyan: 'text-cyan-300',
  emerald: 'text-emerald-300',
  violet: 'text-violet-300',
  pink: 'text-pink-300',
  rose: 'text-rose-300',
  orange: 'text-orange-300',
  amber: 'text-amber-300',
};

export function ExecutionFlow() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* How you write it */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50"
      >
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <span className="text-2xl">✍️</span> How You Write It
        </h3>
        <p className="text-slate-400 text-sm mb-6">The order you type in your query</p>
        
        <div className="space-y-2">
          {writeOrder.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <div className={`w-8 h-8 rounded-lg ${colorMap[item.color]} border flex items-center justify-center text-sm font-bold`}>
                {item.step}
              </div>
              <span className={`${textColorMap[item.color]} font-mono font-semibold`}>{item.name}</span>
              <span className="text-slate-500 text-sm">{item.desc}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How SQL executes it */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20"
      >
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" /> How SQL Executes It
        </h3>
        <p className="text-slate-400 text-sm mb-6">The actual execution sequence</p>
        
        <div className="space-y-2">
          {execOrder.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <div className={`w-8 h-8 rounded-lg ${colorMap[item.color]} border flex items-center justify-center text-sm font-bold`}>
                {item.step}
              </div>
              <span className={`${textColorMap[item.color]} font-mono font-semibold`}>{item.name}</span>
              <span className="text-slate-500 text-sm">{item.desc}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50"
        >
          <p className="text-sm text-slate-300">
            <span className="text-cyan-400 font-semibold">💡 Pro tip:</span> Understanding execution order helps you write more efficient queries and debug issues faster.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
