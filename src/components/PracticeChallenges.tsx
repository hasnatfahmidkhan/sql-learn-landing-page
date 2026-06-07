import { AnimatePresence, motion } from "framer-motion";
import {
  Dumbbell,
  Star,
  CheckCircle2,
  Lightbulb,
  Copy,
  Check,
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
  bgGradient: string;
  borderColor: string;
  challenges: Challenge[];
}

const challengeData: ChallengeCategory[] = [
  {
    level: "Easy",
    icon: <Star className="w-5 h-5" />,
    color: "text-emerald-400",
    bgGradient: "from-emerald-500/10 to-transparent",
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
    ],
  },
  {
    level: "Medium",
    icon: <Dumbbell className="w-5 h-5" />,
    color: "text-amber-400",
    bgGradient: "from-amber-500/10 to-transparent",
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
        task: "Show first 5 students.",
        hint: "SELECT * FROM students LIMIT 5;",
      },
      {
        id: 4,
        task: "Show students aged between 20 and 25.",
        hint: "SELECT * FROM students WHERE age BETWEEN 20 AND 25;",
      },
    ],
  },
  {
    level: "Advanced Beginner",
    icon: <Lightbulb className="w-5 h-5" />,
    color: "text-violet-400",
    bgGradient: "from-violet-500/10 to-transparent",
    borderColor: "border-violet-500/20",
    challenges: [
      {
        id: 1,
        task: "Count total students.",
        hint: "SELECT COUNT(*) FROM students;",
      },
      {
        id: 2,
        task: "Find highest GPA.",
        hint: "SELECT MAX(gpa) FROM students;",
      },
      {
        id: 3,
        task: "Find average GPA.",
        hint: "SELECT AVG(gpa) FROM students;",
      },
      {
        id: 4,
        task: "Count students by country.",
        hint: "SELECT country, COUNT(*) FROM students GROUP BY country;",
      },
      {
        id: 5,
        task: "Show countries having more than 2 students.",
        hint: "SELECT country, COUNT(*) FROM students GROUP BY country HAVING COUNT(*) > 2;",
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

  const copyHint = async () => {
    if (challenge.hint) {
      await navigator.clipboard.writeText(challenge.hint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-colors">
        <div className={`mt-1 ${color}`}>
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-slate-200 font-medium">
            {challenge.id}. {challenge.task}
          </p>

          <AnimatePresence>
            {showHint && challenge.hint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
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
          </AnimatePresence>
        </div>

        {challenge.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-500/10 via-amber-500/10 to-violet-500/10 border border-slate-700/50 mb-6">
            <Dumbbell className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 text-sm font-medium">
              Practice Makes Perfect
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-emerald-300 via-amber-200 to-violet-200 bg-clip-text text-transparent">
            Practice Challenges
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Try these yourself! Click the hint button if you need help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challengeData.map((category, categoryIndex) => (
            <motion.div
              key={category.level}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className={`p-6 rounded-2xl bg-linear-to-br ${category.bgGradient} border ${category.borderColor} backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-xl bg-slate-800/50 ${category.color}`}
                >
                  {category.icon}
                </div>
                <h3 className={`text-xl font-bold ${category.color}`}>
                  {category.level}
                </h3>
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

        {/* Tips section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-linear-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/20">
              <Lightbulb className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Pro Tips
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Start with Easy challenges and work your way up</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Try to solve without hints first - it helps you learn!
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Copy the hints and practice running them in a SQL editor
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
