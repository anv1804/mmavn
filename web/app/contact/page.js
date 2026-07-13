import GlassCard from "../../components/UI/GlassCard";
import Button from "../../components/UI/Button";
import { theme } from "../../config/theme";

export default function ContactPage() {
  return (
    <div className={theme.container}>
      <div className="max-w-xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white text-center">Liên hệ</h1>
          <p className="text-xs text-red-500 font-mono tracking-wider uppercase mt-1 text-center">Gửi ý kiến và đóng góp cho ban quản trị</p>
        </div>

        <GlassCard>
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">Họ và tên</label>
              <input type="text" placeholder="Ví dụ: Nguyễn Văn A" className={theme.input} />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">Địa chỉ Email</label>
              <input type="email" placeholder="email@gmail.com" className={theme.input} />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">Nội dung liên hệ</label>
              <textarea rows={4} placeholder="Nhập lời nhắn của bạn..." className={`${theme.input} resize-none`}></textarea>
            </div>

            <Button type="submit" variant="primary" className="w-full">Gửi Lời Nhắn</Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
