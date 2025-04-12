export enum TopicType {
  INTRO_MODULE = "INTRO_MODULE",
  CONCEPT_EXPLANATION = "CONCEPT_EXPLANATION",
  RISK_ANALYSIS = "RISK_ANALYSIS",
  BEST_PRACTICES = "BEST_PRACTICES",
  CASE_STUDY = "CASE_STUDY",
}

export enum InteractionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  SCENARIO_JUDGMENT = "SCENARIO_JUDGMENT",
  MULTI_SELECT = "MULTI_SELECT",
  RISK_IDENTIFIER = "RISK_IDENTIFIER",
  DO_DONT_SORT = "DO_DONT_SORT",
  SHORT_REFLECTION = "SHORT_REFLECTION",
}

export enum TopicStatus {
  LOCKED = "LOCKED",
  ACTIVE = "ACTIVE",
  COMPLETE = "COMPLETE",
}

export interface IModule {
  id: string;
  title: string;
  description: string;
  topics: ITopic[];
  order: number;
}

export interface ITopic {
  id: string;
  title: string;
  description: string;
  topicType: TopicType;
  steps: IStep[];
  order: number;
}

export interface IStep {
  id: string;
  title: string;
  content: string;
  interactions: IInteraction[];
  order: number;
}

export interface IInteraction {
  id: string;
  type: InteractionType;
  data: IInteractionData;
}

export type IInteractionData =
  | IMultipleChoiceInteractionData
  | ITrueFalseInteractionData
  | IScenarioJudgmentInteractionData
  | IMultiSelectInteractionData
  | IRiskIdentifierInteractionData
  | IDoDontSortInteractionData
  | IShortReflectionInteractionData;

export interface IMultipleChoiceInteractionData {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ITrueFalseInteractionData {
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface IScenarioJudgmentInteractionData {
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface IMultiSelectInteractionData {
  question: string;
  options: string[];
  correctAnswers: number[];
  explanation: string;
}

export interface IRiskIdentifierInteractionData {
  scenario: string;
  risks: string[];
  correctRisks: number[];
  explanation: string;
}

export interface IDoDontSortInteractionData {
  items: string[];
  correctClassification: Record<string, "DO" | "DONT">;
  explanation: string;
}

export interface IShortReflectionInteractionData {
  question: string;
  maxLength: number;
}

export interface IProgressState {
  completedTopicIds: string[];
  markTopicAsComplete: (topicId: string) => void;
} 