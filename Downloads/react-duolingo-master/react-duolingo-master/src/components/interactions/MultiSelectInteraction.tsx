import { type IMultiSelectInteractionData } from "~/types/ialingo";

interface MultiSelectInteractionProps {
  data: IMultiSelectInteractionData;
  selectedAnswers: number[];
  setSelectedAnswers: (answers: number[]) => void;
  correctAnswerShown: boolean;
}

export const MultiSelectInteraction = ({
  data,
  selectedAnswers,
  setSelectedAnswers,
  correctAnswerShown,
}: MultiSelectInteractionProps) => {
  const toggleAnswer = (index: number) => {
    if (selectedAnswers.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter((i) => i !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium text-gray-900">{data.question}</p>
      <div className="flex flex-col gap-2">
        {data.options.map((option, index) => (
          <button
            key={index}
            className={[
              "rounded-lg border-2 p-4 text-left transition",
              selectedAnswers.includes(index)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300",
              correctAnswerShown &&
                (data.correctAnswers.includes(index)
                  ? "border-green-500 bg-green-50"
                  : selectedAnswers.includes(index)
                  ? "border-red-500 bg-red-50"
                  : ""),
            ].join(" ")}
            onClick={() => toggleAnswer(index)}
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