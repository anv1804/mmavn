import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { supabase } from "../utils/supabase";

// ─── Types ───────────────────────────────────────────────────────────────────
export type MsgState = { text: string; type: string };

export interface CmsContextValue {
  isLoggedIn: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  clubs: any[];
  setClubs: React.Dispatch<React.SetStateAction<any[]>>;
  fighters: any[];
  setFighters: React.Dispatch<React.SetStateAction<any[]>>;
  rankings: any[];
  setRankings: React.Dispatch<React.SetStateAction<any[]>>;
  events: any[];
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
  msg: MsgState;
  showMsg: (text: string, type?: "success" | "error") => void;
  saveEvents: (e: any[]) => void;
}

const CmsContext = createContext<CmsContextValue | null>(null);

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms must be inside CmsProvider");
  return ctx;
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clubs, setClubs] = useState<any[]>([]);
  const [fighters, setFighters] = useState<any[]>([]);
  const [rankings, setRankings] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<MsgState>({ text: "", type: "" });

  useEffect(() => {
    const session = sessionStorage.getItem("mmavn_admin_session");
    if (session === "active") setIsLoggedIn(true);
  }, []);

  const showMsg = (text: string, type: "success" | "error" = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 4000);
  };

  const login = (u: string, p: string): boolean => {
    if (u === "admin" && p === "admin") {
      setIsLoggedIn(true);
      sessionStorage.setItem("mmavn_admin_session", "active");
      showMsg("Đăng nhập hệ thống thành công!");
      return true;
    }
    return false;
  };

  const logout = () => {
    if (window.confirm("Bạn muốn đăng xuất khỏi hệ thống CMS?")) {
      setIsLoggedIn(false);
      sessionStorage.removeItem("mmavn_admin_session");
    }
  };

  const saveEvents = (newEvents: any[]) => {
    setEvents(newEvents);
    localStorage.setItem("mmavn_events", JSON.stringify(newEvents));
  };

  // Load all shared data once logged in
  useEffect(() => {
    if (!isLoggedIn) return;
    (async () => {
      setLoading(true);
      try {
        const [{ data: cData }, { data: fData }, { data: rData }] = await Promise.all([
          supabase.from("clubs").select("*").order("name"),
          supabase.from("fighters").select("*").order("name"),
          supabase.from("rankings").select("*"),
        ]);
        if (cData) setClubs(cData);
        if (fData) setFighters(fData);
        if (rData) setRankings(rData);

        const storedEvts = localStorage.getItem("mmavn_events");
        if (storedEvts) {
          setEvents(JSON.parse(storedEvts));
        } else {
          const defaultEvts = [
            { id: "e1", title: "LION Championship 34", date: "Thứ Bảy, ngày 18 tháng 7, 2026", loc: "Nhà thi đấu Rạch Miễu, TP. HCM", type: "Championship Bout", status: "Trực tiếp lúc 19:00" },
            { id: "e2", title: "UFC 326: Jones vs Aspinall", date: "Chủ Nhật, ngày 26 tháng 7, 2026", loc: "Madison Square Garden, New York", type: "Heavyweight Title Match", status: "Phát sóng độc quyền" },
            { id: "e3", title: "LION Championship 35", date: "Thứ Bảy, ngày 15 tháng 8, 2026", loc: "Quần Ngựa, Tây Hồ, Hà Nội", type: "Official Rankings Matches", status: "Bán vé chính thức" },
          ];
          saveEvents(defaultEvts);
        }
      } catch (err) {
        console.error(err);
        showMsg("Lỗi tải cơ sở dữ liệu", "error");
      } finally {
        setLoading(false);
      }
    })();
  }, [isLoggedIn]);

  return (
    <CmsContext.Provider value={{ isLoggedIn, login, logout, clubs, setClubs, fighters, setFighters, rankings, setRankings, events, setEvents, loading, msg, showMsg, saveEvents }}>
      {children}
    </CmsContext.Provider>
  );
}
