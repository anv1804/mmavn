import { useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

// Import pages
import Home from "./pages/Home";
import Lion from "./pages/Lion";
import Ufc from "./pages/Ufc";
import Community from "./pages/Community";
import Contact from "./pages/Contact";

export default function App() {
  const [currentTab, setCurrentTab] = useState("home");

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-red-500 selection:text-white">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-1">
        {currentTab === "home" && <Home setCurrentTab={setCurrentTab} />}
        {currentTab === "lion" && <Lion />}
        {currentTab === "ufc" && <Ufc />}
        {currentTab === "community" && <Community />}
        {currentTab === "contact" && <Contact />}
      </main>

      <Footer />
    </div>
  );
}
