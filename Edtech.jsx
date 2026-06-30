import React, { useState, useEffect, useRef } from "react";

// ---------- Mock data ----------
const QUESTIONS = [
  {
    q: "Which neurotransmitter is primarily deficient in Parkinson's disease?",
    options: ["Serotonin", "Dopamine", "GABA", "Acetylcholine"],
    correct: 1,
    hint: "Think substantia nigra.",
  },
  {
    q: "What is the SI unit of electric resistance?",
    options: ["Volt", "Watt", "Ohm", "Ampere"],
    correct: 2,
    hint: "Named after a German physicist.",
  },
  {
    q: "Which bond is broken when ATP is hydrolyzed to ADP?",
    options: ["Peptide bond", "Phosphoanhydride bond", "Glycosidic bond", "Hydrogen bond"],
    correct: 1,
    hint: "It's a high-energy bond between phosphate groups.",
  },
];

const LEADERS = [
  { name: "Ananya R.", lvl: 22, xp: 18420, you: false },
  { name: "Utkarsh", lvl: 8, xp: 8200, you: true },
  { name: "Rohan K.", lvl: 19, xp: 15110, you: false },
  { name: "Priya S.", lvl: 14, xp: 11900, you: false },
  { name: "Devika M.", lvl: 11, xp: 9800, you: false },
];

const ACHIEVEMENTS = [
  { name: "First Chapter", icon: "📘", unlocked: true },
  { name: "100 MCQs", icon: "🎯", unlocked: true },
  { name: "7 Day Streak", icon: "🔥", unlocked: true },
  { name: "Night Owl", icon: "🦉", unlocked: false },
  { name: "Exam Warrior", icon: "⚔️", unlocked: false },
  { name: "Perfect Score", icon: "💯", unlocked: false },
  { name: "Master Pharmacologist", icon: "🧪", unlocked: false },
  { name: "Legend Rank", icon: "👑", unlocked: false },
];

// ---------- Helpers ----------
function GlassCard({ children, className = "", style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`glass ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function StatPill({ icon, value, color }) {
  return (
    <div className="statpill" style={{ borderColor: color + "55" }}>
      <span style={{ filter: `drop-shadow(0 0 4px ${color})` }}>{icon}</span>
      <span style={{ color }}>{value}</span>
    </div>
  );
}

function XPToast({ text, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="xpToast">{text}</div>;
}

// ---------- Screens ----------
function HomeScreen({ stats, goto, popXP }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  const xpToLevel = stats.xpMax - stats.xp;

  return (
    <div className="screen">
      <TopBar stats={stats} />

      <div className="companionWrap">
        <div className="companionGlow" />
        <div className="companion">🤖</div>
        <div className="speech">
          <div className="speechTitle">{greeting}, Utkarsh</div>
          <div className="speechSub">
            {xpToLevel <= 200
              ? `Only ${xpToLevel} XP left to level up!`
              : "Ready for today's mission?"}
          </div>
        </div>
      </div>

      <GlassCard className="missionCard">
        <div className="missionHeader">
          <span className="missionEyebrow">TODAY'S MISSION</span>
          <span className="missionReward">+150 XP · +40 🪙</span>
        </div>
        <MissionRow label="Study 30 minutes" done={true} />
        <MissionRow label="Complete 20 MCQs" progress="12/20" />
        <MissionRow label="Revise one chapter" done={false} />
      </GlassCard>

      <div className="grid2">
        <ActionTile icon="📖" label="Study" sub="Learn a chapter" onClick={() => goto("study")} accent="#4cc9f0" />
        <ActionTile icon="🎯" label="Practice" sub="MCQ arena" onClick={() => goto("practice")} accent="#9d4edd" />
        <ActionTile icon="🧠" label="Ask AI" sub="Tutor chat" onClick={() => goto("tutor")} accent="#00f5d4" />
        <ActionTile icon="⚔️" label="Battle" sub="Challenge a friend" onClick={() => goto("battle")} accent="#ff6b35" />
      </div>

      <div className="grid3">
        <MiniTile icon="🃏" label="Flashcards" onClick={() => goto("flashcards")} />
        <MiniTile icon="🏆" label="Leaderboard" onClick={() => goto("leaderboard")} />
        <MiniTile icon="🎖️" label="Achievements" onClick={() => goto("achievements")} />
      </div>
    </div>
  );
}

function TopBar({ stats }) {
  const pct = Math.min(100, (stats.xp / stats.xpMax) * 100);
  return (
    <div className="topbar">
      <div className="topbarLeft">
        <div className="avatarRing">🧑‍🚀</div>
        <div>
          <div className="lvlRow">
            <span className="lvlBadge">LVL {stats.level}</span>
            <span className="streak">🔥 {stats.streak}</span>
          </div>
          <div className="xpBarOuter">
            <div className="xpBarInner" style={{ width: pct + "%" }} />
          </div>
          <div className="xpText">{stats.xp}/{stats.xpMax} XP</div>
        </div>
      </div>
      <div className="topbarRight">
        <StatPill icon="🪙" value={stats.coins} color="#ffd60a" />
        <StatPill icon="💎" value={stats.gems} color="#00f5d4" />
        <StatPill icon="⚡" value={stats.energy} color="#4cc9f0" />
      </div>
    </div>
  );
}

function MissionRow({ label, done, progress }) {
  return (
    <div className="missionRow">
      <span className={`checkDot ${done ? "checked" : ""}`}>{done ? "✓" : ""}</span>
      <span className={done ? "missionDone" : ""}>{label}</span>
      {progress && <span className="missionProgress">{progress}</span>}
    </div>
  );
}

function ActionTile({ icon, label, sub, onClick, accent }) {
  return (
    <GlassCard className="actionTile" onClick={onClick} style={{ "--accent": accent }}>
      <div className="actionIcon" style={{ color: accent, textShadow: `0 0 14px ${accent}` }}>{icon}</div>
      <div className="actionLabel">{label}</div>
      <div className="actionSub">{sub}</div>
    </GlassCard>
  );
}

function MiniTile({ icon, label, onClick }) {
  return (
    <GlassCard className="miniTile" onClick={onClick}>
      <div className="miniIcon">{icon}</div>
      <div className="miniLabel">{label}</div>
    </GlassCard>
  );
}

function Header({ title, onBack }) {
  return (
    <div className="header">
      <button className="backBtn" onClick={onBack}>‹</button>
      <div className="headerTitle">{title}</div>
      <div style={{ width: 32 }} />
    </div>
  );
}

function StudyScreen({ goto, stats }) {
  const [subject, setSubject] = useState("Pharmacology");
  const [chapter, setChapter] = useState("Autonomic Nervous System");
  const [open, setOpen] = useState(false);

  const subjects = ["Pharmacology", "Physiology", "Biochemistry", "Mathematics", "Physics"];
  const chapters = {
    Pharmacology: ["Autonomic Nervous System", "Antibiotics", "Cardiovascular Drugs"],
    Physiology: ["Nerve Physiology", "Cardiac Cycle", "Renal Function"],
    Biochemistry: ["Enzymes", "Carbohydrate Metabolism", "Vitamins"],
    Mathematics: ["Differentiation", "Matrices", "Probability"],
    Physics: ["Optics", "Electromagnetism", "Thermodynamics"],
  };

  return (
    <div className="screen">
      <TopBar stats={stats} />
      <Header title="Study Mode" onBack={() => goto("home")} />

      <GlassCard className="formCard">
        <label className="formLabel">Subject</label>
        <div className="chipRow">
          {subjects.map((s) => (
            <button key={s} className={`chip ${subject === s ? "chipActive" : ""}`} onClick={() => { setSubject(s); setChapter(chapters[s][0]); }}>
              {s}
            </button>
          ))}
        </div>

        <label className="formLabel">Chapter</label>
        <div className="chipRow">
          {chapters[subject].map((c) => (
            <button key={c} className={`chip ${chapter === c ? "chipActive" : ""}`} onClick={() => setChapter(c)}>
              {c}
            </button>
          ))}
        </div>

        <button className="primaryBtn" onClick={() => setOpen(true)}>
          ✨ Generate Study Pack
        </button>
      </GlassCard>

      {open && (
        <GlassCard className="studyPack">
          <div className="packTitle">{chapter}</div>
          <PackSection title="Easy Explanation">
            The {chapter.toLowerCase()} controls involuntary body functions through two opposing branches that balance each other to keep the body in equilibrium.
          </PackSection>
          <PackSection title="Mnemonic">
            "SLUDGE" — Salivation, Lacrimation, Urination, Digestion, GI motility, Emesis — classic parasympathetic effects.
          </PackSection>
          <PackSection title="Key Exam Point">
            High-yield: receptor subtypes and their tissue-specific effects are the most repeated exam pattern.
          </PackSection>
          <div className="packActions">
            <button className="ghostBtn">📄 One-click Notes</button>
            <button className="ghostBtn">🃏 Make Flashcards</button>
            <button className="ghostBtn">🗺️ Mind Map</button>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

function PackSection({ title, children }) {
  return (
    <div className="packSection">
      <div className="packSectionTitle">{title}</div>
      <div className="packSectionBody">{children}</div>
    </div>
  );
}

function TutorScreen({ goto, stats }) {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hey Utkarsh — what are we exploring today? Try asking me about a topic instead of an answer key 😉" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  function send() {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    const q = input;
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "ai",
          text: replySim(q),
        },
      ]);
    }, 650);
  }

  function replySim(q) {
    if (/what is|define/i.test(q)) {
      return "Good question — before I hand you the definition, what do you already think it means? That'll help me tailor the explanation. (Demo note: in the live app this is a real GPT-backed tutor response.)";
    }
    return "Let's break that down step by step rather than jumping to the answer. First, what's the core concept this topic is testing? (Demo response — live version reasons through it with you.)";
  }

  return (
    <div className="screen tutorScreen">
      <TopBar stats={stats} />
      <Header title="AI Tutor" onBack={() => goto("home")} />

      <div className="chatWindow">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from === "ai" ? "bubbleAi" : "bubbleUser"}`}>
            {m.from === "ai" && <span className="bubbleTag">🤖 Tutor</span>}
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="chatInputRow">
        <input
          className="chatInput"
          value={input}
          placeholder="Ask about any topic..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="sendBtn" onClick={send}>➤</button>
      </div>
    </div>
  );
}

function PracticeScreen({ goto, stats, addXP, addCoins, loseEnergy }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const q = QUESTIONS[idx];

  function choose(i) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) {
      setScore((s) => s + 1);
      addXP(40);
      addCoins(10);
    } else {
      loseEnergy(5);
      setShowHint(true);
    }
  }

  function next() {
    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1);
      setSelected(null);
      setShowHint(false);
    } else {
      setDone(true);
    }
  }

  return (
    <div className="screen">
      <TopBar stats={stats} />
      <Header title="Practice Arena" onBack={() => goto("home")} />

      {!done ? (
        <GlassCard className="quizCard">
          <div className="quizProgress">Question {idx + 1} of {QUESTIONS.length}</div>
          <div className="quizQ">{q.q}</div>
          <div className="quizOptions">
            {q.options.map((opt, i) => {
              let cls = "quizOpt";
              if (selected !== null) {
                if (i === q.correct) cls += " optCorrect";
                else if (i === selected) cls += " optWrong";
              }
              return (
                <button key={i} className={cls} onClick={() => choose(i)}>
                  {opt}
                </button>
              );
            })}
          </div>
          {showHint && <div className="hintBox">💡 Hint: {q.hint}</div>}
          {selected !== null && (
            <button className="primaryBtn" onClick={next}>
              {idx + 1 < QUESTIONS.length ? "Next Question →" : "Finish"}
            </button>
          )}
        </GlassCard>
      ) : (
        <GlassCard className="resultCard">
          <div className="resultEmoji">🏅</div>
          <div className="resultTitle">{score}/{QUESTIONS.length} Correct</div>
          <div className="resultSub">+{score * 40} XP · +{score * 10} 🪙 earned</div>
          <button className="primaryBtn" onClick={() => goto("home")}>Back to Home</button>
        </GlassCard>
      )}
    </div>
  );
}

function BattleScreen({ goto, stats }) {
  const [matched, setMatched] = useState(false);
  return (
    <div className="screen">
      <TopBar stats={stats} />
      <Header title="Battle Arena" onBack={() => goto("home")} />

      {!matched ? (
        <>
          <div className="grid2">
            <ActionTile icon="⚔️" label="1v1 Quiz" sub="Quick duel" accent="#ff6b35" onClick={() => setMatched(true)} />
            <ActionTile icon="🛡️" label="Team Battle" sub="Squad up" accent="#9d4edd" onClick={() => setMatched(true)} />
            <ActionTile icon="🏫" label="Class Battle" sub="All-class" accent="#4cc9f0" onClick={() => setMatched(true)} />
            <ActionTile icon="🏆" label="Weekly Tournament" sub="Ranked" accent="#ffd60a" onClick={() => setMatched(true)} />
          </div>
        </>
      ) : (
        <GlassCard className="vsCard">
          <div className="vsRow">
            <div className="vsPlayer">
              <div className="vsAvatar">🧑‍🚀</div>
              <div>Utkarsh</div>
              <div className="vsLvl">Lvl {stats.level}</div>
            </div>
            <div className="vsBolt">⚡</div>
            <div className="vsPlayer">
              <div className="vsAvatar">🤺</div>
              <div>Rohan K.</div>
              <div className="vsLvl">Lvl 19</div>
            </div>
          </div>
          <div className="vsStatus">Matchmaking complete — battle starting in demo mode</div>
          <button className="primaryBtn" onClick={() => goto("home")}>Exit to Home</button>
        </GlassCard>
      )}
    </div>
  );
}

function FlashcardsScreen({ goto, stats }) {
  const cards = [
    { front: "What does SLUDGE stand for?", back: "Salivation, Lacrimation, Urination, Digestion, GI motility, Emesis" },
    { front: "SI unit of resistance?", back: "Ohm (Ω)" },
    { front: "ATP hydrolysis breaks which bond?", back: "Phosphoanhydride bond" },
  ];
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="screen">
      <TopBar stats={stats} />
      <Header title="Flashcards" onBack={() => goto("home")} />
      <div className="flashWrap">
        <div className={`flashCard ${flipped ? "flashFlipped" : ""}`} onClick={() => setFlipped((f) => !f)}>
          <div className="flashFace flashFront">{cards[i].front}</div>
          <div className="flashFace flashBack">{cards[i].back}</div>
        </div>
        <div className="flashControls">
          <button className="ghostBtn" onClick={() => { setI((i - 1 + cards.length) % cards.length); setFlipped(false); }}>← Prev</button>
          <span className="flashCount">{i + 1}/{cards.length}</span>
          <button className="ghostBtn" onClick={() => { setI((i + 1) % cards.length); setFlipped(false); }}>Next →</button>
        </div>
      </div>
    </div>
  );
}

function LeaderboardScreen({ goto, stats }) {
  const sorted = [...LEADERS].sort((a, b) => b.xp - a.xp);
  return (
    <div className="screen">
      <TopBar stats={stats} />
      <Header title="Leaderboard" onBack={() => goto("home")} />
      <GlassCard className="lbCard">
        {sorted.map((l, i) => (
          <div key={l.name} className={`lbRow ${l.you ? "lbYou" : ""}`}>
            <span className="lbRank">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</span>
            <span className="lbName">{l.name}{l.you && " (You)"}</span>
            <span className="lbLvl">Lvl {l.lvl}</span>
            <span className="lbXp">{l.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

function AchievementsScreen({ goto, stats }) {
  return (
    <div className="screen">
      <TopBar stats={stats} />
      <Header title="Achievements" onBack={() => goto("home")} />
      <div className="achGrid">
        {ACHIEVEMENTS.map((a) => (
          <GlassCard key={a.name} className={`achTile ${a.unlocked ? "" : "achLocked"}`}>
            <div className="achIcon">{a.unlocked ? a.icon : "🔒"}</div>
            <div className="achName">{a.name}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ---------- App ----------
export default function App() {
  const [screen, setScreen] = useState("home");
  const [toast, setToast] = useState(null);
  const [stats, setStats] = useState({
    level: 8,
    xp: 820,
    xpMax: 1000,
    coins: 560,
    gems: 42,
    streak: 14,
    energy: 85,
  });

  function addXP(n) {
    setStats((s) => {
      let xp = s.xp + n;
      let level = s.level;
      let xpMax = s.xpMax;
      if (xp >= xpMax) {
        xp -= xpMax;
        level += 1;
        xpMax = Math.round(xpMax * 1.1);
        setToast(`🎉 Level Up! Now LVL ${level}`);
      } else {
        setToast(`+${n} XP`);
      }
      return { ...s, xp, level, xpMax };
    });
  }
  function addCoins(n) {
    setStats((s) => ({ ...s, coins: s.coins + n }));
  }
  function loseEnergy(n) {
    setStats((s) => ({ ...s, energy: Math.max(0, s.energy - n) }));
  }

  const screens = {
    home: <HomeScreen stats={stats} goto={setScreen} />,
    study: <StudyScreen stats={stats} goto={setScreen} />,
    tutor: <TutorScreen stats={stats} goto={setScreen} />,
    practice: <PracticeScreen stats={stats} goto={setScreen} addXP={addXP} addCoins={addCoins} loseEnergy={loseEnergy} />,
    battle: <BattleScreen stats={stats} goto={setScreen} />,
    flashcards: <FlashcardsScreen stats={stats} goto={setScreen} />,
    leaderboard: <LeaderboardScreen stats={stats} goto={setScreen} />,
    achievements: <AchievementsScreen stats={stats} goto={setScreen} />,
  };

  return (
    <div className="appOuter">
      <style>{CSS}</style>
      <div className="phoneFrame">
        <div className="phoneNotch" />
        {screens[screen]}
        {toast && <XPToast text={toast} onDone={() => setToast(null)} />}
        <nav className="bottomNav">
          {[
            { k: "home", icon: "🏠" },
            { k: "study", icon: "📖" },
            { k: "practice", icon: "🎯" },
            { k: "tutor", icon: "🧠" },
            { k: "leaderboard", icon: "🏆" },
          ].map((n) => (
            <button
              key={n.k}
              className={`navBtn ${screen === n.k ? "navActive" : ""}`}
              onClick={() => setScreen(n.k)}
            >
              {n.icon}
            </button>
          ))}
        </nav>
    </
