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

// ── Dashboard (placeholder) ───────────────────────────────────────────────────
function Dashboard({ user, auth, setScreen }) {
  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"'Segoe UI',sans-serif" }}>
      <nav style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"16px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:28 }}>🦕</span>
          <span style={{ fontSize:20, fontWeight:700, color:"#0f172a" }}>EconoClassroom</span>
        </div>
        <button onClick={() => signOut(auth)} style={{ padding:"8px 20px", background:"#f1f5f9", color:"#64748b", border:"none", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:600 }}>
          Sign Out
        </button>
      </nav>
      <div style={{ padding:"48px 32px", textAlign:"center" }}>
        <h2 style={{ fontSize:32, color:"#0f172a", marginBottom:8 }}>Welcome! 🦕</h2>
        <p style={{ color:"#64748b", fontSize:16 }}>Your classroom dashboard is being built. Check back soon!</p>
      </div>
    </div>
  );
}
