import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Brain,
  BarChart3,
  ClipboardList,
  Download,
  FileText,
  GraduationCap,
  LineChart,
  Lock,
  MessageSquare,
  Network,
  School,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UploadCloud,
  Users,
  Zap,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Eye,
  Send,
  PlayCircle,
} from "lucide-react";

const curriculumTopics = [
  "Rigid Body",
  "Moment of Inertia",
  "Parallel & Perpendicular Axis Theorems",
  "MOI of Uniform Bodies",
  "Angular Momentum",
  "Torque",
  "Conservation of Angular Momentum",
  "Dynamics of Rigid Bodies",
  "Rolling Without Slipping",
  "Equilibrium of Rigid Bodies",
];

const chatPresets = {
  syllabus: [
    {
      role: "student",
      text: "Explain angular momentum from basics.",
    },
    {
      role: "ai",
      text:
        "Angular momentum measures rotational motion. For a particle, L = r × p. To understand it deeply, we need vectors, circular motion, torque and conservation laws.",
    },
    {
      role: "student",
      text: "Why does it depend on vectors?",
    },
    {
      role: "ai",
      text:
        "Because angular momentum has direction as well as magnitude. The cross product r × p decides the axis of rotation using vector direction rules.",
    },
  ],
  outside: [
    {
      role: "student",
      text: "Can you explain black holes using simple physics?",
    },
    {
      role: "ai",
      text:
        "This topic is outside your current school syllabus, so ORION creates a separate exploration graph while keeping your curriculum path untouched.",
    },
  ],
};

const graphNodes = {
  syllabus: [
    { id: "rigid", label: "Rigid Body", x: 50, y: 7, type: "main", status: "ok" },
    { id: "moi", label: "Moment of\nInertia", x: 50, y: 16, type: "main", status: "learning" },
    { id: "axes", label: "Parallel & Perpendicular\nAxis Theorems", x: 50, y: 25, type: "main", status: "learning" },
    { id: "uniform", label: "MOI of Uniform\nBodies", x: 50, y: 34, type: "main", status: "learning" },
    { id: "angmom", label: "Angular\nMomentum", x: 50, y: 43, type: "main", status: "learning" },
    { id: "torque", label: "Torque", x: 50, y: 52, type: "main", status: "ok" },
    { id: "conservation", label: "Conservation of\nAngular Momentum", x: 50, y: 61, type: "main", status: "next" },
    { id: "dynamics", label: "Dynamics of Rigid Bodies\nFixed Axis", x: 50, y: 70, type: "main", status: "next" },
    { id: "rolling", label: "Rolling Without\nSlipping", x: 50, y: 79, type: "main", status: "next" },
    { id: "equilibrium", label: "Equilibrium of\nRigid Bodies", x: 50, y: 88, type: "main", status: "next" },

    { id: "moi_doubt", label: "Why I = Σmr²?", x: 78, y: 16, type: "branch", status: "branch" },
    { id: "axis_doubt", label: "Axis Shift\nIntuition", x: 22, y: 25, type: "branch", status: "branch" },
    { id: "shape_doubt", label: "Simple Shape\nDerivations", x: 78, y: 34, type: "branch", status: "branch" },
    { id: "angmom_doubt", label: "Direction of L", x: 22, y: 43, type: "branch", status: "branch" },
    { id: "torque_doubt", label: "Relation with\nAngular Momentum", x: 78, y: 52, type: "branch", status: "branch" },
    { id: "rolling_doubt", label: "No-slip\nCondition", x: 22, y: 79, type: "branch", status: "branch" },
    { id: "practice", label: "Practice Set", x: 78, y: 88, type: "branch", status: "quiz" },
  ],
  outside: [
    { id: "blackholes", label: "Black Holes", x: 49, y: 40, type: "main", status: "learning" },
    { id: "gravity", label: "Gravity", x: 30, y: 58, type: "main", status: "ok" },
    { id: "spacetime", label: "Spacetime", x: 69, y: 58, type: "main", status: "ok" },
    { id: "event", label: "Event Horizon", x: 49, y: 18, type: "branch", status: "branch" },
  ],
};

const analytics = [
  { topic: "Angular Momentum", mastery: 38, doubts: 142, trend: "High confusion", tone: "warning" },
  { topic: "Circular Motion", mastery: 52, doubts: 96, trend: "Needs revision", tone: "mid" },
  { topic: "Vectors", mastery: 31, doubts: 188, trend: "Root gap", tone: "danger" },
  { topic: "Torque", mastery: 61, doubts: 72, trend: "Improving", tone: "ok" },
];

const frequentQuestions = [
  "Why is angular momentum a vector?",
  "How does torque change angular momentum?",
  "Why is r × p used instead of r + p?",
  "How do I find the direction of angular momentum?",
];

const suggestedTests = [
  {
    title: "Root Gap Test: Vectors for Rotation",
    questions: 18,
    reason: "Students are failing angular momentum because vector direction is weak.",
    level: "Foundation",
  },
  {
    title: "Circular Motion Bridge Quiz",
    questions: 15,
    reason: "Connects radius, velocity, acceleration and rotational intuition.",
    level: "Medium",
  },
  {
    title: "Angular Momentum Application Set",
    questions: 20,
    reason: "Use after vector and circular motion revision.",
    level: "Exam Ready",
  },
];

function classNames(...items) {
  return items.filter(Boolean).join(" ");
}

function GlowCard({ children, className = "" }) {
  return (
    <div
      className={classNames(
        "rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_18px_80px_rgba(2,8,23,0.45)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

function Pill({ children, tone = "blue" }) {
  const tones = {
    blue: "border-sky-400/30 bg-sky-400/10 text-sky-200",
    purple: "border-violet-400/30 bg-violet-400/10 text-violet-200",
    green: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    amber: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    red: "border-rose-400/30 bg-rose-400/10 text-rose-200",
    slate: "border-slate-400/20 bg-slate-400/10 text-slate-200",
  };
  return <span className={classNames("rounded-full border px-3 py-1 text-xs font-medium", tones[tone])}>{children}</span>;
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-400/20 to-violet-500/20 shadow-[0_0_30px_rgba(56,189,248,0.25)]">
        <Network className="h-6 w-6 text-sky-200" />
      </div>
      <div>
        <div className="text-xl font-semibold tracking-[0.32em] text-white">ORION</div>
        <div className="text-xs text-slate-400">Non-linear AI Learning OS</div>
      </div>
    </div>
  );
}

function TopNav({ view, setView }) {
  const nav = [
    ["student", "Student Workspace", BookOpen],
    ["teacher", "Teacher Dashboard", BarChart3],
  ];
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Logo />
        <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1 md:flex">
          {nav.map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={classNames(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition",
                view === id
                  ? "bg-sky-400/15 text-sky-100 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.25)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Pill tone="green">Pilot-ready UI</Pill>
          <Pill tone="purple">Demo Mode</Pill>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto px-5 pb-4 md:hidden">
        {nav.map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={classNames(
              "flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-sm",
              view === id ? "border-sky-400/30 bg-sky-400/15 text-sky-100" : "border-white/10 text-slate-400"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function LandingHero({ setView }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1.05fr_0.95fr]">
      <GlowCard className="relative overflow-hidden p-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-28 left-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative">
          <Pill tone="blue">Unified platform for students, teachers and institutions</Pill>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            AI learning that becomes a <span className="bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-transparent">concept map</span>, not a lost chat.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            ORION turns student interactions into visual learning journeys and converts syllabus-relevant doubts into anonymous teacher insights.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setView("student")}
              className="rounded-2xl bg-sky-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              Open Student Demo
            </button>
            <button
              onClick={() => setView("teacher")}
              className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/5"
            >
              View Teacher Analytics
            </button>
          </div>
        </div>
      </GlowCard>

      <div className="grid gap-4">
        {[
          ["Dynamic Concept Mapping", "Every doubt becomes part of a visual learning path.", Network, "blue"],
          ["Root Gap Diagnosis", "Find why a student is weak, not just where they scored low.", Search, "purple"],
          ["Anonymous Teacher Insights", "Teachers see class-level patterns without exposing private chats.", ShieldCheck, "green"],
        ].map(([title, text, Icon, tone]) => (
          <GlowCard key={title} className="flex items-center gap-5 p-5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5">
              <Icon className="h-7 w-7 text-sky-200" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
            </div>
            <ChevronRight className="ml-auto h-5 w-5 text-slate-600" />
          </GlowCard>
        ))}
      </div>
    </div>
  );
}

function GraphCanvas({ mode, activeNode, setActiveNode }) {
  const nodes = graphNodes[mode];
  const getNode = (id) => nodes.find((n) => n.id === id);
  const edges = mode === "syllabus"
    ? [
        { from: "rigid", to: "moi", kind: "main" },
        { from: "moi", to: "axes", kind: "main" },
        { from: "axes", to: "uniform", kind: "main" },
        { from: "uniform", to: "angmom", kind: "main" },
        { from: "angmom", to: "torque", kind: "main" },
        { from: "torque", to: "conservation", kind: "main" },
        { from: "conservation", to: "dynamics", kind: "main" },
        { from: "dynamics", to: "rolling", kind: "main" },
        { from: "rolling", to: "equilibrium", kind: "main" },

        { from: "moi", to: "moi_doubt", kind: "branch" },
        { from: "axes", to: "axis_doubt", kind: "branch" },
        { from: "uniform", to: "shape_doubt", kind: "branch" },
        { from: "angmom", to: "angmom_doubt", kind: "branch" },
        { from: "torque", to: "torque_doubt", kind: "branch" },
        { from: "rolling", to: "rolling_doubt", kind: "branch" },
        { from: "equilibrium", to: "practice", kind: "branch" },
      ]
    : [
        ["gravity", "blackholes"],
        ["spacetime", "blackholes"],
        ["blackholes", "event"],
      ];

  const shortenEdge = (A, B, gap = 6) => {
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / length;
    const uy = dy / length;
    return {
      x1: A.x + ux * gap,
      y1: A.y + uy * gap,
      x2: B.x - ux * gap,
      y2: B.y - uy * gap,
    };
  };

  return (
    <div className="relative h-[980px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.14),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(168,85,247,0.12),transparent_30%)]" />
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <marker
            id="mainArrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path
              d="M1,1 L8,5 L1,9"
              fill="none"
              stroke="rgba(56, 189, 248, 0.98)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
          <marker
            id="branchArrow"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4.5"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path
              d="M1,1 L7,4.5 L1,8"
              fill="none"
              stroke="rgba(196, 181, 253, 0.78)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
        {edges.map((edge) => {
          const a = Array.isArray(edge) ? edge[0] : edge.from;
          const b = Array.isArray(edge) ? edge[1] : edge.to;
          const kind = Array.isArray(edge) ? "branch" : edge.kind;
          const A = getNode(a);
          const B = getNode(b);
          const pts = shortenEdge(A, B, kind === "main" ? 6.8 : 5.8);
          return (
            <line
              key={`${a}-${b}`}
              x1={`${pts.x1}%`}
              y1={`${pts.y1}%`}
              x2={`${pts.x2}%`}
              y2={`${pts.y2}%`}
              stroke={kind === "main" ? "rgba(56, 189, 248, 0.95)" : "rgba(196, 181, 253, 0.72)"}
              strokeWidth={kind === "main" ? "4.6" : "2.2"}
              strokeLinecap="round"
              strokeDasharray={kind === "main" ? "0" : "7 7"}
              markerEnd={kind === "main" ? "url(#mainArrow)" : "url(#branchArrow)"}
            />
          );
        })}
      </svg>
      {nodes.map((node) => (
        <button
          key={node.id}
          onClick={() => setActiveNode(node)}
          className={classNames(
            node.type === "main"
              ? "absolute -translate-x-1/2 -translate-y-1/2 whitespace-pre-line rounded-2xl border px-5 py-3 text-center text-sm font-semibold shadow-2xl transition hover:scale-105"
              : "absolute -translate-x-1/2 -translate-y-1/2 whitespace-pre-line rounded-2xl border px-3 py-2 text-center text-xs font-medium shadow-xl transition hover:scale-105",
            activeNode?.id === node.id
              ? "border-sky-300 bg-sky-400/20 text-white shadow-[0_0_28px_rgba(56,189,248,0.35)]"
              : node.type === "branch"
              ? "border-violet-300/40 bg-violet-400/10 text-violet-100"
              : node.status === "weak"
              ? "border-rose-300/40 bg-rose-400/10 text-rose-100"
              : "border-sky-300/30 bg-slate-900/90 text-sky-100"
          )}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </button>
      ))}
      <div className="absolute left-5 top-5 flex flex-wrap gap-2">
        <Pill tone={mode === "syllabus" ? "green" : "amber"}>{mode === "syllabus" ? "Within syllabus" : "Outside syllabus"}</Pill>
        <Pill tone="blue">Auto-built graph</Pill>
        {mode === "syllabus" && <Pill tone="purple">Bold main path + side branches</Pill>}
      </div>
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white">{activeNode?.label || "Click any concept node"}</div>
            <div className="mt-1 text-xs leading-5 text-slate-400">
              {activeNode
                ? activeNode.status === "weak"
                  ? "Marked as a root gap. Teacher analytics will show this anonymously as a prerequisite weakness."
                  : activeNode.type === "branch"
                  ? "This is a side branch attached to the main learning path. Curiosity stays organized without breaking flow."
                  : "Continue learning from this exact context or revise earlier explanations."
                : "The graph preserves the learning journey so students do not scroll through old chats."}
            </div>
          </div>
          <Pill tone={activeNode?.type === "branch" ? "purple" : "blue"}>{activeNode?.type || "node"}</Pill>
        </div>
      </div>
    </div>
  );
}

function StudentWorkspace() {
  const [query, setQuery] = useState("Explain angular momentum from basics");
  const [mode, setMode] = useState("syllabus");
  const [activeNode, setActiveNode] = useState(graphNodes.syllabus[4]);
  const [messages, setMessages] = useState(chatPresets.syllabus);
  const [toast, setToast] = useState("Matched to Class 11 Physics syllabus");
  const [studentView, setStudentView] = useState("chat");

  const runDemoQuery = () => {
    const q = query.toLowerCase();
    const outside = q.includes("black") || q.includes("ai ethics") || q.includes("startup");
    const nextMode = outside ? "outside" : "syllabus";
    setMode(nextMode);
    setMessages(chatPresets[nextMode]);
    setActiveNode(graphNodes[nextMode][outside ? 0 : 4]);
    setToast(outside ? "Outside syllabus: separate exploration graph created" : "Within syllabus: linked to uploaded curriculum path");
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-5xl flex-col px-5 py-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-sky-200"><Sparkles className="h-4 w-4" /> Student Workspace</div>
          <h2 className="mt-2 text-3xl font-semibold text-white">Ask normally. Switch to graph when you want structure.</h2>
        </div>
        <div className="flex rounded-2xl border border-white/10 bg-white/[0.03] p-1">
          <button
            onClick={() => setStudentView("chat")}
            className={classNames(
              "rounded-xl px-4 py-2 text-sm font-semibold transition",
              studentView === "chat" ? "bg-sky-400 text-slate-950" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            Chat
          </button>
          <button
            onClick={() => setStudentView("graph")}
            className={classNames(
              "rounded-xl px-4 py-2 text-sm font-semibold transition",
              studentView === "graph" ? "bg-sky-400 text-slate-950" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            Graph
          </button>
        </div>
      </div>

      {studentView === "chat" ? (
        <GlowCard className="flex min-h-[720px] flex-1 flex-col overflow-hidden">
          <div className="border-b border-white/10 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">ORION Tutor</h3>
                <p className="mt-1 text-xs text-slate-400">Chat-first interface. The concept graph is created in the background.</p>
              </div>
              <Pill tone={mode === "syllabus" ? "green" : "amber"}>{mode === "syllabus" ? "Syllabus linked" : "Exploration graph"}</Pill>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m, idx) => (
              <div key={idx} className={classNames("flex", m.role === "student" ? "justify-end" : "justify-start")}>
                <div
                  className={classNames(
                    "max-w-[78%] rounded-3xl px-5 py-4 text-sm leading-6",
                    m.role === "student" ? "bg-sky-400 text-slate-950" : "border border-white/10 bg-white/5 text-slate-200"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div className="mx-auto max-w-xl rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-center text-sm text-emerald-100">
              <div className="flex items-center justify-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4" /> {toast}</div>
              <p className="mt-1 text-xs text-emerald-200/80">Only anonymous syllabus-relevant learning signals go to teacher analytics.</p>
            </div>
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="flex gap-2 rounded-2xl border border-white/10 bg-slate-900/80 p-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="Ask ORION anything..."
              />
              <button onClick={runDemoQuery} className="rounded-xl bg-sky-400 p-3 text-slate-950 hover:bg-sky-300">
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Explain angular momentum from basics", "Why does torque affect rotation?", "Explain black holes simply"].map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </GlowCard>
      ) : (
        <GlowCard className="flex-1 overflow-hidden p-4">
          <GraphCanvas mode={mode} activeNode={activeNode} setActiveNode={setActiveNode} />
        </GlowCard>
      )}
    </div>
  );
}

function TeacherDashboard() {
  const [selected, setSelected] = useState("Angular Momentum");
  const [uploaded, setUploaded] = useState(false);
  const selectedTopic = analytics.find((a) => a.topic === selected) || analytics[0];
  const heatmap = [
    { topic: "Vectors", level: "Critical", mastery: 31, tone: "border-rose-400/40 bg-rose-400/15" },
    { topic: "Angular Momentum", level: "High", mastery: 38, tone: "border-rose-400/30 bg-rose-400/10" },
    { topic: "Circular Motion", level: "Medium", mastery: 52, tone: "border-amber-400/30 bg-amber-400/10" },
    { topic: "Torque", level: "Improving", mastery: 61, tone: "border-sky-400/30 bg-sky-400/10" },
    { topic: "Moment of Inertia", level: "Medium", mastery: 48, tone: "border-amber-400/30 bg-amber-400/10" },
    { topic: "Rigid Body", level: "Stable", mastery: 74, tone: "border-emerald-400/30 bg-emerald-400/10" },
    { topic: "Rolling Motion", level: "Needs practice", mastery: 57, tone: "border-sky-400/30 bg-sky-400/10" },
    { topic: "Equilibrium", level: "Stable", mastery: 69, tone: "border-emerald-400/30 bg-emerald-400/10" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-violet-200"><ShieldCheck className="h-4 w-4" /> Teacher / Institution Dashboard</div>
          <h2 className="mt-2 text-3xl font-semibold text-white">Anonymous insights from syllabus-relevant learning</h2>
          <p className="mt-2 max-w-3xl text-slate-400">Teachers see class-wide confusion, weak-topic heatmaps, uploads, root gaps, and targeted tests in one place.</p>
        </div>
        <div className="flex gap-2">
          <Pill tone="green">Identity-safe</Pill>
          <Pill tone="blue">Class-level analytics</Pill>
          <Pill tone="purple">Root gap detection</Pill>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Active learners", "1,248", "+18%", Users],
              ["Syllabus relevance", "84%", "analyzed", Target],
              ["Frequent doubts", "498", "this week", MessageSquare],
              ["Root gaps found", "12", "priority", Search],
            ].map(([label, value, hint, Icon]) => (
              <GlowCard key={label} className="p-4">
                <Icon className="h-5 w-5 text-sky-300" />
                <div className="mt-4 text-3xl font-semibold text-white">{value}</div>
                <div className="mt-1 text-sm text-slate-300">{label}</div>
                <div className="mt-1 text-xs text-slate-500">{hint}</div>
              </GlowCard>
            ))}
          </div>

          <GlowCard className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Weak-topic heatmap</h3>
                <p className="text-sm text-slate-400">Concept difficulty intensity from anonymized student interactions.</p>
              </div>
              <Pill tone="slate">Class XI Physics</Pill>
            </div>
            <div className="grid gap-3 md:grid-cols-4">
              {heatmap.map((item) => (
                <button
                  key={item.topic}
                  onClick={() => setSelected(item.topic)}
                  className={classNames("rounded-2xl border p-4 text-left transition hover:scale-[1.02]", item.tone, selected === item.topic && "ring-2 ring-sky-300/60")}
                >
                  <div className="text-sm font-semibold text-white">{item.topic}</div>
                  <div className="mt-1 text-xs text-slate-300">{item.level}</div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-sky-300" style={{ width: `${item.mastery}%` }} />
                  </div>
                  <div className="mt-2 text-xs text-slate-400">{item.mastery}% mastery</div>
                </button>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Weak topic overview</h3>
                <p className="text-sm text-slate-400">Based on student interaction patterns and mastery signals.</p>
              </div>
              <Pill tone="slate">Live class summary</Pill>
            </div>
            <div className="space-y-4">
              {analytics.map((item) => (
                <button
                  key={item.topic}
                  onClick={() => setSelected(item.topic)}
                  className={classNames(
                    "w-full rounded-2xl border p-4 text-left transition hover:bg-white/5",
                    selected === item.topic ? "border-sky-400/40 bg-sky-400/10" : "border-white/10 bg-white/[0.02]"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-white">{item.topic}</div>
                      <div className="mt-1 text-xs text-slate-400">{item.doubts} related doubts • {item.trend}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-200">{item.mastery}% mastery</div>
                      <div className="mt-2 h-2 w-36 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-sky-400" style={{ width: `${item.mastery}%` }} /></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="p-5">
            <h3 className="text-lg font-semibold text-white">Upload syllabus and question bank</h3>
            <p className="mt-1 text-sm text-slate-400">The official curriculum spine and school questions stay inside the teacher dashboard.</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-dashed border-sky-400/30 bg-sky-400/5 p-5">
                <UploadCloud className="h-8 w-8 text-sky-300" />
                <h4 className="mt-3 font-semibold text-white">Upload syllabus</h4>
                <p className="mt-1 text-xs leading-5 text-slate-400">PDF chapter outline, official topic order, learning objectives.</p>
                <button onClick={() => setUploaded(true)} className="mt-4 rounded-xl bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300">Upload</button>
              </div>
              <div className="rounded-3xl border border-dashed border-violet-400/30 bg-violet-400/5 p-5">
                <FileText className="h-8 w-8 text-violet-300" />
                <h4 className="mt-3 font-semibold text-white">Upload question bank</h4>
                <p className="mt-1 text-xs leading-5 text-slate-400">Topic-wise questions, school tests, PYQs, practice worksheets.</p>
                <button onClick={() => setUploaded(true)} className="mt-4 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5">Upload</button>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["Physics_Class11_Syllabus.pdf", "Curriculum graph source"],
                ["Rotational_Motion_QuestionBank.xlsx", "Targeted test source"],
              ].map(([file, hint]) => (
                <div key={file} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-sky-300" />
                    <div>
                      <div className="text-sm font-medium text-white">{file}</div>
                      <div className="text-xs text-slate-500">{hint}</div>
                    </div>
                  </div>
                  {uploaded ? <CheckCircle2 className="h-5 w-5 text-emerald-300" /> : <Pill tone="slate">Ready</Pill>}
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        <div className="space-y-5">
          <GlowCard className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Root cause chain</h3>
              <Pill tone="red">Prerequisite gap</Pill>
            </div>
            <p className="mt-2 text-sm text-slate-400">Students look weak in {selectedTopic.topic}, but ORION checks the prerequisite path.</p>
            <div className="mt-5 space-y-3">
              {[
                ["Angular Momentum", "Surface weak topic", "warning"],
                ["Circular Motion", "Bridge concept", "mid"],
                ["Vectors", "Actual root gap", "danger"],
              ].map(([title, subtitle, tone], idx) => (
                <div key={title}>
                  <div className={classNames("rounded-2xl border p-4", tone === "danger" ? "border-rose-400/30 bg-rose-400/10" : tone === "warning" ? "border-amber-400/25 bg-amber-400/10" : "border-sky-400/25 bg-sky-400/10")}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{title}</div>
                        <div className="text-xs text-slate-400">{subtitle}</div>
                      </div>
                      {idx === 2 ? <AlertTriangle className="h-5 w-5 text-rose-300" /> : <ChevronRight className="h-5 w-5 text-slate-400" />}
                    </div>
                  </div>
                  {idx < 2 && <div className="mx-auto h-4 w-px bg-white/20" />}
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="p-5">
            <h3 className="text-lg font-semibold text-white">Most frequent questions</h3>
            <div className="mt-4 space-y-3">
              {frequentQuestions.map((q) => (
                <div key={q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">
                  {q}
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="p-5">
            <h3 className="text-lg font-semibold text-white">Suggested tests</h3>
            <div className="mt-4 space-y-3">
              {suggestedTests.map((test) => (
                <div key={test.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-white">{test.title}</div>
                    <Pill tone="amber">{test.level}</Pill>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{test.reason}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-300"><ClipboardList className="h-4 w-4 text-sky-300" /> {test.questions} questions</div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}

function AdminPanel() {
  const [uploaded, setUploaded] = useState(false);
  return (
    <div className="mx-auto max-w-7xl px-5 py-6">
      <div className="mb-5">
        <div className="flex items-center gap-2 text-sm text-emerald-200"><School className="h-4 w-4" /> Institution Setup</div>
        <h2 className="mt-2 text-3xl font-semibold text-white">Upload syllabus and question banks</h2>
        <p className="mt-2 max-w-3xl text-slate-400">This creates the official curriculum spine. Students do not need to paste context again and again.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <GlowCard className="p-6">
          <div className="rounded-3xl border border-dashed border-sky-400/30 bg-sky-400/5 p-8 text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-sky-300" />
            <h3 className="mt-4 text-xl font-semibold text-white">Drop curriculum files here</h3>
            <p className="mt-2 text-sm text-slate-400">PDF syllabus, chapter outline, question bank XLSX, PYQ sets.</p>
            <button onClick={() => setUploaded(true)} className="mt-5 rounded-2xl bg-sky-400 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-300">
              Simulate Upload
            </button>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["Physics_Class11_Syllabus.pdf", "2.4 MB"],
              ["Rotational_Motion_QuestionBank.xlsx", "3.1 MB"],
              ["School_Test_Pattern.pdf", "1.2 MB"],
            ].map(([file, size]) => (
              <div key={file} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-sky-300" />
                  <div>
                    <div className="text-sm font-medium text-white">{file}</div>
                    <div className="text-xs text-slate-500">{size}</div>
                  </div>
                </div>
                {uploaded ? <CheckCircle2 className="h-5 w-5 text-emerald-300" /> : <Pill tone="slate">Ready</Pill>}
              </div>
            ))}
          </div>
        </GlowCard>

        <div className="space-y-5">
          <GlowCard className="p-6">
            <h3 className="text-lg font-semibold text-white">Generated curriculum graph</h3>
            <p className="mt-1 text-sm text-slate-400">Hard-coded sample output after syllabus upload.</p>
            <div className="mt-5 grid gap-3">
              {curriculumTopics.map((topic, idx) => (
                <div key={topic} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-sky-400/15 text-xs font-semibold text-sky-200">{idx + 1}</div>
                  <div className="flex-1 text-sm font-medium text-white">{topic}</div>
                  <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-sky-400" style={{ width: `${Math.max(25, 100 - idx * 11)}%` }} /></div>
                </div>
              ))}
            </div>
          </GlowCard>
          <div className="grid gap-4 md:grid-cols-2">
            <GlowCard className="p-5">
              <Lock className="h-7 w-7 text-emerald-300" />
              <h3 className="mt-4 font-semibold text-white">Privacy-safe analytics</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Teachers receive anonymized class-level patterns, not individual private chats.</p>
            </GlowCard>
            <GlowCard className="p-5">
              <Download className="h-7 w-7 text-violet-300" />
              <h3 className="mt-4 font-semibold text-white">Offline readiness</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Students can download concept maps for low-connectivity and mobile-first regions.</p>
            </GlowCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Logo, GlowCard, Pill, StudentWorkspace, TeacherDashboard };
