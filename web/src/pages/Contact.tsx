import { theme } from "../config/theme";
import GlassCard from "../components/UI/GlassCard";
import Button from "../components/UI/Button";

export default function Contact() {
  return (
    <div className={theme.container}>
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight text-white">
            Liên Hệ
          </h1>
          <p className="text-xs text-red-500 font-mono tracking-widest uppercase">
            Gửi đóng góp ý kiến về MMAVN
          </p>
        </div>

        <GlassCard className="border border-zinc-900">
          <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã gửi ý kiến!'); }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase">Họ & Tên</label>
              <input type="text" placeholder="Nguyễn Văn A" required className={theme.input} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase">Email</label>
              <input type="email" placeholder="email@gmail.com" required className={theme.input} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase">Nội dung liên hệ</label>
              <textarea rows={4} placeholder="Tôi muốn đóng góp ý kiến về..." required className={`${theme.input} resize-none`} />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Gửi Liên Hệ
            </Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
