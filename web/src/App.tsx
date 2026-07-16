import { useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

// Pages
import Home from "./pages/Home";
import Lion from "./pages/Lion";
import Ufc from "./pages/Ufc";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import FighterDetail from "./pages/FighterDetail";

// Fighter data
import { leVanTuan } from "./data/fighters/le-van-tuan";

export default function App() {
  const [currentTab, setCurrentTab] = useState("home");
  const [fighterPage, setFighterPage] = useState<string | null>(null);

  const handleViewFighter = (fighterId: string) => {
    setFighterPage(fighterId);
    setCurrentTab("fighter");
  };

  const handleBackFromFighter = () => {
    setFighterPage(null);
    setCurrentTab("lion");
  };

  // Fighter lookup map
  const fighters: Record<string, typeof leVanTuan> = {
    "le-van-tuan": leVanTuan,
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-red-500 selection:text-white">
      <Header currentTab={currentTab} setCurrentTab={(tab) => { setCurrentTab(tab); setFighterPage(null); }} />

      <main className="flex-1">
        {currentTab === "home"    && <Home setCurrentTab={setCurrentTab} />}
        {currentTab === "lion"    && <Lion onViewFighter={handleViewFighter} />}
        {currentTab === "ufc"     && <Ufc />}
        {currentTab === "community" && <Community />}
        {currentTab === "contact" && <Contact />}
        {currentTab === "fighter" && fighterPage && fighters[fighterPage] && (
          <FighterDetail
            fighter={fighters[fighterPage]}
            onBack={handleBackFromFighter}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
