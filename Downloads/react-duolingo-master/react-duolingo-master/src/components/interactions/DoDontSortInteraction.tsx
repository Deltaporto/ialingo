import { type IDoDontSortInteractionData } from "~/types/ialingo";

interface DoDontSortInteractionProps {
  data: IDoDontSortInteractionData;
  selectedAnswers: number[];
  setSelectedAnswers: (answers: number[]) => void;
  correctAnswerShown: boolean;
}

export const DoDontSortInteraction = ({
  data,
  selectedAnswers,
  setSelectedAnswers,
  correctAnswerShown,
}: DoDontSortInteractionProps) => {
  const setAnswer = (index: number, value: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = value;
    setSelectedAnswers(newAnswers);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium text-gray-900">
        Classifique as seguintes ações como "Fazer" ou "Não Fazer":
      </p>
      <div className="flex flex-col gap-2">
        {data.actions.map((action, index) => (
          <div key={index} className="flex gap-2">
            <button
              className={[
                "flex-1 rounded-lg border-2 p-4 text-left transition",
                selectedAnswers[index] === 1
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300",
                correctAnswerShown &&
                  (data.correctClassification[index]
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"),
              ].join(" ")}
              onClick={() => setAnswer(index, 1)}
            >
              {action}
            </button>
            <button
              className={[
                "flex-1 rounded-lg border-2 p-4 text-left transition",
                selectedAnswers[index] === 0
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300",
                correctAnswerShown &&
                  (!data.correctClassification[index]
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"),
              ].join(" ")}
              onClick={() => setAnswer(index, 0)}
            >
              {action}
            </button>
          </div>
        ))}
      </div>
      {correctAnswerShown && (
        <p className="text-sm text-gray-600">{data.explanation}</p>
      )}
    </div>
  );
}; 