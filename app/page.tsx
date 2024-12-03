"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import questions from "../data/questions";

export default function Page() {
  const router = useRouter();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setAnswers({
      ...answers,
      [id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("answers", JSON.stringify(answers));
    }
    router.push("/result"); // 結果ページへ遷移
  };

  const navigateBack = () => {
    router.push("/practice"); // 初期画面 (practice.tsx) に戻る
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">和文英訳クイズ</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q.id} className="mb-4">
            <p className="mb-2">{q.japanese}</p>
            <input
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(e, q.id)}
              className="border p-2 w-full text-black bg-white"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          解答を提出
        </button>
      </form>
      <div className="mt-8">
        <button
          onClick={navigateBack}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back to Practice
        </button>
      </div>
    </div>
  );
}
