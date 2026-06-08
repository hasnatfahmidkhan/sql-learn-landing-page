# SQL Master - Interactive SQL SELECT Learning Platform

[![🌐 Live Demo](https://img.shields.io/badge/🌐_Live-Demo-success?style=for-the-badge)](https://learn-sql-query.netlify.app/)
[![📖 Documentation](https://img.shields.io/badge/📖-Documentation-blue?style=for-the-badge)](#-sql-topics-covered)
[![🚀 Getting Started](https://img.shields.io/badge/🚀-Getting_Started-orange?style=for-the-badge)](#-getting-started)
[![🤝 Contributing](https://img.shields.io/badge/🤝-Contributing-purple?style=for-the-badge)](#-contributing)

A stunning, modern animated landing page for learning SQL SELECT statements. Built with React, TypeScript, and Tailwind CSS with beautiful visualizations and interactive examples.

## 📸 Preview

![SQL Master Preview](https://res.cloudinary.com/dye6u4hpt/image/upload/q_auto/f_auto/v1780891100/Screenshot_2026-06-08_095449_k80si3.png)

## ✨ Features

### 🎨 Beautiful Design

- **Neon Glass Aesthetic** - Dark slate background with animated cyan, emerald, and violet gradient glows
- **Glassmorphism Cards** - Frosted glass effect with backdrop blur
- **Animated Background** - Pulsing gradient orbs and subtle grid pattern
- **Professional Typography** - Inter font for body, JetBrains Mono for code

### 🚀 Interactive Learning

- **Live Table Demo** - Click buttons to see SELECT queries filter data in real-time
- **Copy Code Blocks** - One-click copy for all SQL examples with visual feedback
- **Syntax Highlighting** - Color-coded SQL keywords, strings, and numbers

### 📚 Comprehensive Content

Covers all essential SQL SELECT concepts:

- Basic SELECT operations (`SELECT *`, specific columns)
- WHERE clause filtering
- AND, OR, NOT operators
- IN, BETWEEN, LIKE operators
- ORDER BY (ASC/DESC)
- LIMIT and DISTINCT
- Aggregate functions (COUNT, MAX, MIN, AVG, SUM)
- GROUP BY and HAVING
- SQL Execution Order visualization

### 🎯 Practice Challenges

Three difficulty levels with 13 total challenges:

- **Easy** (4 challenges) - Basic queries
- **Medium** (4 challenges) - Filtering and sorting
- **Advanced Beginner** (5 challenges) - Aggregation and grouping

Each challenge includes:

- Clear task description
- Hint button to reveal solution
- Copy-to-clipboard for solutions

### 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Mobile hamburger menu navigation
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
├── App.tsx                 # Main application component
├── main.tsx               # Entry point
├── index.css              # Global styles
├── components/
│   ├── SqlHero.tsx        # Hero section with animated code
│   ├── ConceptSection.tsx # Reusable concept card component
│   ├── InteractiveTable.tsx # Live filtering demo table
│   ├── CodeBlock.tsx      # Copyable code with syntax highlighting
│   ├── ExecutionFlow.tsx  # SQL execution order visualization
│   ├── FloatingNav.tsx    # Sticky navigation bar
│   └── PracticeChallenges.tsx # Practice section
└── public/
    └── favicon.svg        # Custom SQL favicon
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
| `violet-400/500`  | WHERE clause, filters          |
| `amber-400`       | Numbers                        |
| `slate-900/950`   | Background                     |

### Component Variants

Each concept card supports multiple color themes:

- `cyan` - Primary concepts
- `emerald` - Success/positive examples
- `violet` - Filtering operations
- `orange` - Sorting operations
- `pink` - Aggregation functions

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

### Execution Order

Visual comparison of:

1. How you write it: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT
2. How SQL executes it: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Add more SQL topics
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- SQL concepts inspired by practical database learning needs
- Design inspired by modern SaaS landing pages
- Built with love for the developer community

---

**Happy Learning!** 🎉

Master SQL SELECT statements with interactive examples and beautiful visualizations.
