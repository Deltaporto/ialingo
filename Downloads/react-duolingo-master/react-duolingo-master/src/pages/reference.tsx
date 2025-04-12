import React from 'react';
import { useRouter } from 'next/router';

const ReferenceGuide = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Guia de Referência IAlingo</h1>
        
        <div className="space-y-8">
          {/* Seção Conceitos Chave */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conceitos Chave</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-800">Grandes Modelos de Linguagem (LLMs)</h3>
                <p className="mt-2 text-gray-600">
                  Sistemas de IA que processam e geram linguagem natural, treinados em vastas quantidades de dados textuais.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-800">Alucinações</h3>
                <p className="mt-2 text-gray-600">
                  Fenômeno onde o modelo gera informações incorretas ou inventadas, apresentando-as como fatos.
                </p>
              </div>
            </div>
          </section>

          {/* Seção Riscos */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Riscos Críticos</h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-md">
                <h3 className="font-medium text-red-800">Confidencialidade</h3>
                <p className="mt-2 text-gray-600">
                  Nunca insira dados sensíveis ou informações de processos em LLMs públicos.
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-md">
                <h3 className="font-medium text-red-800">Precisão</h3>
                <p className="mt-2 text-gray-600">
                  Sempre verifique as informações geradas por LLMs contra fontes confiáveis.
                </p>
              </div>
            </div>
          </section>

          {/* Seção Regras de Ouro */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Regras de Ouro</h2>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-md">
                <h3 className="font-medium text-yellow-800">Verificação</h3>
                <p className="mt-2 text-gray-600">
                  Sempre verifique as informações geradas por LLMs contra fontes confiáveis.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-md">
                <h3 className="font-medium text-yellow-800">Contextualização</h3>
                <p className="mt-2 text-gray-600">
                  Forneça contexto específico e relevante ao fazer perguntas para LLMs.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferenceGuide; 