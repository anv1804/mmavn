import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useCms } from "../../context/CmsContext";
import CmsLoginGate from "../../components/cms/layout/CmsLoginGate";
import CmsSidebar from "../../components/cms/layout/CmsSidebar";
import CmsTopBar from "../../components/cms/layout/CmsTopBar";

export default function CmsLayout() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { isLoggedIn, login } = useCms();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(username, password);
    if (!ok) setAuthError("Tài khoản hoặc mật khẩu không chính xác!");
    else setAuthError("");
  };

  if (!isLoggedIn) {
    return (
      <CmsLoginGate
        username={username}
        password={password}
        authError={authError}
        setUsername={setUsername}
        setPassword={setPassword}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <div className={`h-screen flex overflow-hidden cms-font ${isDark ? "bg-[#030303] text-zinc-100" : "bg-[#f8f9fa] text-zinc-900"}`}>
      <CmsSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CmsTopBar />
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
