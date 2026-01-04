# Plano de Implementação (6 Semanas)

## SEMANA 1: PREPARAÇÃO
*   Criar classificadores de conteúdo (Urgências, Temas).
*   Configurar **Nível 1 (Recepção)**: `2.3 TRIAGEM - Geral`, `Urgentes`, etc.
*   Configurar **Nível 2 (Acervo)**: `2.3 ASSUNTO - Aposentadoria`, `LOAS`, etc.

## SEMANA 2: TESTE PILOTO
*   Ativar automação de entrada para `2.3 TRIAGEM - Geral`.
*   Ativar distribuição automática para `2.3 ASSUNTO - *`.
*   Criar **Nível 3 (Fluxo)**: `2.3 MESA - *`, `2.3 GABINETE - Minutados`.

## SEMANA 3: MIGRAÇÃO (50%)
*   Migrar LOAS para `2.3 ASSUNTO - LOAS/BPC`.
*   Migrar Aposentadorias para `2.3 ASSUNTO - Aposentadoria`.
*   Migrar Benefícios Incapacidade.

## SEMANA 4: CONTROLES DE PRAZO
*   Criar **Nível 6 (Semáforo)**: `2.3 PRAZO - Atenção`, `Urgente`, `Conclusão`.
*   Ativar regra de alerta amarelo (91 dias).
*   Ativar regra de prioridade idoso (`2.3 PRIORIDADE - Idoso`).

## SEMANA 5: SUSPENSÕES
*   Criar **Nível 5 (Sobrestamento)**: `2.3 SUSPENSO - Tema *`.
*   Migrar processos suspensos.
*   Finalizar migração do acervo restante.

## SEMANA 6: OPERAÇÃO PLENA
*   Criar **Nível 4 (Pauta)**: `2.3 PAUTA - Sessão [Data]`.
*   Treinamento final e desativação dos localizadores antigos.
