/**
 * Reusable theme styling classes to ensure design system consistency.
 */
export const theme = {
  container: "max-w-6xl mx-auto px-6 py-10 w-full",
  card: "octagon-panel rounded-2xl p-6 transition-all duration-300",
  button: {
    primary: "px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-red-600/10 hover:shadow-red-500/25 active:scale-97 text-center cursor-pointer",
    secondary: "px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-200 font-bold text-sm tracking-wide transition-all active:scale-97 text-center cursor-pointer",
    gold: "px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm tracking-wide transition-all active:scale-97 text-center cursor-pointer"
  },
  input: "w-full bg-zinc-950/80 border border-zinc-800 focus:border-red-500 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors"
};
