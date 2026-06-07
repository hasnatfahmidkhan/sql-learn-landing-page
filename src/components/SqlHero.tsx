import { motion } from "framer-motion";
import { Database, Sparkles, ArrowDown, Code2 } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

export function SqlHero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
    >
      {/* Floating code snippets — positioned relative to the full-width section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/3 left-6 xl:left-60 hidden lg:block z-10"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm"
        >
          <code className="text-cyan-300 text-sm">SELECT * FROM</code>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-1/4 right-6 xl:right-60 hidden lg:block z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="px-4 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm"
        >
          <code className="text-emerald-300 text-sm">WHERE age &gt; 21</code>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-1/2 right-6 xl:right-60 hidden lg:block z-10"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="px-4 py-2 rounded-lg bg-slate-800/50 border border-violet-500/20 backdrop-blur-sm"
        >
          <code className="text-violet-300 text-sm">ORDER BY name</code>
        </motion.div>
      </motion.div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="my-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Interactive SQL Learning
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="bg-linear-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            Master
          </span>
          <br />
          <span className="bg-linear-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">
            SQL SELECT
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12"
        >
          Learn the most powerful SQL command with stunning visualizations and
          interactive examples
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.a
            href="#intro"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow flex items-center justify-center gap-2"
          >
            <Database className="w-5 h-5" />
            Start Learning
          </motion.a>
          <motion.a
            href="#execution"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-slate-200 font-semibold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Code2 className="w-5 h-5" />
            View Examples
          </motion.a>
        </motion.div>

        {/* Animated code preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50" />

            <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-slate-500 text-sm">query.sql</span>
              </div>

              <CodeBlock
                code={`SELECT first_name, age, gpa
FROM students
WHERE age > 20
AND country = 'Bangladesh'
ORDER BY gpa DESC
LIMIT 5;`}
                compact={false}
                showCopy={true}
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#intro"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
