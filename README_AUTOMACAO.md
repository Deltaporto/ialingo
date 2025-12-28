# Automação Eproc - 2ª Turma Recursal do RJ

**Gabinete:** 3º Juiz Relator
**Sistema:** Eproc JFRJ
**Última Atualização:** 28/12/2024

---

## 📋 Índice Geral

Este repositório contém toda a documentação para automação de triagem de processos no Eproc.

### 🚀 Começar Aqui

- **[GUIA_IMPLEMENTACAO.md](GUIA_IMPLEMENTACAO.md)** ← **COMECE AQUI!**
  Guia prático passo a passo para implementar as 5 regras inativas

### 📚 Documentação de Referência

- **[referencia/CODIGOS_ASSUNTO.md](referencia/CODIGOS_ASSUNTO.md)**
  Códigos completos de assuntos organizados por tipo de benefício (2.169 opções)

- **[referencia/CAMPOS_FORMULARIO.md](referencia/CAMPOS_FORMULARIO.md)**
  Todos os campos e filtros disponíveis no formulário de regras (80+ campos)

- **[referencia/REGRAS_ESPECIFICACAO.md](referencia/REGRAS_ESPECIFICACAO.md)**
  Especificação completa de todas as regras planejadas

### 📁 Histórico

- **[historico/](historico/)** - Documentos de exploração e análises anteriores

---

## 🎯 Resumo Executivo

### Situação Atual

- **22 regras cadastradas** no sistema (10 ativas, 12 inativas)
- **5 regras de triagem inativas** precisam ser reativadas:
  - Regra 14: Aposentadoria Especial (TRIA-02)
  - Regra 11: LOAS/BPC (TRIA-01)
  - Regra 12: Benefício por Incapacidade (TRIA-04)
  - Regra 10: Pensão por Morte (TRIA-05)
  - Regra 13: Tema 1.102/STF - Revisão Vida Toda (SUSP-01)

### Abordagem de Implementação

**✅ Abordagem Aprovada (Filtros Diretos):**
- Tipo de Controle: **"Por Tempo no Localizador" (0-1 dias)**
- Filtros principais: **Assunto + Juízo + Competência**
- **SEM Classificadores de IA** nesta fase
- Executa **apenas 1 vez** quando processo entra no localizador

**❌ Abordagem Antiga (Descartada):**
- Tipo de Controle: "Por Data - Todos os dias"
- Dependência de Classificadores de IA
- Executa todos os dias para todos os processos
- Requer manutenção de documentos exemplo

### Vantagens da Nova Abordagem

| Aspecto | Benefício |
|---------|-----------|
| **Simplicidade** | Sem necessidade de criar classificadores de IA |
| **Performance** | Executa 1 vez por processo vs. todos os dias |
| **Manutenção** | Zero manutenção após configuração |
| **Precisão** | 100% (filtro exato) vs. ~95% (IA) |
| **Velocidade** | Filtro de banco é instantâneo |
| **Tempo** | 1,5-2h de implementação vs. 3-4h com IA |

---

## 🔧 Configuração Base das Regras

Todas as regras de triagem seguem este template:

```yaml
TIPO DE CONTROLE: Por Tempo no localizador
Tempo: Entre 0 e 1 dias

Filtros Obrigatórios:
  ✅ Juízo: 2ª Turma Recursal - 3º Juiz Relator (RJ)
  ✅ Competência: JEF Previdenciária
  ✅ Rito: JUIZADO ESPECIAL FEDERAL

Filtro Específico:
  ✅ Assunto: [códigos específicos por tipo de benefício]

Classificador: (vazio) ← NÃO PRECISA!

Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Localizador INCLUIR: [destino específico por tipo]
```

---

## 📊 Status das 5 Regras Inativas

| Regra | Nome | Assuntos | Status Config | Prioridade | Tempo |
|-------|------|----------|---------------|------------|-------|
| **14** | Ap. Especial | ✅ 40 configurados | BOA | 🟢 ALTA | 10 min |
| **11** | LOAS/BPC | ⚠️ 2 códigos | PARCIAL | 🟡 ALTA | 15 min |
| **12** | Incapacidade | ⚠️ 10 códigos | PARCIAL | 🟡 ALTA | 15 min |
| **13** | Tema 1.102/STF | ⚠️ 1-3 códigos | VERIFICAR | 🔴 CRÍTICA | 20 min |
| **10** | Pensão | ❌ 0 (vazia) | VAZIA | 🔴 MÉDIA | 20 min |

**Tempo Total Estimado:** 1,5 a 2 horas

---

## 🔑 Códigos Principais por Regra

### Regra 14 - Aposentadoria Especial
- **1178** - Aposentadoria Especial (Art. 57/8) + 17 variações
- Total: 18 assuntos (já tem 40 configurados)

### Regra 11 - LOAS/BPC
- **2311** - Deficiente, Benefício Assistencial
- **2312** - Idoso, Benefício Assistencial
- Total: 2 assuntos (muito simples!)

### Regra 12 - Benefício por Incapacidade
- **1179** - Auxílio-Doença Previdenciário
- **1169** - Aposentadoria por Invalidez
- Total: 10 assuntos (com variações)

### Regra 10 - Pensão por Morte
- **1182** - Pensão por Morte (Art. 74/9)
- **2709, 2711, 2719** - Variações
- Total: 4-18 assuntos

### Regra 13 - Tema 1.102/STF
- **3118** - Revisão da Vida Toda (código específico existe!)
- Total: 1-3 assuntos

---

## 📝 Próximos Passos

1. **Ler o [GUIA_IMPLEMENTACAO.md](GUIA_IMPLEMENTACAO.md)** - Guia completo passo a passo
2. **Verificar status Tema 1.102/STF** - Consultar se ainda está suspenso
3. **Fazer login no Eproc** - Acessar painel de automação
4. **Implementar as regras** - Seguir ordem recomendada (14 → 11 → 12 → 13 → 10)
5. **Validar** - Testar com 1-2 processos e monitorar

---

## 🔗 Links Úteis

- **Eproc JFRJ:** https://eproc.jfrj.jus.br/
- **Painel de Automação:** Menu > Localizadores > Automatizar Tramitação
- **STF - Consulta Temas:** http://portal.stf.jus.br/processos/listarTemas.asp

---

## 📖 Glossário Rápido

- **Localizador:** Tag/etiqueta que identifica o estágio do processo (ex: "PETIÇÃO INICIAL")
- **Regra de Automação:** Regra que move processos entre localizadores automaticamente
- **Tipo de Controle:** Define quando a regra será executada (8 opções disponíveis)
- **Assunto:** Campo com 2.169 opções para classificação do processo
- **Juízo:** Órgão julgador (no nosso caso: 2ª TR - 3º Juiz Relator)
- **Competência:** Matéria jurídica (no nosso caso: JEF Previdenciária)

---

## ⚠️ Avisos Importantes

1. **NÃO criar Classificadores de IA** nesta fase - usar filtros diretos
2. **NÃO usar "Por Data - Todos os dias"** - usar "Por Tempo no Localizador"
3. **Verificar status STF** antes de implementar Regra 13
4. **Garantir ordem de execução** - Suspensões (Regra 13) devem executar ANTES das triagens

---

**Documento criado em:** 28/12/2024
**Status:** ✅ PRONTO PARA USO
