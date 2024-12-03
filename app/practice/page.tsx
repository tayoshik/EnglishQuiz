"use client";

import { useState } from "react";
import questions from "../../data/questions"; // questions.ts をインポート

export default function PracticePage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [bgColor, setBgColor] = useState("white");
    const [wordStates, setWordStates] = useState(
        questions.map((question) =>
            question.english.split(" ").map(() => 0) // 0: 伏せ字, 1: 先頭文字, 2: 全体表示
        )
    );

    const currentQuestion = questions[currentQuestionIndex];

    const toggleWordState = (wordIndex: number) => {
        const newWordStates = [...wordStates];
        newWordStates[currentQuestionIndex][wordIndex] =
            (newWordStates[currentQuestionIndex][wordIndex] + 1) % 3;
        setWordStates(newWordStates);
    };

    const displaySentence = () => {
        const words = currentQuestion.english.split(" ");
        return words.map((word, index) => {
            const state = wordStates[currentQuestionIndex][index];
            let displayWord = "_".repeat(word.length);
            if (state === 1) {
                displayWord = word[0] + "_".repeat(word.length - 1);
            } else if (state === 2) {
                displayWord = word;
            }

            return (
                <span
                    key={index}
                    onClick={() => toggleWordState(index)}
                    className="cursor-pointer text-blue-500 underline mx-1"
                >
                    {displayWord}
                </span>
            );
        });
    };

    const checkAnswer = () => {
        if (userInput.toLowerCase() === currentQuestion.english.toLowerCase()) {
            setBgColor("skyblue");
        } else {
            setBgColor("pink");
        }
    };

    const nextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
        setUserInput("");
        setBgColor("white");
    };

    const prevQuestion = () => {
        setCurrentQuestionIndex((prevIndex) =>
            (prevIndex - 1 + questions.length) % questions.length
        );
        setUserInput("");
        setBgColor("white");
    };

    return (
        <div
            className="min-h-screen p-8"
            style={{ backgroundColor: bgColor, transition: "background-color 0.5s" }}
        >
            <h1 className="text-2xl font-bold">Interactive English Sentence Practice</h1>
            <div className="mt-4">
                <p className="italic text-gray-600">{currentQuestion.japanese}</p>
                <p className="mt-2">{displaySentence()}</p>
            </div>
            <input
                className="border p-2 w-full mt-4 text-black"
                type="text"
                placeholder="Type your answer..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <button
                className="bg-green-500 text-white px-4 py-2 mt-2"
                onClick={checkAnswer}
            >
                Check Answer
            </button>
            <div className="mt-4 flex justify-between">
                <button className="bg-gray-300 px-4 py-2" onClick={prevQuestion}>
                    Previous
                </button>
                <span>
                    Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <button className="bg-gray-300 px-4 py-2" onClick={nextQuestion}>
                    Next
                </button>
            </div>
        </div>
    );
}
