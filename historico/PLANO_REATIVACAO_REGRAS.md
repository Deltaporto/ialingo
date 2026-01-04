# Plano de Reativação - Regras Inativas (10, 11, 12, 13, 14)

**Data:** 28/12/2024
**Objetivo:** Comparar especificação planejada vs. implementação atual e criar plano de ação

---

## Visão Geral

| Regra | Nome | Especificação | Implementação | Status | Ação |
|-------|------|---------------|---------------|--------|------|
| **10** | TRIA-05: Pensão | ✅ Completa | ❌ Vazia (0 assuntos) | CRÍTICO | RECONSTRUIR |
| **11** | TRIA-01: LOAS | ✅ Completa | ⚠️ Parcial | MÉDIA | Verificar assuntos + criar classificador |
| **12** | TRIA-04: Incapacidade | ✅ Completa | ❓ Não verificada | MÉDIA | Verificar + criar classificador |
| **13** | SUSP-01: Tema 1.102 | ✅ Completa | ❓ Não verificada | ALTA | Verificar + criar classificador |
| **14** | TRIA-02: Ap. Especial | ✅ Completa | ✅ Boa (40 assuntos) | BOA | Criar classificador |

---

## Detalhamento por Regra

### 🔴 REGRA 10 - TRIA-05: Pensão por Morte

#### Especificação Planejada (REGRAS_VERSAO_FINAL.md)
```yaml
Nome: Triagem Pensão
Origem: 2.3 GAB03-TR02
Destino: 2.3 Pensão (RGPS)
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "pensão por morte" OU "dependente" OU "óbito do segurado"

Filtros Assunto:
  - Pensão por Morte (Art. 74/9)

Status Planejado: Testado e Aprovado
```

#### Implementação Atual (Sistema)
```json
{
  "numero": 10,
  "ativa": false,
  "totalAssuntos": "0",
  "assuntos": [],
  "classificadorSelecionado": "Nenhum",
  "localizadorRemover": "Não encontrado",
  "localizadorIncluir": "Não encontrado"
}
```

#### 🔴 Diagnóstico: COMPLETAMENTE VAZIA
- ❌ Nenhum assunto configurado
- ❌ Nenhum localizador definido
- ❌ Nenhum classificador

#### ✅ Plano de Ação: RECONSTRUIR DO ZERO
1. **Criar Classificador "Pensão por Morte":**
   - Filtro: `"pensão por morte" OU "dependente" OU "óbito do segurado"`
   - Tolerância: 5%
   - Adicionar 3+ documentos exemplo

2. **Configurar Regra 10:**
   - Localizador REMOVER: `2.3 GAB03-TR02 - PETIÇÃO INICIAL`
   - Localizador INCLUIR: `2.3 Pensão (RGPS)` (verificar se existe)
   - Tipo de Controle: `Por Data - Todos os dias`
   - Assuntos: Buscar código de "Pensão por Morte (Art. 74/9)"
   - Vincular classificador "Pensão por Morte"

3. **Ativar regra**

**Prioridade:** 🔴 ALTA - Pensão representa ~90 processos/ano segundo indicadores

---

### 🟡 REGRA 11 - TRIA-01: LOAS/BPC

#### Especificação Planejada
```yaml
Nome: Triagem LOAS/BPC
Origem: 2.3 GAB03-TR02
Destino: 2.3 LOAS
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "BPC" OU "LOAS" OU "benefício assistencial" OU "Lei 8.742"
  Tolerância: 5%

Filtros Assunto:
  - Deficiente (código: 110166)

Filtros Adicionais:
  - Competência: JEF Previdenciária

Status: Refinado e Testado
```

#### Implementação Atual (Observada)
```yaml
Status: INATIVA
Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL ✅
Localizador INCLUIR: 2.3 LOAS - BENEFÍCIO ASSISTENCIAL ✅
Tipo Controle: Por Data / Todos os dias ✅
Juízo: 2ª Turma Recursal - 3º Juiz Relator ✅
Assuntos Visíveis: "Deficiente, Benefício Assistencial (Art. 203,V CF/88), DIREITO ASSISTENCIAL"
Classificador: Precisa verificar (provavelmente "Nenhum")
Total Assuntos: Não extraído (JS retornou 0 por erro de seletor)
```

#### 🟡 Diagnóstico: PARCIALMENTE CONFIGURADA
- ✅ Localizadores corretos
- ✅ Tipo de controle correto
- ⚠️ Assuntos parecem estar selecionados (vimos no display)
- ❌ Classificador ausente (provável)

#### ✅ Plano de Ação: CRIAR CLASSIFICADOR + VERIFICAR ASSUNTOS
1. **Verificar no sistema:**
   - Abrir Regra 11 para edição
   - Confirmar total de assuntos selecionados
   - Verificar se "Deficiente (110166)" está selecionado

2. **Criar Classificador "LOAS/BPC":**
   - Filtro: `"BPC" OU "LOAS" OU "benefício assistencial" OU "Lei 8.742"`
   - Tolerância: 5%
   - Adicionar 3+ documentos exemplo

3. **Ajustar Regra 11:**
   - Vincular classificador "LOAS/BPC"
   - Se necessário, adicionar assunto "Deficiente (110166)"
   - Ativar regra

**Prioridade:** 🟡 MÉDIA-ALTA - LOAS representa ~139 processos/ano

---

### ❓ REGRA 12 - TRIA-04: Benefício por Incapacidade

#### Especificação Planejada
```yaml
Nome: Triagem Incapacidade
Origem: 2.3 GAB03-TR02
Destino: 2.3 Benefício Incapacidade
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "auxílio-doença" OU "aposentadoria por invalidez" OU "incapacidade" OU "perícia médica"

Filtros Assunto:
  - Auxílio-Doença Previdenciário
  - Aposentadoria por Invalidez

Status: Testado e Aprovado
```

#### Implementação Atual
```
NÃO EXPLORADA - Dados não coletados
```

#### ❓ Diagnóstico: DESCONHECIDO
- ❓ Precisa verificar se tem assuntos configurados
- ❓ Precisa verificar localizadores
- ❌ Classificador provavelmente ausente (regra inativa)

#### ✅ Plano de Ação: VERIFICAR + CRIAR CLASSIFICADOR
1. **Verificar no sistema:**
   - Abrir Regra 12 para edição
   - Verificar total de assuntos e quais estão selecionados
   - Verificar localizadores

2. **Criar Classificador "Benefício Incapacidade":**
   - Filtro: `"auxílio-doença" OU "aposentadoria por invalidez" OU "incapacidade" OU "perícia médica"`
   - Tolerância: 5%
   - Adicionar 3+ documentos exemplo

3. **Ajustar e Ativar:**
   - Se necessário, adicionar assuntos faltantes
   - Vincular classificador
   - Ativar regra

**Prioridade:** 🟡 MÉDIA - Representa ~53 processos/ano (Ap. Invalidez) + processos de Auxílio-Doença

---

### ❓ REGRA 13 - SUSP-01: Tema 1.102/STF (Revisão Vida Toda)

#### Especificação Planejada
```yaml
Nome: Suspensão Revisão Vida Toda
Origem: Qualquer localizador 2.3
Destino: 2.3 tema 1.102/STF - Suspensos
Tipo Controle: Por Data - Todos os dias
PRIORIDADE: 1 (EXECUTAR PRIMEIRO - antes das triagens)

Classificador:
  Palavras: "revisão da vida toda" OU "regra definitiva" OU "art. 29, I" OU "art. 29, II"

Filtros Assunto:
  - RMI - Renda Mensal Inicial
  - Revisão

Status: Testado e Aprovado
```

#### Implementação Atual
```
NÃO EXPLORADA - Dados não coletados
```

#### ❓ Diagnóstico: DESCONHECIDO
- ❓ Precisa verificar se tem assuntos configurados
- ❓ Precisa verificar localizadores
- ❓ **CRÍTICO:** Verificar se o Tema 1.102/STF ainda está suspenso no STF
- ❌ Classificador provavelmente ausente

#### ⚠️ Consideração Especial
**ANTES DE REATIVAR:** Verificar status atual do Tema 1.102/STF no STF. Se o tema foi julgado e não está mais suspenso, esta regra NÃO deve ser reativada.

#### ✅ Plano de Ação: VERIFICAR STATUS STF + CRIAR CLASSIFICADOR
1. **Verificar status do Tema 1.102/STF:**
   - Consultar site do STF
   - Se ainda suspenso → prosseguir com reativação
   - Se julgado → NÃO reativar, excluir regra

2. **SE tema ainda suspenso:**
   - Abrir Regra 13 para verificação
   - Criar Classificador "Revisão Vida Toda":
     - Filtro: `"revisão da vida toda" OU "regra definitiva" OU "art. 29, I" OU "art. 29, II"`
     - Tolerância: 5%
   - Vincular classificador
   - **ATIVAR PRIMEIRO** (regra SUSP tem prioridade máxima)

**Prioridade:** 🔴 ALTA - Suspensões devem executar ANTES das triagens. RMI representa ~58 processos/ano

---

### 🟢 REGRA 14 - TRIA-02: Aposentadoria Especial

#### Especificação Planejada
```yaml
Nome: Triagem Ap. Especial/ATC
Origem: 2.3 GAB03-TR02
Destino: 2.3 Ap. Especial/ATC
Tipo Controle: Por Data - Todos os dias

Classificador:
  Palavras: "aposentadoria especial" OU "tempo especial" OU "atividade insalubre" OU "agente nocivo" OU "exposição"
  Tolerância: 5%

Filtros Assunto:
  - Aposentadoria Especial (Art. 57/8)
  - Aposentadoria por Tempo de Contribuição

Status: Testado e Aprovado
```

#### Implementação Atual
```yaml
Status: INATIVA
Total Assuntos: 40 assuntos selecionados ✅
Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL ✅
Localizador INCLUIR: 2.3 Ap. Especial/ATC ✅
Classificador: NENHUM ❌
Ativa: false

Assuntos incluem (lista completa extraída):
- 1178: Aposentadoria Especial (Art. 57/8) ✅
- 2670: Vigilante
- 2629-2634: Agentes Agressivos (Eletricidade, Ruído, Químicos, Biológicos, Frio, Calor)
- 1305: Averbação/Conversão de tempo especial
- [... mais 33 assuntos relacionados]
```

#### 🟢 Diagnóstico: PERFEITAMENTE CONFIGURADA
- ✅ 40 assuntos selecionados corretamente
- ✅ Localizadores corretos
- ✅ Todos os assuntos relevantes incluídos
- ❌ **ÚNICA PENDÊNCIA:** Falta classificador

#### ✅ Plano de Ação: CRIAR CLASSIFICADOR E REATIVAR
1. **Criar Classificador "Aposentadoria Especial":**
   - Filtro: `"aposentadoria especial" OU "tempo especial" OU "atividade insalubre" OU "agente nocivo" OU "exposição"`
   - Tolerância: 5%
   - Adicionar 3+ documentos exemplo de processos de aposentadoria especial

2. **Ativar Regra 14:**
   - Abrir Regra 14 para edição
   - Vincular classificador "Aposentadoria Especial"
   - Marcar checkbox "Ativa"
   - Salvar

**Prioridade:** 🟢 RÁPIDA - Configuração perfeita, só falta 1 passo. Representa ~99 processos/ano

---

## Classificadores a Criar

Todos os classificadores seguem o mesmo padrão:

### 1. Classificador "Aposentadoria Especial"
```yaml
Nome: Aposentadoria Especial
Filtro: "aposentadoria especial" OU "tempo especial" OU "atividade insalubre" OU "agente nocivo" OU "exposição"
Tolerância: 5%
Documentos Exemplo: 3 mínimo (buscar processos já finalizados sobre aposentadoria especial)
```

### 2. Classificador "LOAS/BPC"
```yaml
Nome: LOAS/BPC
Filtro: "BPC" OU "LOAS" OU "benefício assistencial" OU "Lei 8.742"
Tolerância: 5%
Documentos Exemplo: 3 mínimo (buscar processos de LOAS)
```

### 3. Classificador "Benefício Incapacidade"
```yaml
Nome: Benefício Incapacidade
Filtro: "auxílio-doença" OU "aposentadoria por invalidez" OU "incapacidade" OU "perícia médica"
Tolerância: 5%
Documentos Exemplo: 3 mínimo (processos de auxílio-doença ou aposentadoria por invalidez)
```

### 4. Classificador "Pensão por Morte"
```yaml
Nome: Pensão por Morte
Filtro: "pensão por morte" OU "dependente" OU "óbito do segurado"
Tolerância: 5%
Documentos Exemplo: 3 mínimo (processos de pensão)
```

### 5. Classificador "Revisão Vida Toda" (SE tema ainda suspenso)
```yaml
Nome: Revisão Vida Toda
Filtro: "revisão da vida toda" OU "regra definitiva" OU "art. 29, I" OU "art. 29, II"
Tolerância: 5%
Documentos Exemplo: 3 mínimo (processos de revisão de vida toda)
```

---

## Ordem de Implementação Recomendada

### Fase 1: Verificações Preliminares
- [ ] Verificar status do Tema 1.102/STF no site do STF
- [ ] Fazer login no Eproc
- [ ] Verificar se localizador "2.3 Pensão (RGPS)" existe

### Fase 2: Criar Classificadores (1-2 horas)
⚠️ **IMPORTANTE:** Criar TODOS os classificadores ANTES de ativar qualquer regra

- [ ] Criar "Revisão Vida Toda" (se tema suspenso)
- [ ] Criar "Aposentadoria Especial"
- [ ] Criar "LOAS/BPC"
- [ ] Criar "Benefício Incapacidade"
- [ ] Criar "Pensão por Morte"

### Fase 3: Verificar Regras no Sistema (30 min)
- [ ] Verificar Regra 11 (LOAS) - assuntos e config
- [ ] Verificar Regra 12 (Incapacidade) - assuntos e config
- [ ] Verificar Regra 13 (Tema 1.102) - assuntos e config

### Fase 4: Ajustar e Ativar Regras (seguir ordem!)

#### 4.1. SUSP-01 (Regra 13) - PRIMEIRO! (se tema suspenso)
- [ ] Verificar/ajustar assuntos (RMI, Revisão)
- [ ] Vincular classificador "Revisão Vida Toda"
- [ ] ATIVAR
- [ ] Testar com 1-2 processos

#### 4.2. Triagens - SEGUNDA RODADA (ordem de prioridade)
- [ ] **Regra 14** (Ap. Especial): Vincular classificador + ATIVAR
- [ ] **Regra 11** (LOAS): Verificar assuntos + Vincular classificador + ATIVAR
- [ ] **Regra 12** (Incapacidade): Verificar/ajustar + Vincular classificador + ATIVAR
- [ ] **Regra 10** (Pensão): RECONSTRUIR COMPLETA + Vincular classificador + ATIVAR

### Fase 5: Monitoramento (1 semana)
- [ ] Monitorar movimentações diárias
- [ ] Verificar se classificadores estão funcionando
- [ ] Ajustar tolerância se necessário
- [ ] Verificar se processos estão sendo corretamente triados

---

## Códigos de Assunto Necessários

Para facilitar a configuração, pesquisar no Eproc os códigos dos seguintes assuntos:

### Para Regra 10 (Pensão)
- [ ] Pensão por Morte (Art. 74/9)
- [ ] Pensão por Morte de Servidor (se houver)
- [ ] Pensão Especial (se houver)

### Para Regra 11 (LOAS) - Verificar se já configurados
- [ ] Deficiente (código: 110166)
- [ ] Benefício Assistencial (Art. 203,V CF/88)

### Para Regra 12 (Incapacidade) - Verificar se já configurados
- [ ] Auxílio-Doença Previdenciário
- [ ] Aposentadoria por Invalidez

### Para Regra 13 (Tema 1.102) - Verificar se já configurados
- [ ] RMI - Renda Mensal Inicial
- [ ] Revisão

---

## Impacto Estimado

Com base nos indicadores do REGRAS_VERSAO_FINAL.md:

| Regra | Processos/Ano | Impacto Automação |
|-------|---------------|-------------------|
| SUSP-01 (Tema 1.102) | ~58 | Suspensão automática |
| TRIA-02 (Ap. Especial) | ~99 | Triagem automática |
| TRIA-05 (Pensão) | ~90 | Triagem automática |
| TRIA-01 (LOAS) | ~139 | Triagem automática |
| TRIA-04 (Incapacidade) | ~53+ | Triagem automática |
| **TOTAL** | **~439 processos/ano** | **Automação completa** |

**Economia estimada:** ~439 movimentações manuais economizadas por ano.

---

## Resumo Executivo

### ✅ O que temos:
- Especificação completa de todas as 5 regras
- Regra 14 perfeitamente configurada (40 assuntos)
- Regras 11, 12, 13 provavelmente configuradas (precisa verificar)
- Filtros de classificador definidos e testados

### ❌ O que falta:
- Criar 5 classificadores por conteúdo
- Reconstruir completamente Regra 10 (pensão)
- Verificar configuração das Regras 11, 12, 13
- Verificar status do Tema 1.102/STF

### ⏱️ Tempo estimado:
- Criar classificadores: 1-2 horas
- Verificar e ajustar regras: 1 hora
- Testar e ativar: 30 minutos
- **TOTAL:** 2,5 a 3,5 horas

### 🎯 Prioridade de Execução:
1. 🔴 **URGENTE:** Verificar Tema 1.102/STF
2. 🟡 **ALTA:** Criar classificadores
3. 🟡 **ALTA:** Ativar Regra 13 (SUSP-01) PRIMEIRO
4. 🟢 **MÉDIA:** Ativar Regras 14, 11, 12 (triagens)
5. 🔴 **MÉDIA-BAIXA:** Reconstruir Regra 10 (mais trabalhosa)

---

**Documento gerado em:** 28/12/2024
**Próxima revisão:** Após verificação das Regras 11, 12, 13 no sistema
