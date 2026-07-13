import Link from "next/link";

export default function Header() {
  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "LION Championship", href: "/lion" },
    { name: "UFC", href: "/ufc" },
    { name: "Cộng đồng", href: "/community" },
    { name: "Liên hệ", href: "/contact" }
  ];

  return (
    <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-base tracking-wider group-hover:scale-105 transition-transform duration-200">
            M
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white">
              MMAVN
            </span>
            <span className="text-[8px] block text-red-500 font-mono tracking-widest uppercase -mt-1">
              Community Hub
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-mono text-zinc-400 hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
