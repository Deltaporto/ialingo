import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IProgressState {
  completedTopicIds: string[];
  timeSpent: Record<string, number>;
  comprehensionScores: Record<string, number>;
  markTopicAsComplete: (topicId: string) => void;
  addTimeSpent: (topicId: string, timeInSeconds: number) => void;
  updateComprehensionScore: (topicId: string, score: number) => void;
}

export type ProgressSlice = IProgressState;

export const createProgressSlice = (set) => ({
  completedTopicIds: [],
  timeSpent: {},
  comprehensionScores: {},
  markTopicAsComplete: (topicId: string) =>
    set((state) => ({
      completedTopicIds: [...state.completedTopicIds, topicId],
    })),
  addTimeSpent: (topicId: string, timeInSeconds: number) =>
    set((state) => ({
      timeSpent: {
        ...state.timeSpent,
        [topicId]: (state.timeSpent[topicId] || 0) + timeInSeconds,
      },
    })),
  updateComprehensionScore: (topicId: string, score: number) =>
    set((state) => ({
      comprehensionScores: {
        ...state.comprehensionScores,
        [topicId]: score,
      },
    })),
});

export const useProgressStore = create<IProgressState>()(
  persist(
    (set) => ({
      ...createProgressSlice(set),
    }),
    {
      name: "ialingo-progress",
    }
  )
);
