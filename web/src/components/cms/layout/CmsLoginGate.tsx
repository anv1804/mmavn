import { useNavigate } from "react-router-dom";

interface Props {
  username: string;
  password: string;
  authError: string;
  setUsername: (v: string) => void;
  setPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CmsLoginGate({
  username, password, authError,
  setUsername, setPassword, onSubmit,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#07070a] text-white cms-font">
      {/* Background glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vh] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-md p-8 border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl rounded-3xl relative z-10 shadow-[0_20px_50px_rgba(0,0,0,.8)]">
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-red-500/30" />
        <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-red-500/30" />

        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-2 mb-3 shadow-lg shadow-black/50">
            <img src="/logo-lionchampionship.png" alt="LION Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">MMAVN CMS</h2>
          <p className="text-[9px] text-zinc-500 tracking-widest uppercase mt-1">Hệ thống quản trị đấu trường võ thuật</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {authError && (
            <div className="p-3.5 bg-red-950/20 border border-red-500/30 rounded-xl text-[11px] text-red-400 text-center">
              ⚠️ {authError}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[9px] text-zinc-400 uppercase tracking-widest block">Tài khoản quản trị</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-800 focus:border-red-500/60 rounded-xl text-xs text-white focus:outline-none transition-all placeholder-zinc-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] text-zinc-400 uppercase tracking-widest block">Mật khẩu hệ thống</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-800 focus:border-red-500/60 rounded-xl text-xs text-white focus:outline-none transition-all placeholder-zinc-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-2 bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer border-none shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-95 duration-200"
          >
            Đăng Nhập Dashboard
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-2.5 bg-transparent border-none text-[10px] text-zinc-500 hover:text-zinc-300 cursor-pointer"
          >
            &larr; Quay lại trang chủ MMAVN
          </button>
        </form>
      </div>
    </div>
  );
}
