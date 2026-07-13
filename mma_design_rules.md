# MMA Platform Design System & AI Rules

This document outlines the UI conventions, styling tokens, and layout guidelines for developers and AI agents working on the MMA platform. Follow these rules to keep the application responsive, visual-rich, and unified.

---

## 🎨 Theme Configuration (Octagon Dark Theme)

We use combat sports aesthetic: **Deep charcoal black** as the canvas and **glowing crimson red / amber** as functional accents.

### Color Palette (Tailwind Tokens)
- **Background**: `bg-slate-950` / `bg-zinc-950`
- **Text Primary**: `text-slate-50` (highly readable Off-white)
- **Text Secondary**: `text-slate-400`
- **Accent Primary (Octagon Red)**: `text-red-500` / `bg-red-600`
- **Accent Secondary (Championship Gold)**: `text-amber-500` / `bg-amber-600`
- **Borders**: Thin, semi-transparent borders (`border-slate-900`, `border-white/5`)

---

## ⚙️ Coding Standards & Maintenance Rules

1. **Short File Policy**:
   - Keep React files **under 100 lines of code**. If a view grows beyond this, break down complex sections into smaller child elements in `/components`.
2. **Pure Components**:
   - Save UI layouts in `/components` (e.g. headers, cards, badges) without side effects or inline API calls. Pass state handlers as React props.
3. **Responsive first**:
   - Design with mobile dimensions in mind first (using Tailwind's `sm:`, `md:`, `lg:` modifiers).
4. **Consistency**:
   - Reuse `Button.js` and `GlassCard.js` for all styling. Never write custom inline inline background-padding declarations when shared classes are present.
