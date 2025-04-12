import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type ITopic } from "~/types/ialingo";
import { TopicPlayer } from "~/components/TopicPlayer";
import { ialingoModulesData } from "~/data/ialingoModules";

export default function LessonPage() {
  const router = useRouter();
  const { moduleId, topicId } = router.query;
  const [topic, setTopic] = useState<ITopic | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (moduleId && topicId) {
      const module = ialingoModulesData.find((m) => m.id === moduleId);
      if (!module) {
        setError("Módulo não encontrado");
        return;
      }

      const topic = module.topics.find((t) => t.id === topicId);
      if (!topic) {
        setError("Tópico não encontrado");
        return;
      }

      setTopic(topic);
    }
  }, [moduleId, topicId]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Erro</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => router.push("/learn")}
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Carregando...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <TopicPlayer
        topic={topic}
        onComplete={() => router.push("/learn")}
      />
    </div>
  );
} 