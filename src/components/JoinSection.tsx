import { motion } from "framer-motion";
import { useState } from "react";
import { Link2, Sparkles } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

type JoinType = "inner" | "left" | "right" | "full" | "self";

interface JoinConfig {
  type: JoinType;
  title: string;
  description: string;
  query: string;
  resultCols: string[];
  resultData: string[][];
  visualNote: string;
}

const joinConfigs: Record<JoinType, JoinConfig> = {
  inner: {
    type: "inner",
    title: "INNER JOIN",
    description: "Only show matching rows from both tables",
    query: `SELECT
    s.first_name,
    c.course_name
FROM students AS s
INNER JOIN enrollments AS e
    ON s.student_id = e.student_id
INNER JOIN courses AS c
    ON e.course_id = c.course_id;`,
    resultCols: ["first_name", "course_name"],
    resultData: [
      ["Hasnat", "Web Development"],
      ["Hasnat", "Data Science"],
      ["Ayesha", "Web Development"],
    ],
    visualNote: "Only students WITH courses appear",
  },
  left: {
    type: "left",
    title: "LEFT JOIN",
    description: "Show ALL rows from left table, matching rows from right",
    query: `SELECT
    s.first_name,
    c.course_name
FROM students AS s
LEFT JOIN enrollments AS e
    ON s.student_id = e.student_id
LEFT JOIN courses AS c
    ON e.course_id = c.course_id;`,
    resultCols: ["first_name", "course_name"],
    resultData: [
      ["Hasnat", "Web Development"],
      ["Hasnat", "Data Science"],
      ["Ayesha", "Web Development"],
      ["John", "NULL"],
    ],
    visualNote: "John appears even without courses",
  },
  right: {
    type: "right",
    title: "RIGHT JOIN",
    description: "Show ALL rows from right table, matching rows from left",
    query: `SELECT
    s.first_name,
    c.course_name
FROM students AS s
RIGHT JOIN enrollments AS e
    ON s.student_id = e.student_id
RIGHT JOIN courses AS c
    ON e.course_id = c.course_id;`,
    resultCols: ["first_name", "course_name"],
    resultData: [
      ["Hasnat", "Web Development"],
      ["Hasnat", "Data Science"],
      ["Ayesha", "Web Development"],
    ],
    visualNote: "All courses appear, even without students",
  },
  full: {
    type: "full",
    title: "FULL JOIN",
    description: "Show ALL rows from both tables",
    query: `SELECT
    s.first_name,
    c.course_name
FROM students AS s
FULL JOIN enrollments AS e
    ON s.student_id = e.student_id
FULL JOIN courses AS c
    ON e.course_id = c.course_id;`,
    resultCols: ["first_name", "course_name"],
    resultData: [
      ["Hasnat", "Web Development"],
      ["Hasnat", "Data Science"],
      ["Ayesha", "Web Development"],
      ["John", "NULL"],
      ["NULL", "Machine Learning"],
    ],
    visualNote: "Everything from both tables",
  },
  self: {
    type: "self",
    title: "SELF JOIN",
    description: "Join a table with itself (e.g., employees & managers)",
    query: `SELECT
    e.name AS employee,
    m.name AS manager
FROM employees AS e
LEFT JOIN employees AS m
    ON e.manager_id = m.employee_id;`,
    resultCols: ["employee", "manager"],
    resultData: [
      ["Alice", "Bob"],
      ["Charlie", "Bob"],
      ["Bob", "NULL"],
      ["David", "Alice"],
    ],
    visualNote: "Same table, different aliases",
  },
};

const sampleData = {
  students: [
    { id: 1, name: "Hasnat" },
    { id: 2, name: "Ayesha" },
    { id: 3, name: "John" },
  ],
  courses: [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Data Science" },
    { id: 3, name: "Machine Learning" },
  ],
  enrollments: [
    { student_id: 1, course_id: 1 },
    { student_id: 1, course_id: 2 },
    { student_id: 2, course_id: 1 },
  ],
};

function JoinVisualizer({ activeJoin }: { activeJoin: JoinType }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Students Table */}
      <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
        <h4 className="text-cyan-300 font-semibold text-sm mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          students
        </h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cyan-500/20">
              <th className="text-left py-1 text-cyan-400">id</th>
              <th className="text-left py-1 text-cyan-400">name</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.students.map((s) => (
              <tr key={s.id} className="border-b border-cyan-500/10">
                <td className="py-1 text-slate-300">{s.id}</td>
                <td className="py-1 text-slate-300">{s.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Arrow */}
      <div className="flex items-center justify-center">
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-violet-400"
        >
          <Link2 className="w-8 h-8" />
        </motion.div>
      </div>

      {/* Courses Table */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <h4 className="text-emerald-300 font-semibold text-sm mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          courses
        </h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-emerald-500/20">
              <th className="text-left py-1 text-emerald-400">id</th>
              <th className="text-left py-1 text-emerald-400">name</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.courses.map((c) => (
              <tr key={c.id} className="border-b border-emerald-500/10">
                <td className="py-1 text-slate-300">{c.id}</td>
                <td className="py-1 text-slate-300">{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function JoinsSection() {
  const [activeJoin, setActiveJoin] = useState<JoinType>("inner");
  const config = joinConfigs[activeJoin];

  return (
    <section id="joins" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Link2 className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">
              ⭐⭐⭐⭐⭐ Most Important
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-violet-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
            SQL JOINS
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Real databases split data across tables. JOINS connect them like
            LEGO blocks.
          </p>
        </motion.div>

        {/* Join Type Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(Object.keys(joinConfigs) as JoinType[]).map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveJoin(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border cursor-pointer ${
                activeJoin === type
                  ? "bg-violet-500/20 text-violet-300 border-violet-500/30"
                  : "bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800"
              }`}
            >
              {joinConfigs[type].title}
            </motion.button>
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          key={activeJoin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-linear-to-br from-violet-500/10 to-transparent border border-violet-500/20 backdrop-blur-sm"
        >
          {/* Title & Description */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-violet-500/20">
              <Link2 className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-violet-300 mb-1">
                {config.title}
              </h3>
              <p className="text-slate-400">{config.description}</p>
            </div>
          </div>

          {/* Visual Tables */}
          <JoinVisualizer activeJoin={activeJoin} />

          {/* Query */}
          <div className="mb-6">
            <h4 className="text-sm text-slate-500 uppercase tracking-wider mb-3">
              Query
            </h4>
            <CodeBlock code={config.query} />
          </div>

          {/* Result */}
          <div className="mb-6">
            <h4 className="text-sm text-slate-500 uppercase tracking-wider mb-3">
              Result
            </h4>
            <div className="rounded-xl bg-slate-900/50 border border-slate-700/50 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800/50">
                    {config.resultCols.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-sm font-semibold text-violet-300"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {config.resultData.map((row, i) => (
                    <tr key={i} className="border-t border-slate-700/30">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-3 text-sm ${cell === "NULL" ? "text-slate-500 italic" : "text-slate-300"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Note */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
            <p className="text-cyan-200 text-sm">{config.visualNote}</p>
          </div>
        </motion.div>

        {/* Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { type: "INNER", desc: "Matching rows only", color: "violet" },
            { type: "LEFT", desc: "All from left + matches", color: "cyan" },
            {
              type: "RIGHT",
              desc: "All from right + matches",
              color: "emerald",
            },
            { type: "FULL", desc: "Everything from both", color: "amber" },
          ].map((item) => (
            <div
              key={item.type}
              className={`p-4 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/20`}
            >
              <h5 className={`text-${item.color}-300 font-semibold mb-1`}>
                {item.type}
              </h5>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
