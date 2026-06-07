import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  compact?: boolean;
  showCopy?: boolean;
}

export function CodeBlock({
  code,
  compact = false,
  showCopy = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const highlightSyntax = (code: string) => {
    const normalized = code.replace(/\\n/g, "\n");

    return normalized
      .split("\n")
      .map((line) => {
        return line
          .split(/(\s+)/)
          .map((token) => {
            if (!token.trim()) return token;

            const keywords =
              /^(SELECT|FROM|WHERE|AND|OR|NOT|IN|BETWEEN|LIKE|ORDER BY|ASC|DESC|LIMIT|DISTINCT|COUNT|MAX|MIN|AVG|SUM|GROUP BY|HAVING|AS)$/i;

            if (keywords.test(token)) {
              return `<span class="text-violet-400 font-semibold">${token}</span>`;
            }

            if (/^\d+$/.test(token)) {
              return `<span class="text-amber-400">${token}</span>`;
            }

            if (/^'.*'$/.test(token)) {
              return `<span class="text-emerald-400">${token}</span>`;
            }

            return token;
          })
          .join("");
      })
      .join("<br/>");
  };

  return (
    <div
      className={`relative group ${compact ? "" : "rounded-xl bg-slate-900/50 border border-slate-700/30"}`}
    >
      {showCopy && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </motion.button>
      )}

      <pre
        className={`${compact ? "text-sm" : "text-base"} overflow-x-auto ${compact ? "p-3" : "p-4"}`}
      >
        <code
          className="font-mono text-slate-300 whitespace-pre-wrap text-left"
          dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }}
        />
      </pre>
    </div>
  );
}
