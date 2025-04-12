import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedTopicIds: string[];
  timeSpent: Record<string, number>;
  comprehensionScores: Record<string, number>;
  markTopicAsComplete: (topicId: string) => void;
  addTimeSpent: (topicId: string, time: number) => void;
  setComprehensionScore: (topicId: string, score: number) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedTopicIds: [],
      timeSpent: {},
      comprehensionScores: {},

      markTopicAsComplete: (topicId) =>
        set((state) => ({
          completedTopicIds: [...state.completedTopicIds, topicId],
        })),

      addTimeSpent: (topicId, time) =>
        set((state) => ({
          timeSpent: {
            ...state.timeSpent,
            [topicId]: (state.timeSpent[topicId] || 0) + time,
          },
        })),

      setComprehensionScore: (topicId, score) =>
        set((state) => ({
          comprehensionScores: {
            ...state.comprehensionScores,
            [topicId]: score,
          },
        })),

      resetProgress: () =>
        set({
          completedTopicIds: [],
          timeSpent: {},
          comprehensionScores: {},
        }),
    }),
    {
      name: "ialingo-progress",
    }
  )
); 