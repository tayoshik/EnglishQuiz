// app/retest/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Question } from "../../data/questions";
import { useRouter } from "next/navigation";

export default function Retest() {
    const router = useRouter();
    const [retestQuestions, setRetestQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        if (typeof window !== "undefined") {
            const questions = JSON.parse(
                localStorage.getItem("retestQuestions") || "[]"
            );
            setRetestQuestions(questions);
        }
    }, []);

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
            localStorage.setItem("retestAnswers", JSON.stringify(answers));
        }
        router.push("/retest/result");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">再テスト</h1>
            <form onSubmit={handleSubmit}>
                {retestQuestions.map((q) => (
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
        </div>
    );
}
