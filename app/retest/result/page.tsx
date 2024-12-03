// app/retest/result/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Question } from "../../../data/questions";
import { useRouter } from "next/navigation";

export default function RetestResult() {
    const router = useRouter();
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [retestQuestions, setRetestQuestions] = useState<Question[]>([]);
    const [incorrectQuestions, setIncorrectQuestions] = useState<Question[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const answers = JSON.parse(localStorage.getItem("retestAnswers") || "{}");
            const questions = JSON.parse(
                localStorage.getItem("retestQuestions") || "[]"
            );
            setUserAnswers(answers);
            setRetestQuestions(questions);

            const incorrect = questions.filter(
                (q: Question) =>
                    answers[q.id]?.trim().toLowerCase() !== q.english.toLowerCase()
            );
            setIncorrectQuestions(incorrect);

            // 間違えた問題を再度 localStorage に保存
            localStorage.setItem("retestQuestions", JSON.stringify(incorrect));
        }
    }, []);

    const handleRetest = () => {
        router.push("/retest");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">再テスト結果</h1>
            {retestQuestions.map((q) => (
                <div key={q.id} className="mb-4">
                    <p>問題: {q.japanese}</p>
                    <p>あなたの解答: {userAnswers[q.id]}</p>
                    <p>
                        正解: {q.english} -{" "}
                        {userAnswers[q.id]?.trim().toLowerCase() === q.english.toLowerCase()
                            ? "正解"
                            : "不正解"}
                    </p>
                </div>
            ))}
            {incorrectQuestions.length > 0 ? (
                <div>
                    <p>まだ間違いがあります。再度復習しましょう。</p>
                    <button
                        onClick={handleRetest}
                        className="bg-green-500 text-white px-4 py-2 mt-4"
                    >
                        再テストをもう一度
                    </button>
                </div>
            ) : (
                <p>全問正解です！おめでとうございます。</p>
            )}
        </div>
    );
}
