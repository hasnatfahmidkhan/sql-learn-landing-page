import { motion } from "framer-motion";
import {
  Dumbbell,
  Star,
  CheckCircle2,
  Lightbulb,
  Copy,
  Check,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Challenge {
  id: number;
  task: string;
  hint?: string;
}

interface ChallengeCategory {
  level: string;
  icon: React.ReactNode;
  color: string;
  bglinear: string;
  borderColor: string;
  challenges: Challenge[];
}

const challengeData: ChallengeCategory[] = [
  {
    level: "Easy",
    icon: <Star className="w-5 h-5" />,
    color: "text-emerald-400",
    bglinear: "from-emerald-500/10 to-transparent",
    borderColor: "border-emerald-500/20",
    challenges: [
      { id: 1, task: "Show all students.", hint: "SELECT * FROM students;" },
      { id: 2, task: "Show only names.", hint: "SELECT name FROM students;" },
      {
        id: 3,
        task: "Show students from Bangladesh.",
        hint: "SELECT * FROM students WHERE country = 'Bangladesh';",
      },
      {
        id: 4,
        task: "Show students older than 22.",
        hint: "SELECT * FROM students WHERE age > 22;",
      },
      {
        id: 5,
        task: "Sort students by age ascending.",
        hint: "SELECT * FROM students ORDER BY age ASC;",
      },
      {
        id: 6,
        task: "Show first 3 students.",
        hint: "SELECT * FROM students LIMIT 3;",
      },
    ],
  },
  {
    level: "Medium",
    icon: <Dumbbell className="w-5 h-5" />,
    color: "text-amber-400",
    bglinear: "from-amber-500/10 to-transparent",
    borderColor: "border-amber-500/20",
    challenges: [
      {
        id: 1,
        task: "Show students with GPA > 3.5.",
        hint: "SELECT * FROM students WHERE gpa > 3.5;",
      },
      {
        id: 2,
        task: "Sort by GPA descending.",
        hint: "SELECT * FROM students ORDER BY gpa DESC;",
      },
      {
        id: 3,
        task: "Show students aged between 20 and 25.",
        hint: "SELECT * FROM students WHERE age BETWEEN 20 AND 25;",
      },
      {
        id: 4,
        task: "Show students from Bangladesh OR USA.",
        hint: "SELECT * FROM students WHERE country IN ('Bangladesh', 'USA');",
      },
      {
        id: 5,
        task: "Count students by country.",
        hint: "SELECT country, COUNT(*) FROM students GROUP BY country;",
      },
      {
        id: 6,
        task: "Find the highest GPA.",
        hint: "SELECT MAX(gpa) FROM students;",
      },
      {
        id: 7,
        task: "Show unique countries.",
        hint: "SELECT DISTINCT country FROM students;",
      },
    ],
  },
  {
    level: "Advanced Beginner",
    icon: <Lightbulb className="w-5 h-5" />,
    color: "text-violet-400",
    bglinear: "from-violet-500/10 to-transparent",
    borderColor: "border-violet-500/20",
    challenges: [
      {
        id: 1,
        task: "Count total students.",
        hint: "SELECT COUNT(*) FROM students;",
      },
      {
        id: 2,
        task: "Find average GPA.",
        hint: "SELECT AVG(gpa) FROM students;",
      },
      {
        id: 3,
        task: "Show countries having more than 2 students.",
        hint: "SELECT country FROM students GROUP BY country HAVING COUNT(*) > 2;",
      },
      {
        id: 4,
        task: "Show students with GPA above average.",
        hint: "SELECT * FROM students WHERE gpa > (SELECT AVG(gpa) FROM students);",
      },
      {
        id: 5,
        task: 'Label students as "Excellent" if GPA >= 3.7, else "Good".',
        hint: "SELECT name, CASE WHEN gpa >= 3.7 THEN 'Excellent' ELSE 'Good' END AS label FROM students;",
      },
    ],
  },
  {
    level: "Joins",
    icon: <Trophy className="w-5 h-5" />,
    color: "text-pink-400",
    bglinear: "from-pink-500/10 to-transparent",
    borderColor: "border-pink-500/20",
    challenges: [
      {
        id: 1,
        task: "Join students with their enrollments.",
        hint: "SELECT * FROM students s INNER JOIN enrollments e ON s.id = e.student_id;",
      },
      {
        id: 2,
        task: "Show all students and their courses (even if no enrollment).",
        hint: "SELECT s.name, c.course_name FROM students s LEFT JOIN enrollments e ON s.id = e.student_id LEFT JOIN courses c ON e.course_id = c.id;",
      },
      {
        id: 3,
        task: "Find students who are NOT enrolled in any course.",
        hint: "SELECT s.name FROM students s LEFT JOIN enrollments e ON s.id = e.student_id WHERE e.student_id IS NULL;",
      },
      {
        id: 4,
        task: "Count courses per student.",
        hint: "SELECT s.name, COUNT(e.course_id) as course_count FROM students s LEFT JOIN enrollments e ON s.id = e.student_id GROUP BY s.id, s.name;",
      },
      {
        id: 5,
        task: "Show employees and their managers (self join).",
        hint: "SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;",
      },
    ],
  },
  {
    level: "Advanced",
    icon: <Zap className="w-5 h-5" />,
    color: "text-cyan-400",
    bglinear: "from-cyan-500/10 to-transparent",
    borderColor: "border-cyan-500/20",
    challenges: [
      {
        id: 1,
        task: "Rank students by GPA using RANK().",
        hint: "SELECT name, gpa, RANK() OVER (ORDER BY gpa DESC) as rank FROM students;",
      },
      {
        id: 2,
        task: "Add row numbers to students ordered by name.",
        hint: "SELECT name, ROW_NUMBER() OVER (ORDER BY name) as row_num FROM students;",
      },
      {
        id: 3,
        task: "Rank students by GPA within each country.",
        hint: "SELECT name, country, gpa, RANK() OVER (PARTITION BY country ORDER BY gpa DESC) as rank FROM students;",
      },
      {
        id: 4,
        task: "Create a CTE for high GPA students, then select from it.",
        hint: "WITH high_gpa AS (SELECT * FROM students WHERE gpa > 3.5) SELECT * FROM high_gpa;",
      },
      {
        id: 5,
        task: "Find the student with the highest GPA per country.",
        hint: "WITH ranked AS (SELECT name, country, gpa, RANK() OVER (PARTITION BY country ORDER BY gpa DESC) as rnk FROM students) SELECT * FROM ranked WHERE rnk = 1;",
      },
      {
        id: 6,
        task: "Create a view for top students (GPA > 3.5).",
        hint: "CREATE VIEW top_students AS SELECT * FROM students WHERE gpa > 3.5;",
      },
      {
        id: 7,
        task: "Use DENSE_RANK() to rank without gaps.",
        hint: "SELECT name, gpa, DENSE_RANK() OVER (ORDER BY gpa DESC) as dense_rank FROM students;",
      },
    ],
  },
];

function ChallengeCard({
  challenge,
  color,
}: {
  challenge: Challenge;
  color: string;
}) {
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);
  const [completed, setCompleted] = useState(false);

  const copyHint = async () => {
    if (challenge.hint) {
      await navigator.clipboard.writeText(challenge.hint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleComplete = () => {
    setCompleted(!completed);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${
          completed
            ? "bg-emerald-500/10 border-emerald-500/30"
            : "bg-slate-800/30 border-slate-700/30 hover:border-slate-600/50"
        }`}
      >
        <button
          onClick={toggleComplete}
          className={`mt-0.5 transition-colors ${completed ? "text-emerald-400" : "text-slate-600 hover:text-slate-400"}`}
        >
          <CheckCircle2 className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <p
            className={`font-medium ${completed ? "text-emerald-300 line-through" : "text-slate-200"}`}
          >
            {challenge.id}. {challenge.task}
          </p>

          {showHint && challenge.hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 relative"
            >
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/30 font-mono text-sm text-slate-300 flex items-center justify-between gap-3">
                <code>{challenge.hint}</code>
                <button
                  onClick={copyHint}
                  className="p-1.5 rounded-md bg-slate-800/50 text-slate-400 hover:text-white transition-colors shrink-0"
                  title="Copy"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {challenge.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
              showHint
                ? "bg-slate-700/50 text-slate-300"
                : "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20"
            }`}
          >
            {showHint ? "Hide" : "Hint"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function PracticeChallenges() {
  const totalChallenges = challengeData.reduce(
    (sum, cat) => sum + cat.challenges.length,
    0,
  );

  return (
    <section
      id="practice"
      className="relative py-24 px-6 bg-linear-to-b from-transparent via-slate-900/50 to-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-500/10 via-amber-500/10 to-cyan-500/10 border border-slate-700/50 mb-6">
            <Dumbbell className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 text-sm font-medium">
              Practice Makes Perfect
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-emerald-300 via-amber-200 to-cyan-200 bg-clip-text text-transparent">
            Practice Challenges
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-4">
            Try these yourself! Click the hint button if you need help.
          </p>
          <p className="text-sm text-slate-500">
            {totalChallenges} challenges across 5 difficulty levels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {challengeData.map((category, categoryIndex) => (
            <motion.div
              key={category.level}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className={`p-6 rounded-2xl bg-linear-to-br ${category.bglinear} border ${category.borderColor} backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl bg-slate-800/50 ${category.color}`}
                  >
                    {category.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${category.color}`}>
                    {category.level}
                  </h3>
                </div>
                <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full">
                  {category.challenges.length} tasks
                </span>
              </div>

              <div className="space-y-3">
                {category.challenges.map((challenge) => (
                  <ChallengeCard
                    key={`${category.level}-${challenge.id}`}
                    challenge={challenge}
                    color={category.color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="p-6 rounded-2xl bg-linear-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Lightbulb className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Pro Tips
                </h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Start with Easy and work your way up</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Try to solve without hints first</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Copy hints and practice in a SQL editor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Click the checkmark to mark completed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-linear-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-violet-500/20">
                <Trophy className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Learning Path
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    Easy
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    Medium
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    Adv. Beginner
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    Joins
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 col-span-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
                      5
                    </span>
                    Advanced (Window Functions, CTEs)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
