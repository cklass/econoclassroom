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
    const hash = window.location.hash;
    if (hash.startsWith("#parent-")) {
      setScreen(hash.slice(1));
    }
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
      if (u && !window.location.hash.startsWith("#parent-")) setScreen("dashboard");
    });
    return unsub;
  }, []);

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0f1f3d" }}>
      <div style={{ color:"#fff", fontSize:24, fontFamily:"sans-serif" }}>Loading...</div>
    </div>
  );

  if (screen === "dashboard" && user) return <Dashboard user={user} auth={auth} setScreen={setScreen}/>;
  if (screen === "login") return <LoginScreen auth={auth} setScreen={setScreen}/>;
  if (screen === "register") return <RegisterScreen auth={auth} setScreen={setScreen}/>;
  if (screen === "studentlogin") return <StudentLoginScreen setScreen={setScreen}/>;
  if (screen.startsWith("parent-")) return <ParentPortal code={screen.replace("parent-","")} setScreen={setScreen}/>;
  return <LandingPage setScreen={setScreen}/>;
}

// ── Landing Page ──────────────────────────────────────────────────────────────
function LandingPage({ setScreen }) {
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f1f3d 0%,#1e3a5f 50%,#0f2a1a 100%)", fontFamily:"'Inter',sans-serif", color:"#fff" }}>
      {/* Nav */}
      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 40px", borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:32 }}>🦕</span>
          <span style={{ fontSize:22, fontWeight:700, letterSpacing:1 }}>EconoClassroom</span>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={() => setScreen("studentlogin")} style={{ padding:"10px 24px", background:"transparent", color:"#a8d8b5", border:"2px solid rgba(168,216,181,0.4)", borderRadius:8, cursor:"pointer", fontSize:15, fontWeight:600 }}>🦕 Student Login</button>
          <button onClick={() => setScreen("login")} style={{ padding:"10px 24px", background:"transparent", color:"#fff", border:"2px solid rgba(255,255,255,0.3)", borderRadius:8, cursor:"pointer", fontSize:15, fontWeight:600 }}>Log In</button>
          <button onClick={() => setScreen("register")} style={{ padding:"10px 24px", background:"#15803d", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:15, fontWeight:600 }}>Get Started Free</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign:"center", padding:"80px 40px 60px" }}>
        <div style={{ display:"inline-block", background:"rgba(34,197,94,0.15)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:20, padding:"6px 16px", fontSize:13, color:"#15803d", marginBottom:24, letterSpacing:1 }}>
          🎉 FREE FOR TEACHERS — NO CREDIT CARD REQUIRED
        </div>
        <h1 style={{ fontSize:"clamp(2.5rem,6vw,4.5rem)", fontWeight:800, margin:"0 0 24px", lineHeight:1.1, background:"linear-gradient(135deg,#fff,#a8d8b5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          Real Financial Literacy.<br/>Real Classroom Fun.
        </h1>
        <p style={{ fontSize:20, color:"rgba(255,255,255,0.7)", maxWidth:600, margin:"0 auto 40px", lineHeight:1.6 }}>
          The classroom economy platform that teaches students to earn, save, invest, and spend — with real stock market data and curriculum-aligned activities.
        </p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => setScreen("register")} style={{ padding:"16px 36px", background:"linear-gradient(135deg,#15803d,#15803d)", color:"#fff", border:"none", borderRadius:12, cursor:"pointer", fontSize:18, fontWeight:700, boxShadow:"0 8px 24px rgba(34,197,94,0.4)" }}>
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

// ── Parent Portal ─────────────────────────────────────────────────────────────
function ParentPortal({ code, setScreen }) {
  const [data, setData] = React.useState(null);
  const [student, setStudent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [reply, setReply] = React.useState("");
  const [replyingTo, setReplyingTo] = React.useState(null);
  const [error, setError] = React.useState("");
  const [teacherId, setTeacherId] = React.useState(null);

  React.useEffect(() => {
    subscribeToFirebase(`classCodes`, codes => {
      if (!codes) { setError("Invalid link."); setLoading(false); return; }
      let found = false;
      Object.entries(codes).forEach(([, val]) => {
        subscribeToFirebase(`teachers/${val.teacherId}/classroom`, classroom => {
          if (!classroom || found) return;
          const stu = (classroom.students||[]).find(s =>
            (s.parentCode || s.id.slice(0,8).toUpperCase()) === code.toUpperCase()
          );
          if (stu) {
            found = true;
            setData(classroom);
            setStudent(stu);
            setTeacherId(val.teacherId);
            setLoading(false);
          }
        });
      });
      setTimeout(() => { if (!found) { setError("Link not found."); setLoading(false); } }, 3000);
    });
  }, [code]);

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0a1628,#0f1f3d)", fontFamily:"'Inter',sans-serif" }}>
      <div style={{ textAlign:"center", color:"#fff" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🦕</div>
        <div style={{ fontSize:18, fontWeight:600 }}>Loading your child's profile...</div>
      </div>
    </div>
  );

  if (error || !data || !student) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0a1628,#0f1f3d)", fontFamily:"'Inter',sans-serif" }}>
      <div style={{ color:"#fff", textAlign:"center", padding:24 }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🦕</div>
        <div style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>Link not found!</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,0.5)" }}>Please ask your teacher for the correct parent portal link.</div>
      </div>
    </div>
  );

  const fmt = n => `${data.currencyEmoji||"🦕"}${Number(n).toLocaleString()}`;
  const balance = data?.balances?.[student.id] || 0;
  const myTx = (data?.txLog||[]).filter(t => t.studentId === student.id);
  const myMessages = (data?.parentMessages||[]).filter(m => m.to === "all" || m.to === student.id);
  const dino = DINO_OPTIONS.find(d => d.id === student.dinoId) || DINO_OPTIONS[0];
  const job = (data?.jobs||[]).find(j => j.id === (data?.assigned||{})[student.id]);

  // This week's stats
  const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weekTx = myTx.filter(t => new Date(t.date) >= oneWeekAgo);
  const weekEarned = weekTx.filter(t => t.amount > 0).reduce((a,b) => a + b.amount, 0);
  const weekSpent = weekTx.filter(t => t.amount < 0).reduce((a,b) => a + Math.abs(b.amount), 0);
  const weekNet = weekEarned - weekSpent;

  // Portfolio value
  const portfolioValue = (data?.stockPrices && data?.portfolios?.[student.id]) ?
    Object.entries(data.portfolios[student.id]).reduce((sum, [stockId, shares]) => {
      return sum + shares * (data.stockPrices[stockId] || 0);
    }, 0) : 0;

  const sendReply = (msgId) => {
    if (!reply.trim()) return;
    saveToFirebase(`teachers/${teacherId}/classroom/parentMessages`, 
      (data.parentMessages||[]).map(m => m.id === msgId ? 
        { ...m, replies: [...(m.replies||[]), { message:reply, date:new Date().toISOString().slice(0,10), from:"parent" }] } : m
      )
    );
    setReply(""); setReplyingTo(null);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f0f9f4", fontFamily:"'Inter',sans-serif" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#0a1628,#0f1f3d)", padding:"20px 24px" }}>
        <div style={{ maxWidth:680, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>🦕</span>
            <div>
              <div style={{ color:"#fff", fontSize:16, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>EconoClassroom</div>
              <div style={{ color:"#7a9bb5", fontSize:12 }}>Parent Portal · {data.name}</div>
            </div>
          </div>
          <div style={{ background:"rgba(21,128,61,0.3)", border:"1px solid rgba(21,128,61,0.5)", borderRadius:20, padding:"4px 14px", fontSize:12, color:"#a8f0c0", fontWeight:600 }}>
            🔒 Secure View
          </div>
        </div>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"24px 20px" }}>

        {/* Child's dino card */}
        <div style={{ background:"linear-gradient(135deg,#0f1f3d,#15803d)", borderRadius:20, padding:28, marginBottom:20, color:"#fff", boxShadow:"0 8px 32px rgba(15,31,61,0.3)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
            <div style={{ width:64, height:64, borderRadius:18, background:`${dino.color}33`, border:`2px solid ${dino.color}66`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>
              {dino.emoji}
            </div>
            <div>
              <div style={{ fontSize:26, fontWeight:800, fontFamily:"'Space Grotesk',sans-serif" }}>{student.name}</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", marginTop:2 }}>Grade {data.grade} · {data.province}</div>
              {job && <div style={{ fontSize:13, color:"#a8f0c0", marginTop:4 }}>{job.emoji} {job.name} — {fmt(job.pay)}/week</div>}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:14, padding:"14px 16px", textAlign:"center" }}>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)", marginBottom:6, letterSpacing:0.5 }}>BALANCE</div>
              <div style={{ fontSize:24, fontWeight:800, fontFamily:"'Space Grotesk',sans-serif" }}>{fmt(balance)}</div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:14, padding:"14px 16px", textAlign:"center" }}>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)", marginBottom:6, letterSpacing:0.5 }}>THIS WEEK</div>
              <div style={{ fontSize:24, fontWeight:800, fontFamily:"'Space Grotesk',sans-serif", color: weekNet>=0?"#a8f0c0":"#fca5a5" }}>
                {weekNet>=0?"+":""}{fmt(weekNet)}
              </div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:14, padding:"14px 16px", textAlign:"center" }}>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)", marginBottom:6, letterSpacing:0.5 }}>INVESTED</div>
              <div style={{ fontSize:24, fontWeight:800, fontFamily:"'Space Grotesk',sans-serif" }}>{fmt(Math.round(portfolioValue))}</div>
            </div>
          </div>
        </div>

{/* Balance graph */}
        {myTx.length >= 2 && (
          <div style={{ background:"#fff", borderRadius:16, padding:24, marginBottom:20, border:"1px solid #e2e8f0", boxShadow:"0 2px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:16, fontWeight:700, color:"#0f1f3d", marginBottom:4, fontFamily:"'Space Grotesk',sans-serif" }}>📈 Balance History</div>
            <div style={{ fontSize:12, color:"#7a9bb5", marginBottom:16 }}>How {student.name.split(" ")[0]}'s balance has changed over time</div>
            {(() => {
              // Build running balance from oldest to newest
              const sorted = [...myTx].sort((a,b) => a.date.localeCompare(b.date));
              let running = 0;
              const points = sorted.map(t => {
                running += t.amount;
                return { date:t.date, balance:Math.max(0,running) };
              });
              // Dedupe by date — take last balance per day
              const byDate = {};
              points.forEach(p => { byDate[p.date] = p.balance; });
              const data2 = Object.entries(byDate).sort((a,b) => a[0].localeCompare(b[0]));
              if (data2.length < 2) return null;
              const W = 580, H = 140, padL = 48, padR = 16, padT = 16, padB = 28;
              const vals = data2.map(d => d[1]);
              const minV = Math.min(...vals) * 0.9;
              const maxV = Math.max(...vals) * 1.1 || 10;
              const x = i => padL + (i / (data2.length-1)) * (W - padL - padR);
              const y = v => padT + ((maxV - v) / (maxV - minV || 1)) * (H - padT - padB);
              const points2 = data2.map((d,i) => `${x(i)},${y(d[1])}`).join(" ");
              const area = `${x(0)},${H-padB} ${points2} ${x(data2.length-1)},${H-padB}`;
              const isUp = vals[vals.length-1] >= vals[0];
              const lineColor = isUp ? "#15803d" : "#dc2626";
              const fillColor = isUp ? "#f0fdf4" : "#fef2f2";
              // Y axis ticks
              const ticks = [minV, (minV+maxV)/2, maxV].map(v => Math.round(v));
              return (
                <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:140 }}>
                  {/* Grid lines */}
                  {ticks.map(v => (
                    <line key={v} x1={padL} y1={y(v)} x2={W-padR} y2={y(v)} stroke="#f0f0f0" strokeWidth="1"/>
                  ))}
                  {/* Y axis labels */}
                  {ticks.map(v => (
                    <text key={v} x={padL-6} y={y(v)+4} textAnchor="end" fontSize="9" fill="#94a3b8">{fmt(v)}</text>
                  ))}
                  {/* Area fill */}
                  <polygon points={area} fill={fillColor}/>
                  {/* Line */}
                  <polyline points={points2} fill="none" stroke={lineColor} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
                  {/* Current value dot */}
                  <circle cx={x(data2.length-1)} cy={y(vals[vals.length-1])} r={5} fill={lineColor}/>
                  {/* X axis date labels */}
                  {data2.filter((_,i) => i===0 || i===data2.length-1 || i===Math.floor(data2.length/2)).map(([date],i) => (
                    <text key={date} x={x(data2.indexOf(data2.find(d=>d[0]===date)))} y={H-4} textAnchor="middle" fontSize="9" fill="#94a3b8">
                      {new Date(date+"T12:00:00").toLocaleDateString("en-CA",{month:"short",day:"numeric"})}
                    </text>
                  ))}
                </svg>
              );
            })()}
          </div>
        )}

        {/* This week breakdown */}
        <div style={{ background:"#fff", borderRadius:16, padding:24, marginBottom:20, border:"1px solid #e2e8f0", boxShadow:"0 2px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize:16, fontWeight:700, color:"#0f1f3d", marginBottom:16, fontFamily:"'Space Grotesk',sans-serif" }}>📊 This Week's Activity</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ background:"#f0fdf4", borderRadius:12, padding:"14px 16px", border:"1px solid #d4e8dd" }}>
              <div style={{ fontSize:12, color:"#15803d", fontWeight:600, marginBottom:4 }}>💰 Earned</div>
              <div style={{ fontSize:22, fontWeight:800, color:"#15803d", fontFamily:"'Space Grotesk',sans-serif" }}>{fmt(weekEarned)}</div>
              <div style={{ fontSize:11, color:"#7a9bb5", marginTop:4 }}>{weekTx.filter(t=>t.amount>0).length} transactions</div>
            </div>
            <div style={{ background:"#fef2f2", borderRadius:12, padding:"14px 16px", border:"1px solid #fecaca" }}>
              <div style={{ fontSize:12, color:"#dc2626", fontWeight:600, marginBottom:4 }}>💸 Spent/Deducted</div>
              <div style={{ fontSize:22, fontWeight:800, color:"#dc2626", fontFamily:"'Space Grotesk',sans-serif" }}>{fmt(weekSpent)}</div>
              <div style={{ fontSize:11, color:"#7a9bb5", marginTop:4 }}>{weekTx.filter(t=>t.amount<0).length} transactions</div>
            </div>
          </div>
        </div>

        {/* Messages from teacher */}
        {myMessages.length > 0 && (
          <div style={{ background:"#fff", borderRadius:16, padding:24, marginBottom:20, border:"1px solid #e2e8f0", boxShadow:"0 2px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:16, fontWeight:700, color:"#0f1f3d", marginBottom:16, fontFamily:"'Space Grotesk',sans-serif" }}>✉️ Messages from {data.name.split("'")[0]}</div>
            {myMessages.map(msg => (
              <div key={msg.id} style={{ padding:"16px 0", borderBottom:"1px solid #f0f9f4" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                  <div style={{ fontWeight:700, fontSize:15, color:"#0f1f3d" }}>{msg.subject}</div>
                  <div style={{ fontSize:11, color:"#7a9bb5", whiteSpace:"nowrap", marginLeft:12 }}>{formatFullDate(msg.date)}</div>
                </div>
                <div style={{ fontSize:13, color:"#4a6580", lineHeight:1.7, background:"#f8fafc", borderRadius:10, padding:"12px 16px", marginBottom:12 }}>{msg.message}</div>
                {(msg.replies||[]).map((r,i) => (
                  <div key={i} style={{ marginLeft:20, background:"#f0f9f4", borderRadius:10, padding:"10px 14px", border:"1px solid #d4e8dd", marginBottom:8 }}>
                    <div style={{ fontSize:11, color:"#7a9bb5", marginBottom:4 }}>💬 Your reply · {formatFullDate(r.date)}</div>
                    <div style={{ fontSize:13, color:"#0f1f3d" }}>{r.message}</div>
                  </div>
                ))}
                {replyingTo === msg.id ? (
                  <div>
                    <textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Type your reply to the teacher..." rows={3}
                      style={{ width:"100%", padding:"10px 14px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:13, outline:"none", boxSizing:"border-box", resize:"none", fontFamily:"'Inter',sans-serif", marginBottom:8 }}/>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={() => sendReply(msg.id)}
                        style={{ padding:"8px 20px", background:"#15803d", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}>Send Reply</button>
                      <button onClick={() => { setReplyingTo(null); setReply(""); }}
                        style={{ padding:"8px 16px", background:"#f1f5f9", color:"#4a6580", border:"none", borderRadius:8, cursor:"pointer", fontSize:13 }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setReplyingTo(msg.id)}
                    style={{ padding:"6px 16px", background:"#f0f9f4", color:"#15803d", border:"1px solid #d4e8dd", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600 }}>
                    💬 Reply to teacher
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Recent transactions */}
        <div style={{ background:"#fff", borderRadius:16, padding:24, marginBottom:20, border:"1px solid #e2e8f0", boxShadow:"0 2px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize:16, fontWeight:700, color:"#0f1f3d", marginBottom:16, fontFamily:"'Space Grotesk',sans-serif" }}>📋 Recent Transactions</div>
          {myTx.length === 0 ? (
            <div style={{ textAlign:"center", padding:24, color:"#7a9bb5", fontSize:14 }}>No transactions yet!</div>
          ) : (
            myTx.slice(0,15).map(t => (
              <div key={t.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid #f8fafc" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:t.amount>=0?"#f0fdf4":"#fef2f2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
                    {t.amount>=0?"💰":"💸"}
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:500, color:"#0f1f3d" }}>{t.reason}</div>
                    <div style={{ fontSize:11, color:"#7a9bb5" }}>{formatFullDate(t.date)}</div>
                  </div>
                </div>
                <div style={{ fontWeight:700, fontSize:15, color:t.amount>=0?"#15803d":"#dc2626", fontFamily:"'Space Grotesk',sans-serif", whiteSpace:"nowrap", marginLeft:12 }}>
                  {t.amount>=0?"+":""}{fmt(t.amount)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* About EconoClassroom */}
        <div style={{ background:"linear-gradient(135deg,#0a1628,#0f1f3d)", borderRadius:16, padding:24, color:"#fff", textAlign:"center" }}>
          <div style={{ fontSize:28, marginBottom:12 }}>🦕</div>
          <div style={{ fontSize:15, fontWeight:700, marginBottom:8, fontFamily:"'Space Grotesk',sans-serif" }}>About EconoClassroom</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.7, maxWidth:480, margin:"0 auto" }}>
            EconoClassroom teaches financial literacy through a real classroom economy. Your child earns currency through their classroom job, manages weekly expenses, and learns to save and invest — all in a fun, dinosaur-themed environment aligned with the Ontario curriculum.
          </div>
          <div style={{ marginTop:16, fontSize:12, color:"rgba(255,255,255,0.3)" }}>econoclassroom.ca</div>
        </div>

      </div>
    </div>
  );
}

// ── Student Login Screen ──────────────────────────────────────────────────────
function StudentLoginScreen({ setScreen }) {
  const [classCode, setClassCode] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [classroom, setClassroom] = React.useState(null);
  const [studentUser, setStudentUser] = React.useState(null);

  const findClassroom = async () => {
    if (!classCode.trim()) { setError("Enter your class code!"); return; }
    setLoading(true); setError("");
    try {
      // Search for classroom by code
      const data = await new Promise((resolve) => {
        const unsub = subscribeToFirebase(`classCodes/${classCode.trim().toUpperCase()}`, d => {
          unsub();
          resolve(d);
        });
      });
      if (!data) { setError("Class code not found!"); setLoading(false); return; }
      // Get classroom data
      const classData = await new Promise((resolve) => {
        const unsub = subscribeToFirebase(`teachers/${data.teacherId}/classroom`, d => {
          unsub();
          resolve(d);
        });
      });
      setClassroom({ ...classData, teacherId: data.teacherId });
      setLoading(false);
    } catch(e) {
      setError("Something went wrong. Try again!"); setLoading(false);
    }
  };

  const login = () => {
    if (!classroom) return;
    const savedPw = classroom.passwords?.[username.trim().toLowerCase()];
    const match = (classroom.students||[]).find(s => s.username === username.trim().toLowerCase());
    if (!match) { setError("Username not found!"); return; }
    const correctPw = savedPw || match.password;
    if (correctPw !== password) { setError("Wrong password!"); return; }
    setStudentUser({ ...match, teacherId: classroom.teacherId });
  };

  if (studentUser) return <StudentDashboard studentUser={studentUser} classroom={classroom} setScreen={setScreen}/>;

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f1f3d,#1e3a5f)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", padding:20 }}>
      <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:24, padding:"48px 40px", width:"100%", maxWidth:420, color:"#fff" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <span style={{ fontSize:48 }}>🦕</span>
          <h2 style={{ fontSize:28, fontWeight:800, margin:"12px 0 4px" }}>Student Login</h2>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14 }}>Enter your class code to get started</p>
        </div>

        {!classroom ? (
          <>
            <label style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", display:"block", marginBottom:8, letterSpacing:1 }}>CLASS CODE</label>
            <input value={classCode} onChange={e => setClassCode(e.target.value.toUpperCase())}
              placeholder="e.g. ABC123" maxLength={6}
              onKeyDown={e => e.key==="Enter" && findClassroom()}
              style={{ width:"100%", padding:"14px 16px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:22, fontWeight:800, outline:"none", marginBottom:16, boxSizing:"border-box", textAlign:"center", letterSpacing:4 }}/>
            {error && <div style={{ color:"#f87171", fontSize:13, marginBottom:12 }}>{error}</div>}
            <button onClick={findClassroom} disabled={loading}
              style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#15803d,#15803d)", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:17, fontWeight:700, marginBottom:16 }}>
              {loading ? "Finding class..." : "Find My Class →"}
            </button>
          </>
        ) : (
          <>
            <div style={{ background:"rgba(34,197,94,0.15)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:12, padding:"12px 16px", marginBottom:20, textAlign:"center" }}>
              <div style={{ fontSize:13, color:"#15803d", fontWeight:600 }}>✅ {classroom.name}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>Grade {classroom.grade} · {classroom.province}</div>
            </div>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
              style={{ width:"100%", padding:"14px 16px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:15, outline:"none", marginBottom:12, boxSizing:"border-box" }}/>
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password"
              onKeyDown={e => e.key==="Enter" && login()}
              style={{ width:"100%", padding:"14px 16px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:15, outline:"none", marginBottom:16, boxSizing:"border-box" }}/>
            {error && <div style={{ color:"#f87171", fontSize:13, marginBottom:12 }}>{error}</div>}
            <button onClick={login}
              style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#15803d,#15803d)", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:17, fontWeight:700, marginBottom:12 }}>
              Log In 🦕
            </button>
            <button onClick={() => { setClassroom(null); setError(""); }}
              style={{ width:"100%", padding:"10px", background:"transparent", color:"rgba(255,255,255,0.4)", border:"none", cursor:"pointer", fontSize:13 }}>
              ← Different class code
            </button>
          </>
        )}
        <div style={{ textAlign:"center", marginTop:16 }}>
          <span onClick={() => setScreen("landing")} style={{ color:"rgba(255,255,255,0.3)", cursor:"pointer", fontSize:13 }}>← Back to home</span>
        </div>
      </div>
    </div>
  );
}

// ── Student Dashboard ─────────────────────────────────────────────────────────
function StudentDashboard({ studentUser, classroom, setScreen }) {
  const [appState, setAppState] = React.useState(classroom);
  const fmt = n => `${appState.currencyEmoji}${Number(n).toLocaleString()}`;
  const balance = appState?.balances?.[studentUser.id] || 0;
  const myTx = (appState?.txLog||[]).filter(t => t.studentId === studentUser.id);
  const dino = DINO_OPTIONS.find(d => d.id === studentUser.dinoId) || DINO_OPTIONS[0];

  // Subscribe to live updates
  React.useEffect(() => {
    const unsub = subscribeToFirebase(`teachers/${studentUser.teacherId}/classroom`, data => {
      if (data) setAppState(data);
    });
    return unsub;
  }, [studentUser.teacherId]);

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(155deg,#0f1f3d 0%,#1e3a5f 50%,#0f2a1a 100%)", fontFamily:"'Inter',sans-serif", padding:20 }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, background:"rgba(255,255,255,0.05)", borderRadius:14, padding:"10px 16px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:`${dino.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{dino.emoji}</div>
          <div>
            <div style={{ color:"#fff", fontSize:15, fontWeight:700 }}>{studentUser.name}</div>
            <div style={{ color:"#15803d", fontSize:18, fontWeight:800 }}>{fmt(balance)}</div>
          </div>
        </div>
        <button onClick={() => setScreen("landing")}
          style={{ padding:"6px 14px", background:"rgba(255,255,255,0.1)", color:"#fff", border:"1px solid rgba(255,255,255,0.2)", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600 }}>
          🔒 Logout
        </button>
      </div>

      {/* Balance card */}
      <div style={{ background:"linear-gradient(135deg,#1a472a,#15803d)", borderRadius:20, padding:24, marginBottom:20, textAlign:"center", boxShadow:"0 8px 24px rgba(34,197,94,0.3)" }}>
        <div style={{ color:"rgba(255,255,255,0.7)", fontSize:13, marginBottom:4 }}>My Balance</div>
        <div style={{ color:"#fff", fontSize:52, fontWeight:800 }}>{fmt(balance)}</div>
        <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginTop:4 }}>{appState.currency || "Dino Bucks"}</div>
      </div>

      {/* Store */}
      {(appState?.storeItems||[]).filter(i => i.available !== false).length > 0 && (
        <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:20, marginBottom:16 }}>
          <div style={{ color:"#fff", fontSize:16, fontWeight:700, marginBottom:16 }}>🏪 Class Store</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:12 }}>
            {(appState?.storeItems||[]).filter(i => i.available !== false).map(item => {
              const canAfford = balance >= item.price;
              const alreadyPending = (appState?.purchases||[]).some(p => p.studentId===studentUser.id && p.itemId===item.id && p.status==="pending");
              return (
                <div key={item.id} style={{ background:"rgba(255,255,255,0.07)", borderRadius:12, padding:16, border:`1px solid ${canAfford?"rgba(34,197,94,0.3)":"rgba(255,255,255,0.1)"}` }}>
                  <div style={{ fontSize:32, marginBottom:8 }}>{item.emoji}</div>
                  <div style={{ fontWeight:700, fontSize:13, color:"#fff", marginBottom:4 }}>{item.name}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:8 }}>{item.description}</div>
                  <div style={{ fontWeight:800, fontSize:16, color:"#15803d", marginBottom:10 }}>{fmt(item.price)}</div>
                  {alreadyPending ? (
                    <div style={{ fontSize:11, color:"#f59e0b", fontWeight:600 }}>⏳ Pending approval</div>
                  ) : (
                    <button onClick={() => {
                      if (!canAfford) return;
                      const uuid = () => Math.random().toString(36).slice(2);
                      const todayStr = () => new Date().toISOString().slice(0,10);
                      const newPurchase = { id:uuid(), studentId:studentUser.id, studentName:studentUser.name, itemId:item.id, itemName:item.name, price:item.price, status:"pending", date:todayStr() };
                      const next = { ...appState, purchases: [...(appState.purchases||[]), newPurchase] };
                      setAppState(next);
                      saveToFirebase(`teachers/${studentUser.teacherId}/classroom`, next);
                    }} disabled={!canAfford}
                      style={{ width:"100%", padding:"8px", background: canAfford?"linear-gradient(135deg,#15803d,#15803d)":"rgba(255,255,255,0.1)", color:"#fff", border:"none", borderRadius:8, cursor:canAfford?"pointer":"default", fontSize:12, fontWeight:700 }}>
                      {canAfford ? "🛒 Request" : "Can't afford"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent transactions */}
      <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:20 }}>
        <div style={{ color:"#fff", fontSize:16, fontWeight:700, marginBottom:16 }}>📋 Recent Transactions</div>
        {myTx.length === 0 ? (
          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:14, textAlign:"center", padding:20 }}>No transactions yet!</div>
        ) : (
          myTx.slice(0,20).map(t => (
            <div key={t.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <div style={{ color:"#fff", fontSize:14, fontWeight:600 }}>{t.reason}</div>
                <div style={{ color:"rgba(255,255,255,0.4)", fontSize:12 }}>{formatFullDate(t.date)}</div>
              </div>
              <div style={{ fontWeight:800, fontSize:16, color: t.amount>=0?"#15803d":"#ef4444" }}>
                {t.amount>=0?"+":""}{fmt(t.amount)}
              </div>
            </div>
          ))
        )}
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
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f1f3d,#1e3a5f)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif" }}>
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
        <button onClick={login} disabled={loading} style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#15803d,#15803d)", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:17, fontWeight:700, marginBottom:16 }}>
          {loading ? "Logging in..." : "Log In"}
        </button>
        <div style={{ textAlign:"center", color:"rgba(255,255,255,0.5)", fontSize:14 }}>
          Don't have an account?{" "}
          <span onClick={() => setScreen("register")} style={{ color:"#15803d", cursor:"pointer", fontWeight:600 }}>Sign up free</span>
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
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f1f3d,#1e3a5f)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif" }}>
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
        <button onClick={register} disabled={loading} style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#15803d,#15803d)", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:17, fontWeight:700, marginBottom:16 }}>
          {loading ? "Creating..." : "Create Free Account 🦕"}
        </button>
        <div style={{ textAlign:"center", color:"rgba(255,255,255,0.5)", fontSize:13 }}>
          Already have an account?{" "}
          <span onClick={() => setScreen("login")} style={{ color:"#15803d", cursor:"pointer", fontWeight:600 }}>Log in</span>
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
      <div style={{ fontSize:18, color:"#4a6580", fontFamily:"'Inter',sans-serif" }}>Loading your classroom...</div>
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

    const code = Math.random().toString(36).slice(2,8).toUpperCase();
    await saveToFirebase(`teachers/${user.uid}/classroom`, { ...classroom, classCode: code });
    await saveToFirebase(`classCodes/${code}`, { teacherId: user.uid });
  };

  const stepStyle = (n) => ({
    width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
    background: step >= n ? "#15803d" : "#e2e8f0",
    color: step >= n ? "#fff" : "#7a9bb5",
    fontWeight:700, fontSize:14, flexShrink:0,
  });

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f1f3d,#1e3a5f)", fontFamily:"'Inter',sans-serif", padding:"40px 20px" }}>
      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:40 }}>
        <span style={{ fontSize:48 }}>🦕</span>
        <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"12px 0 4px" }}>Set Up Your Classroom</h1>
        <p style={{ color:"rgba(255,255,255,0.5)", fontSize:15 }}>Just 2 steps to get started!</p>
      </div>

      {/* Steps indicator */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:40 }}>
        <div style={stepStyle(1)}>1</div>
        <div style={{ width:60, height:2, background: step >= 2 ? "#15803d" : "#e2e8f0" }}/>
        <div style={stepStyle(2)}>2</div>
        <div style={{ width:60, height:2, background: step >= 3 ? "#15803d" : "#e2e8f0" }}/>
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
              style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#15803d,#15803d)", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:17, fontWeight:700 }}>
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
                style={{ flex:1, padding:"14px", background:"linear-gradient(135deg,#15803d,#15803d)", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:17, fontWeight:700 }}>
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

// ── SCDSB 5-Day Cycle Calculator 2026-27 ─────────────────────────────────────
const SCDSB_NON_INSTRUCTIONAL = new Set([
  // EP Days
  "2026-09-02","2026-09-03","2026-11-20",
  "2027-01-29","2027-04-30","2027-06-04","2027-06-30",
  // Holidays
  "2026-09-07","2026-10-12",
  "2026-12-21","2026-12-22","2026-12-23","2026-12-24","2026-12-25",
  "2026-12-26","2026-12-27","2026-12-28","2026-12-29","2026-12-30","2026-12-31",
  "2027-01-01","2027-02-15",
  "2027-03-15","2027-03-16","2027-03-17","2027-03-18","2027-03-19",
  "2027-03-26","2027-03-29","2027-05-24",
  // ETD (no students)
  "2026-09-29",
  // RC Days
  "2026-11-13","2027-02-18","2027-06-25",
]);

const SCHOOL_START = "2026-08-01";

function getSCDSBCycleDay(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr + "T12:00:00");
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return null; // weekend
  if (SCDSB_NON_INSTRUCTIONAL.has(dateStr)) return null; // non-instructional

  // Count instructional days from start
  const start = new Date(SCHOOL_START + "T12:00:00");
  if (date < start) return null;

  let count = 0;
  const d = new Date(start);
  while (d <= date) {
    const ds = d.toISOString().slice(0,10);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6 && !SCDSB_NON_INSTRUCTIONAL.has(ds)) {
      count++;
    }
    d.setDate(d.getDate() + 1);
  }
  return ((count - 1) % 5) + 1;
}

function formatFullDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr + "T12:00:00");
  const dayName = date.toLocaleDateString("en-CA", { weekday:"long" });
  const fullDate = date.toLocaleDateString("en-CA", { month:"long", day:"numeric", year:"numeric" });
  const cycleDay = getSCDSBCycleDay(dateStr);
  return `${dayName}, ${fullDate}${cycleDay ? ` · Day ${cycleDay}` : ""}`;
}

// ── Classroom App ─────────────────────────────────────────────────────────────
function ClassroomApp({ user, auth, classroom }) {
  const [parentMessage, setParentMessage] = React.useState("");
  const [parentMessageStudent, setParentMessageStudent] = React.useState("all");
  const [parentSubject, setParentSubject] = React.useState("");
  const [newExpenseName, setNewExpenseName] = React.useState("");
  const [newExpenseAmount, setNewExpenseAmount] = React.useState("");
  const [newExpenseEmoji, setNewExpenseEmoji] = React.useState("💸");
  const [fineStudent, setFineStudent] = React.useState("");
  const [fineAmount, setFineAmount] = React.useState("");
  const [fineReason, setFineReason] = React.useState("");
  const [paydayDone, setPaydayDone] = React.useState(false);
  const [dailyEventsDone, setDailyEventsDone] = React.useState(false);
  const [newItemName, setNewItemName] = React.useState("");
  const [newItemPrice, setNewItemPrice] = React.useState("");
  const [newItemDesc, setNewItemDesc] = React.useState("");
  const [newItemEmoji, setNewItemEmoji] = React.useState("🎁");
  const [newJobName, setNewJobName] = React.useState("");
  const [newJobPay, setNewJobPay] = React.useState("10");
  const [newJobEmoji, setNewJobEmoji] = React.useState("⭐");
  const [tab, setTab] = React.useState("dashboard");
  const [appState, setAppState] = React.useState(classroom);
  const [selected, setSelected] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [payAmt, setPayAmt] = React.useState("");
  const [payReason, setPayReason] = React.useState("Job completed");
  const [deductModal, setDeductModal] = React.useState(false);
  const [deductAmt, setDeductAmt] = React.useState("");
  const [deductReason, setDeductReason] = React.useState("Deduction");
  const [dinoPos, setDinoPos] = React.useState(-100);
  const [splashOpacity, setSplashOpacity] = React.useState(1);
  const [showDino, setShowDino] = React.useState(true);
  const [payMulti, setPayMulti] = React.useState(false);
  const [multiSelected, setMultiSelected] = React.useState([]);

  const fmt = n => `${appState.currencyEmoji}${Number(n).toLocaleString()}`;
  const uuid = () => Math.random().toString(36).slice(2);
  const todayStr = () => new Date().toISOString().slice(0, 10);

  // Startup dino splash
  React.useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashOpacity(0), 1500);
    const hideTimer = setTimeout(() => setShowDino(false), 2100);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  const showToast = (msg, color="#15803d") => {
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
  const totalBalance = Object.values(balances).reduce((a,b) => a+b, 0);

  const tabs = [
    { id:"dashboard", label:"🏠 Class" },
    { id:"pay",       label:"💵 Pay" },
    { id:"jobs",      label:"👷 Jobs" },
    { id:"store",     label:"🏪 Store" },
    { id:"economy",   label:"🌍 Economy" },
    { id:"parents",   label:"👨‍👩‍👧 Parents" },
    { id:"history",   label:"📋 History" },
  ];

  const DINO_EMOJIS = ["🦕","🦖","🦕","🦖"];
  const randDino = DINO_EMOJIS[Math.floor(Math.random() * DINO_EMOJIS.length)];

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(180deg,#0f1f3d 0px,#1e293b 60px,#f0f9f4 140px)", fontFamily:"'Inter',system-ui,sans-serif" }}>

      {/* Startup dino animation */}
      {showDino && (
        <div style={{ position:"fixed", inset:0, zIndex:9999, pointerEvents:"none",
          background:"linear-gradient(135deg,#0f1f3d,#1e3a5f)",
          display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column",
          opacity:splashOpacity, transition:"opacity 0.6s ease" }}>
          <style>{`
            @keyframes wiggle { 0%{transform:rotate(0deg) scale(1)} 25%{transform:rotate(-15deg) scale(1.2)} 50%{transform:rotate(15deg) scale(0.9)} 75%{transform:rotate(-10deg) scale(1.3)} 100%{transform:rotate(0deg) scale(1)} }
            @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
            @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-40px)} }
            @keyframes grow { 0%{transform:scale(1)} 50%{transform:scale(1.8)} 100%{transform:scale(1)} }
          `}</style>
          <div style={{ fontSize:100, animation:`${["wiggle 0.6s ease 0.8s","spin 0.8s ease 0.8s","bounce 0.6s ease 0.8s","grow 0.6s ease 0.8s"][Math.floor(Math.random()*4)]}` }}>🦕</div>
          <div style={{ color:"#fff", fontSize:32, fontWeight:800, marginTop:20, letterSpacing:2 }}>EconoClassroom</div>
          <div style={{ color:"#15803d", fontSize:15, marginTop:8 }}>Real financial literacy. Real classroom fun.</div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", top:20, right:20, background:toast.color, color:"#fff", padding:"12px 24px", borderRadius:12, zIndex:9998, fontWeight:600, boxShadow:"0 8px 24px rgba(0,0,0,0.15)", fontSize:14 }}>
          {toast.msg}
        </div>
      )}

      {/* Nav */}
      <nav style={{ background:"#0f1f3d", padding:"0 32px", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 4px 16px rgba(0,0,0,0.3)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"16px 24px 16px 0", marginRight:16, borderRight:"1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize:22 }}>{appState.currencyEmoji}</span>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:"#fff" }}>{appState.name}</div>
              <div style={{ fontSize:11, color:"#4a6580" }}>Grade {appState.grade} · {appState.province}</div>
            </div>
          </div>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding:"20px 18px", background:"none", border:"none", cursor:"pointer",
              fontSize:13, fontWeight:600, color: tab===t.id ? "#15803d" : "#7a9bb5",
              borderBottom: tab===t.id ? "2px solid #15803d" : "2px solid transparent",
              transition:"all 0.15s", whiteSpace:"nowrap"
            }}>{t.label}</button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#15803d" }}>{fmt(totalBalance)}</div>
            <div style={{ fontSize:11, color:"#4a6580" }}>total in circulation</div>
          </div>
          <button onClick={() => signOut(auth)} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.08)", color:"#7a9bb5", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}>
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ padding:"24px 32px", maxWidth:1600, margin:"0 auto" }}>

        {/* ═══ DASHBOARD ═══ */}
        {tab==="dashboard" && (
          <div>
            {/* Stats strip */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
              {[
                { label:"Students", value:students.length, icon:"👨‍🎓", color:"#3b82f6", bg:"#eff6ff" },
                { label:"In Circulation", value:fmt(totalBalance), icon:"💰", color:"#15803d", bg:"#f0fdf4" },
                { label:"Avg Balance", value:fmt(Math.round(totalBalance/(students.length||1))), icon:"📊", color:"#8b5cf6", bg:"#f5f3ff" },
                { label:"Transactions", value:(appState?.txLog||[]).length, icon:"📋", color:"#f59e0b", bg:"#fffbeb" },
              ].map(stat => (
                <div key={stat.label} style={{ background:"#fff", borderRadius:12, padding:"16px 20px", boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:stat.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{stat.icon}</div>
                  <div>
                    <div style={{ fontSize:22, fontWeight:800, color:stat.color }}>{stat.value}</div>
                    <div style={{ fontSize:12, color:"#7a9bb5", fontWeight:500 }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Student grid - compact to fit all on screen */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))", gap:10 }}>
              {students.sort((a,b) => (balances[b.id]||0) - (balances[a.id]||0)).map(s => {
                const bal = balances[s.id] || 0;
                const dino = DINO_OPTIONS.find(d => d.id === s.dinoId) || DINO_OPTIONS[0];
                const isSelected = selected === s.id;
                const job = (appState?.jobs||[]).find(j => j.id === (appState?.assigned||{})[s.id]);
                return (
                  <div key={s.id} onClick={() => setSelected(isSelected ? null : s.id)}
                    style={{ background:"#fff", borderRadius:12, padding:"14px 12px", cursor:"pointer",
                      border:`2px solid ${isSelected?"#15803d":"#e2e8f0"}`,
                      boxShadow: isSelected?"0 4px 16px rgba(34,197,94,0.15)":"0 1px 3px rgba(0,0,0,0.06)",
                      transition:"all 0.15s" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <div style={{ width:32, height:32, borderRadius:8, background:`${dino.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
                        {dino.emoji}
                      </div>
                      <div style={{ overflow:"hidden" }}>
                        <div style={{ fontWeight:700, fontSize:12, color:"#0f1f3d", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.name}</div>
                        <div style={{ fontSize:10, color:"#7a9bb5", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{job ? `${job.emoji} ${job.name}` : "No job"}</div>
                      </div>
                    </div>
                    <div style={{ fontSize:20, fontWeight:800, color:"#15803d" }}>{fmt(bal)}</div>
                    {isSelected && (
                      <div style={{ display:"flex", gap:6, marginTop:10 }}>
                        <button onClick={e => { e.stopPropagation(); setTab("pay"); }}
                          style={{ flex:1, padding:"6px", background:"#15803d", color:"#fff", border:"none", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:700 }}>💵 Pay</button>
                        <button onClick={e => { e.stopPropagation(); setDeductModal(true); }}
                          style={{ flex:1, padding:"6px", background:"#ef4444", color:"#fff", border:"none", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:700 }}>− Deduct</button>
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
          <div style={{ maxWidth:800, margin:"0 auto" }}>
            <h2 style={{ fontSize:22, fontWeight:800, color:"#0f1f3d", marginBottom:24 }}>💵 Pay Students</h2>
            <div style={{ background:"#fff", borderRadius:16, padding:28, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0" }}>
              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:12, fontWeight:700, color:"#4a6580", display:"block", marginBottom:8, letterSpacing:0.5 }}>SELECT RECIPIENT</label>
                <div style={{ display:"flex", gap:8, marginBottom:12 }}>
                  <button onClick={() => { setSelected("all"); setMultiSelected([]); setPayMulti(false); }}
                    style={{ padding:"8px 16px", borderRadius:8, border:`2px solid ${selected==="all"?"#15803d":"#e2e8f0"}`, cursor:"pointer", fontSize:13, fontWeight:600,
                      background:selected==="all"?"#15803d":"#fff", color:selected==="all"?"#fff":"#4a6580" }}>
                    🌍 Everyone
                  </button>
                  <button onClick={() => { setPayMulti(!payMulti); setSelected(null); setMultiSelected([]); }}
                    style={{ padding:"8px 16px", borderRadius:8, border:`2px solid ${payMulti?"#8b5cf6":"#e2e8f0"}`, cursor:"pointer", fontSize:13, fontWeight:600,
                      background:payMulti?"#8b5cf6":"#fff", color:payMulti?"#fff":"#4a6580" }}>
                    ☑️ Select Multiple
                  </button>
                  {payMulti && (
                    <>
                      <button onClick={() => setMultiSelected(students.map(s=>s.id))}
                        style={{ padding:"8px 16px", borderRadius:8, border:"2px solid #e2e8f0", cursor:"pointer", fontSize:13, fontWeight:600, background:"#fff", color:"#4a6580" }}>
                        Select All
                      </button>
                      <button onClick={() => setMultiSelected([])}
                        style={{ padding:"8px 16px", borderRadius:8, border:"2px solid #e2e8f0", cursor:"pointer", fontSize:13, fontWeight:600, background:"#fff", color:"#4a6580" }}>
                        Clear
                      </button>
                    </>
                  )}
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {students.map(s => {
                    const dino = DINO_OPTIONS.find(d => d.id === s.dinoId) || DINO_OPTIONS[0];
                    const isMultiSel = multiSelected.includes(s.id);
                    const isSingleSel = selected === s.id && !payMulti;
                    return (
                      <button key={s.id} onClick={() => {
                        if (payMulti) {
                          setMultiSelected(prev => prev.includes(s.id) ? prev.filter(id=>id!==s.id) : [...prev, s.id]);
                        } else {
                          setSelected(s.id); setPayMulti(false);
                        }
                      }} style={{ padding:"8px 14px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600,
                        border:`2px solid ${payMulti?(isMultiSel?"#8b5cf6":"#e2e8f0"):(isSingleSel?"#15803d":"#e2e8f0")}`,
                        background:payMulti?(isMultiSel?"#8b5cf6":"#fff"):(isSingleSel?"#15803d":"#fff"),
                        color:payMulti?(isMultiSel?"#fff":"#4a6580"):(isSingleSel?"#fff":"#4a6580"),
                        display:"flex", alignItems:"center", gap:6 }}>
                        <span>{dino.emoji}</span>{s.name}
                      </button>
                    );
                  })}
                </div>
                {payMulti && multiSelected.length > 0 && (
                  <div style={{ marginTop:10, fontSize:13, color:"#8b5cf6", fontWeight:600 }}>
                    {multiSelected.length} student{multiSelected.length>1?"s":""} selected
                  </div>
                )}
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
                <div>
                  <label style={{ fontSize:12, fontWeight:700, color:"#4a6580", display:"block", marginBottom:8, letterSpacing:0.5 }}>AMOUNT</label>
                  <input type="number" value={payAmt} onChange={e => setPayAmt(e.target.value)} placeholder="10"
                    style={{ width:"100%", padding:"12px 16px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:20, fontWeight:800, outline:"none", boxSizing:"border-box" }}/>
                  <div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
                    {[1,2,5,10,20,50].map(a => (
                      <button key={a} onClick={() => setPayAmt(String(a))}
                        style={{ padding:"4px 10px", background:"#f0f9f4", border:"none", borderRadius:6, cursor:"pointer", fontSize:12, fontWeight:600, color:"#4a6580" }}>{fmt(a)}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize:12, fontWeight:700, color:"#4a6580", display:"block", marginBottom:8, letterSpacing:0.5 }}>REASON</label>
                  <input value={payReason} onChange={e => setPayReason(e.target.value)} placeholder="Job completed…"
                    style={{ width:"100%", padding:"12px 16px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box" }}/>
                  <div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
                    {["Job completed","Great work!","Bonus","Participation"].map(r => (
                      <button key={r} onClick={() => setPayReason(r)}
                        style={{ padding:"4px 10px", background: payReason===r?"#15803d":"#f0f9f4", color:payReason===r?"#fff":"#4a6580", border:"none", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:600 }}>{r}</button>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => {
                const amt = parseInt(payAmt);
                if (!amt || amt <= 0) { showToast("Enter a valid amount!", "#ef4444"); return; }
                if (payMulti) {
                  if (multiSelected.length === 0) { showToast("Select at least one student!", "#ef4444"); return; }
                  multiSelected.forEach(id => addTx(id, amt, payReason));
                  showToast(`Paid ${fmt(amt)} to ${multiSelected.length} students! 🎉`);
                  setMultiSelected([]);
                } else if (selected === "all") {
                  students.forEach(s => addTx(s.id, amt, payReason));
                  showToast(`Paid ${fmt(amt)} to all ${students.length} students! 🎉`);
                } else if (selected) {
                  addTx(selected, amt, payReason);
                  showToast(`Paid ${fmt(amt)} to ${selStudent?.name}! 💰`);
                } else {
                  showToast("Select a student first!", "#ef4444"); return;
                }
                setPayAmt("");
              }} style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#15803d,#15803d)", color:"#fff", border:"none", borderRadius:12, cursor:"pointer", fontSize:16, fontWeight:700, boxShadow:"0 4px 12px rgba(34,197,94,0.3)" }}>
                💸 Pay {payMulti ? `${multiSelected.length} Students` : selected === "all" ? `Everyone (${students.length})` : selStudent?.name || "..."}
              </button>
            </div>
          </div>
        )}



{/* ═══ ECONOMY ═══ */}
        {tab==="economy" && (
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <h2 style={{ fontSize:22, fontWeight:800, color:"#0f1f3d", marginBottom:24 }}>🌍 Classroom Economy</h2>

            {/* Morning Events Button */}
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", marginBottom:24 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
                <div>
                  <div style={{ fontSize:16, fontWeight:800, color:"#0f1f3d", marginBottom:4 }}>🌅 Daily Dino Events</div>
                  <div style={{ fontSize:13, color:"#7a9bb5" }}>Fire one random event per student. Click every morning!</div>
                </div>
                <button onClick={() => {
                  const GOOD_EVENTS = [
                    { reason:"🥚 Found a dinosaur egg! Sold it to a museum", amount:12 },
                    { reason:"🦕 Won the Dino Spelling Bee! Prize money", amount:8 },
                    { reason:"🌿 Dino garden produced extra food. Sold at market", amount:6 },
                    { reason:"🏆 Featured in Dino Times newspaper! Appearance fee", amount:10 },
                    { reason:"🦷 Tooth fairy visited your dino!", amount:5 },
                    { reason:"♻️ Recycled dino bones. Environmental bonus", amount:4 },
                    { reason:"📸 Your dino went viral on DinoGram! Ad revenue", amount:9 },
                    { reason:"🎵 Busked downtown as a dino musician", amount:6 },
                    { reason:"🏠 Rented out your dino cave for the weekend", amount:11 },
                    { reason:"🎰 Won the Dino Lottery! Lucky you", amount:15 },
                  ];
                  const BAD_EVENTS = [
                    { reason:"☄️ Meteor cracked your Chromebook screen! Repair bill", amount:-10 },
                    { reason:"🦖 Your T-Rex sneezed on a classmate. Apology flowers", amount:-5 },
                    { reason:"🌋 Volcanic ash clogged the AC unit. Emergency repair fee", amount:-8 },
                    { reason:"🦟 Dino mosquito infestation! Pest control", amount:-6 },
                    { reason:"🌊 Flooded your desk area. Cleanup crew", amount:-7 },
                    { reason:"🦴 Lost your Chromebook charger. Replacement", amount:-5 },
                    { reason:"📱 Caught using your dino-phone in class! Fine", amount:-8 },
                    { reason:"💤 Fell asleep in class! Coffee fine", amount:-5 },
                    { reason:"🍕 Dropped lunch on the classroom floor. Cleaning fee", amount:-3 },
                    { reason:"🦟 Dino mosquito bit you! Medical bill", amount:-4 },
                  ];
                  students.forEach(s => {
                    const isGood = Math.random() > 0.5;
                    const events = isGood ? GOOD_EVENTS : BAD_EVENTS;
                    const event = events[Math.floor(Math.random()*events.length)];
                    addTx(s.id, event.amount, event.reason);
                  });
                  setDailyEventsDone(true);
                  showToast("🎲 Daily Dino Events fired for all students!");
                }} style={{
                  padding:"14px 28px", border:"none", borderRadius:12, cursor:"pointer", fontSize:15, fontWeight:700,
                  background: dailyEventsDone ? "linear-gradient(135deg,#15803d,#15803d)" : "linear-gradient(135deg,#f59e0b,#d97706)",
                  color:"#fff", boxShadow: dailyEventsDone ? "0 4px 12px rgba(34,197,94,0.3)" : "0 4px 12px rgba(245,158,11,0.4)",
                  animation: dailyEventsDone ? "none" : "pulse 2s infinite",
                }}>
                  {dailyEventsDone ? "✅ Events Fired Today!" : "🎲 Fire Daily Events"}
                </button>
              </div>
              <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.7} }`}</style>
            </div>

            {/* Payday Friday Button */}
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", marginBottom:24 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
                <div>
                  <div style={{ fontSize:16, fontWeight:800, color:"#0f1f3d", marginBottom:4 }}>💰 Payday Friday</div>
                  <div style={{ fontSize:13, color:"#7a9bb5" }}>Pays all salaries, deducts all weekly expenses, and fires weekly awards.</div>
                </div>
                <button onClick={() => {
                  // Pay salaries
                  students.forEach(s => {
                    const job = (appState?.jobs||[]).find(j => j.id === (appState?.assigned||{})[s.id]);
                    if (job) addTx(s.id, job.pay, `${job.emoji} ${job.name} salary`);
                  });
                  // Deduct expenses
                  (appState?.expenses||[]).forEach(exp => {
                    students.forEach(s => addTx(s.id, -exp.amount, `${exp.emoji} ${exp.name}`));
                  });
                  // Weekly awards
                  const topInvestor = [...students].sort((a,b) => (appState?.balances?.[b.id]||0) - (appState?.balances?.[a.id]||0))[0];
                  if (topInvestor) addTx(topInvestor.id, 5, "🏆 Top Balance Award bonus!");
                  setPaydayDone(true);
                  showToast("💰 Payday complete! Salaries paid, expenses deducted!");
                }} style={{
                  padding:"14px 28px", border:"none", borderRadius:12, cursor:"pointer", fontSize:15, fontWeight:700,
                  background:"linear-gradient(135deg,#8b5cf6,#7c3aed)", color:"#fff",
                  boxShadow:"0 4px 12px rgba(139,92,246,0.3)"
                }}>
                  💰 Run Payday Friday
                </button>
              </div>
            </div>

            {/* Weekly Expenses */}
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", marginBottom:24 }}>
              <div style={{ fontSize:16, fontWeight:800, color:"#0f1f3d", marginBottom:16 }}>📋 Weekly Expenses</div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:16 }}>
                <input value={newExpenseEmoji} onChange={e => setNewExpenseEmoji(e.target.value)} maxLength={2}
                  style={{ width:56, padding:"10px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:22, textAlign:"center", outline:"none" }}/>
                <input value={newExpenseName} onChange={e => setNewExpenseName(e.target.value)} placeholder="Expense name"
                  style={{ flex:1, minWidth:140, padding:"10px 14px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none" }}/>
                <input value={newExpenseAmount} onChange={e => setNewExpenseAmount(e.target.value)} type="number" placeholder="Amount"
                  style={{ width:90, padding:"10px 14px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none" }}/>
                <button onClick={() => {
                  if (!newExpenseName.trim()) return;
                  const exp = { id:uuid(), name:newExpenseName.trim(), amount:parseInt(newExpenseAmount)||5, emoji:newExpenseEmoji };
                  update(prev => ({ ...prev, expenses: [...(prev.expenses||[]), exp] }));
                  setNewExpenseName(""); setNewExpenseAmount(""); setNewExpenseEmoji("💸");
                  showToast(`${exp.emoji} "${exp.name}" expense added!`);
                }} style={{ padding:"10px 20px", background:"#ef4444", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:14, fontWeight:700 }}>
                  + Add Expense
                </button>
              </div>
              {/* Default expenses quick-add */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#7a9bb5", marginBottom:8 }}>QUICK ADD:</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {[
                    { emoji:"🪑", name:"Desk Rental", amount:8 },
                    { emoji:"💡", name:"Electricity", amount:3 },
                    { emoji:"💻", name:"Chromebook Fee", amount:4 },
                    { emoji:"🌡️", name:"Climate Control", amount:2 },
                    { emoji:"🚰", name:"Water & Facilities", amount:1 },
                  ].map(exp => (
                    <button key={exp.name} onClick={() => {
                      update(prev => ({ ...prev, expenses: [...(prev.expenses||[]), { id:uuid(), ...exp }] }));
                      showToast(`${exp.emoji} "${exp.name}" added!`);
                    }} style={{ padding:"6px 12px", background:"#f8fafc", border:"2px solid #e2e8f0", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600, color:"#4a6580" }}>
                      {exp.emoji} {exp.name} (-{fmt(exp.amount)}/wk)
                    </button>
                  ))}
                </div>
              </div>
              {(appState?.expenses||[]).length > 0 ? (
                <div>
                  {(appState?.expenses||[]).map(exp => (
                    <div key={exp.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid #f0f9f4" }}>
                      <span style={{ fontSize:20 }}>{exp.emoji}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:600, fontSize:14, color:"#0f1f3d" }}>{exp.name}</div>
                        <div style={{ fontSize:12, color:"#ef4444", fontWeight:600 }}>-{fmt(exp.amount)} per student per week</div>
                      </div>
                      <button onClick={() => update(prev => ({ ...prev, expenses: prev.expenses.filter(e => e.id !== exp.id) }))}
                        style={{ background:"none", border:"none", cursor:"pointer", color:"#ef4444", fontSize:16 }}>✕</button>
                    </div>
                  ))}
                  <div style={{ marginTop:12, padding:"10px 14px", background:"#fef2f2", borderRadius:8, fontSize:13, fontWeight:700, color:"#ef4444" }}>
                    Total weekly deduction per student: {fmt((appState?.expenses||[]).reduce((a,b) => a+b.amount, 0))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign:"center", padding:20, color:"#7a9bb5", fontSize:13 }}>No expenses set yet. Use Quick Add above!</div>
              )}
            </div>

            {/* Issue Fine */}
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0" }}>
              <div style={{ fontSize:16, fontWeight:800, color:"#0f1f3d", marginBottom:16 }}>🚨 Issue a Fine</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#4a6580", marginBottom:6 }}>STUDENT</div>
                  <select value={fineStudent} onChange={e => setFineStudent(e.target.value)}
                    style={{ width:"100%", padding:"10px 14px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", background:"#fff" }}>
                    <option value="">Select student...</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#4a6580", marginBottom:6 }}>FINE AMOUNT</div>
                  <input value={fineAmount} onChange={e => setFineAmount(e.target.value)} type="number" placeholder="Amount"
                    style={{ width:"100%", padding:"10px 14px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box" }}/>
                </div>
              </div>
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#4a6580", marginBottom:6 }}>REASON</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:8 }}>
                  {[
                    { label:"📱 Phone out in class", amount:8 },
                    { label:"💤 Not on task", amount:5 },
                    { label:"🗣️ Disruptive behaviour", amount:6 },
                    { label:"🦴 Missing materials", amount:4 },
                    { label:"🦖 T-Rex attitude", amount:7 },
                    { label:"☄️ Meteor-level mess", amount:5 },
                  ].map(r => (
                    <button key={r.label} onClick={() => { setFineReason(r.label); setFineAmount(String(r.amount)); }}
                      style={{ padding:"6px 12px", background: fineReason===r.label?"#ef4444":"#f8fafc", color:fineReason===r.label?"#fff":"#4a6580", border:`2px solid ${fineReason===r.label?"#ef4444":"#e2e8f0"}`, borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600 }}>
                      {r.label}
                    </button>
                  ))}
                </div>
                <input value={fineReason} onChange={e => setFineReason(e.target.value)} placeholder="Or type custom reason..."
                  style={{ width:"100%", padding:"10px 14px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box" }}/>
              </div>
              <button onClick={() => {
                if (!fineStudent || !fineAmount || !fineReason) { showToast("Fill in all fields!", "#ef4444"); return; }
                const student = students.find(s => s.id === fineStudent);
                addTx(fineStudent, -parseInt(fineAmount), `🚨 Fine: ${fineReason}`);
                showToast(`🚨 Fined ${student?.name} ${fmt(fineAmount)} for ${fineReason}`, "#ef4444");
                setFineStudent(""); setFineAmount(""); setFineReason("");
              }} style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#ef4444,#dc2626)", color:"#fff", border:"none", borderRadius:12, cursor:"pointer", fontSize:15, fontWeight:700 }}>
                🚨 Issue Fine
              </button>
            </div>
          </div>
        )}
        
{/* ═══ PARENTS ═══ */}
        {tab==="parents" && (
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <h2 style={{ fontSize:22, fontWeight:800, color:"#0f1f3d", marginBottom:8 }}>👨‍👩‍👧 Parent Communication</h2>
            <p style={{ fontSize:14, color:"#7a9bb5", marginBottom:24 }}>Send messages to parents and share their child's progress. Parents access via a unique link — no account needed.</p>

            {/* Send Message */}
            <div style={{ background:"#fff", borderRadius:16, padding:28, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", marginBottom:24 }}>
              <div style={{ fontSize:16, fontWeight:800, color:"#0f1f3d", marginBottom:20 }}>✉️ Send a Message</div>
              
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:12, fontWeight:700, color:"#7a9bb5", display:"block", marginBottom:8, letterSpacing:0.5 }}>SEND TO</label>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <button onClick={() => setParentMessageStudent("all")}
                    style={{ padding:"8px 16px", borderRadius:8, border:`2px solid ${parentMessageStudent==="all"?"#15803d":"#e2e8f0"}`, cursor:"pointer", fontSize:13, fontWeight:600,
                      background:parentMessageStudent==="all"?"#15803d":"#fff", color:parentMessageStudent==="all"?"#fff":"#4a6580" }}>
                    🌍 All Parents
                  </button>
                  {students.map(s => (
                    <button key={s.id} onClick={() => setParentMessageStudent(s.id)}
                      style={{ padding:"8px 16px", borderRadius:8, border:`2px solid ${parentMessageStudent===s.id?"#15803d":"#e2e8f0"}`, cursor:"pointer", fontSize:13, fontWeight:600,
                        background:parentMessageStudent===s.id?"#15803d":"#fff", color:parentMessageStudent===s.id?"#fff":"#4a6580" }}>
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:12, fontWeight:700, color:"#7a9bb5", display:"block", marginBottom:8, letterSpacing:0.5 }}>SUBJECT</label>
                <input value={parentSubject} onChange={e => setParentSubject(e.target.value)} placeholder="e.g. Weekly Update, Important Notice..."
                  style={{ width:"100%", padding:"12px 16px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box" }}/>
                <div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
                  {["Weekly Update","Important Notice","Great News!","Reminder","Monthly Report"].map(s => (
                    <button key={s} onClick={() => setParentSubject(s)}
                      style={{ padding:"4px 10px", background:parentSubject===s?"#15803d":"#f0f9f4", color:parentSubject===s?"#fff":"#4a6580", border:"none", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:600 }}>{s}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:12, fontWeight:700, color:"#7a9bb5", display:"block", marginBottom:8, letterSpacing:0.5 }}>MESSAGE</label>
                <textarea value={parentMessage} onChange={e => setParentMessage(e.target.value)} placeholder="Type your message to parents here..." rows={5}
                  style={{ width:"100%", padding:"12px 16px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box", resize:"vertical", fontFamily:"'Inter',sans-serif" }}/>
              </div>

              <button onClick={() => {
                if (!parentSubject.trim() || !parentMessage.trim()) { showToast("Please add a subject and message!", "#ef4444"); return; }
                const msg = {
                  id: uuid(),
                  subject: parentSubject,
                  message: parentMessage,
                  to: parentMessageStudent,
                  date: todayStr(),
                  timestamp: Date.now(),
                  replies: [],
                };
                update(prev => ({
                  ...prev,
                  parentMessages: [msg, ...(prev.parentMessages||[])],
                }));
                showToast(`✉️ Message sent to ${parentMessageStudent==="all"?"all parents":students.find(s=>s.id===parentMessageStudent)?.name+"'s parents"}!`);
                setParentMessage(""); setParentSubject("");
              }} style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#15803d,#0f1f3d)", color:"#fff", border:"none", borderRadius:12, cursor:"pointer", fontSize:16, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>
                ✉️ Send Message
              </button>
            </div>

            {/* Parent Portal Links */}
            <div style={{ background:"#fff", borderRadius:16, padding:28, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", marginBottom:24 }}>
              <div style={{ fontSize:16, fontWeight:800, color:"#0f1f3d", marginBottom:8 }}>🔗 Parent Portal Links</div>
              <p style={{ fontSize:13, color:"#7a9bb5", marginBottom:16 }}>Share these links with parents. Each link is unique to their child and requires no login.</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:10 }}>
                {students.map(s => {
                  const parentCode = s.parentCode || s.id.slice(0,8).toUpperCase();
                  const link = `${window.location.origin}${window.location.pathname}#parent-${parentCode}`;
                  return (
                    <div key={s.id} style={{ background:"#f0f9f4", borderRadius:12, padding:"12px 16px", border:"1px solid #d4e8dd" }}>
                      <div style={{ fontWeight:700, fontSize:13, color:"#0f1f3d", marginBottom:4 }}>{s.name}</div>
                      <div style={{ fontSize:11, color:"#7a9bb5", marginBottom:8, wordBreak:"break-all" }}>{link}</div>
                      <button onClick={() => { navigator.clipboard.writeText(link); showToast(`📋 Copied ${s.name}'s parent link!`); }}
                        style={{ padding:"6px 12px", background:"#15803d", color:"#fff", border:"none", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:600 }}>
                        📋 Copy Link
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Message History */}
            <div style={{ background:"#fff", borderRadius:16, padding:28, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0" }}>
              <div style={{ fontSize:16, fontWeight:800, color:"#0f1f3d", marginBottom:16 }}>📬 Message History</div>
              {(appState?.parentMessages||[]).length === 0 ? (
                <div style={{ textAlign:"center", padding:32, color:"#7a9bb5", fontSize:14 }}>No messages sent yet!</div>
              ) : (
                (appState?.parentMessages||[]).map(msg => {
                  const recipient = msg.to === "all" ? "All Parents" : students.find(s=>s.id===msg.to)?.name + "'s Parents";
                  return (
                    <div key={msg.id} style={{ padding:"16px 0", borderBottom:"1px solid #f0f9f4" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                        <div>
                          <div style={{ fontWeight:700, fontSize:15, color:"#0f1f3d" }}>{msg.subject}</div>
                          <div style={{ fontSize:12, color:"#7a9bb5" }}>To: {recipient} · {formatFullDate(msg.date)}</div>
                        </div>
                        {(msg.replies||[]).length > 0 && (
                          <div style={{ background:"#f0fdf4", border:"1px solid #d4e8dd", borderRadius:20, padding:"3px 10px", fontSize:11, color:"#15803d", fontWeight:600 }}>
                            {msg.replies.length} repl{msg.replies.length===1?"y":"ies"}
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize:13, color:"#4a6580", lineHeight:1.6, background:"#f8fafc", borderRadius:8, padding:"10px 14px" }}>{msg.message}</div>
                      {(msg.replies||[]).map((r,i) => (
                        <div key={i} style={{ marginTop:8, marginLeft:24, background:"#f0f9f4", borderRadius:8, padding:"10px 14px", border:"1px solid #d4e8dd" }}>
                          <div style={{ fontSize:11, color:"#7a9bb5", marginBottom:4 }}>💬 Parent reply · {r.date}</div>
                          <div style={{ fontSize:13, color:"#0f1f3d" }}>{r.message}</div>
                        </div>
                      ))}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

                {/* ═══ HISTORY ═══ */}
        {tab==="history" && (
          <div>
            <h2 style={{ fontSize:22, fontWeight:800, color:"#0f1f3d", marginBottom:24 }}>📋 Transaction History</h2>
            <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", overflow:"hidden" }}>
              {(appState?.txLog||[]).slice(0,50).map((t,i) => {
                const s = students.find(st => st.id === t.studentId);
                const dino = DINO_OPTIONS.find(d => d.id === s?.dinoId) || DINO_OPTIONS[0];
                return (
                  <div key={t.id} style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 24px", borderBottom:"1px solid #f8fafc" }}>
                    <div style={{ width:36, height:36, borderRadius:10, background: t.amount>=0?"#f0fdf4":"#fef2f2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
                      {t.amount>=0?"💰":"💸"}
                    </div>
                    <div style={{ width:32, height:32, borderRadius:8, background:`${dino.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
                      {dino.emoji}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:14, color:"#0f1f3d" }}>{s?.name || "Unknown"}</div>
                      <div style={{ fontSize:12, color:"#7a9bb5" }}>{t.reason} · {formatFullDate(t.date)}</div>
                    </div>
                    <div style={{ fontWeight:800, fontSize:16, color: t.amount>=0?"#15803d":"#ef4444" }}>
                      {t.amount>=0?"+":""}{fmt(t.amount)}
                    </div>
                  </div>
                );
              })}
              {(appState?.txLog||[]).length === 0 && (
                <div style={{ padding:48, textAlign:"center", color:"#7a9bb5", fontSize:14 }}>No transactions yet!</div>
              )}
            </div>
          </div>
        )}

        {/* ═══ JOBS ═══ */}
        {tab==="jobs" && (
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h2 style={{ fontSize:22, fontWeight:800, color:"#0f1f3d", margin:0 }}>👷 Classroom Jobs</h2>
              <button onClick={() => {
                const salaries = (appState?.students||[]).map(s => {
                  const job = (appState?.jobs||[]).find(j => j.id === (appState?.assigned||{})[s.id]);
                  return { student:s, job };
                }).filter(x => x.job);
                if (salaries.length === 0) { showToast("No jobs assigned yet!", "#f59e0b"); return; }
                salaries.forEach(({ student, job }) => addTx(student.id, job.pay, `${job.emoji} ${job.name} salary`));
                showToast(`💰 Paid salaries to ${salaries.length} students!`);
              }} style={{ padding:"12px 24px", background:"linear-gradient(135deg,#f59e0b,#d97706)", color:"#fff", border:"none", borderRadius:12, cursor:"pointer", fontSize:15, fontWeight:700, boxShadow:"0 4px 12px rgba(245,158,11,0.3)" }}>
                💰 Run Payday
              </button>
            </div>

            {/* Add new job */}
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", marginBottom:24 }}>
              <label style={{ fontSize:12, fontWeight:700, color:"#4a6580", display:"block", marginBottom:12, letterSpacing:0.5 }}>ADD NEW JOB</label>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                <input value={newJobEmoji} onChange={e => setNewJobEmoji(e.target.value)} maxLength={2}
                  style={{ width:56, padding:"10px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:22, textAlign:"center", outline:"none" }}/>
                <input value={newJobName} onChange={e => setNewJobName(e.target.value)} placeholder="Job name"
                  style={{ flex:1, minWidth:140, padding:"10px 14px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none" }}/>
                <input value={newJobPay} onChange={e => setNewJobPay(e.target.value)} type="number" placeholder="Pay"
                  style={{ width:90, padding:"10px 14px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none" }}/>
                <button onClick={() => {
                  if (!newJobName.trim()) return;
                  const job = { id:uuid(), name:newJobName.trim(), pay:parseInt(newJobPay)||10, emoji:newJobEmoji };
                  update(prev => ({ ...prev, jobs: [...(prev.jobs||[]), job] }));
                  setNewJobName(""); setNewJobPay("10"); setNewJobEmoji("⭐");
                  showToast(`Job "${job.name}" added!`);
                }} style={{ padding:"10px 20px", background:"#15803d", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:14, fontWeight:700 }}>
                  + Add Job
                </button>
              </div>
            </div>

            {/* Jobs list */}
            {(appState?.jobs||[]).length > 0 && (
              <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", marginBottom:24 }}>
                <label style={{ fontSize:12, fontWeight:700, color:"#4a6580", display:"block", marginBottom:12, letterSpacing:0.5 }}>AVAILABLE JOBS</label>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  {(appState?.jobs||[]).map(job => (
                    <div key={job.id} style={{ display:"flex", alignItems:"center", gap:8, background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:10, padding:"8px 14px" }}>
                      <span style={{ fontSize:20 }}>{job.emoji}</span>
                      <div>
                        <div style={{ fontWeight:700, fontSize:13, color:"#0f1f3d" }}>{job.name}</div>
                        <div style={{ fontSize:11, color:"#15803d", fontWeight:600 }}>{fmt(job.pay)}/week</div>
                      </div>
                      <button onClick={() => update(prev => ({ ...prev, jobs: prev.jobs.filter(j => j.id !== job.id), assigned: Object.fromEntries(Object.entries(prev.assigned||{}).filter(([,v]) => v !== job.id)) }))}
                        style={{ background:"none", border:"none", cursor:"pointer", color:"#ef4444", fontSize:16, padding:"0 4px" }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assign jobs to students */}
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0" }}>
              <label style={{ fontSize:12, fontWeight:700, color:"#4a6580", display:"block", marginBottom:16, letterSpacing:0.5 }}>ASSIGN JOBS TO STUDENTS</label>
              {(appState?.jobs||[]).length === 0 ? (
                <div style={{ textAlign:"center", padding:32, color:"#7a9bb5", fontSize:14 }}>Add jobs above first!</div>
              ) : (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:12 }}>
                  {students.map(s => {
                    const dino = DINO_OPTIONS.find(d => d.id === s.dinoId) || DINO_OPTIONS[0];
                    const assignedJobId = (appState?.assigned||{})[s.id];
                    const assignedJob = (appState?.jobs||[]).find(j => j.id === assignedJobId);
                    return (
                      <div key={s.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:"#f8fafc", borderRadius:12, border:"1px solid #e2e8f0" }}>
                        <div style={{ width:36, height:36, borderRadius:10, background:`${dino.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
                          {dino.emoji}
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontWeight:700, fontSize:13, color:"#0f1f3d", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.name}</div>
                          {assignedJob && <div style={{ fontSize:11, color:"#15803d", fontWeight:600 }}>{assignedJob.emoji} {assignedJob.name} · {fmt(assignedJob.pay)}/wk</div>}
                        </div>
                        <select value={assignedJobId||""} onChange={e => update(prev => ({ ...prev, assigned: { ...(prev.assigned||{}), [s.id]: e.target.value||null } }))}
                          style={{ padding:"6px 10px", borderRadius:8, border:"1.5px solid #e2e8f0", fontSize:12, outline:"none", background:"#fff", color:"#0f1f3d", cursor:"pointer" }}>
                          <option value="">No job</option>
                          {(appState?.jobs||[]).map(j => <option key={j.id} value={j.id}>{j.emoji} {j.name}</option>)}
                        </select>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ STORE ═══ */}
        {tab==="store" && (
          <div style={{ maxWidth:1000, margin:"0 auto" }}>
            <h2 style={{ fontSize:22, fontWeight:800, color:"#0f1f3d", marginBottom:24 }}>🏪 Class Store</h2>

            {/* Add item */}
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", marginBottom:24 }}>
              <label style={{ fontSize:12, fontWeight:700, color:"#4a6580", display:"block", marginBottom:12, letterSpacing:0.5 }}>ADD STORE ITEM</label>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"flex-end" }}>
                <input value={newItemEmoji||"🎁"} onChange={e => setNewItemEmoji(e.target.value)} maxLength={2}
                  style={{ width:56, padding:"10px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:22, textAlign:"center", outline:"none" }}/>
                <div style={{ flex:2, minWidth:140 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:"#7a9bb5", marginBottom:4 }}>ITEM NAME</div>
                  <input value={newItemName||""} onChange={e => setNewItemName(e.target.value)} placeholder="e.g. Homework Pass"
                    style={{ width:"100%", padding:"10px 14px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box" }}/>
                </div>
                <div style={{ flex:1, minWidth:100 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:"#7a9bb5", marginBottom:4 }}>PRICE</div>
                  <input value={newItemPrice||""} onChange={e => setNewItemPrice(e.target.value)} type="number" placeholder="10"
                    style={{ width:"100%", padding:"10px 14px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box" }}/>
                </div>
                <div style={{ flex:2, minWidth:140 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:"#7a9bb5", marginBottom:4 }}>DESCRIPTION</div>
                  <input value={newItemDesc||""} onChange={e => setNewItemDesc(e.target.value)} placeholder="Skip one homework assignment"
                    style={{ width:"100%", padding:"10px 14px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box" }}/>
                </div>
                <button onClick={() => {
                  if (!newItemName?.trim()) return;
                  const item = { id:uuid(), name:newItemName.trim(), price:parseInt(newItemPrice)||10, emoji:newItemEmoji||"🎁", description:newItemDesc||"", available:true };
                  update(prev => ({ ...prev, storeItems: [...(prev.storeItems||[]), item] }));
                  setNewItemName(""); setNewItemPrice(""); setNewItemDesc(""); setNewItemEmoji("🎁");
                  showToast(`${item.emoji} "${item.name}" added to store!`);
                }} style={{ padding:"10px 20px", background:"#15803d", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:14, fontWeight:700, whiteSpace:"nowrap" }}>
                  + Add Item
                </button>
              </div>
            </div>

            {/* Store items */}
            {(appState?.storeItems||[]).length > 0 && (
              <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", marginBottom:24 }}>
                <label style={{ fontSize:12, fontWeight:700, color:"#4a6580", display:"block", marginBottom:16, letterSpacing:0.5 }}>STORE ITEMS ({(appState?.storeItems||[]).length})</label>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12 }}>
                  {(appState?.storeItems||[]).map(item => (
                    <div key={item.id} style={{ background:"#f8fafc", borderRadius:12, padding:16, border:"1px solid #e2e8f0", position:"relative" }}>
                      <button onClick={() => update(prev => ({ ...prev, storeItems: prev.storeItems.filter(i => i.id !== item.id) }))}
                        style={{ position:"absolute", top:8, right:8, background:"none", border:"none", cursor:"pointer", color:"#ef4444", fontSize:14 }}>✕</button>
                      <div style={{ fontSize:32, marginBottom:8 }}>{item.emoji}</div>
                      <div style={{ fontWeight:700, fontSize:14, color:"#0f1f3d", marginBottom:4 }}>{item.name}</div>
                      <div style={{ fontSize:12, color:"#7a9bb5", marginBottom:8 }}>{item.description}</div>
                      <div style={{ fontWeight:800, fontSize:18, color:"#15803d" }}>{fmt(item.price)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pending purchases */}
            {(appState?.purchases||[]).filter(p => p.status==="pending").length > 0 && (
              <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0" }}>
                <label style={{ fontSize:12, fontWeight:700, color:"#f59e0b", display:"block", marginBottom:16, letterSpacing:0.5 }}>
                  ⏳ PENDING APPROVALS ({(appState?.purchases||[]).filter(p=>p.status==="pending").length})
                </label>
                {(appState?.purchases||[]).filter(p => p.status==="pending").map(p => {
                  const student = students.find(s => s.id === p.studentId);
                  const item = (appState?.storeItems||[]).find(i => i.id === p.itemId);
                  const dino = DINO_OPTIONS.find(d => d.id === student?.dinoId) || DINO_OPTIONS[0];
                  return (
                    <div key={p.id} style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 0", borderBottom:"1px solid #f0f9f4" }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:`${dino.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
                        {dino.emoji}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:600, fontSize:14, color:"#0f1f3d" }}>{student?.name} wants {item?.emoji} {item?.name}</div>
                        <div style={{ fontSize:12, color:"#7a9bb5" }}>{fmt(item?.price)} · {p.date}</div>
                      </div>
                      <div style={{ display:"flex", gap:8 }}>
                        <button onClick={() => {
                          update(prev => ({
                            ...prev,
                            balances: { ...prev.balances, [p.studentId]: Math.max(0, (prev.balances[p.studentId]||0) - item.price) },
                            purchases: prev.purchases.map(x => x.id===p.id ? {...x, status:"approved"} : x),
                            txLog: [{ id:uuid(), studentId:p.studentId, amount:-item.price, reason:`Bought ${item.emoji} ${item.name}`, date:todayStr() }, ...(prev.txLog||[])],
                          }));
                          showToast(`✅ Approved ${student?.name}'s purchase!`);
                        }} style={{ padding:"8px 16px", background:"#15803d", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:700 }}>✅ Approve</button>
                        <button onClick={() => {
                          update(prev => ({ ...prev, purchases: prev.purchases.map(x => x.id===p.id ? {...x, status:"denied"} : x) }));
                          showToast(`❌ Denied ${student?.name}'s purchase.`, "#ef4444");
                        }} style={{ padding:"8px 16px", background:"#fee2e2", color:"#ef4444", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:700 }}>❌ Deny</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {(appState?.storeItems||[]).length === 0 && (
              <div style={{ textAlign:"center", padding:48, color:"#7a9bb5", fontSize:14 }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🏪</div>
                Add items above to stock your store!
              </div>
            )}
          </div>
        )}

      </div>

      {/* Deduct Modal */}
      {deductModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.6)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9998, backdropFilter:"blur(4px)" }}>
          <div style={{ background:"#fff", borderRadius:20, padding:32, width:"100%", maxWidth:400, boxShadow:"0 24px 64px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize:18, fontWeight:800, color:"#0f1f3d", marginBottom:4 }}>Deduct from {selStudent?.name}</h3>
            <p style={{ fontSize:13, color:"#7a9bb5", marginBottom:20 }}>Current balance: {fmt(balances[selected]||0)}</p>
            <input type="number" value={deductAmt} onChange={e => setDeductAmt(e.target.value)} placeholder="Amount to deduct" autoFocus
              style={{ width:"100%", padding:"12px 16px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:18, fontWeight:700, outline:"none", marginBottom:12, boxSizing:"border-box" }}/>
            <input value={deductReason} onChange={e => setDeductReason(e.target.value)} placeholder="Reason for deduction"
              style={{ width:"100%", padding:"12px 16px", borderRadius:10, border:"2px solid #e2e8f0", fontSize:14, outline:"none", marginBottom:20, boxSizing:"border-box" }}/>
            <div style={{ display:"flex", gap:12 }}>
              <button onClick={() => {
                const a = parseInt(deductAmt||"0");
                if (a > 0 && selected) { addTx(selected, -a, deductReason); showToast(`-${fmt(a)} from ${selStudent?.name}`, "#ef4444"); }
                setDeductModal(false); setDeductAmt(""); setDeductReason("Deduction");
              }} style={{ flex:1, padding:"13px", background:"#ef4444", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:700 }}>− Deduct</button>
              <button onClick={() => { setDeductModal(false); setDeductAmt(""); }}
                style={{ padding:"13px 20px", background:"#f0f9f4", color:"#4a6580", border:"none", borderRadius:10, cursor:"pointer", fontSize:14, fontWeight:600 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}