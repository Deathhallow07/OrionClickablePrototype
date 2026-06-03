import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, School } from "lucide-react";
import { GlowCard, Pill } from "./Workspaces.jsx";

// Put your final banner image inside the public folder and update this path.
// Example: if the file is public/orion-home-banner.png, use "/orion-home-banner.png".
const HOME_BANNER_IMAGE_PATH = "/OrionClickablePrototype/orion_banner.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <GlowCard className="overflow-hidden p-4 md:p-6">
        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950/80">
          <img
            src={HOME_BANNER_IMAGE_PATH}
            alt="ORION learning platform banner"
            className="h-[300px] w-full object-cover md:h-[460px]"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2 md:left-6 md:top-6">
            <Pill tone="blue">ORION</Pill>
            <Pill tone="purple">Non-linear AI Learning OS</Pill>
          </div>
        </div>
      </GlowCard>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <button
          onClick={() => navigate("/auth/student")}
          className="group rounded-3xl border border-sky-400/25 bg-sky-400/10 p-8 text-left transition hover:-translate-y-1 hover:bg-sky-400/15"
        >
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-400/15">
            <GraduationCap className="h-8 w-8 text-sky-200" />
          </div>
          <div className="mt-5 text-3xl font-semibold text-white">I am a Student</div>
          <div className="mt-3 flex items-center text-sm font-semibold text-sky-200">Continue to student login →</div>
        </button>

        <button
          onClick={() => navigate("/auth/teacher")}
          className="group rounded-3xl border border-violet-400/25 bg-violet-400/10 p-8 text-left transition hover:-translate-y-1 hover:bg-violet-400/15"
        >
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-400/15">
            <School className="h-8 w-8 text-violet-200" />
          </div>
          <div className="mt-5 text-3xl font-semibold text-white">I am a Teacher</div>
          <div className="mt-3 flex items-center text-sm font-semibold text-violet-200">Continue to teacher login →</div>
        </button>
      </div>
    </main>
  );
}
