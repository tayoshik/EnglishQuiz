// app/result/page.tsx

"use client";

import { useEffect, useState } from "react";
import questions, { Question } from "../../data/questions";
import { useRouter } from "next/navigation";

export default function Result() {
  const router = useRouter();
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [incorrectQuestions, setIncorrectQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const answers = JSON.parse(localStorage.getItem("answers") || "{}");
      setUserAnswers(answers);

      const incorrect = questions.filter(
        (q) =>
          answers[q.id]?.trim().toLowerCase() !== q.english.toLowerCase()
      );
      setIncorrectQuestions(incorrect);
    }
  }, []);

  const handleRetest = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "retestQuestions",
        JSON.stringify(incorrectQuestions)
      );
    }
    router.push("/retest");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">結果発表</h1>
      {questions.map((q) => (
        <div key={q.id} className="mb-4">
          <p>問題: {q.japanese}</p>
          <p>あなたの解答: {userAnswers[q.id]}</p>
          <p>
            正解: {q.english} -{" "}
            {userAnswers[q.id]?.trim().toLowerCase() ===
              q.english.toLowerCase()
              ? "正解"
              : "不正解"}
          </p>
        </div>
      ))}
      {incorrectQuestions.length > 0 && (
        <button
          onClick={handleRetest}
          className="bg-green-500 text-white px-4 py-2"
        >
          間違えた問題を再テスト
        </button>
      )}
    </div>
  );
}
