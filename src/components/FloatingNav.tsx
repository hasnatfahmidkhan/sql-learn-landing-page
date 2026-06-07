import { motion } from "framer-motion";
import {
  Database,
  BookOpen,
  Filter,
  ArrowUpDown,
  Terminal,
  Zap,
  Menu,
  X,
  Dumbbell,
} from "lucide-react";
import { useState } from "react";

interface FloatingNavProps {
  activeSection: string;
}

const navItems = [
  { id: "hero", label: "Home", icon: Database },
  { id: "intro", label: "Intro", icon: BookOpen },
  { id: "basics", label: "Basics", icon: Terminal },
  { id: "filtering", label: "Filter", icon: Filter },
  { id: "advanced", label: "Sort", icon: ArrowUpDown },
  { id: "aggregation", label: "Aggregate", icon: Zap },
  { id: "practice", label: "Practice", icon: Dumbbell },
];

export function FloatingNav({ activeSection }: FloatingNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="px-2 py-2 rounded-2xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile nav */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-4 right-4 z-50 md:hidden"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl text-white"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-20 right-4 z-50 md:hidden"
        >
          <div className="p-2 rounded-2xl bg-slate-900/95 border border-slate-700/50 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
