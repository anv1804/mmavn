import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MMAVN | Cộng Đồng Võ Thuật Tổng Hợp Việt Nam",
  description: "Trang tin tức và thảo luận chuyên sâu về giải đấu LION Championship, UFC và võ thuật tổng hợp MMA tại Việt Nam.",
  keywords: "MMA, LION Championship, UFC, võ thuật tổng hợp, đấu võ, Việt Nam MMA",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
