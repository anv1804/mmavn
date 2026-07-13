# MMAVN Platform Design System & AI Rules

This document outlines the UI conventions, styling tokens, and layout guidelines for developers and AI agents working on the MMAVN platform. Follow these rules to keep the application responsive, visual-rich, and unified.

---

## 🎨 Theme Configuration (Octagon Dark Theme)

We use a combat sports aesthetic: **Deep zinc black** as the canvas and **glowing crimson red / amber** as functional accents.

### Color Palette & CSS Variables
- **Background**: `bg-zinc-950` (Hex: `#09090b`)
- **Text Primary**: `text-zinc-50` (highly readable Off-white)
- **Text Secondary**: `text-zinc-400`
- **Accent Primary (Octagon Red)**: `text-red-500` / `bg-red-600` (Hex: `#ef4444`)
- **Accent Secondary (Championship Gold)**: `text-amber-500` / `bg-amber-600` (Hex: `#f59e0b`)
- **Borders**: Thin, semi-transparent borders (`border-zinc-900`, `border-white/5`)

---

## 🧱 UI Components & Design Configs

All UI elements must utilize standard Tailwind classes mapped below to ensure visual consistency across new pages.

### 1. Cards (`GlassCard`)
Use `.octagon-panel` with `.glow-red` for active hover glows.
```jsx
// Template structure
<div className="octagon-panel rounded-2xl p-6 transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]">
  {content}
</div>
```

### 2. Buttons (`Button`)
Do not declare inline button classes. Always inherit from the design configuration:
- **Primary (Red)**: `bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-red-600/10 hover:shadow-red-500/25 active:scale-97`
- **Secondary (Dark)**: `bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-200 font-bold text-sm tracking-wide transition-all active:scale-97`
- **Gold**: `bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm tracking-wide transition-all active:scale-97`

### 3. Form Inputs
Inputs must match the following class template:
```html
<input 
  type="text" 
  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors" 
/>
```

---

## 🛠️ Coding Standards & Maintenance Rules

1. **Short File Policy**:
   - Keep React files **under 100 lines of code**. If a view grows beyond this, break down complex sections into smaller child elements in `/components`.
2. **Pure Components**:
   - Save UI layouts in `/components` (e.g. headers, cards, badges) without side effects or inline API calls. Pass state handlers as React props.
3. **Responsive first**:
   - Design with mobile dimensions in mind first (using Tailwind's `sm:`, `md:`, `lg:` modifiers).
4. **Consistency**:
   - Reuse `Button.js` and `GlassCard.js` for all styling. Never write custom inline background-padding declarations when shared classes are present.
