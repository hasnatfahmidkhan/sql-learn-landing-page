# SQL Master - Interactive SQL Learning Platform

A stunning, modern animated landing page for learning SQL from basics to advanced. Built with React, TypeScript, and Tailwind CSS with beautiful visualizations and interactive examples.

[![🌐 Live Demo](https://img.shields.io/badge/🌐_Live-Demo-success?style=for-the-badge)](https://learn-sql-query.netlify.app/)
[![📖 Documentation](https://img.shields.io/badge/📖-Documentation-blue?style=for-the-badge)](#-sql-topics-covered)
[![🚀 Getting Started](https://img.shields.io/badge/🚀-Getting_Started-orange?style=for-the-badge)](#-getting-started)
[![🤝 Contributing](https://img.shields.io/badge/🤝-Contributing-purple?style=for-the-badge)](#-contributing)

## 📸 Preview

![SQL Master Preview](https://res.cloudinary.com/dye6u4hpt/image/upload/q_auto/f_auto/v1780937829/learnsql_ifov31.png)

## ✨ Features

### 🎨 Beautiful Design

- **Neon Glass Aesthetic** - Dark slate background with animated cyan, emerald, and violet gradient glows
- **Glassmorphism Cards** - Frosted glass effect with backdrop blur
- **Animated Background** - Pulsing gradient orbs and subtle grid pattern
- **Professional Typography** - Inter font for body, JetBrains Mono for code

### 🚀 Interactive Learning

- **Live Table Demo** - Click buttons to see SELECT queries filter data in real-time
- **Custom WHERE Input** - Type your own WHERE clauses and see instant results
- **Live Query Display** - See the actual SQL query being executed
- **Result Statistics** - Shows "X rows returned" after filtering
- **Copy Code Blocks** - One-click copy for all SQL examples with visual feedback
- **Syntax Highlighting** - Color-coded SQL keywords, strings, and numbers

### 📚 Comprehensive Content

#### Beginner Topics

- Basic SELECT operations (`SELECT *`, specific columns)
- WHERE clause filtering
- AND, OR, NOT operators
- IN, BETWEEN, LIKE operators
- ORDER BY (ASC/DESC)
- LIMIT and DISTINCT
- Aggregate functions (COUNT, MAX, MIN, AVG, SUM)
- GROUP BY and HAVING
- SQL Execution Order visualization

#### Intermediate Topics ⭐

- **JOINS** (Most Important!)
  - INNER JOIN - Only matching rows
  - LEFT JOIN - All from left table
  - RIGHT JOIN - All from right table
  - FULL JOIN - Everything from both
  - SELF JOIN - Join table with itself
  - Interactive join visualizer with sample data

#### Advanced Topics ⭐⭐

- **Subqueries** - Query inside another query
- **CTEs** - Common Table Expressions for readable code
- **Window Functions** - RANK(), ROW_NUMBER(), DENSE_RANK(), PARTITION BY
- **CASE Expression** - SQL's if-else statement
- **Views** - Saved queries as virtual tables
- **Indexes** - Performance optimization
- **Query Optimization** - EXPLAIN, ANALYZE, best practices

### 🎯 Practice Challenges

**32 challenges across 5 difficulty levels:**

| Level             | Challenges | Topics                                   |
| ----------------- | ---------- | ---------------------------------------- |
| Easy              | 6          | SELECT, WHERE, ORDER BY, LIMIT           |
| Medium            | 7          | Filtering, GROUP BY, Aggregate functions |
| Advanced Beginner | 5          | Subqueries, CASE, HAVING                 |
| Joins             | 5          | All JOIN types, Self join                |
| Advanced          | 7          | Window functions, CTEs, Views            |

**Features:**

- Mark challenges as completed
- Hint button for each challenge
- Copy hints with one click
- Progress tracking
- Visual learning path guide

### 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts (1 → 2 → 3 columns)
- Mobile hamburger menu navigation
- Tablet-optimized navigation
- Touch-friendly interactions

## 🛠️ Tech Stack

| Technology          | Purpose      |
| ------------------- | ------------ |
| **React 19**        | UI framework |
| **TypeScript**      | Type safety  |
| **Vite**            | Build tool   |
| **Tailwind CSS v4** | Styling      |
| **Framer Motion**   | Animations   |
| **Lucide React**    | Icons        |

## 📁 Project Structure

```
src/
├── App.tsx                    # Main application component
├── main.tsx                   # Entry point
├── index.css                  # Global styles
├── components/
│   ├── SqlHero.tsx            # Hero section with animated code
│   ├── ConceptSection.tsx     # Reusable concept card component
│   ├── InteractiveTable.tsx   # Live filtering demo table
│   ├── CodeBlock.tsx          # Copyable code with syntax highlighting
│   ├── ExecutionFlow.tsx      # SQL execution order visualization
│   ├── FloatingNav.tsx        # Sticky navigation bar
│   ├── JoinsSection.tsx       # Interactive JOIN tutorial
│   ├── AdvancedConcepts.tsx   # Advanced topics accordion
│   └── PracticeChallenges.tsx # Practice section with 32 challenges
└── public/
    └── favicon.svg            # Custom SQL favicon
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sql-master
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

## 🎨 Design System

### Color Palette

| Color             | Usage                          |
| ----------------- | ------------------------------ |
| `cyan-400/500`    | Primary accent, SELECT keyword |
| `emerald-400/500` | Success states, strings        |
| `violet-400/500`  | WHERE clause, filters, Joins   |
| `amber-400`       | Numbers, sorting               |
| `pink-400/500`    | Aggregation, advanced topics   |
| `slate-900/950`   | Background                     |

### Component Variants

Each concept card supports multiple color themes:

- `cyan` - Primary concepts
- `emerald` - Success/positive examples
- `violet` - Filtering operations
- `orange` - Sorting operations
- `pink` - Aggregation functions
- `amber` - Limiting results

## 📖 SQL Topics Covered

### Basics

- `SELECT *` - Select all columns
- `SELECT column` - Select specific columns

### Filtering

- `WHERE` - Filter rows
- `AND` / `OR` / `NOT` - Logical operators
- `IN` - Multiple values
- `BETWEEN` - Range filter
- `LIKE` - Pattern matching with wildcards

### Sorting & Limiting

- `ORDER BY` - Sort results (ASC/DESC)
- `LIMIT` - Restrict row count
- `DISTINCT` - Remove duplicates

### Aggregation

- `COUNT()` - Count rows
- `MAX()` / `MIN()` - Find extremes
- `AVG()` - Calculate average
- `SUM()` - Add values
- `GROUP BY` - Group data
- `HAVING` - Filter groups

### Joins ⭐⭐⭐⭐⭐

- `INNER JOIN` - Matching rows only
- `LEFT JOIN` - All from left + matches
- `RIGHT JOIN` - All from right + matches
- `FULL JOIN` - Everything from both
- `SELF JOIN` - Join table with itself

### Advanced

- **Subqueries** - Nested queries
- **CTEs** - `WITH` clause for readability
- **Window Functions** - `RANK()`, `ROW_NUMBER()`, `DENSE_RANK()`, `PARTITION BY`
- **CASE** - Conditional logic
- **Views** - Saved queries
- **Indexes** - Performance optimization
- **Query Optimization** - `EXPLAIN`, `ANALYZE`

### Execution Order

Visual comparison of:

1. How you write it: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT
2. How SQL executes it: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT

## 📅 Recommended Learning Path

| Week   | Topics                                       |
| ------ | -------------------------------------------- |
| Week 1 | SELECT, WHERE, ORDER BY, LIMIT               |
| Week 2 | GROUP BY, HAVING, Aggregate functions        |
| Week 3 | INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN |
| Week 4 | Subqueries, CTEs                             |
| Week 5 | CASE, Window Functions                       |
| Week 6 | Views, Indexes, Query Optimization           |

## 🎯 Interactive Features

### Live Table Filtering

- 8 preset query buttons
- Custom WHERE clause input
- Real-time row highlighting
- Result count display
- Query suggestions dropdown

### Join Visualizer

- Visual representation of tables
- Animated connection indicators
- Result tables for each join type
- Explanatory notes

### Practice Challenges

- Click checkmark to mark completed
- Hint button reveals solution
- Copy hints to clipboard
- Visual progress tracking

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Add more SQL topics
- Improve documentation
- Add more practice challenges

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- SQL concepts inspired by practical database learning needs
- Design inspired by modern SaaS landing pages
- Built with love for the developer community

---

**Happy Learning!** 🎉

Master SQL from basics to advanced with interactive examples and beautiful visualizations.
