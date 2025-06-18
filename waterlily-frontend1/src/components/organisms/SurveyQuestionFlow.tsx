"use client";
import { useState } from "react";
import { Question } from "../../survey.service";

interface SurveyQuestionFlowProps {
  questions: Question[];
}

export default function SurveyQuestionFlow({ questions }: SurveyQuestionFlowProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [completed, setCompleted] = useState(false);

  if (!questions.length) return <p>No questions found for this survey.</p>;

  const question = questions[current];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [question.id]: e.target.value });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (completed) {
    return (
      <div className="w-full mt-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Survey Complete!</h3>
        <p className="mb-4 text-gray-700">Thank you for your responses.</p>
        {/* Optionally show a summary or submit answers here */}
      </div>
    );
  }

  return (
    <div className="w-full mt-6">
      <h3 className="text-xl font-semibold mb-2 font-black text-gray-900">
        {question.title} + {question.id}
      </h3>
      <p className="mb-4 text-gray-700">{question.description}</p>
      {/* For now, just a text input. Can be extended for other types. */}
      <input
        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
        placeholder="Your answer..."
        value={answers[question.id] || ""}
        onChange={handleInputChange}
      />
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={handlePrev}
          disabled={current === 0}
        >
          Previous
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleNext}>
          {current < questions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
}
