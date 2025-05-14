
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const links = [
  { name: "급식표", url: "https://school.koreacharts.com/school/meals/B000023143/contents.html", icon: "📘" },
  { name: "구글 클래스룸", url: "http://classroom.google.com/?pli=1", icon: "💬" },
  { name: "구글 챗", url: "https://mail.google.com/chat/u/0/#chat/home", icon: "💬" },
];

export default function SchoolPortal() {
  const [darkMode, setDarkMode] = useState(false);
  const [timetable, setTimetable] = useState(Array(5).fill(""));
  const [note, setNote] = useState("");

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-4" : "bg-white text-black min-h-screen p-4"}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🎓 내 학교 포털</h1>
        <Button onClick={() => setDarkMode(!darkMode)}>{darkMode ? "☀️" : "🌙"}</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {links.map((link, idx) => (
          <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
            <Card className="hover:shadow-xl cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{link.icon}</div>
                <div className="text-lg font-semibold">{link.name}</div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">🕐 시간표 작성</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {timetable.map((item, i) => (
          <Input
            key={i}
            value={item}
            onChange={(e) => {
              const newTimetable = [...timetable];
              newTimetable[i] = e.target.value;
              setTimetable(newTimetable);
            }}
            placeholder={`교시 ${i + 1} 내용 입력`}
          />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">📝 메모</h2>
      <Textarea
        className="mb-6"
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="오늘 해야 할 일, 중요한 일정 등을 메모하세요"
      />
    </div>
  );
}
