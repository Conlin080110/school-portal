
import { useState, useEffect } from "react";

const links = [
  { name: "급식표", url: "https://school.koreacharts.com/school/meals/B000023143/contents.html", icon: "📘" },
  { name: "구글 클래스룸", url: "http://classroom.google.com/?pli=1", icon: "💬" },
  { name: "구글 챗", url: "https://mail.google.com/chat/u/0/#chat/home", icon: "💬" },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [timetable, setTimetable] = useState(() =>
    JSON.parse(localStorage.getItem("timetable") || "[]")
  );
  const [note, setNote] = useState(() =>
    localStorage.getItem("note") || ""
  );

  useEffect(() => {
    localStorage.setItem("timetable", JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem("note", note);
  }, [note]);

  return (
    <div style={{
      backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000',
      minHeight: '100vh',
      padding: '1rem',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1>🎓 내 학교 포털</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        {links.map((link, idx) => (
          <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" style={{
            textDecoration: 'none',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            flex: '1 0 30%',
            textAlign: 'center',
            backgroundColor: darkMode ? '#333' : '#f9f9f9',
            color: darkMode ? '#fff' : '#000'
          }}>
            <div style={{ fontSize: '2rem' }}>{link.icon}</div>
            <div>{link.name}</div>
          </a>
        ))}
      </div>

      <h2>🕐 시간표 작성</h2>
      <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '2rem' }}>
        {[...Array(5)].map((_, i) => (
          <input
            key={i}
            value={timetable[i] || ""}
            onChange={(e) => {
              const newTimetable = [...timetable];
              newTimetable[i] = e.target.value;
              setTimetable(newTimetable);
            }}
            placeholder={`교시 ${i + 1} 내용 입력`}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        ))}
      </div>

      <h2>📝 메모</h2>
      <textarea
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="오늘 해야 할 일, 중요한 일정 등을 메모하세요"
        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
  );
}
