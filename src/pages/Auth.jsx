import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, LogIn } from "lucide-react";
import { GlowCard, Pill } from "./Workspaces.jsx";

export default function Auth() {
  const navigate = useNavigate();
  const { role } = useParams();
  const safeRole = role === "teacher" ? "teacher" : "student";
  const [name, setName] = useState("");

  const destination = safeRole === "teacher" ? "/teacher" : "/student";
  const title = useMemo(() => safeRole === "teacher" ? "Teacher Login" : "Student Login", [safeRole]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(destination);
  };

  return (
    <main className="mx-auto grid min-h-[calc(100vh-120px)] max-w-3xl place-items-center px-5 py-10">
      <GlowCard className="w-full p-7 md:p-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-sky-200">
              <Lock className="h-4 w-4" /> Demo authentication
            </div>
            <h1 className="mt-3 text-4xl font-semibold text-white">{title}</h1>
          </div>
          <Pill tone={safeRole === "teacher" ? "purple" : "blue"}>{safeRole}</Pill>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Name or email</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoFocus
              placeholder="Press Enter to continue"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/50"
            />
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-400 px-5 py-4 font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            <LogIn className="h-5 w-5" />
            Enter ORION
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          No backend is connected. Press Enter or click the button to open the demo dashboard.
        </p>
      </GlowCard>
    </main>
  );
}
