# Automações e Regras (eproc)

## Configuração Técnica Padrão
Para todas as regras de triagem abaixo, recomenda-se:
*   **Tipo de Controle:** "Por Tempo no localizador"
*   **Tempo:** 0 a 1 dias
*   **Filtros Obrigatórios:** Juízo (2ª TR - 3º Relator) + Competência (JEF Previdenciária)
*   **URLs Rápidas:**
    *   Lista de Automações: `acao=automatizar_localizadores`
    *   Classificadores (IA): `acao=inteligencia_artificial/classificador_conteudo/listar`

## Mapeamento de Regras Existentes (Inativas)
Muitas regras do nosso plano já existem no sistema e só precisam ser reativadas/ajustadas:
*   **TRIA-01 (LOAS):** Corresponde à **Regra 11** (Inativa)
*   **TRIA-02/03 (Aposentadoria):** Corresponde à **Regra 14** (Inativa)
*   **TRIA-04 (Incapacidade):** Corresponde à **Regra 12** (Inativa)
*   **TRIA-05 (Pensão):** Corresponde à **Regra 10** (Inativa)
*   **SUSP-01 (Rev. Vida Toda):** Corresponde à **Regra 13** (Inativa)

---

## Nível 1: Recepção e Triagem (Regras 1-6)

### REGRA 1: Recebimento Inicial
*   **Nome:** "Entrada - Recebimento Recurso"
*   **Ação:** Mover para `2.3 TRIAGEM - Geral`.
*   **Gatilho:** Evento "Remetidos os Autos..." ou Classe processual recursal.

### REGRA 2: Classificação - Aposentadoria
*   **Nome:** "Triagem - Aposentadoria" (Regra 14)
*   **Ação:** Mover de `2.3 TRIAGEM - Geral` para `2.3 ASSUNTO - Aposentadoria`.
*   **Filtro Principal:** Assunto contém "Aposentadoria".
*   **Classificador (Ap. Especial):** `("aposentadoria especial" OU "tempo especial") OU ("conversão de tempo") OU (insalubre OU perigoso)`
*   **Códigos Principais:** `1178` (Esp. Art 57/8), `2670` (Vigilante).

### REGRA 3: Classificação - LOAS/BPC
*   **Nome:** "Triagem - LOAS/BPC" (Regra 11)
*   **Ação:** Mover de `2.3 TRIAGEM - Geral` para `2.3 ASSUNTO - LOAS/BPC`.
*   **Códigos CNJ:** `2311`, `2312`, `8843`, `8842`.
*   **Classificador de Conteúdo (Sugestão de Filtro):**
    *   Palavras-chave: `(LOAS OU BPC OU "benefício assistencial") E (deficiente OU idoso)`
    *   Tolerância: 5%

### REGRA 4: Classificação - Pensão Morte
*   **Nome:** "Triagem - Pensão Morte"
*   **Ação:** Mover de `2.3 TRIAGEM - Geral` para `2.3 ASSUNTO - Pensão por Morte`.
*   **Códigos CNJ Específicos:**
    *   `1182` (Pensão Art 74/9)
    *   `2709` (Acidente Trabalho)
    *   `2711` (Rural)
    *   `2719` (Urbana)

### REGRA 4.1: Benefício por Incapacidade (NOVA)
*   **Nome:** "Triagem - Incapacidade"
*   **Ação:** Mover de `2.3 TRIAGEM - Geral` para `2.3 ASSUNTO - Auxílio-Doença` ou `Invalidez`.
*   **Códigos Auxílio-Doença:** `1179`, `2705`, `1202`, `2706`, `2708`.
*   **Códigos Invalidez:** `1169`, `2620`, `1203`, `2622`, `2621`.

### REGRA 5: Identificação Urgência
*   **Nome:** "Entrada - Urgências"
*   **Ação:** Mover de `2.3 TRIAGEM - Geral` para `2.3 TRIAGEM - Urgentes`.
*   **Gatilho:** Por Documento (Palavras-chave: "tutela", "liminar", "urgente").

### REGRA 6: Embargos de Declaração
*   **Nome:** "Entrada - Embargos Declaração"
*   **Ação:** Incluir em `2.3 TRIAGEM - Embargos` (Remover apenas de `2.3 MESA - Chefia` se aplicável).
*   **Gatilho:** Protocolo de Embargos.

### REGRA 7: Agravos Internos (NOVA)
*   **Nome:** "Entrada - Agravo Interno"
*   **Ação:** Mover para `2.3 TRIAGEM - Agravo Interno`.
*   **Gatilho:** Tipo de Petição "Agravo Interno" ou "Agravo Regimental". (Cobre decisões monocráticas e admissibilidade).

### REGRA 8: Juízo de Retratação (NOVA)
*   **Nome:** "Entrada - Retorno/Retratação"
*   **Ação:** Mover para `2.3 TRIAGEM - Retratação/Volta`.
*   **Gatilho:** Evento "Remetidos os Autos... para Juízo de Retratação" ou baixa de instância superior (TNU/TRU).

---

## Nível 6: Semáforo de Prazos (Regras 9-13)

### REGRA 7: Semáforo Amarelo
*   **Nome:** "Prazo - Alerta Amarelo"
*   **Ação:** Incluir `2.3 PRAZO - Atenção`.
*   **Gatilho:** Tempo em `2.3 ASSUNTO - *` >= 91 dias.

### REGRA 8: Semáforo Laranja
*   **Nome:** "Prazo - Alerta Laranja"
*   **Ação:** Remover `2.3 PRAZO - Atenção`, Incluir `2.3 PRAZO - Urgente`.
*   **Gatilho:** Tempo em `2.3 PRAZO - Atenção` >= 20 dias.

### REGRA 9: Conclusão Automática
*   **Nome:** "Prazo - Conclusão Auto"
*   **Ação:** Remover `2.3 PRAZO - Urgente`, Incluir `2.3 PRAZO - Conclusão Auto`.
*   **Ação Adicional:** Lançar evento "Conclusos para decisão".
*   **Gatilho:** Tempo gabinete >= 120 dias.

### REGRA 10: Despacho Pauta
*   **Nome:** "Prazo - Despacho Pauta"
*   **Ação:** Incluir `2.3 PRAZO - Despacho Pauta`.
*   **Gatilho:** 60 dias após conclusão.

### REGRA 11: Prioridade Idoso
*   **Nome:** "Prioridade - Idoso"
*   **Ação:** Incluir `2.3 PRIORIDADE - Idoso`.
*   **Gatilho:** 150 dias + Idoso SIM.

---

## Nível 5: Sobrestamento (Regras 12-17)

### REGRAS 12-17: Suspensão por Tema
*   **Ação:** Incluir `2.3 SUSPENSO - Tema [X]`. Mantém `2.3 ASSUNTO - *`. Remove `2.3 PRAZO - *`.
*   **Configuração Técnica:** Estas regras devem rodar **ANTES** das regras de triagem (Prioridade 1).
*   **Temas Mapeados:**
    *   **Tema 1031 (STJ - Vigilante):** Filtro: `(vigilante OU "segurança patrimonial") E (arma OU periculosidade)`.
    *   **Tema 1102 (STF - Revisão Vida Toda):** Assunto `3118` ou Filtro `("revisão da vida toda" OU "tema 1102")`.
    *   **Tema 1124 (STJ - Eletricidade):** Filtro `(eletricidade OU "alta tensão") E ("tempo especial")`.
    *   **Tema 1209 (STF):** .
    *   **Tema 1271 (STF):** .
    *   **Tema 1329 (STF):** .

---

## Manutenção (Regras 18-20)

### REGRA 19: Limpeza Triagem
*   **Ação:** Mover de `2.3 TRIAGEM - Geral` para `2.3 TRIAGEM - Analisar`.
*   **Gatilho:** > 2 dias na triagem.

### REGRA 20: Alerta Pós-Julgamento
*   **Ação:** Incluir `2.3 ALERTA - Erro Baixa`.
*   **Gatilho:** > 30 dias em `2.3 PAUTA - Julgados`.
