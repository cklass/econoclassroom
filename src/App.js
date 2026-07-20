import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { saveToFirebase, subscribeToFirebase } from "./firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAtc1-Jp4NudoGc-u-yRBvII0ZgD4DFifQ",
  authDomain: "econoclassroom-9780e.firebaseapp.com",
  databaseURL: "https://econoclassroom-9780e-default-rtdb.firebaseio.com",
  projectId: "econoclassroom-9780e",
  storageBucket: "econoclassroom-9780e.firebasestorage.app",
  messagingSenderId: "862250663734",
  appId: "1:862250663734:web:efbc2b50568341fa6e7d97"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("landing"); // landing, login, register, dashboard

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
      if (u) setScreen("dashboard");
    });
    return unsub;
  }, []);

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0f172a" }}>
      <div style={{ color:"#fff", fontSize:24, fontFamily:"sans-serif" }}>Loading...</div>
    </div>
  );

  if (screen === "dashboard" && user) return <Dashboard user={user} auth={auth} setScreen={setScreen}/>;
  if (screen === "login") return <LoginScreen auth={auth} setScreen={setScreen}/>;
  if (screen === "register") return <RegisterScreen auth={auth} setScreen={setScreen}/>;
  return <LandingPage setScreen={setScreen}/>;
}

// ── Landing Page ──────────────────────────────────────────────────────────────
function LandingPage({ setScreen }) {
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f2a1a 100%)", fontFamily:"'Segoe UI',sans-serif", color:"#fff" }}>
      {/* Nav */}
      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 40px", borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:32 }}>🦕</span>
          <span style={{ fontSize:22, fontWeight:700, letterSpacing:1 }}>EconoClassroom</span>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={() => setScreen("login")} style={{ padding:"10px 24px", background:"transparent", color:"#fff", border:"2px solid rgba(255,255,255,0.3)", borderRadius:8, cursor:"pointer", fontSize:15, fontWeight:600 }}>Log In</button>
          <button onClick={() => setScreen("register")} style={{ padding:"10px 24px", background:"#22c55e", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:15, fontWeight:600 }}>Get Started Free</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign:"center", padding:"80px 40px 60px" }}>
        <div style={{ display:"inline-block", background:"rgba(34,197,94,0.15)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:20, padding:"6px 16px", fontSize:13, color:"#22c55e", marginBottom:24, letterSpacing:1 }}>
          🎉 FREE FOR TEACHERS — NO CREDIT CARD REQUIRED
        </div>
        <h1 style={{ fontSize:"clamp(2.5rem,6vw,4.5rem)", fontWeight:800, margin:"0 0 24px", lineHeight:1.1, background:"linear-gradient(135deg,#fff,#a8d8b5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          Real Financial Literacy.<br/>Real Classroom Fun.
        </h1>
        <p style={{ fontSize:20, color:"rgba(255,255,255,0.7)", maxWidth:600, margin:"0 auto 40px", lineHeight:1.6 }}>
          The classroom economy platform that teaches students to earn, save, invest, and spend — with real stock market data and curriculum-aligned activities.
        </p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => setScreen("register")} style={{ padding:"16px 36px", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:12, cursor:"pointer", fontSize:18, fontWeight:700, boxShadow:"0 8px 24px rgba(34,197,94,0.4)" }}>
            Start Your Free Classroom 🦕
          </button>
          <button style={{ padding:"16px 36px", background:"rgba(255,255,255,0.1)", color:"#fff", border:"2px solid rgba(255,255,255,0.2)", borderRadius:12, cursor:"pointer", fontSize:18, fontWeight:600 }}>
            Watch Demo ▶
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, padding:"40px", maxWidth:1200, margin:"0 auto" }}>
        {[
          { emoji:"💰", title:"Classroom Economy", desc:"Students earn, save and spend a custom currency tied to jobs, behaviour and achievements." },
          { emoji:"📈", title:"Real Stock Market", desc:"Students invest in real TSX-linked stocks and watch their portfolio grow day by day." },
          { emoji:"🎮", title:"Educational Games", desc:"8 engaging games that reinforce financial concepts while keeping students motivated." },
          { emoji:"🏪", title:"Class Store", desc:"Create a reward store where students spend their earnings on privileges and prizes." },
          { emoji:"📊", title:"Live Dashboard", desc:"See every student's balance, job, investments and history in real time." },
          { emoji:"🎓", title:"Curriculum Aligned", desc:"Mapped to Ontario financial literacy expectations — more provinces coming soon." },
        ].map(f => (
          <div key={f.title} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:24 }}>
            <div style={{ fontSize:36, marginBottom:12 }}>{f.emoji}</div>
            <div style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>{f.title}</div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,0.6)", lineHeight:1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign:"center", padding:"40px", borderTop:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.4)", fontSize:13 }}>
        © 2026 EconoClassroom · Built for Canadian teachers 🍁
      </div>
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ auth, setScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true); setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch(e) {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f172a,#1e3a5f)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI',sans-serif" }}>
      <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:24, padding:"48px 40px", width:"100%", maxWidth:420, color:"#fff" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <span style={{ fontSize:48 }}>🦕</span>
          <h2 style={{ fontSize:28, fontWeight:800, margin:"12px 0 4px" }}>Welcome back!</h2>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14 }}>Log in to your EconoClassroom</p>
        </div>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email"
          style={{ width:"100%", padding:"14px 16px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:15, outline:"none", marginBottom:12, boxSizing:"border-box" }}/>
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password"
          onKeyDown={e => e.key==="Enter" && login()}
          style={{ width:"100%", padding:"14px 16px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:15, outline:"none", marginBottom:16, boxSizing:"border-box" }}/>
        {error && <div style={{ color:"#f87171", fontSize:13, marginBottom:12 }}>{error}</div>}
        <button onClick={login} disabled={loading} style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:17, fontWeight:700, marginBottom:16 }}>
          {loading ? "Logging in..." : "Log In"}
        </button>
        <div style={{ textAlign:"center", color:"rgba(255,255,255,0.5)", fontSize:14 }}>
          Don't have an account?{" "}
          <span onClick={() => setScreen("register")} style={{ color:"#22c55e", cursor:"pointer", fontWeight:600 }}>Sign up free</span>
        </div>
        <div style={{ textAlign:"center", marginTop:12 }}>
          <span onClick={() => setScreen("landing")} style={{ color:"rgba(255,255,255,0.3)", cursor:"pointer", fontSize:13 }}>← Back to home</span>
        </div>
      </div>
    </div>
  );
}

// ── Register Screen ───────────────────────────────────────────────────────────
function RegisterScreen({ auth, setScreen }) {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await saveToFirebase(`teachers/${cred.user.uid}/profile`, { name, school, email, createdAt: new Date().toISOString() });
    } catch(e) {
      setError(e.message.includes("email-already-in-use") ? "Email already registered." : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f172a,#1e3a5f)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI',sans-serif" }}>
      <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:24, padding:"48px 40px", width:"100%", maxWidth:420, color:"#fff" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <span style={{ fontSize:48 }}>🦕</span>
          <h2 style={{ fontSize:28, fontWeight:800, margin:"12px 0 4px" }}>Create your classroom</h2>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14 }}>Free forever for individual teachers</p>
        </div>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
          style={{ width:"100%", padding:"14px 16px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:15, outline:"none", marginBottom:12, boxSizing:"border-box" }}/>
        <input value={school} onChange={e => setSchool(e.target.value)} placeholder="School name (optional)"
          style={{ width:"100%", padding:"14px 16px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:15, outline:"none", marginBottom:12, boxSizing:"border-box" }}/>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email"
          style={{ width:"100%", padding:"14px 16px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:15, outline:"none", marginBottom:12, boxSizing:"border-box" }}/>
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (min 6 characters)" type="password"
          onKeyDown={e => e.key==="Enter" && register()}
          style={{ width:"100%", padding:"14px 16px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:15, outline:"none", marginBottom:16, boxSizing:"border-box" }}/>
        {error && <div style={{ color:"#f87171", fontSize:13, marginBottom:12 }}>{error}</div>}
        <button onClick={register} disabled={loading} style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:17, fontWeight:700, marginBottom:16 }}>
          {loading ? "Creating..." : "Create Free Account 🦕"}
        </button>
        <div style={{ textAlign:"center", color:"rgba(255,255,255,0.5)", fontSize:13 }}>
          Already have an account?{" "}
          <span onClick={() => setScreen("login")} style={{ color:"#22c55e", cursor:"pointer", fontWeight:600 }}>Log in</span>
        </div>
        <div style={{ textAlign:"center", marginTop:12 }}>
          <span onClick={() => setScreen("landing")} style={{ color:"rgba(255,255,255,0.3)", cursor:"pointer", fontSize:13 }}>← Back to home</span>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ user, auth }) {
  const [classroom, setClassroom] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsub = subscribeToFirebase(`teachers/${user.uid}/classroom`, data => {
      setClassroom(data);
      setLoading(false);
    });
    return unsub;
  }, [user.uid]);

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f8fafc" }}>
      <div style={{ fontSize:18, color:"#64748b", fontFamily:"'Segoe UI',sans-serif" }}>Loading your classroom...</div>
    </div>
  );

  if (!classroom) return <SetupWizard user={user} auth={auth}/>;
  return <ClassroomApp user={user} auth={auth} classroom={classroom}/>;
}

// ── Setup Wizard ──────────────────────────────────────────────────────────────
const DINO_OPTIONS = [
  { id:"trex",            name:"T-Rex",           emoji:"🦖", color:"#C0392B" },
  { id:"triceratops",     name:"Triceratops",      emoji:"🦕", color:"#1E8449" },
  { id:"stegosaurus",     name:"Stegosaurus",      emoji:"🦕", color:"#6C3483" },
  { id:"brachiosaurus",   name:"Brachiosaurus",    emoji:"🦕", color:"#1A5276" },
  { id:"pterodactyl",     name:"Pterodactyl",      emoji:"🦅", color:"#B7770D" },
  { id:"ankylosaurus",    name:"Ankylosaurus",     emoji:"🦕", color:"#0E6655" },
  { id:"spinosaurus",     name:"Spinosaurus",      emoji:"🦖", color:"#A04000" },
  { id:"velociraptor",    name:"Velociraptor",     emoji:"🦕", color:"#6E4C1E" },
  { id:"diplodocus",      name:"Diplodocus",       emoji:"🦕", color:"#2E4057" },
  { id:"parasaurolophus", name:"Parasaurolophus",  emoji:"🦕", color:"#117A65" },
];

function SetupWizard({ user, auth }) {
  const [step, setStep] = React.useState(1);
  const [className, setClassName] = React.useState("");
  const [currency, setCurrency] = React.useState("Dino Bucks");
  const [currencyEmoji, setCurrencyEmoji] = React.useState("🦕");
  const [grade, setGrade] = React.useState("6");
  const [province, setProvince] = React.useState("Ontario");
  const [students, setStudents] = React.useState([
    { id:1, name:"", dino:"trex" },
    { id:2, name:"", dino:"triceratops" },
    { id:3, name:"", dino:"stegosaurus" },
  ]);
  const [saving, setSaving] = React.useState(false);

  const addStudent = () => {
    const dino = DINO_OPTIONS[students.length % DINO_OPTIONS.length].id;
    setStudents(prev => [...prev, { id: Date.now(), name:"", dino }]);
  };

  const removeStudent = (id) => setStudents(prev => prev.filter(s => s.id !== id));

  const updateStudent = (id, field, value) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, [field]:value } : s));
  };

  const finish = async () => {
    const validStudents = students.filter(s => s.name.trim());
    if (!className.trim()) { alert("Please enter a class name!"); return; }
    if (validStudents.length === 0) { alert("Please add at least one student!"); return; }
    setSaving(true);

    const studentData = validStudents.map(s => ({
      id: Math.random().toString(36).slice(2),
      name: s.name.trim(),
      dinoId: s.dino,
      username: s.name.trim().toLowerCase().replace(/\s+/g,"").slice(0,10),
      password: Math.random().toString(36).slice(2,8),
    }));

    const balances = {};
    studentData.forEach(s => { balances[s.id] = 0; });

    const classroom = {
      name: className.trim(),
      currency, currencyEmoji, grade, province,
      students: studentData,
      balances,
      jobs: [],
      assigned: {},
      txLog: [],
      storeItems: [],
      purchases: [],
      createdAt: new Date().toISOString(),
    };

    await saveToFirebase(`teachers/${user.uid}/classroom`, classroom);
  };

  const stepStyle = (n) => ({
    width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
    background: step >= n ? "#22c55e" : "#e2e8f0",
    color: step >= n ? "#fff" : "#94a3b8",
    fontWeight:700, fontSize:14, flexShrink:0,
  });

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f172a,#1e3a5f)", fontFamily:"'Segoe UI',sans-serif", padding:"40px 20px" }}>
      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:40 }}>
        <span style={{ fontSize:48 }}>🦕</span>
        <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"12px 0 4px" }}>Set Up Your Classroom</h1>
        <p style={{ color:"rgba(255,255,255,0.5)", fontSize:15 }}>Just 2 steps to get started!</p>
      </div>

      {/* Steps indicator */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:40 }}>
        <div style={stepStyle(1)}>1</div>
        <div style={{ width:60, height:2, background: step >= 2 ? "#22c55e" : "#e2e8f0" }}/>
        <div style={stepStyle(2)}>2</div>
        <div style={{ width:60, height:2, background: step >= 3 ? "#22c55e" : "#e2e8f0" }}/>
        <div style={stepStyle(3)}>✓</div>
      </div>

      <div style={{ maxWidth:600, margin:"0 auto", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:24, padding:"40px 36px" }}>

        {/* Step 1: Classroom details */}
        {step === 1 && (
          <div>
            <h2 style={{ color:"#fff", fontSize:22, fontWeight:700, marginBottom:24 }}>📚 Classroom Details</h2>
            <label style={{ color:"rgba(255,255,255,0.7)", fontSize:13, fontWeight:600, display:"block", marginBottom:6 }}>CLASS NAME</label>
            <input value={className} onChange={e => setClassName(e.target.value)} placeholder="e.g. Mr. Klassen's Class 6A"
              style={{ width:"100%", padding:"14px 16px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:15, outline:"none", marginBottom:20, boxSizing:"border-box" }}/>

            <label style={{ color:"rgba(255,255,255,0.7)", fontSize:13, fontWeight:600, display:"block", marginBottom:6 }}>CURRENCY NAME</label>
            <div style={{ display:"flex", gap:8, marginBottom:20 }}>
              <input value={currencyEmoji} onChange={e => setCurrencyEmoji(e.target.value)} maxLength={2}
                style={{ width:60, padding:"14px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:22, outline:"none", textAlign:"center" }}/>
              <input value={currency} onChange={e => setCurrency(e.target.value)} placeholder="Dino Bucks"
                style={{ flex:1, padding:"14px 16px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:15, outline:"none" }}/>
            </div>

            <div style={{ display:"flex", gap:16, marginBottom:20 }}>
              <div style={{ flex:1 }}>
                <label style={{ color:"rgba(255,255,255,0.7)", fontSize:13, fontWeight:600, display:"block", marginBottom:6 }}>GRADE</label>
                <select value={grade} onChange={e => setGrade(e.target.value)}
                  style={{ width:"100%", padding:"14px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"#1e3a5f", color:"#fff", fontSize:15, outline:"none" }}>
                  {["1","2","3","4","5","6","7","8","9","10","11","12",
  "1/2","2/3","3/4","4/5","5/6","6/7","7/8",
  "K","K/1","Multi-grade"].map(g => (
  <option key={g} value={g}>{g.includes("/")||g==="K"||g==="Multi-grade" ? g : `Grade ${g}`}</option>
))}
                </select>
              </div>
              <div style={{ flex:1 }}>
                <label style={{ color:"rgba(255,255,255,0.7)", fontSize:13, fontWeight:600, display:"block", marginBottom:6 }}>PROVINCE</label>
                <select value={province} onChange={e => setProvince(e.target.value)}
                  style={{ width:"100%", padding:"14px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"#1e3a5f", color:"#fff", fontSize:15, outline:"none" }}>
                  {["Ontario","British Columbia","Alberta","Quebec","Manitoba","Saskatchewan","Nova Scotia","New Brunswick","Newfoundland","PEI"].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <button onClick={() => { if (!className.trim()) { alert("Please enter a class name!"); return; } setStep(2); }}
              style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:17, fontWeight:700 }}>
              Next: Add Students →
            </button>
          </div>
        )}

        {/* Step 2: Add students */}
        {step === 2 && (
          <div>
            <h2 style={{ color:"#fff", fontSize:22, fontWeight:700, marginBottom:8 }}>👨‍🎓 Add Your Students</h2>
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, marginBottom:24 }}>Add students now or skip and add them later.</p>

            <div style={{ maxHeight:400, overflowY:"auto", marginBottom:16 }}>
              {students.map((s, i) => (
                <div key={s.id} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:10 }}>
                  <div style={{ color:"rgba(255,255,255,0.4)", fontSize:13, width:24, textAlign:"right", flexShrink:0 }}>{i+1}</div>
                  <input value={s.name} onChange={e => updateStudent(s.id, "name", e.target.value)}
                    placeholder={`Student ${i+1} name`}
                    style={{ flex:1, padding:"11px 14px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:14, outline:"none" }}/>
                  <select value={s.dino} onChange={e => updateStudent(s.id, "dino", e.target.value)}
                    style={{ padding:"11px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"#1e3a5f", color:"#fff", fontSize:13, outline:"none" }}>
                    {DINO_OPTIONS.map(d => <option key={d.id} value={d.id}>{d.emoji} {d.name}</option>)}
                  </select>
                  <button onClick={() => removeStudent(s.id)}
                    style={{ padding:"8px 12px", background:"rgba(239,68,68,0.2)", color:"#f87171", border:"1px solid rgba(239,68,68,0.3)", borderRadius:8, cursor:"pointer", fontSize:16 }}>✕</button>
                </div>
              ))}
            </div>

            <button onClick={addStudent}
              style={{ width:"100%", padding:"12px", background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.7)", border:"1.5px dashed rgba(255,255,255,0.2)", borderRadius:10, cursor:"pointer", fontSize:15, marginBottom:20 }}>
              + Add Another Student
            </button>

            <div style={{ display:"flex", gap:12 }}>
              <button onClick={() => setStep(1)}
                style={{ padding:"14px 24px", background:"rgba(255,255,255,0.08)", color:"#fff", border:"1.5px solid rgba(255,255,255,0.2)", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:600 }}>
                ← Back
              </button>
              <button onClick={finish} disabled={saving}
                style={{ flex:1, padding:"14px", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:17, fontWeight:700 }}>
                {saving ? "Creating classroom..." : "🦕 Launch My Classroom!"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign:"center", marginTop:20 }}>
        <button onClick={() => signOut(auth)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.3)", cursor:"pointer", fontSize:13 }}>Sign out</button>
      </div>
    </div>
  );
}

// ── Classroom App (placeholder) ───────────────────────────────────────────────
// ── Classroom App ─────────────────────────────────────────────────────────────
function ClassroomApp({ user, auth, classroom }) {
  const [tab, setTab] = React.useState("dashboard");
  const [appState, setAppState] = React.useState(classroom);
  const [selected, setSelected] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [payAmt, setPayAmt] = React.useState("");
  const [payReason, setPayReason] = React.useState("Job completed");
  const [deductModal, setDeductModal] = React.useState(false);
  const [deductAmt, setDeductAmt] = React.useState("");
  const [deductReason, setDeductReason] = React.useState("Deduction");

  const fmt = n => `${appState.currencyEmoji}${Number(n).toLocaleString()}`;
  const uuid = () => Math.random().toString(36).slice(2);
  const todayStr = () => new Date().toISOString().slice(0, 10);

  const showToast = (msg, color="#22c55e") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const update = (updater) => {
    const next = updater(appState);
    setAppState(next);
    saveToFirebase(`teachers/${user.uid}/classroom`, next);
  };

  const addTx = (studentId, amount, reason) => {
    update(prev => ({
      ...prev,
      txLog: [{ id:uuid(), studentId, amount, reason, date:todayStr() }, ...(prev.txLog||[])],
      balances: { ...prev.balances, [studentId]: Math.max(0, (prev.balances[studentId]||0) + amount) },
    }));
  };

  const students = appState?.students || [];
  const balances = appState?.balances || {};
  const selStudent = students.find(s => s.id === selected);

  const tabs = [
    { id:"dashboard", label:"🏠 Class" },
    { id:"pay",       label:"💵 Pay" },
    { id:"jobs",      label:"👷 Jobs" },
    { id:"store",     label:"🏪 Store" },
    { id:"history",   label:"📋 History" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"'Segoe UI',sans-serif" }}>
      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", top:20, right:20, background:toast.color, color:"#fff", padding:"12px 24px", borderRadius:12, zIndex:9999, fontWeight:600, boxShadow:"0 8px 24px rgba(0,0,0,0.15)" }}>
          {toast.msg}
        </div>
      )}

      {/* Nav */}
      <nav style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"0 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"16px 0", borderRight:"1px solid #e2e8f0", paddingRight:24, marginRight:8 }}>
            <span style={{ fontSize:24 }}>{appState.currencyEmoji}</span>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:"#0f172a" }}>{appState.name}</div>
              <div style={{ fontSize:12, color:"#94a3b8" }}>Grade {appState.grade} · {appState.province}</div>
            </div>
          </div>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding:"20px 16px", background:"none", border:"none", cursor:"pointer",
              fontSize:14, fontWeight:600, color: tab===t.id ? "#22c55e" : "#64748b",
              borderBottom: tab===t.id ? "2px solid #22c55e" : "2px solid transparent",
              transition:"all 0.2s"
            }}>{t.label}</button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ fontSize:13, color:"#94a3b8" }}>{students.length} students</div>
          <button onClick={() => signOut(auth)} style={{ padding:"8px 20px", background:"#f1f5f9", color:"#64748b", border:"none", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:600 }}>
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ padding:"32px", maxWidth:1400, margin:"0 auto" }}>

        {/* ═══ DASHBOARD ═══ */}
        {tab==="dashboard" && (
          <div>
            {/* Stats row */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16, marginBottom:32 }}>
              {[
                { label:"Total Students", value:students.length, icon:"👨‍🎓", color:"#3b82f6" },
                { label:"Total Currency", value:fmt(Object.values(balances).reduce((a,b)=>a+b,0)), icon:"💰", color:"#22c55e" },
                { label:"Avg Balance", value:fmt(Math.round(Object.values(balances).reduce((a,b)=>a+b,0)/(students.length||1))), icon:"📊", color:"#8b5cf6" },
                { label:"Transactions", value:(appState?.txLog||[]).length, icon:"📋", color:"#f59e0b" },
              ].map(stat => (
                <div key={stat.label} style={{ background:"#fff", borderRadius:16, padding:20, boxShadow:"0 1px 3px rgba(0,0,0,0.1)", border:"1px solid #e2e8f0" }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>{stat.icon}</div>
                  <div style={{ fontSize:24, fontWeight:800, color:stat.color, marginBottom:4 }}>{stat.value}</div>
                  <div style={{ fontSize:13, color:"#94a3b8" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Student grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16 }}>
              {students.sort((a,b) => (balances[b.id]||0) - (balances[a.id]||0)).map(s => {
                const bal = balances[s.id] || 0;
                const dino = DINO_OPTIONS.find(d => d.id === s.dinoId) || DINO_OPTIONS[0];
                const isSelected = selected === s.id;
                return (
                  <div key={s.id} onClick={() => setSelected(isSelected ? null : s.id)}
                    style={{ background:"#fff", borderRadius:16, padding:20, cursor:"pointer", border:`2px solid ${isSelected?"#22c55e":"#e2e8f0"}`,
                      boxShadow: isSelected?"0 4px 16px rgba(34,197,94,0.2)":"0 1px 3px rgba(0,0,0,0.1)", transition:"all 0.2s" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                      <div style={{ width:40, height:40, borderRadius:"50%", background:`${dino.color}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
                        {dino.emoji}
                      </div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14, color:"#0f172a" }}>{s.name}</div>
                        <div style={{ fontSize:12, color:"#94a3b8" }}>{s.username}</div>
                      </div>
                    </div>
                    <div style={{ fontSize:24, fontWeight:800, color:"#22c55e" }}>{fmt(bal)}</div>
                    {isSelected && (
                      <div style={{ display:"flex", gap:8, marginTop:12 }}>
                        <button onClick={e => { e.stopPropagation(); setTab("pay"); }}
                          style={{ flex:1, padding:"8px", background:"#22c55e", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}>💵 Pay</button>
                        <button onClick={e => { e.stopPropagation(); setDeductModal(true); }}
                          style={{ flex:1, padding:"8px", background:"#ef4444", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}>− Deduct</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ PAY ═══ */}
        {tab==="pay" && (
          <div style={{ maxWidth:600 }}>
            <h2 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:24 }}>💵 Pay Students</h2>
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.1)", border:"1px solid #e2e8f0", marginBottom:20 }}>
              <label style={{ fontSize:13, fontWeight:600, color:"#64748b", display:"block", marginBottom:8 }}>SELECT STUDENTS</label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
                <button onClick={() => setSelected("all")}
                  style={{ padding:"8px 16px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:600,
                    background:selected==="all"?"#22c55e":"#f1f5f9", color:selected==="all"?"#fff":"#64748b" }}>
                  🌍 Everyone
                </button>
                {students.map(s => (
                  <button key={s.id} onClick={() => setSelected(s.id)}
                    style={{ padding:"8px 16px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:600,
                      background:selected===s.id?"#22c55e":"#f1f5f9", color:selected===s.id?"#fff":"#64748b" }}>
                    {s.name.split(" ")[0]}
                  </button>
                ))}
              </div>
              <label style={{ fontSize:13, fontWeight:600, color:"#64748b", display:"block", marginBottom:8 }}>AMOUNT</label>
              <input type="number" value={payAmt} onChange={e => setPayAmt(e.target.value)} placeholder="10"
                style={{ width:"100%", padding:"12px 16px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:18, fontWeight:700, outline:"none", marginBottom:16, boxSizing:"border-box" }}/>
              <label style={{ fontSize:13, fontWeight:600, color:"#64748b", display:"block", marginBottom:8 }}>REASON</label>
              <input value={payReason} onChange={e => setPayReason(e.target.value)} placeholder="Job completed, bonus…"
                style={{ width:"100%", padding:"12px 16px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", marginBottom:16, boxSizing:"border-box" }}/>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
                {["Job completed","Great work!","Bonus","Homework done","Helped a classmate","Participation"].map(r => (
                  <button key={r} onClick={() => setPayReason(r)}
                    style={{ padding:"6px 12px", background: payReason===r?"#22c55e":"#f1f5f9", color:payReason===r?"#fff":"#64748b", border:"none", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600 }}>{r}</button>
                ))}
              </div>
              <button onClick={() => {
                const amt = parseInt(payAmt);
                if (!amt || amt <= 0) { showToast("Enter a valid amount!", "#ef4444"); return; }
                if (!selected) { showToast("Select a student first!", "#ef4444"); return; }
                if (selected === "all") {
                  students.forEach(s => addTx(s.id, amt, payReason));
                  showToast(`Paid ${fmt(amt)} to all ${students.length} students!`);
                } else {
                  addTx(selected, amt, payReason);
                  showToast(`Paid ${fmt(amt)} to ${selStudent?.name}!`);
                }
                setPayAmt("");
              }} style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:12, cursor:"pointer", fontSize:16, fontWeight:700 }}>
                💸 Pay {selected === "all" ? "Everyone" : selStudent?.name || "..."}
              </button>
            </div>
          </div>
        )}

        {/* ═══ HISTORY ═══ */}
        {tab==="history" && (
          <div>
            <h2 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:24 }}>📋 Transaction History</h2>
            <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 1px 3px rgba(0,0,0,0.1)", border:"1px solid #e2e8f0", overflow:"hidden" }}>
              {(appState?.txLog||[]).slice(0,50).map((t,i) => {
                const s = students.find(st => st.id === t.studentId);
                return (
                  <div key={t.id} style={{ display:"flex", alignItems:"center", gap:16, padding:"16px 24px", borderBottom:"1px solid #f1f5f9", background: i%2===0?"#fff":"#f8fafc" }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background: t.amount>=0?"#dcfce7":"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
                      {t.amount>=0?"💰":"💸"}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:14, color:"#0f172a" }}>{s?.name || "Unknown"}</div>
                      <div style={{ fontSize:12, color:"#94a3b8" }}>{t.reason} · {t.date}</div>
                    </div>
                    <div style={{ fontWeight:700, fontSize:16, color: t.amount>=0?"#22c55e":"#ef4444" }}>
                      {t.amount>=0?"+":""}{fmt(t.amount)}
                    </div>
                  </div>
                );
              })}
              {(appState?.txLog||[]).length === 0 && (
                <div style={{ padding:48, textAlign:"center", color:"#94a3b8" }}>No transactions yet!</div>
              )}
            </div>
          </div>
        )}

        {/* ═══ JOBS placeholder ═══ */}
        {tab==="jobs" && (
          <div style={{ textAlign:"center", padding:48 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>👷</div>
            <h2 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:8 }}>Jobs Coming Soon!</h2>
            <p style={{ color:"#94a3b8" }}>Job management will be available here.</p>
          </div>
        )}

        {/* ═══ STORE placeholder ═══ */}
        {tab==="store" && (
          <div style={{ textAlign:"center", padding:48 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🏪</div>
            <h2 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:8 }}>Store Coming Soon!</h2>
            <p style={{ color:"#94a3b8" }}>The class store will be available here.</p>
          </div>
        )}

      </div>

      {/* Deduct Modal */}
      {deductModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9998 }}>
          <div style={{ background:"#fff", borderRadius:20, padding:32, width:"100%", maxWidth:400, boxShadow:"0 24px 64px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize:20, fontWeight:800, color:"#0f172a", marginBottom:20 }}>− Deduct from {selStudent?.name}</h3>
            <input type="number" value={deductAmt} onChange={e => setDeductAmt(e.target.value)} placeholder="Amount" autoFocus
              style={{ width:"100%", padding:"12px 16px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:18, fontWeight:700, outline:"none", marginBottom:12, boxSizing:"border-box" }}/>
            <input value={deductReason} onChange={e => setDeductReason(e.target.value)} placeholder="Reason"
              style={{ width:"100%", padding:"12px 16px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", marginBottom:20, boxSizing:"border-box" }}/>
            <div style={{ display:"flex", gap:12 }}>
              <button onClick={() => {
                const a = parseInt(deductAmt||"0");
                if (a > 0 && selected) { addTx(selected, -a, deductReason); showToast(`-${fmt(a)} from ${selStudent?.name}`, "#ef4444"); }
                setDeductModal(false); setDeductAmt(""); setDeductReason("Deduction");
              }} style={{ flex:1, padding:"12px", background:"#ef4444", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:16, fontWeight:700 }}>− Deduct</button>
              <button onClick={() => { setDeductModal(false); setDeductAmt(""); }}
                style={{ padding:"12px 20px", background:"#f1f5f9", color:"#64748b", border:"none", borderRadius:10, cursor:"pointer", fontSize:14, fontWeight:600 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
