import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Search,
  Play,
  RotateCcw,
  Sparkles,
  X,
  Check,
  Copy,
  Lightbulb,
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  age: number;
  country: string;
  gpa: number;
  highlight: boolean;
}

const initialData: Student[] = [
  {
    id: 1,
    name: "Hasnat",
    age: 22,
    country: "Bangladesh",
    gpa: 3.8,
    highlight: false,
  },
  { id: 2, name: "John", age: 24, country: "USA", gpa: 3.2, highlight: false },
  { id: 3, name: "Emma", age: 21, country: "UK", gpa: 3.9, highlight: false },
  {
    id: 4,
    name: "Ayesha",
    age: 23,
    country: "Bangladesh",
    gpa: 3.6,
    highlight: false,
  },
  {
    id: 5,
    name: "Ali",
    age: 25,
    country: "Canada",
    gpa: 3.4,
    highlight: false,
  },
  {
    id: 6,
    name: "Sakib",
    age: 22,
    country: "Bangladesh",
    gpa: 3.7,
    highlight: false,
  },
  { id: 7, name: "Maria", age: 20, country: "USA", gpa: 3.5, highlight: false },
  {
    id: 8,
    name: "Chen",
    age: 26,
    country: "China",
    gpa: 3.3,
    highlight: false,
  },
];

const filterPresets = [
  {
    key: "all",
    label: "SELECT *",
    query: "SELECT * FROM students;",
    color: "cyan",
    description: "Show all students",
  },
  {
    key: "bangladesh",
    label: "WHERE country = 'Bangladesh'",
    query: "SELECT * FROM students\nWHERE country = 'Bangladesh';",
    color: "emerald",
    description: "Filter by country",
  },
  {
    key: "age22",
    label: "WHERE age > 22",
    query: "SELECT * FROM students\nWHERE age > 22;",
    color: "violet",
    description: "Filter by age",
  },
  {
    key: "gpa35",
    label: "WHERE gpa > 3.5",
    query: "SELECT * FROM students\nWHERE gpa > 3.5;",
    color: "pink",
    description: "Filter by GPA",
  },
  {
    key: "and",
    label: "AND condition",
    query:
      "SELECT * FROM students\nWHERE country = 'Bangladesh'\nAND gpa > 3.5;",
    color: "orange",
    description: "Multiple conditions",
  },
  {
    key: "or",
    label: "OR condition",
    query:
      "SELECT * FROM students\nWHERE country = 'Bangladesh'\nOR country = 'USA';",
    color: "amber",
    description: "Either condition",
  },
  {
    key: "between",
    label: "BETWEEN 22 AND 25",
    query: "SELECT * FROM students\nWHERE age BETWEEN 22 AND 25;",
    color: "rose",
    description: "Range filter",
  },
  {
    key: "in",
    label: "IN (..)",
    query:
      "SELECT * FROM students\nWHERE country IN ('Bangladesh', 'USA', 'UK');",
    color: "lime",
    description: "Multiple values",
  },
];

const suggestions = [
  "age > 23",
  "gpa < 3.5",
  "country = 'USA'",
  "age BETWEEN 20 AND 24",
  "gpa >= 3.6",
  "country = 'Bangladesh' AND gpa > 3.5",
];

export function InteractiveTable() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [customQuery, setCustomQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

  // Get current query and filter data
  const { filteredData, currentQuery, resultCount } = useMemo(() => {
    let filtered = initialData.map((row) => ({ ...row, highlight: false }));
    let query = "SELECT * FROM students;";
    let error = null;

    if (activeFilter) {
      const preset = filterPresets.find((p) => p.key === activeFilter);
      if (preset) {
        query = preset.query;
        switch (activeFilter) {
          case "all":
            filtered = filtered.map((row) => ({ ...row, highlight: true }));
            break;
          case "bangladesh":
            filtered = filtered.map((row) => ({
              ...row,
              highlight: row.country === "Bangladesh",
            }));
            break;
          case "age22":
            filtered = filtered.map((row) => ({
              ...row,
              highlight: row.age > 22,
            }));
            break;
          case "gpa35":
            filtered = filtered.map((row) => ({
              ...row,
              highlight: row.gpa > 3.5,
            }));
            break;
          case "and":
            filtered = filtered.map((row) => ({
              ...row,
              highlight: row.country === "Bangladesh" && row.gpa > 3.5,
            }));
            break;
          case "or":
            filtered = filtered.map((row) => ({
              ...row,
              highlight: row.country === "Bangladesh" || row.country === "USA",
            }));
            break;
          case "between":
            filtered = filtered.map((row) => ({
              ...row,
              highlight: row.age >= 22 && row.age <= 25,
            }));
            break;
          case "in":
            filtered = filtered.map((row) => ({
              ...row,
              highlight: ["Bangladesh", "USA", "UK"].includes(row.country),
            }));
            break;
        }
      }
    } else if (customQuery.trim()) {
      query = `SELECT * FROM students\nWHERE ${customQuery};`;

      // Parse custom query
      try {
        const lowerQuery = customQuery.toLowerCase();

        // Simple parser for basic conditions
        if (lowerQuery.includes("and")) {
          const parts = lowerQuery.split("and").map((p) => p.trim());
          filtered = filtered.map((row) => {
            let matches = true;
            for (const part of parts) {
              matches = matches && evaluateCondition(row, part);
            }
            return { ...row, highlight: matches };
          });
        } else if (lowerQuery.includes("or")) {
          const parts = lowerQuery.split("or").map((p) => p.trim());
          filtered = filtered.map((row) => {
            let matches = false;
            for (const part of parts) {
              matches = matches || evaluateCondition(row, part);
            }
            return { ...row, highlight: matches };
          });
        } else {
          filtered = filtered.map((row) => ({
            ...row,
            highlight: evaluateCondition(row, lowerQuery),
          }));
        }
      } catch (e) {
        error = "Invalid query syntax";
        filtered = filtered.map((row) => ({ ...row, highlight: false }));
      }
    }

    setCustomError(error);
    const count = filtered.filter((r) => r.highlight).length;
    return { filteredData: filtered, currentQuery: query, resultCount: count };
  }, [activeFilter, customQuery]);

  // Helper function to evaluate conditions
  function evaluateCondition(row: Student, condition: string): boolean {
    const cond = condition.trim().toLowerCase();

    // Handle BETWEEN
    const betweenMatch = cond.match(/(\w+)\s+between\s+(\d+)\s+and\s+(\d+)/);
    if (betweenMatch) {
      const field = betweenMatch[1];
      const min = parseFloat(betweenMatch[2]);
      const max = parseFloat(betweenMatch[3]);
      const value = row[field as keyof Student];
      if (typeof value === "number") {
        return value >= min && value <= max;
      }
    }

    // Handle comparisons
    const compMatch = cond.match(/(\w+)\s*(>=|<=|>|<|=)\s*(['"]?[\w.]+['"]?)?/);
    if (compMatch) {
      const field = compMatch[1];
      const operator = compMatch[2];
      let value = compMatch[3]?.replace(/['"]/g, "");

      const rowValue = row[field as keyof Student];

      if (typeof rowValue === "number" && value) {
        const numValue = parseFloat(value);
        switch (operator) {
          case ">":
            return rowValue > numValue;
          case "<":
            return rowValue < numValue;
          case ">=":
            return rowValue >= numValue;
          case "<=":
            return rowValue <= numValue;
          case "=":
            return rowValue === numValue;
        }
      } else if (typeof rowValue === "string" && value) {
        const strValue = value.toLowerCase();
        return rowValue.toLowerCase() === strValue;
      }
    }

    return false;
  }

  const applyFilter = (filter: string) => {
    setActiveFilter(filter);
    setCustomQuery("");
    setCustomError(null);
  };

  const resetAll = () => {
    setActiveFilter(null);
    setCustomQuery("");
    setCustomError(null);
  };

  const copyQuery = async () => {
    await navigator.clipboard.writeText(currentQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applySuggestion = (suggestion: string) => {
    setCustomQuery(suggestion);
    setActiveFilter(null);
    setShowSuggestions(false);
  };

  const colorMap: Record<string, string> = {
    cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    pink: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    rose: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    lime: "bg-lime-500/20 text-lime-300 border-lime-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="absolute -inset-4 bg-linear-to-r from-cyan-500/10 via-emerald-500/10 to-violet-500/10 rounded-3xl blur-2xl" />

      <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-slate-500 text-sm">students.db</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetAll}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </motion.button>
        </div>

        {/* Live SQL Query Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuery}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/30"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-slate-500 uppercase tracking-wider">
                  Live Query
                </span>
              </div>
              <button
                onClick={copyQuery}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-700/50 text-slate-400 hover:text-white text-xs transition-colors"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="font-mono text-sm overflow-x-auto">
              <code className="text-slate-300">
                {currentQuery.split("\n").map((line, i) => (
                  <div key={i}>
                    {line
                      .split(
                        /(\bSELECT\b|\bFROM\b|\bWHERE\b|\bAND\b|\bOR\b|\bIN\b|\bBETWEEN\b)/,
                      )
                      .map((part, j) => {
                        const keywords = [
                          "SELECT",
                          "FROM",
                          "WHERE",
                          "AND",
                          "OR",
                          "IN",
                          "BETWEEN",
                        ];
                        if (keywords.includes(part)) {
                          return (
                            <span
                              key={j}
                              className="text-violet-400 font-semibold"
                            >
                              {part}
                            </span>
                          );
                        }
                        if (part.startsWith("'") || part.includes("'")) {
                          return (
                            <span key={j} className="text-emerald-400">
                              {part}
                            </span>
                          );
                        }
                        if (/^\d+$/.test(part)) {
                          return (
                            <span key={j} className="text-amber-400">
                              {part}
                            </span>
                          );
                        }
                        return <span key={j}>{part}</span>;
                      })}
                  </div>
                ))}
              </code>
            </pre>
          </motion.div>
        </AnimatePresence>

        {/* Filter Buttons */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">
              Preset Queries
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterPresets.map((btn) => (
              <motion.button
                key={btn.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => applyFilter(btn.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border cursor-pointer ${
                  activeFilter === btn.key
                    ? colorMap[btn.color]
                    : "bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600"
                }`}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom Query Input */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">
              Try Your Own WHERE Clause
            </span>
          </div>
          <div className="relative">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-mono">
                  WHERE
                </span>
                <input
                  type="text"
                  value={customQuery}
                  onChange={(e) => {
                    setCustomQuery(e.target.value);
                    setActiveFilter(null);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  placeholder="age > 22"
                  className="w-full pl-20 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 font-mono text-sm"
                />
                {customQuery && (
                  <button
                    onClick={() => setCustomQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl bg-slate-800 border border-slate-700/50 shadow-xl z-10"
                >
                  <div className="flex items-center gap-2 px-2 py-1 mb-1">
                    <Lightbulb className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-slate-500">Suggestions</span>
                  </div>
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => applySuggestion(suggestion)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono text-slate-300 hover:bg-slate-700/50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {customError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-sm text-red-400"
                >
                  {customError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-400">
              <span className="text-emerald-400 font-semibold">
                {resultCount}
              </span>{" "}
              row{resultCount !== 1 ? "s" : ""} returned
            </span>
          </div>
          <span className="text-xs text-slate-500">
            {initialData.length} total rows
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-700/30">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800/50">
                {["id", "name", "age", "country", "gpa"].map((col) => (
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
              {filteredData.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: row.highlight ? 1 : 0.4,
                    backgroundColor: row.highlight
                      ? "rgba(6, 182, 212, 0.1)"
                      : "transparent",
                  }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="border-t border-slate-700/30"
                >
                  {["id", "name", "age", "country", "gpa"].map((col) => (
                    <td
                      key={col}
                      className={`px-4 py-3 text-sm transition-colors duration-300 ${
                        row.highlight
                          ? "text-cyan-200 font-medium"
                          : "text-slate-400"
                      }`}
                    >
                      {row[col as keyof Student] as string | number}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 rounded-lg bg-slate-800/30 border border-slate-700/20"
        >
          <p className="text-xs text-slate-500">
            💡 <span className="text-slate-400">Tip:</span> Use operators like{" "}
            <code className="text-cyan-400">{">"}</code>,{" "}
            <code className="text-cyan-400">{"<"}</code>,{" "}
            <code className="text-cyan-400">{"="}</code>,{" "}
            <code className="text-cyan-400">BETWEEN</code>,{" "}
            <code className="text-cyan-400">AND</code>,{" "}
            <code className="text-cyan-400">OR</code> in your custom query.
            Example:{" "}
            <code className="text-emerald-400">
              age {">"} 22 AND gpa {">"} 3.5
            </code>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
