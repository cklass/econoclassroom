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
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:24, padding:"40px", maxWidth:1200, margin:"0 auto" }}>
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
                  {["1","2","3","4","5","6","7","8","9","10","11","12"].map(g => <option key={g} value={g}>Grade {g}</option>)}
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
function ClassroomApp({ user, auth, classroom }) {
  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"'Segoe UI',sans-serif" }}>
      <nav style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"16px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:28 }}>{classroom.currencyEmoji}</span>
          <span style={{ fontSize:20, fontWeight:700, color:"#0f172a" }}>{classroom.name}</span>
        </div>
        <button onClick={() => signOut(auth)} style={{ padding:"8px 20px", background:"#f1f5f9", color:"#64748b", border:"none", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:600 }}>
          Sign Out
        </button>
      </nav>
      <div style={{ padding:"48px 32px", textAlign:"center" }}>
        <h2 style={{ fontSize:32, color:"#0f172a", marginBottom:8 }}>🎉 Your classroom is ready!</h2>
        <p style={{ color:"#64748b", fontSize:16, marginBottom:8 }}>{classroom.students?.length || 0} students · Grade {classroom.grade} · {classroom.province}</p>
        <p style={{ color:"#94a3b8", fontSize:14 }}>Full dashboard coming next!</p>
      </div>
    </div>
  );
}