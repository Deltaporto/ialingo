# Regras de Automação - Versão Final (Refinada)

**Versão:** 2.0 (Revisão Completa)
**Data:** 28/12/2025
**Status:** Pronto para Implementação

---

## Resumo das Iterações

| Versão | Alterações |
|--------|------------|
| v0.1   | 15 regras iniciais definidas |
| v0.2   | Simulações executadas: 14 OK, 1 refinamento |
| v1.0   | Refinamentos aplicados, ordem definida |
| **v2.0** | Revisão completa: +4 regras, refinamentos SUSP-03, filtros de exclusão |

---

## Ordem de Execução (IMPORTANTE)

As regras devem ser implementadas nesta ordem para evitar conflitos:

```
1º → Suspensão (SUSP-*) - Suspende antes de distribuir
2º → Triagem (TRIA-*) - Distribui por tipo de benefício
3º → Fluxo (FLUXO-*) - Movimenta por eventos
4º → Prazos (PRAZO-*) - Adiciona tags sem remover
```

---

## Grupo 1: Triagem Automática (Prioridade 2º)

### TRIA-01: LOAS/BPC (REFINADA)
```yaml
ID: TRIA-01
Nome: Triagem LOAS/BPC
Prioridade: 1 (dentro do grupo)

# Configuração
Origem: 2.3 GAB03-TR02
Destino: 2.3 LOAS
Tipo Controle: Por Data - Todos os dias
Comportamento REMOVER: Remover do localizador informado

# Critérios (REFINADOS)
Classificador:
  Palavras: "BPC" OU "LOAS" OU "benefício assistencial" OU "Lei 8.742"
  Tolerância: 5%

Filtros Adicionais:
  Assunto: Deficiente (110166)
  Competência: JEF Previdenciária

# Validação
Testado: Sim
Cenário Positivo: Pass
Cenário Negativo: Pass
Cenário Limite: Pass (com filtro de assunto)
```

---

### TRIA-02: Aposentadoria Especial/ATC
```yaml
ID: TRIA-02
Nome: Triagem Ap. Especial/ATC
Prioridade: 2

Origem: 2.3 GAB03-TR02
Destino: 2.3 Ap. Especial/ATC
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "aposentadoria especial" OU "tempo especial" OU "atividade insalubre" OU "agente nocivo" OU "exposição"
  Tolerância: 5%

Filtros:
  Assunto: Aposentadoria Especial (Art. 57/8)
  OU Assunto: Aposentadoria por Tempo de Contribuição

Testado: Aprovado
```

---

### TRIA-03: Aposentadoria por Idade
```yaml
ID: TRIA-03
Nome: Triagem Ap. Idade
Prioridade: 3

Origem: 2.3 GAB03-TR02
Destino: 2.3 Ap. Idade urbana
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "aposentadoria por idade" OU "idade mínima" OU "art. 48"

Filtros:
  Assunto: Aposentadoria por Idade (Art. 48/51)

Testado: Aprovado
```

---

### TRIA-04: Benefício por Incapacidade
```yaml
ID: TRIA-04
Nome: Triagem Incapacidade
Prioridade: 4

Origem: 2.3 GAB03-TR02
Destino: 2.3 Benefício Incapacidade
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "auxílio-doença" OU "aposentadoria por invalidez" OU "incapacidade" OU "perícia médica"

Filtros:
  Assunto: Auxílio-Doença Previdenciário
  OU Assunto: Aposentadoria por Invalidez

Testado: Aprovado
```

---

### TRIA-05: Pensão por Morte
```yaml
ID: TRIA-05
Nome: Triagem Pensão
Prioridade: 5

Origem: 2.3 GAB03-TR02
Destino: 2.3 Pensão (RGPS)
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "pensão por morte" OU "dependente" OU "óbito do segurado"

Filtros:
  Assunto: Pensão por Morte (Art. 74/9)

Testado: Aprovado
```

---

### TRIA-06: Aposentadoria Rural (NOVA)
```yaml
ID: TRIA-06
Nome: Triagem Ap. Rural
Prioridade: 6

Origem: 2.3 GAB03-TR02
Destino: 2.3 Ap. Rural
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "aposentadoria rural" OU "segurado especial" OU "agricultura familiar" OU "atividade rural" OU "regime de economia familiar"
  Tolerância: 5%

Filtros:
  Assunto: Rural (segurado especial)
  OU Assunto: Aposentadoria por Idade Rural

Testado: Pendente
Justificativa: 11 processos identificados no localizador 2.3 Ap. Rural
```

---

### TRIA-07: Auxílio-Acidente e Outros (NOVA)
```yaml
ID: TRIA-07
Nome: Triagem Auxílio-Acidente/Outros
Prioridade: 7

Origem: 2.3 GAB03-TR02
Destino: 2.3 Outros Previ
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "auxílio-acidente" OU "auxílio-reclusão" OU "salário-maternidade" OU "seguro-desemprego"
  Tolerância: 5%

Filtros:
  Assunto: Auxílio-Acidente
  OU Assunto: Auxílio-Reclusão
  OU Assunto: Salário-Maternidade

Testado: Pendente
Justificativa: 36 processos de Auxílio-Acidente identificados nos indicadores
```

---

### TRIA-99: Regra Residual (NOVA)
```yaml
ID: TRIA-99
Nome: Triagem Residual - Processos Não Classificados
Prioridade: 99 (ÚLTIMA a executar no grupo)

Origem: 2.3 GAB03-TR02
Destino: 2.3 Outros Previ
Tipo Controle: Por Tempo no Localizador - 3 dias
Comportamento REMOVER: Remover do localizador informado

# Sem classificador - pega tudo que sobrou após 3 dias
# Garante que nenhum processo fique "perdido" na entrada

Testado: Pendente
Justificativa: Evita acúmulo de processos não triados automaticamente
```

---

## Grupo 2: Controle de Prazos (Prioridade 4º)

### PRAZO-01: Alerta 60 dias (REFINADA)
```yaml
ID: PRAZO-01
Nome: Alerta Parados >60 dias
Prioridade: 1

Origem:
  - 2.3 LOAS
  - 2.3 Ap. Especial/ATC
  - 2.3 Ap. Idade urbana
  - 2.3 Benefício Incapacidade
  - 2.3 Pensão (RGPS)
  - 2.3 Ap. Rural
  - 2.3 Outros Previ

Destino: 2.3 ALERTA - Parados >60 dias
Tipo Controle: Por Tempo no Localizador - 60 dias
Comportamento REMOVER: NÃO remover (apenas acrescentar)

# FILTROS DE EXCLUSÃO (v2.0)
Que NÃO Contenha NENHUM:
  - 2.3 ALERTA - Parados >60 dias    # Evita duplicação
  - 2.3 CRÍTICO - Parados >120 dias  # Já escalado
  - 2.3 SUSPENSOS                     # Processos suspensos não contam

Testado: Aprovado
```

---

### PRAZO-02: Crítico 120 dias
```yaml
ID: PRAZO-02
Nome: Crítico Parados >120 dias
Prioridade: 2

Origem: 2.3 ALERTA - Parados >60 dias
Destino: 2.3 CRÍTICO - Parados >120 dias
Tipo Controle: Por Tempo no Localizador - 60 dias
Comportamento REMOVER: Remover do localizador de origem

Testado: Aprovado
```

---

### PRAZO-03: Prioridade Idoso
```yaml
ID: PRAZO-03
Nome: Prioridade Idoso
Prioridade: 3

Origem: Qualquer localizador 2.3 de trabalho
Destino: 2.3 PRIORIDADE IDOSO
Tipo Controle: Por Tempo no Localizador - 30 dias
Comportamento REMOVER: NÃO remover (apenas acrescentar)

Filtros:
  Parte Autora: Idade >= 60 anos

Que NÃO Contenha NENHUM:
  - 2.3 PRIORIDADE IDOSO  # Evita duplicação

Testado: Aprovado
```

---

### PRAZO-04: Decurso Contrarrazões
```yaml
ID: PRAZO-04
Nome: Decurso Prazo Contrarrazões
Prioridade: 4

Origem: 2.3 prazo
Destino: 2.3 Recurso recebido
Tipo Controle: Por Evento - Prazo Fechado
Evento: Decurso de prazo automático
Polo: Passivo

Testado: Aprovado
```

---

### PRAZO-05: Alerta Aguardando Recebimento (NOVA)
```yaml
ID: PRAZO-05
Nome: Alerta Aguardando Recebimento >30 dias
Prioridade: 5

Origem: 2.3 Aguardando recebimento
Destino: 2.3 ALERTA - Ag. Recebimento >30 dias
Tipo Controle: Por Tempo no Localizador - 30 dias
Comportamento REMOVER: NÃO remover (apenas acrescentar)

Que NÃO Contenha NENHUM:
  - 2.3 ALERTA - Ag. Recebimento >30 dias

Testado: Pendente
Justificativa: 540 processos no localizador (35% do acervo) - maior gargalo identificado
```

---

## Grupo 3: Suspensão por Temas (Prioridade 1º)

### SUSP-01: Tema 1.102/STF
```yaml
ID: SUSP-01
Nome: Suspensão Revisão Vida Toda
Prioridade: 1 (EXECUTAR PRIMEIRO)

Origem: Qualquer localizador 2.3
Destino: 2.3 tema 1.102/STF - Suspensos
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "revisão da vida toda" OU "regra definitiva" OU "art. 29, I" OU "art. 29, II"

Filtros:
  Assunto: RMI - Renda Mensal Inicial
  OU Assunto: Revisão

Testado: Aprovado
```

---

### SUSP-02: Tema 1.031/STJ (Vigilante)
```yaml
ID: SUSP-02
Nome: Suspensão Vigilante
Prioridade: 2

Origem: 2.3 Ap. Especial/ATC
Destino: 2.3 - Tema 1031/STJ
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "vigilante" OU "vigia" OU "segurança patrimonial" OU "segurança privada"

Testado: Aprovado
```

---

### SUSP-03: Tema 1.124/STJ (REFINADA)
```yaml
ID: SUSP-03
Nome: Suspensão Termo Inicial Efeitos Financeiros
Prioridade: 3

Origem: Qualquer localizador 2.3
Destino: 2.3 tema 1124/STJ - Suspensos
Tipo Controle: Por Data - Todos os dias

# CLASSIFICADOR REFINADO (v2.0)
# Evita falsos positivos com DIB/DIP genéricos
Classificador:
  Palavras: "termo inicial dos efeitos financeiros" OU ("DIB" E "citação") OU ("DIP" E "retroação") OU "efeitos financeiros a partir da citação"
  Tolerância: 5%

# FILTROS ADICIONAIS (v2.0)
Filtros:
  Assunto NÃO contém: Auxílio-Doença      # Incapacidade geralmente tem DIB claro
  Assunto NÃO contém: Aposentadoria por Invalidez

Testado: Pendente revalidação
Nota: Classificador anterior ("DIB" OU "DIP") causaria falsos positivos massivos
```

---

## Grupo 4: Fluxo de Trabalho (Prioridade 3º)

### FLUXO-01: Embargos de Declaração
```yaml
ID: FLUXO-01
Nome: Embargos de Declaração
Prioridade: 1

Origem: EMBDEC
Destino: 2.3 Embargos de Declaração
Tipo Controle: Por Tipo de Petição
Petição: EMBARGOS DE DECLARAÇÃO

Ação Programada:
  Tipo: Lançar Minuta
  Modelo: [Padrão Embargos]

Testado: Aprovado
```

---

### FLUXO-02: Agravo Interno
```yaml
ID: FLUXO-02
Nome: Agravo contra DMT
Prioridade: 2

Origem: Qualquer localizador 2.3
Destino: 2.3 Agravo contra DMT
Tipo Controle: Por Tipo de Petição
Petição: AGRAVO INTERNO

Testado: Aprovado
```

---

### FLUXO-03: Minutas Conferidas
```yaml
ID: FLUXO-03
Nome: Conferidas para Mesa Juiz
Prioridade: 3

Origem: 2.3 - para conferir
Destino: 2.3 Mesa Juiz Relator
Tipo Controle: Por Evento
Evento: Minuta conferida / Visto conferido

# CONFIGURAÇÃO ATUAL
# Juiz Relator: Dr. Rafael Scavone
# Localizador real: 2.3 Mesa Dr. Rafael

Testado: Aprovado
```

---

## Checklist de Implementação

### Pré-requisitos (criar se não existirem)
- [ ] Criar localizador `2.3 ALERTA - Parados >60 dias`
- [ ] Criar localizador `2.3 CRÍTICO - Parados >120 dias`
- [ ] Criar localizador `2.3 PRIORIDADE IDOSO`
- [ ] Criar localizador `2.3 ALERTA - Ag. Recebimento >30 dias` (NOVO v2.0)
- [ ] Criar localizador `2.3 Outros Previ` (se não existir)

### Fase 1: Classificadores por Conteúdo
- [ ] Criar classificador LOAS (TRIA-01)
- [ ] Criar classificador Ap. Especial (TRIA-02)
- [ ] Criar classificador Ap. Idade (TRIA-03)
- [ ] Criar classificador Incapacidade (TRIA-04)
- [ ] Criar classificador Pensão (TRIA-05)
- [ ] Criar classificador Rural (TRIA-06) - NOVO
- [ ] Criar classificador Aux-Acidente/Outros (TRIA-07) - NOVO
- [ ] Criar classificador RVT (SUSP-01)
- [ ] Criar classificador Vigilante (SUSP-02)
- [ ] Criar classificador Termo Inicial REFINADO (SUSP-03)

### Fase 2: Implementar Regras (seguir ordem)
- [ ] 1º: Implementar SUSP-* (suspensões primeiro)
- [ ] 2º: Implementar TRIA-01 a TRIA-07
- [ ] 3º: Implementar TRIA-99 (residual - ÚLTIMA do grupo)
- [ ] 4º: Implementar FLUXO-*
- [ ] 5º: Implementar PRAZO-* (incluindo PRAZO-05)

### Fase 3: Validação
- [ ] Testar TRIA-06 (Rural)
- [ ] Testar TRIA-07 (Aux-Acidente)
- [ ] Testar TRIA-99 (Residual)
- [ ] Testar PRAZO-05 (Ag. Recebimento)
- [ ] Revalidar SUSP-03 com novo classificador
- [ ] Monitorar por 1 semana
- [ ] Ajustar tolerância dos classificadores conforme necessário

---

## Métricas de Sucesso

| Métrica | Antes | Meta Após 30 dias |
|---------|-------|-------------------|
| Tempo médio triagem | ~2h/dia | <30min/dia |
| Processos em Pet. Inicial | 467 | <50 |
| Processos não classificados | 40%+ | <5% (com TRIA-99) |
| Alertas de parados | Manual | Automático |
| Cobertura de assuntos | ~60% | >95% |
| Processos em Ag. Recebimento sem alerta | 540 | 0 (todos monitorados) |

---

## Notas da Versão 2.0

### Alterações Principais

1. **+4 novas regras**: TRIA-06 (Rural), TRIA-07 (Outros), TRIA-99 (Residual), PRAZO-05 (Ag. Recebimento)

2. **SUSP-03 refinada**: Classificador anterior usava "DIB" OU "DIP" que aparece em praticamente todos os processos. Novo classificador mais específico.

3. **Filtros de exclusão**: Adicionados em PRAZO-01 e PRAZO-03 para evitar duplicação de tags.

4. **Cobertura ampliada**: Agora cobre Rural (11 processos), Auxílio-Acidente (36 processos) e garante que nenhum processo fique sem triagem (TRIA-99).

5. **Maior gargalo endereçado**: 540 processos em "Aguardando Recebimento" agora terão alerta automático após 30 dias (PRAZO-05).

### Decisões Mantidas

- **Localizadores de meses**: Mantidos pois indicam mês de entrada do recurso (uso operacional válido)

---

## Matriz de Cobertura por Assunto

| Assunto | Qtd | Regra | Status |
|---------|-----|-------|--------|
| Deficiente (LOAS) | 260 | TRIA-01 | Coberto |
| Ap. Tempo Contribuição | 235 | TRIA-02 | Coberto |
| Urbano (art. 60) | 130 | TRIA-04 | Coberto (incapacidade) |
| Auxílio-Doença | 129 | TRIA-04 | Coberto |
| Ap. Especial | 99 | TRIA-02 | Coberto |
| Pensão por Morte | 90 | TRIA-05 | Coberto |
| RMI | 58 | SUSP-01 | Coberto (suspensão) |
| Ap. por Idade | 53 | TRIA-03 | Coberto |
| Ap. por Invalidez | 53 | TRIA-04 | Coberto |
| Auxílio-Acidente | 36 | TRIA-07 | **NOVO** |
| Rural | ~11 | TRIA-06 | **NOVO** |
| Outros | var | TRIA-99 | **NOVO** (residual) |

---

*Documento atualizado em 28/12/2025 - Versão 2.0*
