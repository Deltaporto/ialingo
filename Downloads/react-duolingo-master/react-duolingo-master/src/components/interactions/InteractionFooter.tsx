import { type IInteraction } from "~/types/ialingo";

interface InteractionFooterProps {
  interaction: IInteraction;
  selectedAnswer: number | null;
  selectedAnswers: number[];
  correctAnswerShown: boolean;
  onCheckAnswer: () => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

export const InteractionFooter = ({
  interaction,
  selectedAnswer,
  selectedAnswers,
  correctAnswerShown,
  onCheckAnswer,
  onNext,
  onPrevious,
  currentStep,
  totalSteps,
}: InteractionFooterProps) => {
  const isAnswerSelected = () => {
    switch (interaction.type) {
      case "MULTIPLE_CHOICE":
      case "TRUE_FALSE":
      case "SCENARIO_JUDGMENT":
        return selectedAnswer !== null;
      case "MULTI_SELECT":
      case "RISK_IDENTIFIER":
        return selectedAnswers.length > 0;
      case "DO_DONT_SORT":
        return selectedAnswers.every((answer) => answer !== null);
      case "SHORT_REFLECTION":
        return true;
    }
  };

  const isAnswerCorrect = () => {
    if (!correctAnswerShown) return false;

    switch (interaction.type) {
      case "MULTIPLE_CHOICE":
      case "SCENARIO_JUDGMENT":
        return selectedAnswer === interaction.data.correctAnswer;
      case "TRUE_FALSE":
        return selectedAnswer === (interaction.data.isTrue ? 1 : 0);
      case "MULTI_SELECT":
        return (
          selectedAnswers.length === interaction.data.correctAnswers.length &&
          selectedAnswers.every((answer) =>
            interaction.data.correctAnswers.includes(answer)
          )
        );
      case "RISK_IDENTIFIER":
        return (
          selectedAnswers.length === interaction.data.correctRisks.length &&
          selectedAnswers.every((answer) =>
            interaction.data.correctRisks.includes(answer)
          )
        );
      case "DO_DONT_SORT":
        return selectedAnswers.every(
          (answer, index) => answer === (interaction.data.correctClassification[index] ? 1 : 0)
        );
      case "SHORT_REFLECTION":
        return true;
    }
  };

  return (
    <div className="mt-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          className="rounded-lg border-2 border-gray-200 px-4 py-2 text-gray-600 hover:border-gray-300 disabled:opacity-50"
          onClick={onPrevious}
          disabled={currentStep === 0}
        >
          Anterior
        </button>
        <span className="text-sm text-gray-600">
          {currentStep + 1} de {totalSteps}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {!correctAnswerShown ? (
          <button
            className={[
              "rounded-lg px-4 py-2 font-medium text-white transition",
              isAnswerSelected()
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed",
            ].join(" ")}
            onClick={onCheckAnswer}
            disabled={!isAnswerSelected()}
          >
            Verificar
          </button>
        ) : (
          <button
            className={[
              "rounded-lg px-4 py-2 font-medium text-white transition",
              isAnswerCorrect()
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600",
            ].join(" ")}
            onClick={onNext}
          >
            {currentStep === totalSteps - 1 ? "Concluir" : "Próximo"}
          </button>
        )}
      </div>
    </div>
  );
}; 