import { type IInteraction } from "~/types/ialingo";
import { MultipleChoiceInteraction } from "./MultipleChoiceInteraction";
import { TrueFalseInteraction } from "./TrueFalseInteraction";
import { ScenarioJudgmentInteraction } from "./ScenarioJudgmentInteraction";
import { MultiSelectInteraction } from "./MultiSelectInteraction";
import { RiskIdentifierInteraction } from "./RiskIdentifierInteraction";
import { DoDontSortInteraction } from "./DoDontSortInteraction";
import { ShortReflectionInteraction } from "./ShortReflectionInteraction";

interface InteractionProps {
  interaction: IInteraction;
  selectedAnswer: number | null;
  setSelectedAnswer: (answer: number) => void;
  selectedAnswers: number[];
  setSelectedAnswers: (answers: number[]) => void;
  selectedReflection: string;
  setSelectedReflection: (answer: string) => void;
  correctAnswerShown: boolean;
}

export const Interaction = ({
  interaction,
  selectedAnswer,
  setSelectedAnswer,
  selectedAnswers,
  setSelectedAnswers,
  selectedReflection,
  setSelectedReflection,
  correctAnswerShown,
}: InteractionProps) => {
  switch (interaction.type) {
    case "MULTIPLE_CHOICE":
      return (
        <MultipleChoiceInteraction
          data={interaction.data}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          correctAnswerShown={correctAnswerShown}
        />
      );
    case "TRUE_FALSE":
      return (
        <TrueFalseInteraction
          data={interaction.data}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          correctAnswerShown={correctAnswerShown}
        />
      );
    case "SCENARIO_JUDGMENT":
      return (
        <ScenarioJudgmentInteraction
          data={interaction.data}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          correctAnswerShown={correctAnswerShown}
        />
      );
    case "MULTI_SELECT":
      return (
        <MultiSelectInteraction
          data={interaction.data}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          correctAnswerShown={correctAnswerShown}
        />
      );
    case "RISK_IDENTIFIER":
      return (
        <RiskIdentifierInteraction
          data={interaction.data}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          correctAnswerShown={correctAnswerShown}
        />
      );
    case "DO_DONT_SORT":
      return (
        <DoDontSortInteraction
          data={interaction.data}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          correctAnswerShown={correctAnswerShown}
        />
      );
    case "SHORT_REFLECTION":
      return (
        <ShortReflectionInteraction
          data={interaction.data}
          selectedAnswer={selectedReflection}
          setSelectedAnswer={setSelectedReflection}
          correctAnswerShown={correctAnswerShown}
        />
      );
  }
}; 