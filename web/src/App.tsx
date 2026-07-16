import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

// Pages
import Home from "./pages/Home";
import Lion from "./pages/Lion";
import Ufc from "./pages/Ufc";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import FighterDetail from "./pages/FighterDetail";
import Clubs from "./pages/Clubs";
import ClubDetail from "./pages/ClubDetail";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#030303] text-zinc-100 selection:bg-red-500 selection:text-white">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lion" element={<Lion />} />
            <Route path="/ufc" element={<Ufc />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/fighter/:id" element={<FighterDetail />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/club/:id" element={<ClubDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
