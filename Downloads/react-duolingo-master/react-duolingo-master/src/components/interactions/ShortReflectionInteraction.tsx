import { type IShortReflectionInteractionData } from "~/types/ialingo";

interface ShortReflectionInteractionProps {
  data: IShortReflectionInteractionData;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  correctAnswerShown: boolean;
}

export const ShortReflectionInteraction = ({
  data,
  selectedAnswer,
  setSelectedAnswer,
  correctAnswerShown,
}: ShortReflectionInteractionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium text-gray-900">{data.question}</p>
      <textarea
        className="rounded-lg border-2 border-gray-200 p-4 focus:border-blue-500 focus:outline-none"
        placeholder={data.placeholder}
        value={selectedAnswer}
        onChange={(e) => setSelectedAnswer(e.target.value)}
        rows={4}
      />
    </div>
  );
}; 