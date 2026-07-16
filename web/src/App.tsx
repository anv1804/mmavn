import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

// Public Pages
import Home from "./pages/Home";
import Lion from "./pages/Lion";
import Ufc from "./pages/Ufc";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import FighterDetail from "./pages/FighterDetail";
import Clubs from "./pages/Clubs";
import ClubDetail from "./pages/ClubDetail";

// CMS Pages
import CmsLayout from "./pages/cms/CmsLayout";
import CmsDashboard from "./pages/cms/CmsDashboard";
import CmsFighters from "./pages/cms/CmsFighters";
import CmsClubs from "./pages/cms/CmsClubs";
import CmsRankings from "./pages/cms/CmsRankings";
import CmsEvents from "./pages/cms/CmsEvents";

import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { CmsProvider } from "./context/CmsContext";

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();
  const isCms = location.pathname.startsWith("/cms");

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark ? "bg-[#030303] text-zinc-100" : "bg-[#fafafa] text-zinc-900"
    } selection:bg-red-500 selection:text-white`}>
      {!isCms && <Header />}

      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/lion" element={<Lion />} />
          <Route path="/ufc" element={<Ufc />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fighter/:id" element={<FighterDetail />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/club/:id" element={<ClubDetail />} />

          {/* CMS nested routes */}
          <Route path="/cms" element={<CmsLayout />}>
            <Route index element={<CmsDashboard />} />
            <Route path="fighters" element={<CmsFighters />} />
            <Route path="clubs" element={<CmsClubs />} />
            <Route path="rankings" element={<CmsRankings />} />
            <Route path="events" element={<CmsEvents />} />
          </Route>
        </Routes>
      </main>

      {!isCms && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CmsProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CmsProvider>
    </ThemeProvider>
  );
}
