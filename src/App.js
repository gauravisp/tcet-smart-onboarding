import { useState, useEffect, useRef } from "react";


const API = "https://tcet-smart-onboarding-backend-production.up.railway.app/api";

const apiFetch = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });
  return res.json();
};







// ============================================================
// DESIGN SYSTEM
// ============================================================
// eslint-disable-next-line no-unused-vars
const theme = {
  navy: "#0a0f2e",
  navyMid: "#101840",
  navyLight: "#1a2455",
  blue: "#2563eb",
  blueLight: "#3b82f6",
  cyan: "#06b6d4",
  cyanLight: "#67e8f9",
  accent: "#f59e0b",
  accentLight: "#fcd34d",
  green: "#10b981",
  red: "#ef4444",
  white: "#f8fafc",
  gray: "#94a3b8",
  grayDark: "#334155",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #0a0f2e;
    color: #f8fafc;
    min-height: 100vh;
  }

  .syne { font-family: 'Syne', sans-serif; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #101840; }
  ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 3px; }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes chatPop {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes orb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -20px) scale(1.05); }
    66% { transform: translate(-15px, 15px) scale(0.95); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .fade-up { animation: fadeUp 0.5s ease forwards; }
  .pulse { animation: pulse 2s infinite; }
  .slide-in { animation: slideIn 0.3s ease; }
  .chat-pop { animation: chatPop 0.25s cubic-bezier(.34,1.56,.64,1) forwards; }

  /* Stars background */
  .stars {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 0; overflow: hidden;
  }
  .star {
    position: absolute; border-radius: 50%;
    background: white; animation: pulse 3s infinite;
  }

  /* Orbs */
  .orb {
    position: fixed; border-radius: 50%; filter: blur(80px);
    pointer-events: none; z-index: 0; animation: orb 8s ease-in-out infinite;
  }

  /* Glass card */
  .glass {
    background: rgba(16, 24, 64, 0.7);
    border: 1px solid rgba(37, 99, 235, 0.2);
    backdrop-filter: blur(20px);
    border-radius: 16px;
  }
  .glass-hover {
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .glass-hover:hover {
    border-color: rgba(37, 99, 235, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(37, 99, 235, 0.2);
  }

  /* Button styles */
  .btn-primary {
    background: linear-gradient(135deg, #2563eb, #06b6d4);
    border: none; border-radius: 12px;
    color: white; font-family: 'Syne', sans-serif;
    font-weight: 700; letter-spacing: 0.02em;
    padding: 12px 28px; cursor: pointer;
    transition: all 0.3s ease;
    position: relative; overflow: hidden;
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #3b82f6, #67e8f9);
    opacity: 0; transition: opacity 0.3s;
  }
  .btn-primary:hover::after { opacity: 1; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.4); }
  .btn-primary span { position: relative; z-index: 1; }

  .btn-ghost {
    background: transparent;
    border: 1px solid rgba(37, 99, 235, 0.4);
    border-radius: 12px; color: #94a3b8;
    font-family: 'DM Sans', sans-serif;
    padding: 10px 22px; cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-ghost:hover { border-color: #2563eb; color: white; background: rgba(37,99,235,0.1); }

  /* Input */
  .input-field {
    width: 100%;
    background: rgba(10, 15, 46, 0.8);
    border: 1px solid rgba(37, 99, 235, 0.2);
    border-radius: 10px;
    color: #f8fafc;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    padding: 12px 16px;
    outline: none;
    transition: border-color 0.3s;
  }
  .input-field:focus { border-color: #2563eb; }
  .input-field::placeholder { color: #475569; }

  /* Progress bar */
  .progress-track {
    background: rgba(37, 99, 235, 0.15);
    border-radius: 99px; overflow: hidden; height: 8px;
  }
  .progress-fill {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, #2563eb, #06b6d4);
    transition: width 1s cubic-bezier(.4,0,.2,1);
  }

  /* Checkbox */
  .check-item {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 18px; border-radius: 12px;
    border: 1px solid rgba(37, 99, 235, 0.15);
    background: rgba(10, 15, 46, 0.5);
    cursor: pointer; transition: all 0.25s;
    margin-bottom: 10px;
  }
  .check-item:hover { border-color: rgba(37,99,235,0.4); background: rgba(37,99,235,0.05); }
  .check-item.done { border-color: rgba(16, 185, 129, 0.3); background: rgba(16,185,129,0.05); }

  .check-box {
    width: 22px; height: 22px; border-radius: 6px; flex-shrink: 0;
    border: 2px solid rgba(37, 99, 235, 0.4);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.25s;
  }
  .check-item.done .check-box {
    background: #10b981; border-color: #10b981;
  }

  /* Notification badge */
  .badge {
    background: #ef4444; border-radius: 99px;
    font-size: 11px; font-weight: 700;
    padding: 2px 7px; color: white;
    min-width: 20px; text-align: center;
  }

  /* Status pill */
  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    border-radius: 99px; font-size: 12px; font-weight: 600;
    padding: 4px 12px;
  }
  .pill.pending { background: rgba(245,158,11,0.15); color: #fcd34d; }
  .pill.done { background: rgba(16,185,129,0.15); color: #34d399; }
  .pill.locked { background: rgba(148,163,184,0.1); color: #64748b; }

  /* Nav */
  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 16px; border-radius: 12px;
    cursor: pointer; transition: all 0.25s;
    color: #64748b; font-size: 14px; font-weight: 500;
  }
  .nav-item:hover { background: rgba(37,99,235,0.1); color: #94a3b8; }
  .nav-item.active { background: rgba(37,99,235,0.15); color: #3b82f6; border-left: 3px solid #2563eb; }

  /* Chat bubble */
  .bubble {
    max-width: 80%; padding: 12px 16px;
    border-radius: 16px; font-size: 14px; line-height: 1.6;
    animation: chatPop 0.25s ease;
  }
  .bubble.bot {
    background: rgba(37,99,235,0.15);
    border: 1px solid rgba(37,99,235,0.2);
    border-radius: 16px 16px 16px 4px;
    align-self: flex-start;
  }
  .bubble.user {
    background: linear-gradient(135deg, #2563eb, #06b6d4);
    border-radius: 16px 16px 4px 16px;
    align-self: flex-end;
  }

  /* Typing */
  .typing-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #3b82f6; animation: pulse 1s infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }

  /* Stat card */
  .stat-card {
    padding: 20px 24px; border-radius: 16px;
    background: rgba(16, 24, 64, 0.6);
    border: 1px solid rgba(37, 99, 235, 0.15);
  }

  /* Timeline */
  .timeline-item {
    display: flex; gap: 16px; padding-bottom: 24px;
    position: relative;
  }
  .timeline-item::before {
    content: ''; position: absolute;
    left: 15px; top: 32px;
    width: 2px; bottom: 0;
    background: rgba(37,99,235,0.2);
  }
  .timeline-item:last-child::before { display: none; }
  .timeline-dot {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; z-index: 1;
  }

  /* Floating chat button */
  .chat-fab {
    position: fixed; bottom: 28px; right: 28px;
    width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #06b6d4);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; z-index: 100;
    box-shadow: 0 8px 32px rgba(37,99,235,0.5);
    transition: all 0.3s ease;
    border: none; color: white; font-size: 24px;
  }
  .chat-fab:hover { transform: scale(1.1); box-shadow: 0 12px 40px rgba(37,99,235,0.7); }

  /* Tag */
  .tag {
    display: inline-block; padding: 4px 10px;
    border-radius: 6px; font-size: 11px; font-weight: 600;
    letter-spacing: 0.04em; text-transform: uppercase;
  }

  /* Cursor blink */
  .cursor { animation: blink 1s step-end infinite; }
`;

// ============================================================
// MOCK DATA
// ============================================================
const STUDENT = {
  name: "Gauravi Patil",
  id: "TCET2024001",
  branch: "Computer Engineering",
  year: "First Year",
  email: "gauravi.patil@tcet.ac.in",
  phone: "+91 98765 43210",
  avatar: "GP",
  progress: 65,
};
// eslint-disable-next-line no-unused-vars
const CHECKLIST = [
  { id: 1, category: "Documents", title: "Upload 10th Marksheet", status: "done", due: "Done", priority: "high" },
  { id: 2, category: "Documents", title: "Upload 12th / Diploma Marksheet", status: "done", due: "Done", priority: "high" },
  { id: 3, category: "Documents", title: "Submit Aadhar Card Copy", status: "done", due: "Done", priority: "medium" },
  { id: 4, category: "Documents", title: "Submit Caste Certificate (if applicable)", status: "pending", due: "Feb 20", priority: "medium" },
  { id: 5, category: "Fees", title: "Pay Semester 1 Tuition Fee", status: "done", due: "Done", priority: "high" },
  { id: 6, category: "Fees", title: "Pay Library & Lab Fee", status: "pending", due: "Feb 22", priority: "medium" },
  { id: 7, category: "Registration", title: "Complete Course Registration", status: "done", due: "Done", priority: "high" },
  { id: 8, category: "Registration", title: "Set up College Email ID", status: "done", due: "Done", priority: "high" },
  { id: 9, category: "Registration", title: "Activate LMS (Moodle) Account", status: "pending", due: "Feb 19", priority: "high" },
  { id: 10, category: "Hostel & Campus", title: "Submit Hostel Application", status: "pending", due: "Feb 25", priority: "low" },
  { id: 11, category: "Hostel & Campus", title: "Collect ID Card", status: "pending", due: "Mar 1", priority: "medium" },
  { id: 12, category: "Academics", title: "Download Timetable from Portal", status: "locked", due: "Mar 3", priority: "medium" },
  { id: 13, category: "Academics", title: "Register for NPTEL Courses", status: "locked", due: "Mar 5", priority: "low" },
];

const NOTIFICATIONS = [
  { id: 1, type: "urgent", title: "LMS Activation Deadline", message: "Activate your Moodle account by Feb 19 to access lecture materials.", time: "2h ago", read: false },
  { id: 2, type: "reminder", title: "Fee Payment Reminder", message: "Library & Lab fee of ₹4,500 is due on Feb 22.", time: "5h ago", read: false },
  { id: 3, type: "info", title: "Orientation Schedule Released", message: "College orientation is scheduled for Feb 21 at 9:00 AM in Auditorium A.", time: "1d ago", read: true },
  { id: 4, type: "success", title: "Document Verified ✓", message: "Your 12th marksheet has been verified successfully.", time: "2d ago", read: true },
];

const BOT_RESPONSES = {
  default: ["I'm here to help! You can ask me about fees, documents, LMS, timetables, hostel, or any onboarding queries."],
  fee: ["Your current fee dues: Library & Lab Fee ₹4,500 due Feb 22. Pay via the college portal at fees.tcet.ac.in or visit the accounts office (Room 101) between 10 AM–3 PM on weekdays."],
  document: ["Pending documents: Caste Certificate (due Feb 20). Upload via the Documents section in your dashboard or email it to docs@tcet.ac.in with your student ID."],
  lms: ["To activate your LMS account: 1️⃣ Go to moodle.tcet.ac.in 2️⃣ Click 'New User Registration' 3️⃣ Use your college email ID 4️⃣ Check email for activation link. Deadline: Feb 19!"],
  timetable: ["Your timetable for Sem 1 (CE) will be available on the portal from March 3. Go to: portal.tcet.ac.in → Academics → Timetable. You'll get a notification when it's uploaded."],
  hostel: ["Hostel applications close Feb 25. Fill the form at hostel.tcet.ac.in. Allotment is based on distance from college. Contact warden Mr. Sharma at hostel@tcet.ac.in for queries."],
  hello: ["Hello! 👋 Welcome to TCET Smart Onboarding. I'm your AI assistant. How can I help you today?"],
  help: ["I can help you with:\n• 📄 Document submission\n• 💰 Fee payment\n• 🖥️ LMS & portal setup\n• 📅 Timetable info\n• 🏠 Hostel application\n• 🎓 Course registration\n\nWhat do you need?"],
};

const TIMELINE = [
  { label: "Admission Confirmed", date: "Jan 15, 2024", status: "done", icon: "🎉" },
  { label: "Documents Submitted", date: "Jan 20, 2024", status: "done", icon: "📄" },
  { label: "Fees Paid (Sem 1)", date: "Jan 22, 2024", status: "done", icon: "✅" },
  { label: "Course Registration", date: "Feb 1, 2024", status: "done", icon: "📚" },
  { label: "LMS Activation", date: "Due Feb 19", status: "pending", icon: "🖥️" },
  { label: "Orientation Day", date: "Feb 21, 2024", status: "upcoming", icon: "🏫" },
  { label: "Classes Begin", date: "Mar 3, 2024", status: "upcoming", icon: "🎓" },
];

// ============================================================
// STARS BACKGROUND
// ============================================================
function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 4,
    dur: 2 + Math.random() * 3,
  }));
  return (
    <div className="stars">
      {stars.map((s) => (
        <div key={s.id} className="star" style={{
          top: `${s.top}%`, left: `${s.left}%`,
          width: s.size, height: s.size,
          animationDuration: `${s.dur}s`,
          animationDelay: `${s.delay}s`,
          opacity: 0.4,
        }} />
      ))}
    </div>
  );
}

// ============================================================
// LOGIN PAGE
// ============================================================
function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register fields
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = async () => {
    if (!email || !password) { setError("Please fill all fields."); return; }
    setLoading(true);
    const data = await apiFetch("/auth/login", "POST", { email, password });
    setLoading(false);
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user.role);
    } else {
      setError(data.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    if (!name || !regEmail || !regPassword || !branch || !year) {
      setError("Please fill all required fields.");
      return;
    }
    setLoading(true);
    const data = await apiFetch("/auth/register", "POST", {
      name, email: regEmail, password: regPassword,
      role: "student", branch, year, phone,
    });
    setLoading(false);
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user.role);
    } else {
      setError(data.message || "Registration failed");
    }
  };

  const branches = [
    "Computer Engineering",
    "Information Technology",
    "Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "AIDS",
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "24px" }}>
      <Stars />
      <div style={{ position: "fixed", top: "20%", left: "10%", width: 400, height: 400, background: "rgba(37,99,235,0.12)", borderRadius: "50%", filter: "blur(80px)", animation: "orb 8s ease-in-out infinite" }} />
      <div style={{ position: "fixed", bottom: "15%", right: "8%", width: 300, height: 300, background: "rgba(6,182,212,0.08)", borderRadius: "50%", filter: "blur(60px)", animation: "orb 10s ease-in-out infinite reverse" }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 460 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #2563eb, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🎓</div>
            <div>
              <div className="syne" style={{ fontSize: 22, fontWeight: 800 }}>TCET</div>
              <div style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.12em", textTransform: "uppercase" }}>Smart Onboarding</div>
            </div>
          </div>
          <h1 className="syne" style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p style={{ color: "#64748b", fontSize: 14 }}>
            {mode === "login" ? "Sign in to your onboarding portal" : "Register as a new student"}
          </p>
        </div>

        {/* Card */}
        <div className="glass" style={{ padding: "28px 32px" }}>

          {/* Login/Register toggle */}
          <div style={{ display: "flex", background: "rgba(10,15,46,0.8)", borderRadius: 12, padding: 4, marginBottom: 24 }}>
            {["login", "register"].map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
                flex: 1, padding: "10px", borderRadius: 10, border: "none",
                background: mode === m ? "linear-gradient(135deg, #2563eb, #06b6d4)" : "transparent",
                color: mode === m ? "white" : "#64748b",
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 13, cursor: "pointer", transition: "all 0.3s",
                textTransform: "capitalize",
              }}>
                {m === "login" ? "🔑 Sign In" : "✏️ Register"}
              </button>
            ))}
          </div>

          {/* LOGIN FORM */}
          {mode === "login" && (
            <>
              {/* Role toggle */}
              <div style={{ display: "flex", background: "rgba(10,15,46,0.8)", borderRadius: 12, padding: 4, marginBottom: 20 }}>
                {["student", "admin"].map((r) => (
                  <button key={r} onClick={() => setRole(r)} style={{
                    flex: 1, padding: "8px", borderRadius: 10, border: "none",
                    background: role === r ? "rgba(37,99,235,0.3)" : "transparent",
                    color: role === r ? "white" : "#64748b",
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                    fontSize: 13, cursor: "pointer", transition: "all 0.3s",
                  }}>
                    {role === r ? (r === "student" ? "👤 Student" : "⚙️ Admin") : (r === "student" ? "👤 Student" : "⚙️ Admin")}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>Email</label>
                <input className="input-field" placeholder="name@tcet.ac.in"
                  value={email} onChange={e => { setEmail(e.target.value); setError(""); }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>Password</label>
                <input className="input-field" type="password" placeholder="••••••••"
                  value={password} onChange={e => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleLogin()} />
              </div>
              <div style={{ textAlign: "right", marginBottom: 20 }}>
                <span style={{ fontSize: 13, color: "#3b82f6", cursor: "pointer" }}>Forgot password?</span>
              </div>
            </>
          )}

          {/* REGISTER FORM */}
          {mode === "register" && (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>Full Name *</label>
                <input className="input-field" placeholder="e.g. Gauravi Patil"
                  value={name} onChange={e => { setName(e.target.value); setError(""); }} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>College Email *</label>
                <input className="input-field" placeholder="name@tcet.ac.in"
                  value={regEmail} onChange={e => { setRegEmail(e.target.value); setError(""); }} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>Password *</label>
                <input className="input-field" type="password" placeholder="Min 6 characters"
                  value={regPassword} onChange={e => { setRegPassword(e.target.value); setError(""); }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>Branch *</label>
                  <select className="input-field" value={branch} onChange={e => setBranch(e.target.value)}
                    style={{ cursor: "pointer" }}>
                    <option value="" style={{ background: "#0a0f2e" }}>Select branch</option>
                    {branches.map(b => <option key={b} value={b} style={{ background: "#0a0f2e" }}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>Year *</label>
                  <select className="input-field" value={year} onChange={e => setYear(e.target.value)}
                    style={{ cursor: "pointer" }}>
                    <option value="" style={{ background: "#0a0f2e" }}>Select year</option>
                    {["First Year", "Second Year", "Third Year", "Final Year"].map(y =>
                      <option key={y} value={y} style={{ background: "#0a0f2e" }}>{y}</option>
                    )}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>Phone Number</label>
                <input className="input-field" placeholder="+91 98765 43210"
                  value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </>
          )}

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
              <p style={{ color: "#ef4444", fontSize: 13 }}>⚠️ {error}</p>
            </div>
          )}

          <button className="btn-primary" style={{ width: "100%", fontSize: 15 }}
            onClick={mode === "login" ? handleLogin : handleRegister}>
            <span>
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create My Account"}
            </span>
          </button>

          {mode === "register" && (
            <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#475569" }}>
              By registering you agree to TCET's onboarding terms
            </p>
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#334155" }}>
          Powered by TCS · TCET ACM · SIGAI
        </p>
      </div>
    </div>
  );
}

// ============================================================
// SIDEBAR
// ============================================================
function Sidebar({ active, setActive, role, onLogout, unread }) {
  const studentNav = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "checklist", label: "My Checklist", icon: "✅" },
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "timeline", label: "My Journey", icon: "🗺️" },
    { id: "notifications", label: "Notifications", icon: "🔔", badge: unread },
  ];
  const adminNav = [
    { id: "admin-dash", label: "Overview", icon: "📊" },
    { id: "students", label: "Students", icon: "👥" },
    { id: "admin-documents", label: "Documents", icon: "📄" },
    { id: "communications", label: "Broadcast", icon: "📢" },
  ];
  const nav = role === "admin" ? adminNav : studentNav;

  return (
    <div className="glass" style={{
      width: 240, height: "100vh", position: "fixed", left: 0, top: 0,
      display: "flex", flexDirection: "column", padding: "24px 16px",
      borderRadius: 0, borderRight: "1px solid rgba(37,99,235,0.15)",
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 8px", marginBottom: 32 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #2563eb, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎓</div>
        <div>
          <div className="syne" style={{ fontSize: 15, fontWeight: 800 }}>TCET</div>
          <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.1em" }}>ONBOARDING</div>
        </div>
      </div>

      {/* Role tag */}
      <div style={{ padding: "0 8px", marginBottom: 20 }}>
        <div className="tag" style={{ background: role === "admin" ? "rgba(245,158,11,0.15)" : "rgba(37,99,235,0.15)", color: role === "admin" ? "#fcd34d" : "#3b82f6" }}>
          {role === "admin" ? "⚙️ ADMIN" : "👤 STUDENT"}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        {nav.map((item) => (
          <div key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`}
            onClick={() => setActive(item.id)}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge > 0 && <span className="badge">{item.badge}</span>}
          </div>
        ))}
      </nav>

      {/* User */}
      <div style={{ borderTop: "1px solid rgba(37,99,235,0.1)", paddingTop: 16, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px", borderRadius: 10, marginBottom: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
            {role === "admin" ? "AD" : STUDENT.avatar}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{role === "admin" ? "Admin User" : STUDENT.name.split(" ")[0]}</div>
            <div style={{ fontSize: 11, color: "#475569" }}>{role === "admin" ? "TCET Admin" : STUDENT.id}</div>
          </div>
        </div>
        <button className="btn-ghost" style={{ width: "100%", fontSize: 13, padding: "8px" }} onClick={onLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD PAGE (Student)
// ============================================================
function Dashboard() {
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    apiFetch("/checklist").then(data => {
      setChecklist(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  const done = checklist.filter(i => i.status === "done").length;
  const pending = checklist.filter(i => i.status === "pending").length;
  const progress = checklist.length ? Math.round(done / checklist.length * 100) : 0;

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#64748b" }}>Loading your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 6 }}>Good morning 👋</p>
        <h1 className="syne" style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>
          {user.name || "Student"}
        </h1>
        <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
          <span className="pill pending">🎓 {user.branch || "Engineering"}</span>
          <span className="pill done">📅 {user.year || "First Year"}</span>
          <span className="pill" style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa" }}>🆔 {user.studentId || "TCET2024"}</span>
        </div>
      </div>

      <div className="glass" style={{ padding: "24px 28px", marginBottom: 28, background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(6,182,212,0.08))" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <p className="syne" style={{ fontSize: 13, color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Overall Progress</p>
            <p className="syne" style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em" }}>
              {progress}<span style={{ fontSize: 22, color: "#3b82f6" }}>%</span>
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 6 }}>Onboarding Status</p>
            <span className="pill pending">🔄 In Progress</span>
          </div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p style={{ fontSize: 12, color: "#475569", marginTop: 10 }}>{done} of {checklist.length} tasks completed</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Completed", value: done, icon: "✅", color: "#10b981" },
          { label: "Pending", value: pending, icon: "⏳", color: "#f59e0b" },
          { label: "Locked", value: checklist.filter(i => i.status === "locked").length, icon: "🔒", color: "#64748b" },
          { label: "Total Tasks", value: checklist.length, icon: "📋", color: "#3b82f6" },
        ].map((s) => (
          <div key={s.label} className="stat-card glass-hover">
            <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
            <div className="syne" style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass" style={{ padding: "22px 24px" }}>
        <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🚨 Urgent — Act Now</h3>
        {checklist.filter(i => i.status === "pending" && i.priority === "high").map((item) => (
          <div key={item._id} className="check-item" style={{ borderColor: "rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.05)" }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(239,68,68,0.2)", border: "2px solid rgba(239,68,68,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11 }}>!</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 500 }}>{item.title}</p>
              <p style={{ fontSize: 12, color: "#64748b" }}>{item.category}</p>
            </div>
            <span style={{ fontSize: 12, color: "#ef4444", fontWeight: 600 }}>Due {item.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// CHECKLIST PAGE
// ============================================================
function ChecklistPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/checklist").then(data => {
      setTasks(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  const toggle = async (id, currentStatus) => {
    if (currentStatus === "locked") return;
    const newStatus = currentStatus === "done" ? "pending" : "done";
    setTasks(prev => prev.map(t => t._id === id ? { ...t, status: newStatus } : t));
    await apiFetch(`/checklist/${id}`, "PATCH", { status: newStatus });
  };

  const categories = [...new Set(tasks.map(i => i.category))];
  const filtered = filter === "all" ? tasks : tasks.filter(t => t.category === filter);
  const done = tasks.filter(t => t.status === "done").length;

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" }} />
    </div>
  );

  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Onboarding Checklist</h1>
        <p style={{ color: "#64748b" }}>{done}/{tasks.length} tasks completed</p>
      </div>

      <div className="glass" style={{ padding: "18px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 14, color: "#94a3b8" }}>Overall Progress</span>
          <span className="syne" style={{ fontWeight: 700, color: "#3b82f6" }}>{Math.round(done / tasks.length * 100) || 0}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${Math.round(done / tasks.length * 100) || 0}%` }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        {["all", ...categories].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 16px", borderRadius: 99, border: "1px solid",
            borderColor: filter === f ? "#2563eb" : "rgba(37,99,235,0.2)",
            background: filter === f ? "rgba(37,99,235,0.2)" : "transparent",
            color: filter === f ? "#3b82f6" : "#64748b",
            fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
          }}>{f === "all" ? "All Tasks" : f}</button>
        ))}
      </div>

      {(filter === "all" ? categories : [filter]).map((cat) => (
        <div key={cat} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 13, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>{cat}</h3>
          {filtered.filter(t => t.category === cat).map((task) => (
            <div key={task._id}
              className={`check-item ${task.status === "done" ? "done" : ""}`}
              onClick={() => toggle(task._id, task.status)}
              style={{ opacity: task.status === "locked" ? 0.45 : 1, cursor: task.status === "locked" ? "not-allowed" : "pointer" }}>
              <div className="check-box">
                {task.status === "done" && <span style={{ color: "white", fontSize: 12 }}>✓</span>}
                {task.status === "locked" && <span style={{ fontSize: 11 }}>🔒</span>}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 500, textDecoration: task.status === "done" ? "line-through" : "none", color: task.status === "done" ? "#475569" : "#f1f5f9" }}>
                  {task.title}
                </p>
              </div>
              <span className={`pill ${task.status}`} style={{ fontSize: 11 }}>
                {task.status === "done" ? "✓ Done" : task.status === "locked" ? "🔒" : `Due ${task.due}`}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
// ============================================================
// DOCUMENTS PAGE
// ============================================================
function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [docName, setDocName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    apiFetch("/documents").then(data => {
      setDocs(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  const uploadFile = async (file) => {
    if (!file) return;

    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.type)) {
      setError("Only PDF, JPG and PNG files allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Max size is 5MB");
      return;
    }

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", docName || file.name.replace(/\.[^/.]+$/, ""));

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/documents/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (data._id) {
      setDocs(prev => [data, ...prev]);
      setDocName("");
      setSuccess("Document uploaded successfully! ✓");
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError(data.message || "Upload failed");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    uploadFile(file);
  };

  const handleFileChange = (e) => {
    uploadFile(e.target.files[0]);
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
    </div>
  );

  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Documents</h1>
        <p style={{ color: "#64748b" }}>Upload and track your document verification status</p>
      </div>

      {/* Document name input */}
      <div className="glass" style={{ padding: "20px 24px", marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>
          Document Name (optional)
        </label>
        <input className="input-field" placeholder="e.g. 10th Marksheet, Aadhar Card..."
          value={docName} onChange={e => setDocName(e.target.value)} />
      </div>

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current.click()}
        style={{
          border: `2px dashed ${dragOver ? "#2563eb" : "rgba(37,99,235,0.3)"}`,
          borderRadius: 16, padding: "36px",
          textAlign: "center", marginBottom: 20,
          background: dragOver ? "rgba(37,99,235,0.08)" : "rgba(37,99,235,0.02)",
          cursor: uploading ? "not-allowed" : "pointer",
          transition: "all 0.3s",
        }}>
        <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png"
          style={{ display: "none" }} onChange={handleFileChange} />

        {uploading ? (
          <>
            <div style={{ width: 40, height: 40, border: "3px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
            <p className="syne" style={{ fontWeight: 700, marginBottom: 6 }}>Uploading to cloud...</p>
            <p style={{ fontSize: 13, color: "#64748b" }}>Please wait</p>
          </>
        ) : (
          <>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📤</div>
            <p className="syne" style={{ fontWeight: 700, marginBottom: 6 }}>
              {dragOver ? "Drop it here!" : "Drag & drop or click to upload"}
            </p>
            <p style={{ fontSize: 13, color: "#64748b" }}>PDF, JPG, PNG — Max 5MB</p>
          </>
        )}
      </div>

      {/* Error / Success */}
      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
          <p style={{ color: "#ef4444", fontSize: 13 }}>⚠️ {error}</p>
        </div>
      )}
      {success && (
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
          <p style={{ color: "#10b981", fontSize: 13 }}>{success}</p>
        </div>
      )}

      {/* Document list */}
      <div className="glass" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(37,99,235,0.1)" }}>
          <h3 className="syne" style={{ fontSize: 15, fontWeight: 700 }}>
            Uploaded Documents ({docs.length})
          </h3>
        </div>

        {docs.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
            <p style={{ color: "#64748b" }}>No documents uploaded yet</p>
          </div>
        ) : (
          docs.map((doc, i) => (
            <div key={doc._id} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "16px 20px",
              borderBottom: i < docs.length - 1 ? "1px solid rgba(37,99,235,0.07)" : "none",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(37,99,235,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                {doc.fileUrl?.includes(".pdf") ? "📄" : "🖼️"}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 500 }}>{doc.name}</p>
                <p style={{ fontSize: 12, color: "#475569" }}>
                  Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span className={`pill ${doc.status === "verified" ? "done" : doc.status === "rejected" ? "locked" : "pending"}`}>
                  {doc.status === "verified" ? "✓ Verified" : doc.status === "rejected" ? "✗ Rejected" : "⏳ Pending"}
                </span>
                {doc.fileUrl && (
                  <a href={doc.fileUrl} target="_blank" rel="noreferrer" style={{
                    padding: "6px 12px", borderRadius: 8,
                    background: "rgba(37,99,235,0.15)",
                    color: "#3b82f6", fontSize: 12, fontWeight: 600,
                    textDecoration: "none", transition: "all 0.2s",
                  }}>View</a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
// ============================================================
// TIMELINE PAGE
// ============================================================
function TimelinePage() {
  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 className="syne" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>My Journey</h1>
        <p style={{ color: "#64748b" }}>Track your onboarding milestones</p>
      </div>

      <div className="glass" style={{ padding: "28px" }}>
        {TIMELINE.map((item, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" style={{
              background: item.status === "done" ? "rgba(16,185,129,0.2)" : item.status === "pending" ? "rgba(245,158,11,0.2)" : "rgba(37,99,235,0.15)",
              border: `2px solid ${item.status === "done" ? "#10b981" : item.status === "pending" ? "#f59e0b" : "rgba(37,99,235,0.3)"}`,
            }}>
              {item.icon}
            </div>
            <div style={{ flex: 1, paddingTop: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: item.status === "upcoming" ? "#64748b" : "#f1f5f9" }}>{item.label}</p>
                <span className={`pill ${item.status === "done" ? "done" : item.status === "pending" ? "pending" : "locked"}`} style={{ fontSize: 11 }}>
                  {item.status === "done" ? "✓ Complete" : item.status === "pending" ? "⏳ Due Soon" : "📅 Upcoming"}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#475569" }}>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// NOTIFICATIONS PAGE
// ============================================================
function NotificationsPage({ onRead }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/notifications").then(data => {
      setNotes(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  const markRead = async (id) => {
    setNotes(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    await apiFetch(`/notifications/${id}/read`, "PATCH");
    onRead();
  };

  const icons = { urgent: "🚨", reminder: "⏰", info: "ℹ️", success: "✅" };
  const colors = { urgent: "#ef4444", reminder: "#f59e0b", info: "#3b82f6", success: "#10b981" };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" }} />
    </div>
  );

  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Notifications</h1>
        <p style={{ color: "#64748b" }}>{notes.filter(n => !n.read).length} unread messages</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {notes.length === 0 && (
          <div className="glass" style={{ padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔔</div>
            <p style={{ color: "#64748b" }}>No notifications yet</p>
          </div>
        )}
        {notes.map((note) => (
          <div key={note._id} className="glass glass-hover" style={{
            padding: "18px 20px", opacity: note.read ? 0.6 : 1,
            borderColor: note.read ? "rgba(37,99,235,0.1)" : "rgba(37,99,235,0.3)",
          }} onClick={() => markRead(note._id)}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${colors[note.type]}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                {icons[note.type]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{note.title}</p>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#475569" }}>{new Date(note.createdAt).toLocaleDateString()}</span>
                    {!note.read && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />}
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{note.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminDocuments() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [result, setResult] = useState("");

  useEffect(() => {
    apiFetch("/admin/documents").then(data => {
      setDocs(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  const updateStatus = async (docId, status) => {
    setDocs(prev => prev.map(d => d._id === docId ? { ...d, status } : d));
    const data = await apiFetch(`/documents/${docId}/status`, "PATCH", { status });
    if (data._id) {
      setResult(`Document ${status} successfully! Student notified by email.`);
      setTimeout(() => setResult(""), 3000);
    }
  };

  const filtered = filter === "all" ? docs : docs.filter(d => d.status === filter);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
    </div>
  );

  const pending = docs.filter(d => d.status === "pending").length;
  const verified = docs.filter(d => d.status === "verified").length;
  const rejected = docs.filter(d => d.status === "rejected").length;

  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 4 }}>Admin Panel</p>
        <h1 className="syne" style={{ fontSize: 28, fontWeight: 800 }}>Document Verification</h1>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Pending Review", value: pending, icon: "⏳", color: "#f59e0b" },
          { label: "Verified", value: verified, icon: "✅", color: "#10b981" },
          { label: "Rejected", value: rejected, icon: "❌", color: "#ef4444" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div className="syne" style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {["all", "pending", "verified", "rejected"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 18px", borderRadius: 99, border: "1px solid",
            borderColor: filter === f ? "#2563eb" : "rgba(37,99,235,0.2)",
            background: filter === f ? "rgba(37,99,235,0.2)" : "transparent",
            color: filter === f ? "#3b82f6" : "#64748b",
            fontSize: 13, fontWeight: 500, cursor: "pointer",
            transition: "all 0.2s", textTransform: "capitalize",
          }}>
            {f === "all" ? "All Documents" : f}
            {f === "pending" && pending > 0 && (
              <span className="badge" style={{ marginLeft: 8 }}>{pending}</span>
            )}
          </button>
        ))}
      </div>

      {/* Result message */}
      {result && (
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
          <p style={{ color: "#10b981", fontSize: 13 }}>✅ {result}</p>
        </div>
      )}

      {/* Documents list */}
      <div className="glass" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(37,99,235,0.1)" }}>
          <h3 className="syne" style={{ fontSize: 15, fontWeight: 700 }}>
            {filtered.length} Document{filtered.length !== 1 ? "s" : ""}
          </h3>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
            <p style={{ color: "#64748b" }}>No documents found</p>
          </div>
        ) : (
          filtered.map((doc, i) => (
            <div key={doc._id} style={{
              padding: "18px 20px",
              borderBottom: i < filtered.length - 1 ? "1px solid rgba(37,99,235,0.07)" : "none",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(37,99,235,0.03)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* File icon */}
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {doc.fileUrl?.includes(".pdf") ? "📄" : "🖼️"}
                </div>

                {/* Doc info */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{doc.name}</p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>
                      👤 {doc.userId?.name || "Unknown"}
                    </span>
                    <span style={{ fontSize: 12, color: "#475569" }}>
                      📧 {doc.userId?.email || ""}
                    </span>
                    <span style={{ fontSize: 12, color: "#475569" }}>
                      📅 {new Date(doc.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Status + actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <span className={`pill ${doc.status === "verified" ? "done" : doc.status === "rejected" ? "locked" : "pending"}`}>
                    {doc.status === "verified" ? "✓ Verified" : doc.status === "rejected" ? "✗ Rejected" : "⏳ Pending"}
                  </span>

                  {/* View button */}
                  {doc.fileUrl && (
                    <a href={doc.fileUrl} target="_blank" rel="noreferrer" style={{
                      padding: "6px 12px", borderRadius: 8,
                      background: "rgba(37,99,235,0.15)",
                      color: "#3b82f6", fontSize: 12, fontWeight: 600,
                      textDecoration: "none",
                    }}>👁️ View</a>
                  )}

                  {/* Verify button */}
                  {doc.status !== "verified" && (
                    <button onClick={() => updateStatus(doc._id, "verified")} style={{
                      padding: "6px 14px", borderRadius: 8,
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      color: "#10b981", fontSize: 12, fontWeight: 600,
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.25)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.15)"}
                    >✓ Verify</button>
                  )}

                  {/* Reject button */}
                  {doc.status !== "rejected" && (
                    <button onClick={() => updateStatus(doc._id, "rejected")} style={{
                      padding: "6px 14px", borderRadius: 8,
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#ef4444", fontSize: 12, fontWeight: 600,
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                    >✗ Reject</button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================
function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ total: 0, complete: 0, inProgress: 0, atRisk: 0 });
  const [loading, setLoading] = useState(true);
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    Promise.all([
      apiFetch("/admin/students"),
      apiFetch("/admin/stats"),
    ]).then(([s, st]) => {
      setStudents(Array.isArray(s) ? s : []);
      setStats(st);
      setLoading(false);
    });
  }, []);

  const sendBroadcast = async () => {
    if (!broadcastTitle || !broadcastMsg) return;
    setSending(true);
    const data = await apiFetch("/email/broadcast", "POST", {
      title: broadcastTitle,
      message: broadcastMsg,
    });
    setSending(false);
    setResult(data.message);
    setBroadcastTitle("");
    setBroadcastMsg("");
    setTimeout(() => setResult(""), 4000);
  };

  const sendReminder = async (userId, name) => {
    const data = await apiFetch(`/email/remind/${userId}`, "POST");
    setResult(`${data.message}`);
    setTimeout(() => setResult(""), 3000);
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
    </div>
  );

  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 4 }}>Admin Panel</p>
        <h1 className="syne" style={{ fontSize: 28, fontWeight: 800 }}>Student Overview</h1>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Total Students", value: stats.total, icon: "👥", color: "#3b82f6" },
          { label: "Completed", value: stats.complete, icon: "✅", color: "#10b981" },
          { label: "In Progress", value: stats.inProgress, icon: "🔄", color: "#f59e0b" },
          { label: "At Risk", value: stats.atRisk, icon: "⚠️", color: "#ef4444" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div className="syne" style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Broadcast email */}
      <div className="glass" style={{ padding: "24px", marginBottom: 24 }}>
        <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
          📢 Broadcast Email to All Students
        </h3>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 8 }}>Subject / Title</label>
          <input className="input-field" placeholder="e.g. Important: Fee deadline extended"
            value={broadcastTitle} onChange={e => setBroadcastTitle(e.target.value)} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 8 }}>Message</label>
          <textarea className="input-field" placeholder="Type your message to all students..."
            value={broadcastMsg} onChange={e => setBroadcastMsg(e.target.value)}
            style={{ minHeight: 100, resize: "vertical", lineHeight: 1.6 }} />
        </div>
        {result && (
          <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <p style={{ color: "#10b981", fontSize: 13 }}>✅ {result}</p>
          </div>
        )}
        <button className="btn-primary" onClick={sendBroadcast} style={{ fontSize: 14 }}>
          <span>{sending ? "Sending..." : "Send to All Students 📨"}</span>
        </button>
      </div>

      {/* Student list with remind button */}
      <div className="glass" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(37,99,235,0.1)" }}>
          <h3 className="syne" style={{ fontSize: 15, fontWeight: 700 }}>Student Status</h3>
        </div>
        {students.map((s, i) => (
          <div key={s._id} style={{ padding: "14px 20px", borderBottom: "1px solid rgba(37,99,235,0.07)", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
              {s.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</p>
                  <p style={{ fontSize: 11, color: "#475569" }}>{s.email}</p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.progress === 100 ? "#10b981" : s.progress < 40 ? "#ef4444" : "#f59e0b" }}>
                  {s.progress}%
                </span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{
                  width: `${s.progress}%`,
                  background: s.progress === 100 ? "linear-gradient(90deg, #10b981, #34d399)" : s.progress < 40 ? "linear-gradient(90deg, #ef4444, #f87171)" : "linear-gradient(90deg, #2563eb, #06b6d4)"
                }} />
              </div>
            </div>
            <button onClick={() => sendReminder(s._id, s.name)}
              style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.1)", color: "#f59e0b", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              ⏰ Remind
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
// ============================================================
// CHATBOT
// ============================================================
function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! 👋 I'm your TCET Onboarding Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const getResponse = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes("hello") || m.includes("hi") || m.includes("hey")) return BOT_RESPONSES.hello[0];
    if (m.includes("fee") || m.includes("payment") || m.includes("pay")) return BOT_RESPONSES.fee[0];
    if (m.includes("document") || m.includes("certificate") || m.includes("marksheet")) return BOT_RESPONSES.document[0];
    if (m.includes("lms") || m.includes("moodle") || m.includes("portal")) return BOT_RESPONSES.lms[0];
    if (m.includes("timetable") || m.includes("schedule") || m.includes("class")) return BOT_RESPONSES.timetable[0];
    if (m.includes("hostel") || m.includes("accommodation")) return BOT_RESPONSES.hostel[0];
    if (m.includes("help") || m.includes("what can")) return BOT_RESPONSES.help[0];
    return BOT_RESPONSES.default[0];
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { from: "user", text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: "bot", text: getResponse(userMsg) }]);
    }, 1200);
  };

  const quickReplies = ["Fee payment", "LMS setup", "Documents", "Timetable", "Hostel"];

  return (
    <div className="glass slide-in" style={{
      position: "fixed", bottom: 100, right: 28,
      width: 360, height: 520, zIndex: 200,
      display: "flex", flexDirection: "column",
      borderRadius: 20, overflow: "hidden",
      boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
    }}>
      {/* Header */}
      <div style={{ padding: "16px 18px", background: "linear-gradient(135deg, #1e3a8a, #0c4a6e)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
        <div style={{ flex: 1 }}>
          <p className="syne" style={{ fontSize: 14, fontWeight: 700 }}>AI Assistant</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
            <span style={{ fontSize: 11, color: "#94a3b8" }}>Online 24/7</span>
          </div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", fontSize: 18, cursor: "pointer" }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
            {m.from === "bot" && (
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, marginRight: 8, flexShrink: 0, marginTop: 2 }}>🤖</div>
            )}
            <div className={`bubble ${m.from}`}>
              <span style={{ whiteSpace: "pre-wrap" }}>{m.text}</span>
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🤖</div>
            <div className="bubble bot" style={{ display: "flex", gap: 5, alignItems: "center", padding: "12px 16px" }}>
              <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div style={{ padding: "8px 12px", display: "flex", gap: 6, flexWrap: "wrap", borderTop: "1px solid rgba(37,99,235,0.1)" }}>
        {quickReplies.map((q) => (
          <button key={q} onClick={() => { setInput(q); setTimeout(() => { setMessages(prev => [...prev, { from: "user", text: q }]); setTyping(true); setTimeout(() => { setTyping(false); setMessages(prev => [...prev, { from: "bot", text: getResponse(q) }]); }, 1000); }, 100); setInput(""); }}
            style={{ padding: "5px 12px", borderRadius: 99, border: "1px solid rgba(37,99,235,0.3)", background: "transparent", color: "#3b82f6", fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(37,99,235,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >{q}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: "12px", borderTop: "1px solid rgba(37,99,235,0.1)", display: "flex", gap: 8 }}>
        <input className="input-field" placeholder="Ask anything..." value={input}
          onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          style={{ fontSize: 13, padding: "10px 14px" }} />
        <button className="btn-primary" onClick={send} style={{ padding: "10px 14px", fontSize: 16, flexShrink: 0 }}>
          <span>➤</span>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [chatOpen, setChatOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(NOTIFICATIONS.filter(n => !n.read).length);

  const handleLogin = (role) => {
    setUser(role);
    setActiveNav(role === "admin" ? "admin-dash" : "dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setChatOpen(false);
  };

  const renderPage = () => {
    switch (activeNav) {
      case "dashboard": return <Dashboard />;
      case "checklist": return <ChecklistPage />;
      case "documents": return <DocumentsPage />;
      case "timeline": return <TimelinePage />;
      case "notifications": return <NotificationsPage onRead={() => setUnreadNotifs(p => Math.max(0, p - 1))} />;
      case "admin-dash": return <AdminDashboard />;
      case "students": return <AdminDashboard />;
      case "admin-documents": return <AdminDocuments />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <Stars />

      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
          {/* Orbs */}
          <div style={{ position: "fixed", top: "15%", right: "25%", width: 350, height: 350, background: "rgba(37,99,235,0.06)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0, animation: "orb 12s ease-in-out infinite" }} />

          <Sidebar active={activeNav} setActive={setActiveNav} role={user} onLogout={handleLogout} unread={unreadNotifs} />

          {/* Main content */}
          <main style={{ marginLeft: 240, flex: 1, padding: "40px", position: "relative", zIndex: 1, maxWidth: "calc(100vw - 240px)", minHeight: "100vh" }}>
            {renderPage()}
          </main>

          {/* Chatbot */}
          {chatOpen && <Chatbot onClose={() => setChatOpen(false)} />}
          <button className="chat-fab" onClick={() => setChatOpen(p => !p)}>
            {chatOpen ? "✕" : "💬"}
          </button>
        </div>
      )}
    </>
  );
}