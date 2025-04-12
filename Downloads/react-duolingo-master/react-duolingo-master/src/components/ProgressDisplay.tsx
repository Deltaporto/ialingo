import { useProgressStore } from "~/stores/progressStore";

export const ProgressDisplay = () => {
  const { completedTopicIds, timeSpent, comprehensionScores } = useProgressStore();

  const totalTopics = completedTopicIds.length;
  const totalTime = Object.values(timeSpent).reduce((sum, time) => sum + time, 0);
  const averageScore = Object.values(comprehensionScores).length > 0
    ? Math.round(
        Object.values(comprehensionScores).reduce((sum, score) => sum + score, 0) /
          Object.values(comprehensionScores).length
      )
    : 0;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Seu Progresso</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-gray-600">Tópicos Completos</p>
          <p className="text-2xl font-bold text-blue-600">{totalTopics}</p>
        </div>
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm text-gray-600">Tempo Total</p>
          <p className="text-2xl font-bold text-green-600">{formatTime(totalTime)}</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-4">
          <p className="text-sm text-gray-600">Pontuação Média</p>
          <p className="text-2xl font-bold text-purple-600">{averageScore}%</p>
        </div>
      </div>
    </div>
  );
}; 