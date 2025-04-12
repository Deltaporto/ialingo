import { type ITrueFalseInteractionData } from "~/types/ialingo";

interface TrueFalseInteractionProps {
  data: ITrueFalseInteractionData;
  selectedAnswer: number | null;
  setSelectedAnswer: (answer: number) => void;
  correctAnswerShown: boolean;
}

export const TrueFalseInteraction = ({
  data,
  selectedAnswer,
  setSelectedAnswer,
  correctAnswerShown,
}: TrueFalseInteractionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium text-gray-900">{data.statement}</p>
      <div className="flex gap-4">
        <button
          className={[
            "rounded-lg border-2 p-4 transition",
            selectedAnswer === 1
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300",
            correctAnswerShown &&
              (data.isTrue
                ? "border-green-500 bg-green-50"
                : "border-red-500 bg-red-50"),
          ].join(" ")}
          onClick={() => setSelectedAnswer(1)}
        >
          Verdadeiro
        </button>
        <button
          className={[
            "rounded-lg border-2 p-4 transition",
            selectedAnswer === 0
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300",
            correctAnswerShown &&
              (!data.isTrue
                ? "border-green-500 bg-green-50"
                : "border-red-500 bg-red-50"),
          ].join(" ")}
          onClick={() => setSelectedAnswer(0)}
        >
          Falso
        </button>
      </div>
      {correctAnswerShown && (
        <p className="text-sm text-gray-600">{data.explanation}</p>
      )}
    </div>
  );
}; 