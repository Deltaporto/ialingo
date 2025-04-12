import { useEffect, useState } from "react";
import { type ITopic } from "~/types/ialingo";
import { Interaction } from "./interactions/Interaction";
import { InteractionFooter } from "./interactions/InteractionFooter";
import { useProgressStore } from "~/stores/progressStore";

interface TopicPlayerProps {
  topic: ITopic;
  onComplete: () => void;
}

export const TopicPlayer = ({ topic, onComplete }: TopicPlayerProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedReflection, setSelectedReflection] = useState("");
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const { markTopicAsComplete, addTimeSpent } = useProgressStore();

  const currentStep = topic.steps[currentStepIndex];
  const currentInteraction = currentStep.interactions[0]; // Assumindo 1 interação por passo

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentStepIndex]);

  const handleCheckAnswer = () => {
    setCorrectAnswerShown(true);
  };

  const handleNext = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000); // Tempo em segundos
    addTimeSpent(topic.id, timeSpent);

    if (currentStepIndex === topic.steps.length - 1) {
      markTopicAsComplete(topic.id);
      onComplete();
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
      setSelectedAnswer(null);
      setSelectedAnswers([]);
      setSelectedReflection("");
      setCorrectAnswerShown(false);
    }
  };

  const handlePrevious = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    addTimeSpent(topic.id, timeSpent);

    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setSelectedAnswer(null);
      setSelectedAnswers([]);
      setSelectedReflection("");
      setCorrectAnswerShown(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900">{topic.title}</h2>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-500 transition-all"
            style={{
              width: `${((currentStepIndex + 1) / topic.steps.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <Interaction
        interaction={currentInteraction}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAnswers}
        selectedReflection={selectedReflection}
        setSelectedReflection={setSelectedReflection}
        correctAnswerShown={correctAnswerShown}
      />

      <InteractionFooter
        interaction={currentInteraction}
        selectedAnswer={selectedAnswer}
        selectedAnswers={selectedAnswers}
        correctAnswerShown={correctAnswerShown}
        onCheckAnswer={handleCheckAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        currentStep={currentStepIndex}
        totalSteps={topic.steps.length}
      />
    </div>
  );
}; 