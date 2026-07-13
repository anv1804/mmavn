export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/40 py-8 text-center text-xs text-zinc-500 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 MMAVN Community. Thiết kế phi lợi nhuận cho người hâm mộ võ thuật.</p>
        <div className="flex gap-4 font-mono text-[9px] text-zinc-600">
          <span>React 19 + Tailwind v4</span>
        </div>
      </div>
    </footer>
  );
}
