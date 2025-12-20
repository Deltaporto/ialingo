# Regras de Automação - Versão Final (Refinada)

**Versão:** 1.0 (Pós-Simulações)  
**Data:** 19/12/2025  
**Status:** ✅ Pronto para Implementação

---

## Resumo das Iterações

| Versão | Alterações |
|--------|------------|
| v0.1   | 15 regras iniciais definidas |
| v0.2   | Simulações executadas: 14 OK, 1 refinamento |
| **v1.0** | Refinamentos aplicados, ordem definida |

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

### TRIA-01: LOAS/BPC (REFINADA ✅)
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
  Assunto: Deficiente (110166)  # ← ADICIONADO após simulação
  Competência: JEF Previdenciária

# Validação
Testado: Sim
Cenário Positivo: ✅ Pass
Cenário Negativo: ✅ Pass  
Cenário Limite: ✅ Pass (com filtro de assunto)
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

Testado: ✅ Aprovado
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

Testado: ✅ Aprovado
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

Testado: ✅ Aprovado
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

Testado: ✅ Aprovado
```

---

## Grupo 2: Controle de Prazos (Prioridade 4º)

### PRAZO-01: Alerta 60 dias
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
  # Todos os localizadores de trabalho
  
Destino: 2.3 ALERTA - Parados >60 dias
Tipo Controle: Por Tempo no Localizador - 60 dias
Comportamento REMOVER: NÃO remover (apenas acrescentar)

Testado: ✅ Aprovado
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

Testado: ✅ Aprovado
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

Testado: ✅ Aprovado
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

Testado: ✅ Aprovado
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

Testado: ✅ Aprovado
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

Testado: ✅ Aprovado
```

---

### SUSP-03: Tema 1.124/STJ
```yaml
ID: SUSP-03
Nome: Suspensão Termo Inicial
Prioridade: 3

Origem: Qualquer localizador 2.3
Destino: 2.3 tema 1124/STJ - Suspensos
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: ("termo inicial" E "efeitos financeiros") OU "DIB" OU "DIP"

Testado: ✅ Aprovado
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

Testado: ✅ Aprovado
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

Testado: ✅ Aprovado
```

---

### FLUXO-03: Minutas Conferidas
```yaml
ID: FLUXO-03
Nome: Conferidas para Mesa Juiz
Prioridade: 3

Origem: 2.3 - para conferir
Destino: 2.3 Mesa Dr. Rafael
Tipo Controle: Por Evento
Evento: Minuta conferida / Visto conferido

Testado: ✅ Aprovado
```

---

## Checklist de Implementação

- [ ] Criar localizador `2.3 ALERTA - Parados >60 dias` (se não existir)
- [ ] Criar localizador `2.3 CRÍTICO - Parados >120 dias` (se não existir)
- [ ] Criar localizador `2.3 PRIORIDADE IDOSO` (se não existir)
- [ ] Criar classificadores por conteúdo para cada regra TRIA-* e SUSP-*
- [ ] Implementar SUSP-* primeiro (ordem de execução)
- [ ] Implementar TRIA-* segundo
- [ ] Implementar FLUXO-* terceiro
- [ ] Implementar PRAZO-* por último
- [ ] Monitorar por 1 semana
- [ ] Ajustar tolerância dos classificadores conforme necessário

---

## Métricas de Sucesso

| Métrica | Antes | Meta Após 30 dias |
|---------|-------|-------------------|
| Tempo médio triagem | ~2h/dia | <30min/dia |
| Processos em Pet. Inicial | 467 | <50 |
| Processos não classificados | 40%+ | <10% |
| Alertas de parados | Manual | Automático |

---

*Documento pronto para implementação no eproc*
