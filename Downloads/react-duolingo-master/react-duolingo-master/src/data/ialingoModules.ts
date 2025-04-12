import { IModule, TopicType, InteractionType } from "~/types/ialingo";

export const ialingoModulesData: IModule[] = [
  {
    id: "module-1",
    title: "Fundamentos dos LLMs",
    description: "Conceitos básicos e funcionamento dos Grandes Modelos de Linguagem",
    order: 1,
    topics: [
      {
        id: "topic-1-1",
        title: "Introdução aos LLMs",
        description: "O que são e como funcionam os Grandes Modelos de Linguagem",
        topicType: TopicType.INTRO_MODULE,
        order: 1,
        steps: [
          {
            id: "step-1-1-1",
            title: "Definição e Conceitos Básicos",
            content: "Os Grandes Modelos de Linguagem (LLMs) são sistemas de IA que processam e geram linguagem natural, treinados em vastas quantidades de dados textuais.",
            order: 1,
            interactions: [
              {
                id: "interaction-1-1-1-1",
                type: InteractionType.MULTIPLE_CHOICE,
                data: {
                  question: "Qual das seguintes afirmações melhor define um LLM?",
                  options: [
                    "Um sistema que traduz textos entre idiomas",
                    "Um modelo de IA que processa e gera linguagem natural",
                    "Um software de reconhecimento de voz",
                    "Um banco de dados de textos jurídicos"
                  ],
                  correctAnswer: 1,
                  explanation: "LLMs são modelos de IA especializados em processar e gerar linguagem natural, não apenas traduzir ou reconhecer voz."
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "module-2",
    title: "Riscos e Limitações",
    description: "Compreendendo os riscos e limitações dos LLMs no contexto jurídico",
    order: 2,
    topics: [
      {
        id: "topic-2-1",
        title: "Alucinações e Precisão",
        description: "Entendendo e mitigando os riscos de informações incorretas",
        topicType: TopicType.RISK_ANALYSIS,
        order: 1,
        steps: [
          {
            id: "step-2-1-1",
            title: "O Fenômeno das Alucinações",
            content: "Alucinações ocorrem quando o modelo gera informações incorretas ou inventadas, apresentando-as como fatos.",
            order: 1,
            interactions: [
              {
                id: "interaction-2-1-1-1",
                type: InteractionType.SCENARIO_JUDGMENT,
                data: {
                  scenario: "Um juiz usa um LLM para pesquisar jurisprudência sobre um caso específico. O modelo retorna uma decisão que parece relevante, mas não cita a fonte.",
                  question: "Qual deve ser a ação do juiz?",
                  options: [
                    "Aceitar a informação como válida, já que o modelo é confiável",
                    "Verificar a informação em fontes oficiais antes de usá-la",
                    "Usar a informação, mas com uma nota de que veio de um LLM",
                    "Ignorar completamente a informação"
                  ],
                  correctAnswer: 1,
                  explanation: "Sempre é necessário verificar informações jurídicas em fontes oficiais, independentemente da origem."
                }
              }
            ]
          }
        ]
      }
    ]
  }
]; 