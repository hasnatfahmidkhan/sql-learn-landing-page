import { motion } from 'framer-motion';
import { useState } from 'react';

const initialData = [
  { id: 1, name: 'Hasnat', age: 22, country: 'Bangladesh', highlight: false },
  { id: 2, name: 'John', age: 24, country: 'USA', highlight: false },
  { id: 3, name: 'Emma', age: 21, country: 'UK', highlight: false },
  { id: 4, name: 'Ayesha', age: 23, country: 'Bangladesh', highlight: false },
  { id: 5, name: 'Ali', age: 25, country: 'Canada', highlight: false },
];

export function InteractiveTable() {
  const [data, setData] = useState(initialData);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const applyFilter = (filter: string) => {
    setActiveFilter(filter);
    
    let filtered = initialData.map(row => ({ ...row, highlight: false }));
    
    switch (filter) {
      case 'bangladesh':
        filtered = filtered.map(row => ({
          ...row,
          highlight: row.country === 'Bangladesh'
        }));
        break;
      case 'age22':
        filtered = filtered.map(row => ({
          ...row,
          highlight: row.age > 22
        }));
        break;
      case 'all':
        filtered = filtered.map(row => ({ ...row, highlight: true }));
        break;
    }
    
    setData(filtered);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-violet-500/10 rounded-3xl blur-2xl" />
      
      <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-slate-500 text-sm">students.db</span>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all', label: 'SELECT *', color: 'cyan' },
            { key: 'bangladesh', label: "WHERE country = 'Bangladesh'", color: 'emerald' },
            { key: 'age22', label: 'WHERE age > 22', color: 'violet' },
          ].map((btn) => (
            <motion.button
              key={btn.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => applyFilter(btn.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === btn.key
                  ? `bg-${btn.color}-500/20 text-${btn.color}-300 border border-${btn.color}-500/30`
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800'
              }`}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                {['id', 'name', 'age', 'country'].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`border-b border-slate-700/30 transition-colors duration-300 ${
                    row.highlight ? 'bg-cyan-500/10' : ''
                  }`}
                >
                  {['id', 'name', 'age', 'country'].map((col) => (
                    <td
                      key={col}
                      className={`px-4 py-3 text-sm transition-colors duration-300 ${
                        row.highlight ? 'text-cyan-200' : 'text-slate-300'
                      }`}
                    >
                      {row[col as keyof typeof row] as string}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-slate-500 text-sm"
        >
          Click a button above to see the SELECT query in action
        </motion.div>
      </div>
    </motion.div>
  );
}
