# Guia Prático de Implementação - Regras de Triagem

**Data:** 28/12/2024
**Tempo Estimado:** 1,5 a 2 horas
**Abordagem:** Filtros Diretos (SEM Classificadores de IA)

---

## 📋 Sumário

1. [Visão Geral](#visão-geral)
2. [Preparação](#preparação)
3. [Template de Configuração](#template-de-configuração)
4. [Implementação das 5 Regras](#implementação-das-5-regras)
5. [Validação e Monitoramento](#validação-e-monitoramento)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

### Objetivo
Reativar 5 regras inativas de triagem automática de processos previdenciários usando filtros diretos (sem dependência de IA).

### Mudança de Estratégia

**❌ Abordagem Antiga (DESCARTADA):**
- Tipo Controle: "Por Data - Todos os dias"
- Dependência de Classificadores de IA
- Executa todos os dias para todos os processos
- Requer manutenção de documentos exemplo

**✅ Abordagem Nova (IMPLEMENTAR):**
- Tipo Controle: **"Por Tempo no Localizador" (0-1 dias)**
- Filtros diretos: **Assunto + Juízo + Competência**
- Executa **apenas 1 vez** quando processo entra
- **Sem dependência de IA** - mais rápido e confiável

### Vantagens

| Aspecto | Benefício |
|---------|-----------|
| **Simplicidade** | Sem necessidade de criar classificadores de IA |
| **Performance** | Executa 1 vez por processo vs. todos os dias |
| **Manutenção** | Zero manutenção após configuração |
| **Precisão** | 100% (filtro exato) vs. ~95% (IA) |
| **Velocidade** | Filtro de banco é instantâneo |
| **Tempo de Implementação** | 1,5-2h vs. 3-4h (com classificadores) |

---

## 🔧 Preparação

### Fase 1: Checklist Pré-Implementação (10 min)

- [ ] **Verificar status Tema 1.102/STF**
  - Acessar: http://portal.stf.jus.br/processos/listarTemas.asp
  - Buscar: Tema 1.102 (Revisão da Vida Toda)
  - Verificar: Ainda está suspenso?
  - SE julgado → NÃO implementar Regra 13
  - SE suspenso → Implementar Regra 13

- [ ] **Fazer login no Eproc**
  - Acessar: https://eproc.jfrj.jus.br/
  - Login com certificado digital

- [ ] **Acessar painel de automação**
  - Menu > Localizadores > Automatizar Tramitação
  - Verificar se vê a lista de 22 regras

- [ ] **Verificar localizadores de destino**
  - Confirmar que existem:
    - 2.3 Ap. Especial/ATC
    - 2.3 LOAS - BENEFÍCIO ASSISTENCIAL
    - 2.3 Benefício Incapacidade (ou similar)
    - 2.3 Pensão (RGPS) (ou similar)
    - 2.3 tema 1.102/STF - Suspensos (ou similar)

- [ ] **Ter códigos de assunto prontos**
  - Abrir: [referencia/CODIGOS_ASSUNTO.md](referencia/CODIGOS_ASSUNTO.md)
  - Manter aberto para consulta rápida

---

## 📝 Template de Configuração

### Configuração Base (usar em TODAS as regras)

```yaml
TIPO DE CONTROLE: Por Tempo no localizador
Tempo: Entre 0 e 1 dias

Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Comportamento REMOVER: Remover do localizador informado

Filtros Obrigatórios:
  ✅ Juízo do Processo: 2ª Turma Recursal - 3º Juiz Relator (RJ)
  ✅ Competência: JEF Previdenciária
  ✅ Rito: JUIZADO ESPECIAL FEDERAL

Filtro Específico:
  ✅ Assunto: [selecionar códigos específicos - ver abaixo]

Classificador por Conteúdo: (vazio) ← DEIXAR VAZIO!

Status: ✅ Ativa
```

### Checklist por Regra

Para CADA regra, seguir este checklist:

- [ ] Abrir regra para edição
- [ ] Verificar/configurar localizadores (REMOVER e INCLUIR)
- [ ] Alterar TIPO DE CONTROLE para "Por Tempo no localizador"
- [ ] Configurar tempo: 0-1 dias
- [ ] Adicionar filtro: **Juízo = 2ª TR - 3º Juiz Relator**
- [ ] Adicionar filtro: **Competência = JEF Previdenciária**
- [ ] Adicionar filtro: **Rito = JUIZADO ESPECIAL FEDERAL**
- [ ] Selecionar assuntos específicos (ver seção da regra)
- [ ] **NÃO** selecionar classificador (deixar vazio)
- [ ] Marcar checkbox **"Ativa"**
- [ ] **Salvar**
- [ ] Testar com processo real (se possível)

---

## 🚀 Implementação das 5 Regras

### Ordem Recomendada

Implementar nesta ordem (do mais fácil para o mais difícil):

1. **Regra 14** (Ap. Especial) - 10 min - 🟢 Já 90% pronta
2. **Regra 11** (LOAS) - 15 min - 🟡 Muito simples (2 códigos)
3. **Regra 12** (Incapacidade) - 15 min - 🟡 Simples (10 códigos)
4. **Regra 13** (Tema 1.102) - 20 min - 🔴 Verificar STF primeiro
5. **Regra 10** (Pensão) - 20 min - 🔴 Reconstruir do zero

---

### 🟢 REGRA 14 - Aposentadoria Especial (TRIA-02)

**Status:** 90% pronta (40 assuntos já configurados)
**Prioridade:** 🟢 ALTA
**Tempo:** 10 minutos

#### Configuração

```yaml
Nome: Triagem Ap. Especial

Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Localizador INCLUIR: 2.3 Ap. Especial/ATC

TIPO DE CONTROLE: Por Tempo no localizador
Tempo: Entre 0 e 1 dias

Filtros Obrigatórios:
  ✅ Juízo: 2ª TR - 3º Juiz Relator (RJ)
  ✅ Competência: JEF Previdenciária
  ✅ Rito: JUIZADO ESPECIAL FEDERAL

Assuntos: JÁ CONFIGURADOS (40 assuntos)
  ✅ 1178 - Aposentadoria Especial (Art. 57/8)
  ✅ 2670 - Vigilante
  ✅ 2625-2630 - Agentes Agressivos
  ✅ [... mais 33 assuntos]

Classificador: (vazio) ← NÃO PRECISA!
```

#### Passos

1. [ ] Abrir Regra 14 para edição
2. [ ] **Verificar** se os 40 assuntos ainda estão selecionados
3. [ ] Alterar "TIPO DE CONTROLE" para "Por Tempo no localizador"
4. [ ] Configurar tempo: **0-1 dias**
5. [ ] Adicionar filtros: Juízo, Competência, Rito
6. [ ] Garantir que classificador está VAZIO
7. [ ] Marcar checkbox **"Ativa"**
8. [ ] **Salvar**

**Observação:** Esta regra JÁ TEM os assuntos configurados. Apenas ajustar tipo de controle e filtros!

---

### 🟡 REGRA 11 - LOAS/BPC (TRIA-01)

**Status:** Localizadores OK, assuntos a verificar
**Prioridade:** 🟡 ALTA
**Tempo:** 15 minutos

#### Configuração

```yaml
Nome: Triagem LOAS/BPC

Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Localizador INCLUIR: 2.3 LOAS - BENEFÍCIO ASSISTENCIAL

TIPO DE CONTROLE: Por Tempo no localizador
Tempo: Entre 0 e 1 dias

Filtros Obrigatórios:
  ✅ Juízo: 2ª TR - 3º Juiz Relator (RJ)
  ✅ Competência: JEF Previdenciária

Assuntos (2 códigos - MUITO SIMPLES):
  ☐ 2311 - Deficiente, Benefício Assistencial (Art. 203,V CF/88)
  ☐ 2312 - Idoso, Benefício Assistencial (Art. 203,V CF/88)

Classificador: (vazio) ← NÃO PRECISA!
```

#### Passos

1. [ ] Abrir Regra 11 para edição
2. [ ] Verificar quais assuntos já estão selecionados
3. [ ] No campo "Assunto", buscar por "2311" e marcar checkbox
4. [ ] Buscar por "2312" e marcar checkbox
5. [ ] Alterar "TIPO DE CONTROLE" para "Por Tempo no localizador"
6. [ ] Configurar tempo: **0-1 dias**
7. [ ] Adicionar filtros: Juízo, Competência
8. [ ] Garantir que classificador está VAZIO
9. [ ] Marcar checkbox **"Ativa"**
10. [ ] **Salvar**

**Como buscar assuntos:**
- Abrir dropdown "Assunto" (tem 2.169 opções)
- Usar Ctrl+F no navegador
- Buscar pelo código (ex: "2311")
- Marcar checkbox ao lado do assunto

---

### 🟡 REGRA 12 - Benefício por Incapacidade (TRIA-04)

**Status:** A verificar
**Prioridade:** 🟡 ALTA
**Tempo:** 15 minutos

#### Configuração

```yaml
Nome: Triagem Incapacidade

Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Localizador INCLUIR: 2.3 Benefício Incapacidade (verificar nome exato)

TIPO DE CONTROLE: Por Tempo no localizador
Tempo: Entre 0 e 1 dias

Filtros Obrigatórios:
  ✅ Juízo: 2ª TR - 3º Juiz Relator (RJ)
  ✅ Competência: JEF Previdenciária

Assuntos (10 códigos):
  Auxílio-Doença:
    ☐ 1179 - Auxílio-Doença Previdenciário
    ☐ 2705 - Adicional de 25%, Auxílio-Doença
    ☐ 1202 - Auxílio-Doença Acidentário
    ☐ 2706 - Rural, Auxílio-Doença
    ☐ 2708 - Urbano, Auxílio-Doença

  Aposentadoria por Invalidez:
    ☐ 1169 - Aposentadoria por Invalidez
    ☐ 2620 - Adicional de 25%, Ap. Invalidez
    ☐ 1203 - Aposentadoria por Invalidez Acidentária
    ☐ 2622 - Rural, Ap. Invalidez
    ☐ 2621 - Urbana, Ap. Invalidez

Classificador: (vazio) ← NÃO PRECISA!
```

#### Passos

1. [ ] Abrir Regra 12 para edição
2. [ ] Verificar se localizador "2.3 Benefício Incapacidade" existe (se não, ajustar nome)
3. [ ] No campo "Assunto", buscar e marcar os 10 códigos:
   - 1179, 2705, 1202, 2706, 2708 (Auxílio-Doença)
   - 1169, 2620, 1203, 2622, 2621 (Invalidez)
4. [ ] Alterar "TIPO DE CONTROLE" para "Por Tempo no localizador"
5. [ ] Configurar tempo: **0-1 dias**
6. [ ] Adicionar filtros: Juízo, Competência
7. [ ] Garantir que classificador está VAZIO
8. [ ] Marcar checkbox **"Ativa"**
9. [ ] **Salvar**

---

### 🔴 REGRA 13 - Tema 1.102/STF - Revisão Vida Toda (SUSP-01)

**Status:** A verificar - CRÍTICO
**Prioridade:** 🔴 CRÍTICA (verificar STF primeiro!)
**Tempo:** 20 minutos

⚠️ **ANTES DE IMPLEMENTAR:** Verificar se Tema 1.102/STF ainda está suspenso!
- SE julgado → **NÃO implementar** esta regra
- SE suspenso → Implementar normalmente

#### Configuração (SE tema suspenso)

```yaml
Nome: Suspensão Tema 1.102/STF

Localizador REMOVER: Qualquer localizador 2.3 (ou específico)
Localizador INCLUIR: 2.3 tema 1.102/STF - Suspensos (verificar nome exato)
Comportamento: Remover de TODOS localizadores OU do informado

TIPO DE CONTROLE: Por Tempo no localizador
Tempo: Entre 0 e 1 dias

Filtros Obrigatórios:
  ✅ Juízo: 2ª TR - 3º Juiz Relator (RJ)
  ✅ Competência: JEF Previdenciária

OPÇÃO A - Filtro por Assunto (RECOMENDADO):
  Assuntos:
    ☐ 3118 - Revisão da Vida Toda (Tema 1102) ← CÓDIGO ESPECÍFICO!

OPÇÃO B - Filtro por Precedente Qualificado:
  ✅ Precedente qualificado: Tema 1.102/STF (buscar na lista)

Classificador: (vazio) ← NÃO PRECISA!
```

⚠️ **ATENÇÃO:** Regras de SUSPENSÃO têm **PRIORIDADE 1**
- Devem executar ANTES das triagens!
- Verificar ordem de execução na lista de regras

#### Passos

1. [ ] ⚠️ **VERIFICAR STATUS TEMA 1.102/STF** no site do STF
2. [ ] SE tema julgado: **PARAR** e NÃO implementar
3. [ ] SE tema suspenso:
   - [ ] Abrir Regra 13 para edição
   - [ ] Configurar localizadores (REMOVER e INCLUIR)
   - [ ] Alterar "TIPO DE CONTROLE" para "Por Tempo no localizador"
   - [ ] Configurar tempo: **0-1 dias**
   - [ ] **ESCOLHER** Opção A ou Opção B:
     - **Opção A (recomendado):** Buscar e marcar código **3118**
     - **Opção B:** Selecionar "Tema 1.102/STF" no campo Precedente Qualificado
   - [ ] Adicionar filtros: Juízo, Competência
   - [ ] Garantir que classificador está VAZIO
   - [ ] Marcar checkbox **"Ativa"**
   - [ ] **Verificar ordem de execução** (deve ser ANTES das triagens)
   - [ ] **Salvar**

---

### 🔴 REGRA 10 - Pensão por Morte (TRIA-05)

**Status:** VAZIA (0 assuntos, sem localizadores)
**Prioridade:** 🔴 MÉDIA (mais trabalhosa)
**Tempo:** 20 minutos

#### Configuração

```yaml
Nome: Triagem Pensão

Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Localizador INCLUIR: 2.3 Pensão (RGPS) (verificar nome exato)
Comportamento: Remover do localizador informado

TIPO DE CONTROLE: Por Tempo no localizador
Tempo: Entre 0 e 1 dias

Filtros Obrigatórios:
  ✅ Juízo: 2ª TR - 3º Juiz Relator (RJ)
  ✅ Competência: JEF Previdenciária

Assuntos Principais (4 códigos mínimo):
  ☐ 1182 - Pensão por Morte (Art. 74/9) ← OBRIGATÓRIO
  ☐ 2709 - Acidente de Trabalho, Pensão por Morte
  ☐ 2711 - Rural (Pensão por Morte)
  ☐ 2719 - Urbana (Pensão por Morte)

Assuntos Opcionais (14 códigos - casos específicos):
  Rural:
    ☐ 2712 - Estudante Universitário, Rural
    ☐ 2713 - Filho Maior e Inválido, Rural
    ☐ 2714 - Menor sob Guarda, Rural
    ☐ 2715 - Óbito de Companheiro/Companheira, Rural
    ☐ 2716 - Óbito de Cônjuge, Rural
    ☐ 2717 - Óbito de Filho/Filha, Rural
    ☐ 2718 - Óbito de Pai/Mãe, Rural

  Urbana:
    ☐ 2720 - Estudante Universitário, Urbana
    ☐ 2721 - Filho Maior e Inválido, Urbana
    ☐ 2722 - Menor sob Guarda, Urbana
    ☐ 2723 - Óbito de Companheiro/Companheira, Urbana
    ☐ 2724 - Óbito de Cônjuge, Urbana
    ☐ 2725 - Óbito de Filho/Filha, Urbana
    ☐ 2726 - Óbito de Pai/Mãe, Urbana

Classificador: (vazio) ← NÃO PRECISA!
```

#### Passos

1. [ ] Verificar se localizador "2.3 Pensão" existe
   - Se não existir, criar ou ajustar nome
2. [ ] Abrir Regra 10 para edição
3. [ ] Configurar localizadores REMOVER e INCLUIR
4. [ ] No campo "Assunto", buscar e marcar os **4 códigos principais**:
   - 1182, 2709, 2711, 2719
5. [ ] (Opcional) Marcar também os 14 códigos específicos se quiser cobertura completa
6. [ ] Alterar "TIPO DE CONTROLE" para "Por Tempo no localizador"
7. [ ] Configurar tempo: **0-1 dias**
8. [ ] Adicionar filtros: Juízo, Competência
9. [ ] Garantir que classificador está VAZIO
10. [ ] Marcar checkbox **"Ativa"**
11. [ ] **Salvar**

**Recomendação:** Começar com apenas os 4 códigos principais. Adicionar os específicos depois se necessário.

---

## ✅ Validação e Monitoramento

### Fase de Validação (30 min)

#### Checklist Pós-Implementação

- [ ] Verificar ordem de execução das regras
  - Regra 13 (SUSP) deve executar PRIMEIRO (se implementada)
  - Regras de triagem (10, 11, 12, 14) depois

- [ ] Garantir que todas as 5 regras estão **Ativas**

- [ ] Testar com 1-2 processos reais
  - Verificar se processo novo em "PETIÇÃO INICIAL" é movido
  - Confirmar que apenas processos do 3º Juiz são pegos
  - Validar que vai para o localizador correto

- [ ] Monitorar logs/histórico de movimentações

### Monitoramento - Primeira Semana

- **Diário:** Verificar se processos novos estão sendo movidos automaticamente
- **Confirmar:** Apenas processos do 3º Juiz Relator estão sendo triados
- **Ajustar:** Adicionar/remover assuntos se necessário

### Indicadores de Sucesso

- ✅ Processos movem automaticamente ao entrar no localizador
- ✅ Nenhum processo duplicado (movido mais de 1 vez)
- ✅ Apenas processos previdenciários sendo triados
- ✅ Apenas processos do nosso juízo (3º Juiz Relator)
- ✅ Processos vão para o localizador correto

---

## 🔧 Troubleshooting

### Problema: Regra não está movendo processos

**Possíveis causas:**
- [ ] Regra não está marcada como "Ativa"
- [ ] Filtro de Juízo está errado (verificar se é "3º Juiz Relator")
- [ ] Tempo no localizador está diferente de 0-1 dias
- [ ] Assuntos não estão selecionados corretamente
- [ ] Processo não atende aos filtros (ex: não é JEF Previdenciária)

**Solução:**
- Abrir regra para edição e revisar cada campo
- Comparar com o template deste guia

### Problema: Processos sendo movidos mais de uma vez

**Causa:**
- Tipo de Controle está como "Por Data - Todos os dias"

**Solução:**
- Alterar para "Por Tempo no localizador" (0-1 dias)

### Problema: Processos de outros juízes sendo movidos

**Causa:**
- Falta filtro de Juízo

**Solução:**
- Adicionar filtro: **Juízo = 2ª TR - 3º Juiz Relator (RJ)**

### Problema: Não encontro o código de assunto no dropdown

**Solução:**
- Usar Ctrl+F no navegador
- Buscar pelo código exato (ex: "2311")
- Se não encontrar, verificar se código está correto em [referencia/CODIGOS_ASSUNTO.md](referencia/CODIGOS_ASSUNTO.md)

### Problema: Localizador de destino não existe

**Solução:**
- Verificar lista de localizadores do órgão (2ª TR tem 513)
- Criar localizador se necessário
- Ou usar localizador existente com nome similar

---

## 🚫 O que NÃO fazer

- ❌ NÃO criar classificadores de IA nesta fase
- ❌ NÃO usar "Por Data - Todos os dias"
- ❌ NÃO deixar filtros de Juízo/Competência vazios
- ❌ NÃO ativar Regra 13 (SUSP) se tema foi julgado
- ❌ NÃO esquecer de verificar ordem de execução
- ❌ NÃO salvar sem marcar checkbox "Ativa"

---

## 📚 Documentação Adicional

- **[referencia/CODIGOS_ASSUNTO.md](referencia/CODIGOS_ASSUNTO.md)** - Lista completa de códigos de assunto
- **[referencia/CAMPOS_FORMULARIO.md](referencia/CAMPOS_FORMULARIO.md)** - Todos os campos do formulário
- **[referencia/REGRAS_ESPECIFICACAO.md](referencia/REGRAS_ESPECIFICACAO.md)** - Especificação original das regras
- **[README_AUTOMACAO.md](README_AUTOMACAO.md)** - Índice geral

---

## ✅ Resumo da Ordem de Execução

1. **Preparação** (10 min)
   - Verificar STF, login, abrir documentação

2. **Regra 14** (10 min) - Ap. Especial
   - Mais fácil, 90% pronta

3. **Regra 11** (15 min) - LOAS
   - Simples, apenas 2 códigos

4. **Regra 12** (15 min) - Incapacidade
   - 10 códigos, moderado

5. **Regra 13** (20 min) - Tema 1.102/STF
   - SE tema suspenso, implementar
   - PRIORIDADE 1 na execução

6. **Regra 10** (20 min) - Pensão
   - Reconstruir do zero

7. **Validação** (30 min)
   - Testar e monitorar

**TEMPO TOTAL: 1h 30min a 2h**

---

**Documento criado em:** 28/12/2024
**Status:** ✅ PRONTO PARA USO

**Boa implementação! 🚀**
