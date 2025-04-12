import { type IRiskIdentifierInteractionData } from "~/types/ialingo";

interface RiskIdentifierInteractionProps {
  data: IRiskIdentifierInteractionData;
  selectedAnswers: number[];
  setSelectedAnswers: (answers: number[]) => void;
  correctAnswerShown: boolean;
}

export const RiskIdentifierInteraction = ({
  data,
  selectedAnswers,
  setSelectedAnswers,
  correctAnswerShown,
}: RiskIdentifierInteractionProps) => {
  const toggleAnswer = (index: number) => {
    if (selectedAnswers.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter((i) => i !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="text-gray-900">{data.scenario}</p>
      </div>
      <p className="text-lg font-medium text-gray-900">
        Quais riscos você identifica neste cenário?
      </p>
      <div className="flex flex-col gap-2">
        {data.risks.map((risk, index) => (
          <button
            key={index}
            className={[
              "rounded-lg border-2 p-4 text-left transition",
              selectedAnswers.includes(index)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300",
              correctAnswerShown &&
                (data.correctRisks.includes(index)
                  ? "border-green-500 bg-green-50"
                  : selectedAnswers.includes(index)
                  ? "border-red-500 bg-red-50"
                  : ""),
            ].join(" ")}
            onClick={() => toggleAnswer(index)}
          >
            {risk}
          </button>
        ))}
      </div>
      {correctAnswerShown && (
        <p className="text-sm text-gray-600">{data.explanation}</p>
      )}
    </div>
  );
}; 