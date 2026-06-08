import { motion } from "framer-motion";
import { useState } from "react";
import {
  Layers,
  Box,
  FileText,
  BarChart3,
  Code2,
  Eye,
  Zap,
  Gauge,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Star,
} from "lucide-react";
import { CodeBlock } from "./CodeBlock";

interface AdvancedTopic {
  id: string;
  title: string;
  icon: React.ReactNode;
  difficulty: number;
  description: string;
  concept: string;
  examples: {
    title: string;
    code: string;
    explanation: string;
  }[];
  tips?: string[];
}

const advancedTopics: AdvancedTopic[] = [
  {
    id: "subqueries",
    title: "Subqueries",
    icon: <Box className="w-6 h-6" />,
    difficulty: 4,
    description: "A query inside another query - like Russian nesting dolls",
    concept:
      "Use subqueries when you need data from one query to use in another. SQL runs the inner query first, then uses its result.",
    examples: [
      {
        title: "Find students above average GPA",
        code: `SELECT *
FROM students
WHERE gpa > (
    SELECT AVG(gpa)
    FROM students
);`,
        explanation:
          "First, SQL calculates the average GPA. Then it finds all students above that average.",
      },
      {
        title: "Scalar Subquery (returns one value)",
        code: `SELECT 
    first_name,
    (SELECT MAX(gpa) FROM students) AS highest_gpa
FROM students;`,
        explanation:
          "Returns a single value that can be used in SELECT clause.",
      },
      {
        title: "IN with Subquery",
        code: `SELECT *
FROM students
WHERE country IN (
    SELECT country
    FROM students
    WHERE gpa > 3.5
);`,
        explanation: "Returns multiple values for the IN clause.",
      },
    ],
    tips: [
      "Subqueries can be used in SELECT, FROM, WHERE, and HAVING clauses",
      "Correlated subqueries run once per row (slower)",
      "Use CTEs for better readability with complex subqueries",
    ],
  },
  {
    id: "cte",
    title: "CTE (Common Table Expression)",
    icon: <FileText className="w-6 h-6" />,
    difficulty: 4,
    description: "Create temporary named result sets for cleaner queries",
    concept:
      "Think of CTEs as temporary tables that exist only for your query. They make complex queries readable and maintainable.",
    examples: [
      {
        title: "Basic CTE",
        code: `WITH student_data AS (
    SELECT 
        first_name,
        gpa
    FROM students
    WHERE gpa > 3.0
)
SELECT *
FROM student_data
ORDER BY gpa DESC;`,
        explanation:
          'The CTE creates a temporary "student_data" table that you can query from.',
      },
      {
        title: "Multiple CTEs",
        code: `WITH 
    high_gpa AS (
        SELECT * FROM students WHERE gpa > 3.5
    ),
    by_country AS (
        SELECT country, COUNT(*) as count
        FROM students
        GROUP BY country
    )
SELECT h.first_name, b.country, b.count
FROM high_gpa h
JOIN by_country b ON h.country = b.country;`,
        explanation: "You can chain multiple CTEs with commas.",
      },
    ],
    tips: [
      "CTEs are evaluated once, not per row (faster than correlated subqueries)",
      "Use meaningful names for your CTEs",
      "Great for breaking down complex logic",
    ],
  },
  {
    id: "window",
    title: "Window Functions",
    icon: <BarChart3 className="w-6 h-6" />,
    difficulty: 5,
    description:
      "Perform calculations across rows without grouping - interview favorite!",
    concept:
      "Window functions let you keep all rows while still doing calculations like ranking, running totals, and moving averages.",
    examples: [
      {
        title: "RANK() - Rank students by GPA",
        code: `SELECT
    first_name,
    gpa,
    RANK() OVER(
        ORDER BY gpa DESC
    ) AS rank
FROM students;`,
        explanation:
          "RANK() assigns a rank to each row. Ties get the same rank, next rank is skipped.",
      },
      {
        title: "ROW_NUMBER() - Add sequential numbers",
        code: `SELECT
    first_name,
    gpa,
    ROW_NUMBER() OVER(
        ORDER BY gpa DESC
    ) AS row_num
FROM students;`,
        explanation: "ROW_NUMBER() always gives unique numbers, even for ties.",
      },
      {
        title: "DENSE_RANK() - No skipped ranks",
        code: `SELECT
    first_name,
    gpa,
    DENSE_RANK() OVER(
        ORDER BY gpa DESC
    ) AS dense_rank
FROM students;`,
        explanation:
          "Like RANK() but no gaps in ranking. If two students tie for 1st, next is 2nd.",
      },
      {
        title: "PARTITION BY - Reset per group",
        code: `SELECT
    first_name,
    country,
    gpa,
    RANK() OVER(
        PARTITION BY country
        ORDER BY gpa DESC
    ) AS country_rank
FROM students;`,
        explanation:
          "Ranks reset for each country. Top student per country gets rank 1.",
      },
    ],
    tips: [
      "RANK() skips numbers after ties (1,1,3)",
      "DENSE_RANK() never skips (1,1,2)",
      "ROW_NUMBER() is always unique (1,2,3)",
      "PARTITION BY is like GROUP BY but keeps all rows",
    ],
  },
  {
    id: "case",
    title: "CASE Expression",
    icon: <Code2 className="w-6 h-6" />,
    difficulty: 3,
    description: "SQL's if-else statement for conditional logic",
    concept:
      "CASE lets you create conditional columns based on values. Think of it as IF-THEN-ELSE for SQL.",
    examples: [
      {
        title: "Grade Performance Labels",
        code: `SELECT
    first_name,
    gpa,
    CASE
        WHEN gpa >= 3.7 THEN 'Excellent'
        WHEN gpa >= 3.0 THEN 'Good'
        WHEN gpa >= 2.0 THEN 'Average'
        ELSE 'Needs Improvement'
    END AS performance
FROM students;`,
        explanation: "Creates a new column with labels based on GPA ranges.",
      },
      {
        title: "CASE in ORDER BY",
        code: `SELECT *
FROM students
ORDER BY
    CASE
        WHEN country = 'Bangladesh' THEN 1
        WHEN country = 'USA' THEN 2
        ELSE 3
    END;`,
        explanation:
          "Custom sort order - Bangladesh first, USA second, others last.",
      },
    ],
    tips: [
      "CASE evaluates conditions in order - first match wins",
      "Always include ELSE for unexpected values",
      "Can be used in SELECT, WHERE, ORDER BY, GROUP BY",
    ],
  },
  {
    id: "views",
    title: "Views",
    icon: <Eye className="w-6 h-6" />,
    difficulty: 3,
    description: "Save queries as virtual tables for reuse",
    concept:
      "Views are saved queries that act like tables. They simplify complex queries and provide a layer of abstraction.",
    examples: [
      {
        title: "Create a View",
        code: `CREATE VIEW top_students AS
SELECT 
    first_name,
    gpa,
    country
FROM students
WHERE gpa > 3.5;`,
        explanation: 'Creates a virtual table called "top_students".',
      },
      {
        title: "Use the View",
        code: `SELECT *
FROM top_students
WHERE country = 'Bangladesh';`,
        explanation: "Query the view like a regular table.",
      },
      {
        title: "Drop a View",
        code: `DROP VIEW top_students;`,
        explanation: "Remove the view when no longer needed.",
      },
    ],
    tips: [
      "Views don't store data - they run the underlying query",
      "Great for hiding complex joins",
      "Can restrict data access (security)",
      "Materialized views DO store data (PostgreSQL)",
    ],
  },
  {
    id: "indexes",
    title: "Indexes",
    icon: <Zap className="w-6 h-6" />,
    difficulty: 5,
    description: "Create shortcuts for faster queries",
    concept:
      "Indexes are like a book's index - they help SQL find data without scanning the entire table. Essential for large datasets.",
    examples: [
      {
        title: "Create an Index",
        code: `CREATE INDEX idx_email
ON students(email);`,
        explanation:
          "Creates an index on the email column for faster searches.",
      },
      {
        title: "Query Benefits from Index",
        code: `-- Without index: scans ALL rows
-- With index: goes directly to matching rows
SELECT *
FROM students
WHERE email = 'hasnat@example.com';`,
        explanation: "The query becomes much faster with the email index.",
      },
      {
        title: "Composite Index",
        code: `CREATE INDEX idx_country_gpa
ON students(country, gpa);`,
        explanation:
          "Index on multiple columns. Useful for queries filtering by both.",
      },
      {
        title: "View Indexes",
        code: `-- PostgreSQL
\\di

-- MySQL
SHOW INDEX FROM students;`,
        explanation: "See all indexes on a table.",
      },
    ],
    tips: [
      "Indexes speed up SELECT but slow down INSERT/UPDATE",
      "Primary keys automatically have indexes",
      "Use indexes on columns used in WHERE, JOIN, ORDER BY",
      "Too many indexes hurt performance",
    ],
  },
  {
    id: "optimization",
    title: "Query Optimization",
    icon: <Gauge className="w-6 h-6" />,
    difficulty: 5,
    description: "Understand and improve query performance",
    concept:
      "Learn why queries are slow and how to fix them. Essential for production applications.",
    examples: [
      {
        title: "EXPLAIN - See the Plan",
        code: `EXPLAIN
SELECT *
FROM students
WHERE gpa > 3.5;`,
        explanation: "Shows how PostgreSQL will execute the query.",
      },
      {
        title: "EXPLAIN ANALYZE - Actually Run It",
        code: `EXPLAIN ANALYZE
SELECT *
FROM students
WHERE gpa > 3.5;`,
        explanation:
          "Runs the query and shows actual timing. Use for optimization.",
      },
      {
        title: "Common Optimizations",
        code: `-- Bad: SELECT *
SELECT * FROM students;

-- Good: Select only needed columns
SELECT first_name, gpa FROM students;

-- Bad: Functions on indexed column
WHERE LOWER(email) = 'test@email.com'

-- Good: No function
WHERE email = 'test@email.com'`,
        explanation: "Small changes can have huge performance impacts.",
      },
    ],
    tips: [
      "Avoid SELECT * in production",
      "Use LIMIT for large result sets",
      "Index columns used in WHERE/JOIN",
      "Avoid functions on indexed columns",
      "Use EXPLAIN ANALYZE to find bottlenecks",
    ],
  },
];

function TopicCard({
  topic,
  isExpanded,
  onToggle,
}: {
  topic: AdvancedTopic;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const colors: Record<string, string> = {
    subqueries: "violet",
    cte: "cyan",
    window: "pink",
    case: "orange",
    views: "emerald",
    indexes: "amber",
    optimization: "rose",
  };

  const color = colors[topic.id] || "cyan";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl bg-linear-to-br from-${color}-500/10 to-transparent border border-${color}-500/20 backdrop-blur-sm overflow-hidden`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-start gap-4 hover:bg-slate-800/20 transition-colors"
      >
        <div className={`p-3 rounded-xl bg-${color}-500/20 text-${color}-400`}>
          {topic.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`text-xl font-bold text-${color}-300`}>
              {topic.title}
            </h3>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < topic.difficulty ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-slate-400 text-sm">{topic.description}</p>
        </div>
        <div className={`text-${color}-400 mt-2`}>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-6 pb-6"
        >
          {/* Concept */}
          <div className="mb-6 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className={`w-4 h-4 text-${color}-400`} />
              <span className="text-sm text-slate-500 uppercase tracking-wider">
                Concept
              </span>
            </div>
            <p className="text-slate-300">{topic.concept}</p>
          </div>

          {/* Examples */}
          <div className="space-y-4 mb-6">
            <h4 className="text-sm text-slate-500 uppercase tracking-wider">
              Examples
            </h4>
            {topic.examples.map((example, i) => (
              <div key={i} className="space-y-2">
                <h5 className="text-slate-300 font-medium">{example.title}</h5>
                <CodeBlock code={example.code} />
                <p className="text-sm text-slate-400">{example.explanation}</p>
              </div>
            ))}
          </div>

          {/* Tips */}
          {topic.tips && (
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <h4 className="text-cyan-300 font-semibold text-sm mb-2">
                💡 Pro Tips
              </h4>
              <ul className="space-y-1">
                {topic.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="text-sm text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-cyan-400 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export function AdvancedConcepts() {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(
    "subqueries",
  );

  return (
    <section
      id="advanced-topics"
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
            <Layers className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">
              Level Up Your SQL
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-pink-300 via-violet-200 to-cyan-200 bg-clip-text text-transparent">
            Advanced SQL Concepts
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Master these topics to become a SQL expert. Click to expand each
            topic.
          </p>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 gap-4">
          {advancedTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              isExpanded={expandedTopic === topic.id}
              onToggle={() =>
                setExpandedTopic(expandedTopic === topic.id ? null : topic.id)
              }
            />
          ))}
        </div>

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-linear-to-r from-cyan-500/10 via-violet-500/10 to-pink-500/10 border border-slate-700/50"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            📅 Recommended Learning Path
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                week: "Week 1",
                topics: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
              },
              { week: "Week 2", topics: ["Subqueries", "CTEs"] },
              { week: "Week 3", topics: ["CASE", "Window Functions"] },
              {
                week: "Week 4",
                topics: ["Views", "Indexes", "Query Optimization"],
              },
            ].map((item) => (
              <div
                key={item.week}
                className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30"
              >
                <h4 className="text-cyan-300 font-semibold mb-2">
                  {item.week}
                </h4>
                <ul className="space-y-1">
                  {item.topics.map((t) => (
                    <li
                      key={t}
                      className="text-sm text-slate-400 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
