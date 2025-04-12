import { type IScenarioJudgmentInteractionData } from "~/types/ialingo";

interface ScenarioJudgmentInteractionProps {
  data: IScenarioJudgmentInteractionData;
  selectedAnswer: number | null;
  setSelectedAnswer: (answer: number) => void;
  correctAnswerShown: boolean;
}

export const ScenarioJudgmentInteraction = ({
  data,
  selectedAnswer,
  setSelectedAnswer,
  correctAnswerShown,
}: ScenarioJudgmentInteractionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="text-gray-900">{data.scenario}</p>
      </div>
      <p className="text-lg font-medium text-gray-900">{data.question}</p>
      <div className="flex flex-col gap-2">
        {data.options.map((option, index) => (
          <button
            key={index}
            className={[
              "rounded-lg border-2 p-4 text-left transition",
              selectedAnswer === index
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300",
              correctAnswerShown &&
                (index === data.correctAnswer
                  ? "border-green-500 bg-green-50"
                  : selectedAnswer === index
                  ? "border-red-500 bg-red-50"
                  : ""),
            ].join(" ")}
            onClick={() => setSelectedAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>
      {correctAnswerShown && (
        <p className="text-sm text-gray-600">{data.explanation}</p>
      )}
    </div>
  );
}; 