// ── InterpretationNote ───────────────────────────────────────
// Short 1–2 sentence explanatory note placed beneath charts/tables.
// Tells first-time users *why* a given section matters.
// Muted but present — does not compete with the data.

interface InterpretationNoteProps {
  children: React.ReactNode;
  // When placed inside a card, pass className="pt-4 border-t border-[#1E3350]"
  className?: string;
}

export default function InterpretationNote({ children, className }: InterpretationNoteProps) {
  return (
    <p className={`text-[#6B7E94] text-xs leading-relaxed mt-3 ${className ?? ''}`}>
      {children}
    </p>
  );
}
