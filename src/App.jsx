import React from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import { GlowCard, Logo, Pill, StudentWorkspace, TeacherDashboard } from "./pages/Workspaces.jsx";

function TopNav() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const roleLabel = location.pathname.startsWith("/teacher")
    ? "Teacher Mode"
    : location.pathname.startsWith("/student")
    ? "Student Mode"
    : location.pathname.startsWith("/auth/teacher")
    ? "Teacher Login"
    : location.pathname.startsWith("/auth/student")
    ? "Student Login"
    : "Home";

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" aria-label="Go to home page">
          <Logo />
        </Link>

        
      </div>
    </div>
  );
}

function DemoFooter() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-2">
      
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#061225] text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.18),transparent_26%),radial-gradient(circle_at_82%_15%,rgba(168,85,247,0.16),transparent_28%),linear-gradient(180deg,#061225_0%,#071426_55%,#050816_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/:role" element={<Auth />} />
        <Route path="/student" element={<StudentWorkspace />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <DemoFooter />
    </div>
  );
}
