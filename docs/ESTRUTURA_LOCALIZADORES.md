# Estrutura de Localizadores (Gabinete 3º Juiz Relator)

## Visão Geral
Esta estrutura organiza o gabinete em 6 níveis lógicos. O conceito central é que **Localizadores são TAGS (Etiquetas)**, não pastas exclusivas. 
Um processo pode (e deve) ter múltiplos localizadores simultâneos para indicar diferentes dimensões: Onde ele está (Assunto) + Quem está com ele (Mesa) + Qual a urgência (Prazo).

## Estrutura Hierárquica (Camadas Cumulativas)
As camadas foram desenhadas para **conviver**. Um processo normal terá, por exemplo:
`2.3 ASSUNTO - LOAS` + `2.3 PRAZO - Atenção` + `2.3 MESA - Assessor`

### NÍVEL 1: RECEPÇÃO E TRIAGEM (Fluxo de Entrada)
*Localizadores temporários. O processo só fica aqui até ganhar seus "crachás" de Assunto e Prazo.*

1.  **🔵 2.3 TRIAGEM - Geral**
    *   *Antigo:* `ENTRADA-TRIAGEM`
    *   *Função:* Recebimento automático de todos os recursos.
2.  **🔴 2.3 TRIAGEM - Urgentes**
    *   *Antigo:* `ENTRADA-URGENTE`
    *   *Função:* Tutelas, liminares e mandados de segurança (Prioridade 0).
3.  **🟣 2.3 TRIAGEM - Embargos**
    *   *Antigo:* `ENTRADA-EMBARGOS`
    *   *Função:* Embargos de declaração (automação de intimação).
4.  **🟠 2.3 TRIAGEM - Uniformização**
    *   *Função:* Pedidos de uniformização.
5.  **� 2.3 TRIAGEM - Agravo Interno**
    *   *Função:* Agravos contra decisão monocrática ou de admissibilidade (Gestor).
6.  **🔵 2.3 TRIAGEM - Retratação/Volta**
    *   *Função:* Retorno de TNU/TRU ou TRF para juízo de retratação.
7.  **�🟡 2.3 TRIAGEM - Rec. Extraordinário**
    *   *Função:* Recursos para STF/STJ.
8.  **⚪ 2.3 TRIAGEM - Analisar**
    *   *Antigo:* `ENTRADA-OUTROS`
    *   *Função:* Exceções que o robô não classificou.

### NÍVEL 2: ACERVO POR ASSUNTO ("Identidade")
*É a identidade fixa do processo. Ele mantem este localizador PERMANENTEMENTE no gabinete, acumulando com outros localizadores de mesa ou prazo.*

7.  **📋 2.3 ASSUNTO - Aposentadoria**
8.  **📋 2.3 ASSUNTO - Auxílio-Doença**
9.  **📋 2.3 ASSUNTO - Aposent. Invalidez**
10. **📋 2.3 ASSUNTO - Auxílio-Acidente** (Tema 1031)
11. **📋 2.3 ASSUNTO - LOAS/BPC**
12. **📋 2.3 ASSUNTO - Pensão por Morte**
13. **📋 2.3 ASSUNTO - Revisão Benefício**
14. **📋 2.3 ASSUNTO - Revisão Vida Toda** (Tema 1102)
15. **📋 2.3 ASSUNTO - Salário Maternidade**
16. **📋 2.3 ASSUNTO - Auxílio-Reclusão**
17. **📋 2.3 ASSUNTO - Outros Previd.**
18. **📋 2.3 ASSUNTO - Não Previdenciário**

### NÍVEL 3: FLUXO DE TRABALHO ("Mesas")
*Indica com quem está o processo AGORA. Este localizador é adicionado AO localizador de Assunto, não em substituição.*

**Mesas Individuais:**
19. **👤 2.3 MESA - [Nome Assessor 1]**
20. **👤 2.3 MESA - [Nome Assessor 2]**
21. **👤 2.3 MESA - [Nome Assessor 3]**
22. **👤 2.3 MESA - [Nome Assessor 4]**
23. **👤 2.3 MESA - Chefia/Magistrado**

**Estágios do Fluxo:**
24. **📝 2.3 GABINETE - Minutados**
    *   *Função:* Aguardando revisão do juiz.
25. **📝 2.3 GABINETE - Ajustes**
    *   *Função:* Juiz devolveu para correção.
26. **⚖️ 2.3 GABINETE - Pronto Pauta**
    *   *Função:* Aprovado, aguardando data de julgamento.

### NÍVEL 4: PAUTA E JULGAMENTO
*Gestão das sessões virtuais.*

27. **🗓️ 2.3 PAUTA - Sessão [Data]**
    *   *Ex:* `2.3 PAUTA - Sessão 15/12`
28. **🔄 2.3 PAUTA - Adiados**
    *   *Função:* Retirados de pauta (prioridade de reinclusão).
29. **⚖️ 2.3 PAUTA - Julgados**
    *   *Função:* Aguardando trânsito/baixa.

### NÍVEL 5: ARQUIVO DE SOBRESTADOS
*Processos parados aguardando Tribunais Superiores.*

30. **⏸️ 2.3 SUSPENSO - Tema STJ 1031** (Aux-Acidente)
31. **⏸️ 2.3 SUSPENSO - Tema STF 1102** (Vida Toda)
32. **⏸️ 2.3 SUSPENSO - Tema STJ 1124**
33. **⏸️ 2.3 SUSPENSO - Tema STF 1209**
34. **⏸️ 2.3 SUSPENSO - Tema STF 1271**
35. **⏸️ 2.3 SUSPENSO - Tema STF 1329**
36. **⏸️ 2.3 SUSPENSO - Aguarda Docs**

### NÍVEL 6: SEMÁFORO DE PRAZOS (Monitoramento)
*Camada de alerta. Estes localizadores são cumulativos (o processo mantém o ASSUNTO).*

37. **🟢 2.3 PRAZO - Regular** (0-90 dias)
38. **🟡 2.3 PRAZO - Atenção** (91-110 dias)
39. **🟠 2.3 PRAZO - Urgente** (111-119 dias)
40. **🔴 2.3 PRAZO - Conclusão Auto** (120+ dias)
41. **🟣 2.3 PRAZO - Despacho Pauta** (180+ dias)
42. **🚨 2.3 PRIORIDADE - Idoso** (+150 dias de acervo)
43. **🟡 2.3 ALERTA - Ag. Recebimento** (>30 dias)
    *   *Função:* Monitorar gargalo de processos aguardando remessa (atualmente ~500 processos).
