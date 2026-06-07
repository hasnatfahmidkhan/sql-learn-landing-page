import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Database,
  Search,
  Filter,
  ArrowUpDown,
  Hash,
  Layers,
  Sparkles,
  Play,
  Code2,
  Zap,
  Target,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { SqlHero } from "./components/SqlHero";
import { ConceptSection } from "./components/ConceptSection";
import { InteractiveTable } from "./components/InteractiveTable";
import { ExecutionFlow } from "./components/ExecutionFlow";
import { FloatingNav } from "./components/FloatingNav";
import { PracticeChallenges } from "./components/PracticeChallenges";
import { CodeBlock } from "./components/CodeBlock";

function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "intro",
        "basics",
        "filtering",
        "advanced",
        "aggregation",
        "execution",
        "practice",
      ];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-linear(rgba(6,182,212,0.03)_1px,transparent_1px),linear-linear(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size-[60px_60px]" />
      </div>

      <FloatingNav activeSection={activeSection} />

      <SqlHero />

      {/* What is SELECT Section */}
      <section id="intro" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Database className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">
                Foundation
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              What is SELECT?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Imagine you have a huge notebook containing information about
              students.
            </p>
          </motion.div>

          <InteractiveTable />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-linear-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-lg text-slate-200">
                SELECT means:{" "}
                <span className="text-cyan-300 font-semibold">
                  "Show me some information from the notebook."
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Basic SELECT Operations */}
      <section id="basics" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Play className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">
                Getting Started
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-emerald-300 via-cyan-200 to-white bg-clip-text text-transparent">
              Basic SELECT Operations
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            <ConceptSection
              icon={<Database className="w-6 h-6" />}
              title="Select Everything"
              description={`Think: "Teacher, show me the whole notebook."`}
              code="SELECT * FROM students;"
              resultCols={["id", "name", "age", "country"]}
              resultData={[
                ["1", "Hasnat", "22", "Bangladesh"],
                ["2", "John", "24", "USA"],
                ["3", "Emma", "21", "UK"],
              ]}
              color="cyan"
            />

            <ConceptSection
              icon={<Search className="w-6 h-6" />}
              title="Select Specific Columns"
              description={`Think: "I only want names and ages."`}
              code="SELECT first_name, age FROM students;"
              resultCols={["first_name", "age"]}
              resultData={[
                ["Hasnat", "22"],
                ["John", "24"],
                ["Emma", "21"],
              ]}
              color="emerald"
            />
          </div>
        </div>
      </section>

      {/* Filtering Section */}
      <section
        id="filtering"
        className="relative py-24 px-6 bg-linear-to-b from-transparent via-slate-900/50 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <Filter className="w-4 h-4 text-violet-400" />
              <span className="text-violet-300 text-sm font-medium">
                Filtering Data
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-violet-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              WHERE & Conditions
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Filter your data to find exactly what you need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            <ConceptSection
              icon={<Target className="w-6 h-6" />}
              title="WHERE - Filter by Value"
              description={`Think: "Show only Bangladeshi students."`}
              code="SELECT * FROM students\nWHERE country = 'Bangladesh';"
              resultCols={["id", "name", "age", "country"]}
              resultData={[["1", "Hasnat", "22", "Bangladesh"]]}
              color="violet"
            />

            <ConceptSection
              icon={<Hash className="w-6 h-6" />}
              title="Number Comparison"
              description="Filter by numerical conditions"
              code={`SELECT * FROM students\nWHERE age > 22;`}
              resultCols={["id", "name", "age", "country"]}
              resultData={[["2", "John", "24", "USA"]]}
              color="cyan"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConceptSection
                icon={<Layers className="w-6 h-6" />}
                title="AND - Both Must Match"
                description="Student must be from Bangladesh AND have GPA above 3.5"
                code={`SELECT * FROM students\nWHERE country = 'Bangladesh'\nAND gpa > 3.5;`}
                color="emerald"
                compact
              />
              <ConceptSection
                icon={<Layers className="w-6 h-6" />}
                title="OR - Either Can Match"
                description="Show Bangladesh students OR USA students"
                code="SELECT * FROM students\nWHERE country = 'Bangladesh'\nOR country = 'USA';"
                color="violet"
                compact
              />
            </div>

            <ConceptSection
              icon={<Zap className="w-6 h-6" />}
              title="IN - Multiple Values"
              description={`Think: "Country can be any of these."`}
              code="SELECT * FROM students\nWHERE country IN (\n    'Bangladesh',\n    'USA',\n    'Canada'\n);"
              resultCols={["id", "name", "age", "country"]}
              resultData={[
                ["1", "Hasnat", "22", "Bangladesh"],
                ["2", "John", "24", "USA"],
              ]}
              color="cyan"
            />

            <ConceptSection
              icon={<ArrowUpDown className="w-6 h-6" />}
              title="BETWEEN - Range Filter"
              description={`Think: "Show students whose age is between 20 and 25."`}
              code="SELECT * FROM students\nWHERE age BETWEEN 20 AND 25;"
              resultCols={["id", "name", "age", "country"]}
              resultData={[
                ["1", "Hasnat", "22", "Bangladesh"],
                ["2", "John", "24", "USA"],
                ["3", "Emma", "21", "UK"],
              ]}
              color="emerald"
            />

            <ConceptSection
              icon={<Search className="w-6 h-6" />}
              title="LIKE - Pattern Matching"
              description="Used for searching text with wildcards"
              code="-- Starts with A\nSELECT * FROM students WHERE first_name LIKE 'A%';\n\n-- Ends with n\nSELECT * FROM students WHERE first_name LIKE '%n';\n\n-- Contains 'ha'\nSELECT * FROM students WHERE first_name LIKE '%ha%';"
              resultCols={["first_name"]}
              resultData={[["Ayesha"], ["Ali"], ["Hasnat"]]}
              color="violet"
            />
          </div>
        </div>
      </section>

      {/* Advanced Operations */}
      <section id="advanced" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <ArrowUpDown className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300 text-sm font-medium">
                Sorting & Limiting
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-orange-300 via-amber-200 to-yellow-200 bg-clip-text text-transparent">
              ORDER BY & LIMIT
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConceptSection
                icon={<ArrowUpDown className="w-6 h-6" />}
                title="ORDER BY ASC"
                description="Smallest age first"
                code="SELECT * FROM students\nORDER BY age;"
                color="orange"
                compact
              />
              <ConceptSection
                icon={<ArrowUpDown className="w-6 h-6" />}
                title="ORDER BY DESC"
                description="Largest age first"
                code="SELECT * FROM students\nORDER BY age DESC;"
                color="amber"
                compact
              />
            </div>

            <ConceptSection
              icon={<Hash className="w-6 h-6" />}
              title="LIMIT - Restrict Results"
              description={`Think: "Give me only the first 5 students."`}
              code="SELECT * FROM students\nLIMIT 5;"
              color="orange"
            />

            <ConceptSection
              icon={<Sparkles className="w-6 h-6" />}
              title="DISTINCT - Remove Duplicates"
              description="Get unique values only"
              code="SELECT DISTINCT country\nFROM students;"
              resultCols={["country"]}
              resultData={[["Bangladesh"], ["USA"], ["UK"]]}
              color="amber"
            />
          </div>
        </div>
      </section>

      {/* Aggregation Section */}
      <section
        id="aggregation"
        className="relative py-24 px-6 bg-linear-to-b from-transparent via-slate-900/50 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
              <Terminal className="w-4 h-4 text-pink-400" />
              <span className="text-pink-300 text-sm font-medium">
                Aggregation
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-pink-300 via-rose-200 to-orange-200 bg-clip-text text-transparent">
              Aggregate Functions
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Powerful functions to analyze your data
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "COUNT",
                desc: "Count rows",
                code: "SELECT COUNT(*)\nFROM students;",
                result: "30",
                color: "pink",
              },
              {
                title: "MAX",
                desc: "Highest value",
                code: "SELECT MAX(gpa)\nFROM students;",
                result: "4.0",
                color: "rose",
              },
              {
                title: "MIN",
                desc: "Lowest value",
                code: "SELECT MIN(gpa)\nFROM students;",
                result: "2.1",
                color: "orange",
              },
              {
                title: "AVG",
                desc: "Average value",
                code: "SELECT AVG(gpa)\nFROM students;",
                result: "3.45",
                color: "amber",
              },
              {
                title: "SUM",
                desc: "Add values",
                code: "SELECT SUM(marks)\nFROM students;",
                result: "2450",
                color: "yellow",
              },
              {
                title: "AS",
                desc: "Rename column",
                code: "SELECT first_name AS name\nFROM students;",
                result: "name",
                color: "lime",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl bg-linear-to-br from-${item.color}-500/10 to-transparent border border-${item.color}-500/20 backdrop-blur-sm`}
              >
                <h4 className={`text-xl font-bold text-${item.color}-300 mb-2`}>
                  {item.title}
                </h4>
                <p className="text-slate-400 text-sm mb-4">{item.desc}</p>
                <CodeBlock code={item.code} compact />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8">
            <ConceptSection
              icon={<Layers className="w-6 h-6" />}
              title="GROUP BY - Aggregate Groups"
              description="How many students are in each country?"
              code="SELECT country, COUNT(*)\nFROM students\nGROUP BY country;"
              resultCols={["country", "count"]}
              resultData={[
                ["Bangladesh", "10"],
                ["USA", "5"],
                ["Canada", "3"],
              ]}
              color="pink"
            />

            <ConceptSection
              icon={<Target className="w-6 h-6" />}
              title="HAVING - Filter Groups"
              description="Show countries having more than 5 students"
              code={`SELECT country, COUNT(*)\nFROM students\nGROUP BY country\nHAVING COUNT(*) > 5;`}
              resultCols={["country", "count"]}
              resultData={[
                ["Bangladesh", "10"],
                ["USA", "5"],
              ]}
              color="rose"
            />
          </div>
        </div>
      </section>

      {/* Execution Order */}
      <section id="execution" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">
                Very Important
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-cyan-300 via-emerald-200 to-violet-200 bg-clip-text text-transparent">
              SQL Execution Order
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              How SQL actually processes your query
            </p>
          </motion.div>

          <ExecutionFlow />

          {/* Professional Query Example */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="p-8 rounded-3xl bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-cyan-400" />
                Professional Query Example
              </h3>
              <CodeBlock
                code={`SELECT first_name, age, gpa
FROM students
WHERE age > 20
  AND country = 'Bangladesh'
  AND gpa > 3.5
ORDER BY gpa DESC
LIMIT 5;`}
              />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "Get name, age, GPA",
                  "Age > 20, Country = Bangladesh, GPA > 3.5",
                  "Sort by GPA high → low, Show top 5",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Practice Challenges */}
      <PracticeChallenges />

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <Database className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold bg-linear-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                SQL Master
              </span>
            </div>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Master SQL SELECT statements with interactive examples and
              beautiful visualizations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["SELECT", "WHERE", "JOIN", "GROUP BY"].map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1 rounded-full bg-slate-800/50 text-slate-400 text-sm border border-slate-700/50"
                >
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        {/* develope by Hasnat Fahmid Khan + animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute bottom-4 right-6 text-[14px] text-slate-600"
        >
          Developed by{" "}
          <a
            href="https://github.com/hasnatfahmidkhan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Hasnat Fahmid Khan
          </a>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;
