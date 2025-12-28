# Plano de Implementação REVISADO - Regras Inativas

**Data:** 28/12/2024
**Abordagem:** Filtros Diretos (SEM Classificadores de IA)

---

## 🎯 Mudança de Estratégia

### ❌ Abordagem Antiga (DESCARTADA):
- Tipo Controle: "Por Data - Todos os dias"
- Dependência de Classificadores de IA
- Executa todos os dias para todos os processos
- Requer manutenção de documentos exemplo

### ✅ Abordagem Nova (IMPLEMENTAR):
- Tipo Controle: **"Por Tempo no Localizador" (0-1 dias)**
- Filtros diretos: **Assunto + Juízo + Competência**
- Executa **apenas 1 vez** quando processo entra
- **Sem dependência de IA** - mais rápido e confiável

---

## 📋 As 5 Regras Inativas - Configuração Revisada

### 🟢 REGRA 14 - TRIA-02: Aposentadoria Especial

```yaml
Status Atual: INATIVA (40 assuntos já configurados ✅)
Ação: APENAS AJUSTAR tipo de controle + filtros adicionais

Configuração:
  Nome: Triagem Ap. Especial
  Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
  Localizador INCLUIR: 2.3 Ap. Especial/ATC

  TIPO DE CONTROLE: Por Tempo no localizador
  Tempo: Entre 0 e 1 dias

  Filtros Obrigatórios:
    ✅ Juízo: 2ª TR - 3º Juiz Relator (RJ)
    ✅ Competência: JEF Previdenciária
    ✅ Rito: JUIZADO ESPECIAL FEDERAL

  Assuntos (já configurados - 40):
    ✅ Aposentadoria Especial (Art. 57/8)
    ✅ Vigilante
    ✅ Agentes Agressivos (todos)
    ✅ Averbação/Conversão tempo especial
    ✅ [... mais 33 assuntos]

  Classificador: (vazio) ← NÃO PRECISA!

Passos:
  1. Abrir Regra 14 para edição
  2. Alterar "TIPO DE CONTROLE" para "Por Tempo no localizador"
  3. Configurar tempo: 0-1 dias
  4. Adicionar filtros: Juízo, Competência, Rito
  5. Verificar se os 40 assuntos ainda estão selecionados
  6. ATIVAR regra
  7. Salvar

Tempo estimado: 10 minutos
Prioridade: 🟢 ALTA - Já está 90% pronta
```

---

### 🟡 REGRA 11 - TRIA-01: LOAS/BPC

```yaml
Status Atual: INATIVA (localizadores OK, assuntos a verificar)
Ação: VERIFICAR assuntos + AJUSTAR tipo de controle

Configuração:
  Nome: Triagem LOAS/BPC
  Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL ✅
  Localizador INCLUIR: 2.3 LOAS - BENEFÍCIO ASSISTENCIAL ✅

  TIPO DE CONTROLE: Por Tempo no localizador
  Tempo: Entre 0 e 1 dias

  Filtros Obrigatórios:
    ✅ Juízo: 2ª TR - 3º Juiz Relator (RJ)
    ✅ Competência: JEF Previdenciária

  Assuntos a Selecionar:
    ☐ Deficiente, Benefício Assistencial (Art. 203,V CF/88) ← Principal
    ☐ LOAS (buscar código)
    ☐ BPC (buscar código)
    ☐ Benefício Assistencial ao Idoso
    ☐ Benefício Assistencial ao Deficiente

  Classificador: (vazio) ← NÃO PRECISA!

Passos:
  1. Abrir Regra 11 para edição
  2. Verificar quais assuntos já estão selecionados
  3. Alterar "TIPO DE CONTROLE" para "Por Tempo no localizador"
  4. Configurar tempo: 0-1 dias
  5. Adicionar filtros: Juízo, Competência
  6. Garantir que assuntos LOAS/BPC estão selecionados
  7. ATIVAR regra
  8. Salvar

Tempo estimado: 15 minutos
Prioridade: 🟡 ALTA - Provavelmente já tem assuntos
```

---

### 🟡 REGRA 12 - TRIA-04: Benefício por Incapacidade

```yaml
Status Atual: INATIVA (não verificada)
Ação: VERIFICAR + CONFIGURAR

Configuração:
  Nome: Triagem Incapacidade
  Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
  Localizador INCLUIR: 2.3 Benefício Incapacidade (verificar se existe)

  TIPO DE CONTROLE: Por Tempo no localizador
  Tempo: Entre 0 e 1 dias

  Filtros Obrigatórios:
    ✅ Juízo: 2ª TR - 3º Juiz Relator (RJ)
    ✅ Competência: JEF Previdenciária

  Assuntos a Selecionar:
    ☐ Auxílio-Doença Previdenciário
    ☐ Aposentadoria por Invalidez
    ☐ Incapacidade (se houver código genérico)

  OPCIONAL - Se quiser filtrar mais:
    Resultado Laudo Pericial:
      - Laudo Pericial Incapaz (qualquer tipo)

  Classificador: (vazio) ← NÃO PRECISA!

Passos:
  1. Abrir Regra 12 para edição
  2. Verificar se localizador "2.3 Benefício Incapacidade" existe
  3. Alterar "TIPO DE CONTROLE" para "Por Tempo no localizador"
  4. Configurar tempo: 0-1 dias
  5. Adicionar filtros: Juízo, Competência
  6. Selecionar assuntos de incapacidade
  7. ATIVAR regra
  8. Salvar

Tempo estimado: 15 minutos
Prioridade: 🟡 ALTA
```

---

### 🔴 REGRA 10 - TRIA-05: Pensão por Morte

```yaml
Status Atual: VAZIA (0 assuntos, sem localizadores)
Ação: RECONSTRUIR COMPLETA

Configuração:
  Nome: Triagem Pensão
  Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
  Localizador INCLUIR: 2.3 Pensão (RGPS) (verificar nome exato)
  Comportamento: Remover do localizador informado

  TIPO DE CONTROLE: Por Tempo no localizador
  Tempo: Entre 0 e 1 dias

  Filtros Obrigatórios:
    ✅ Juízo: 2ª TR - 3º Juiz Relator (RJ)
    ✅ Competência: JEF Previdenciária

  Assuntos a Selecionar:
    ☐ Pensão por Morte (Art. 74/9) ← Buscar código exato
    ☐ Pensão por Morte (RGPS)
    ☐ Pensão por Morte de Servidor (se aplicável)
    ☐ Pensão Especial (se houver)

  Classificador: (vazio) ← NÃO PRECISA!

Passos:
  1. Verificar se localizador "2.3 Pensão" existe (se não, criar)
  2. Abrir Regra 10 para edição
  3. Configurar localizadores REMOVER/INCLUIR
  4. Definir "TIPO DE CONTROLE": Por Tempo no localizador
  5. Configurar tempo: 0-1 dias
  6. Adicionar filtros: Juízo, Competência
  7. Buscar e selecionar assuntos de Pensão no dropdown (2169 opções)
  8. ATIVAR regra
  9. Salvar

Tempo estimado: 20 minutos
Prioridade: 🔴 MÉDIA - Mais trabalhosa
```

---

### 🔴 REGRA 13 - SUSP-01: Tema 1.102/STF (Revisão Vida Toda)

```yaml
Status Atual: INATIVA (não verificada)
Ação: ⚠️ VERIFICAR STATUS STF PRIMEIRO!

⚠️ ANTES DE IMPLEMENTAR:
  Consultar site do STF: Tema 1.102 ainda está suspenso?
  - SE SIM → Implementar regra
  - SE NÃO (julgado) → NÃO implementar, excluir regra

Configuração (SE tema ainda suspenso):
  Nome: Suspensão Tema 1.102/STF
  Localizador REMOVER: Qualquer localizador 2.3 (ou específico)
  Localizador INCLUIR: 2.3 tema 1.102/STF - Suspensos
  Comportamento: Remover de TODOS localizadores OU do informado

  TIPO DE CONTROLE: Por Tempo no localizador
  Tempo: Entre 0 e 1 dias

  FILTROS ALTERNATIVOS (escolher uma abordagem):

  Opção A - Por Assunto:
    ✅ Juízo: 2ª TR - 3º Juiz Relator (RJ)
    ✅ Competência: JEF Previdenciária
    ✅ Assuntos:
        ☐ RMI - Renda Mensal Inicial
        ☐ Revisão (de benefício)

  Opção B - Por Precedente Qualificado:
    ✅ Precedente qualificado: Tema 1.102/STF (buscar na lista)

  Classificador: (vazio) ← NÃO PRECISA!

⚠️ ATENÇÃO: Regras de SUSPENSÃO têm PRIORIDADE 1
Devem ser configuradas com número de ordem MENOR que as triagens!

Passos:
  1. ⚠️ VERIFICAR STATUS TEMA 1.102/STF no site do STF
  2. SE tema julgado: PARAR e NÃO implementar
  3. SE tema suspenso:
     a. Abrir Regra 13 para edição
     b. Configurar localizadores
     c. Definir "TIPO DE CONTROLE": Por Tempo no localizador
     d. Configurar tempo: 0-1 dias
     e. ESCOLHER abordagem (Assunto OU Precedente Qualificado)
     f. ATIVAR regra
     g. Garantir que ordem de execução é ANTES das triagens
     h. Salvar

Tempo estimado: 20 minutos (+ tempo de verificação STF)
Prioridade: 🔴 CRÍTICA - Verificar status primeiro!
```

---

## 🎯 Plano de Implementação - Ordem Recomendada

### Fase 1: Preparação (10 min)
- [ ] Verificar status Tema 1.102/STF no site do STF
- [ ] Listar códigos de assunto necessários
- [ ] Verificar se todos os localizadores de destino existem

### Fase 2: Regras Mais Fáceis (30-40 min)
Ordem sugerida (do mais fácil para o mais difícil):

1. **Regra 14 (Ap. Especial)** - 10 min
   - Já tem 40 assuntos configurados
   - Apenas ajustar tipo de controle e filtros

2. **Regra 11 (LOAS)** - 15 min
   - Localizadores já configurados
   - Provavelmente tem assuntos
   - Apenas ajustar e ativar

3. **Regra 12 (Incapacidade)** - 15 min
   - Verificar estado atual
   - Configurar se necessário

### Fase 3: Regras Mais Complexas (40 min)

4. **Regra 13 (Tema 1.102)** - 20 min (SE tema suspenso)
   - Verificar status STF primeiro
   - Configurar com prioridade máxima
   - Garantir ordem de execução correta

5. **Regra 10 (Pensão)** - 20 min
   - Reconstruir do zero
   - Buscar assuntos
   - Configurar completa

### Fase 4: Validação (30 min)
- [ ] Verificar ordem de execução das regras
- [ ] Garantir que Regra 13 (SUSP) executa PRIMEIRO
- [ ] Testar com 1-2 processos
- [ ] Monitorar movimentações

**TEMPO TOTAL ESTIMADO: 1,5 a 2 horas**

---

## 📝 Checklist de Implementação por Regra

### Para CADA Regra:
- [ ] Abrir regra para edição
- [ ] Verificar/configurar localizadores
- [ ] Alterar TIPO DE CONTROLE para "Por Tempo no localizador"
- [ ] Configurar tempo: 0-1 dias
- [ ] Adicionar filtro: Juízo = 2ª TR - 3º Juiz Relator
- [ ] Adicionar filtro: Competência = JEF Previdenciária
- [ ] (Opcional) Adicionar filtro: Rito = JEF
- [ ] Selecionar assuntos específicos
- [ ] **NÃO** selecionar classificador (deixar vazio)
- [ ] Marcar checkbox "Ativa"
- [ ] Salvar
- [ ] Testar com processo real

---

## 🎓 Códigos de Assunto - Como Buscar

O dropdown de Assunto tem 2.169 opções. Para facilitar:

### Método 1: Buscar no Dropdown
1. Abrir campo "Assunto"
2. Usar busca do navegador (Ctrl+F)
3. Procurar por palavra-chave (ex: "pensão")
4. Marcar checkbox dos assuntos relevantes

### Método 2: Usar JavaScript no Console
```javascript
// Buscar assuntos que contenham palavra-chave
const assuntos = Array.from(document.querySelectorAll('#selAssuntoMultiplo option'));
const resultados = assuntos.filter(opt =>
  opt.text.toLowerCase().includes('pensão')
);
resultados.forEach(r => console.log(r.value, r.text));
```

### Palavras-chave por tipo:
- **Pensão**: "pensão", "morte"
- **LOAS**: "loas", "bpc", "deficiente", "assistencial"
- **Incapacidade**: "auxílio-doença", "invalidez", "incapacidade"
- **Ap. Especial**: "aposentadoria especial", "tempo especial"
- **RMI**: "rmi", "renda mensal", "revisão"

---

## ✅ Vantagens da Nova Abordagem

| Aspecto | Benefício |
|---------|-----------|
| **Simplicidade** | Sem necessidade de criar classificadores de IA |
| **Performance** | Executa 1 vez por processo vs. todos os dias |
| **Manutenção** | Zero manutenção após configuração |
| **Precisão** | 100% (filtro exato) vs. ~95% (IA) |
| **Velocidade** | Filtro de banco é instantâneo |
| **Confiabilidade** | Não depende de documentos exemplo |
| **Tempo de Implementação** | 1,5-2h vs. 3-4h (com classificadores) |

---

## 🚫 O que NÃO fazer

- ❌ NÃO criar classificadores de IA nesta fase
- ❌ NÃO usar "Por Data - Todos os dias"
- ❌ NÃO deixar filtros de Juízo/Competência vazios
- ❌ NÃO ativar Regra 13 (SUSP) se tema foi julgado
- ❌ NÃO esquecer de verificar ordem de execução

---

## 📊 Monitoramento Pós-Implementação

### Primeira Semana:
- Verificar diariamente se processos novos estão sendo movidos
- Confirmar que apenas processos do 3º Juiz estão sendo pegos
- Ajustar assuntos se necessário (adicionar/remover)

### Indicadores de Sucesso:
- ✅ Processos movem automaticamente ao entrar no localizador
- ✅ Nenhum processo duplicado (movido mais de 1 vez)
- ✅ Apenas processos previdenciários sendo triados
- ✅ Apenas processos do nosso juízo

---

## 🎯 Resumo Executivo

**Mudança Fundamental:**
- De: Classificadores de IA + execução diária
- Para: **Filtros diretos + execução única na entrada**

**Impacto:**
- ✅ Mais simples
- ✅ Mais rápido
- ✅ Mais confiável
- ✅ Sem manutenção

**Próximo Passo:**
Fazer login no Eproc e começar pela **Regra 14** (a mais fácil)!

---

**Documento criado em:** 28/12/2024
**Pronto para implementação!** 🚀
