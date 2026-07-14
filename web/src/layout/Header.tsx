interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  const navLinks = [
    { name: "Trang chủ", id: "home" },
    { name: "LION Championship", id: "lion" },
    { name: "UFC", id: "ufc" },
    { name: "Cộng đồng", id: "community" },
    { name: "Liên hệ", id: "contact" }
  ];

  return (
    <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => setCurrentTab("home")} className="flex items-center gap-2 group text-left bg-transparent border-none cursor-pointer">
          <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-base tracking-wider group-hover:scale-105 transition-transform duration-200">
            M
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block leading-none">
              MMAVN
            </span>
            <span className="text-[8px] block text-red-500 font-mono tracking-widest uppercase mt-0.5">
              Community Hub
            </span>
          </div>
        </button>
        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentTab(link.id)}
              className={`text-xs font-mono transition-colors uppercase tracking-wider bg-transparent border-none cursor-pointer ${
                currentTab === link.id ? "text-red-500 font-bold" : "text-zinc-400 hover:text-red-500"
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
