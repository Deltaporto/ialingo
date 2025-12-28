# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository manages automation rules for the Eproc system (Brazilian federal court case management system) for the 2ª Turma Recursal (2nd Appellate Panel). The project helps automate case workflow routing using AI-powered content classifiers and rule-based automation.

**Primary Goal**: Automate the triaging and routing of legal cases (processos) to appropriate locators (localizadores) based on case content, case type, timing rules, and legal themes.

## Key Concepts

### Localizadores (Locators)
Tags that identify the stage or status of a legal case. The 2ª TR has **513 locators** organized by:
- **Cabinet** (Gabinete): 2.1, 2.2, 2.3 (3 judges)
- **Benefit Type**: Retirement, LOAS/BPC, Pension, Disability, etc.
- **Suspension Themes**: STF/STJ/TNU legal themes
- **Workflow Stages**: Drafts, Deadlines, Review queues

### Classificadores por Conteúdo (Content Classifiers)
AI-powered classifiers that analyze document content using:
- **Keyword filters** (with boolean operators: E/AND, OU/OR, NÃO/NOT)
- **Example documents** (minimum 3 required)
- **Similarity tolerance** (recommended ≤5%)
- **Limitation**: Only works with text-based PDFs, not scanned images

### Automation Rules
Rules that move cases between locators based on:
- **Content classification** (AI analysis)
- **Case metadata** (subject, class, jurisdiction)
- **Time-based triggers** (days in locator, deadline expiration)
- **Events** (petitions filed, deadlines closed)

## Repository Structure

### Documentation Files
- `GUIA_AUTOMACAO_EPROC.md` - Comprehensive automation guide with quick access URLs, system status, and templates
- `REGRAS_VERSAO_FINAL.md` - **Production-ready** automation rules (v1.0) with execution order
- `ESTRUTURA_FORMULARIO_REGRA.md` - Complete Eproc form field reference
- `REGRAS_EXISTENTES.md` - Current system state (17 rules, only 1 active)
- `SIMULACOES_REGRAS.md` - Test scenarios and validation results
- `ANALISE_GESTAO_GAB3.md` - Performance metrics for Cabinet 3

### Scripts
- `scripts/simulacao_regras.py` - **Rule simulation engine** for testing rules before deployment
- `scripts/converter_manuais.py` - Manual conversion utilities

### Reference Data
- `Manuais/LocalizadoresOrgao-2025-12-17-17-46-6.csv` - Complete list of 513 locators
- `Manuais/ASSUNTOS_PREVIDENCIARIO_ASSISTENCIAL.md` - Social security case subjects taxonomy
- `Manuais/*.pdf` - Official Eproc automation manuals

## Rule Categories (REGRAS_VERSAO_FINAL.md)

Rules MUST be implemented in this execution order to avoid conflicts:

1. **SUSP-\*** (Suspension Rules) - Priority 1
   - Suspend cases for legal themes (STF/STJ) BEFORE routing
   - Example: SUSP-01 (Tema 1.102/STF - Revisão Vida Toda)

2. **TRIA-\*** (Triage Rules) - Priority 2
   - Route new cases by benefit type
   - Example: TRIA-01 (LOAS/BPC), TRIA-02 (Special Retirement)

3. **FLUXO-\*** (Workflow Rules) - Priority 3
   - Move cases based on workflow events
   - Example: FLUXO-01 (Embargos de Declaração)

4. **PRAZO-\*** (Deadline Rules) - Priority 4
   - Add alert tags without removing from origin
   - Example: PRAZO-01 (Alert >60 days), PRAZO-03 (Senior Priority)

## Testing Rules

### Using the Simulation Engine

Run simulations BEFORE implementing rules in production:

```bash
cd scripts
python simulacao_regras.py
```

This generates `resultados_simulacao.txt` with test results for all 15 production rules.

### Test Scenarios

Each rule should be validated with 3 scenarios:
- ✅ **Positive**: Process that SHOULD be moved
- ❌ **Negative**: Process that should NOT be moved
- ⚠️ **Edge Case**: Ambiguous case to test precision

See `SIMULACOES_REGRAS.md` for detailed test cases.

## Eproc URL Patterns

Access Eproc automation features using these action parameters:

| Feature | URL Parameter |
|---------|---------------|
| List Automation Rules | `acao=automatizar_localizadores` |
| Edit Rule | `acao=automatizar_localizadores_alterar&id_controle_localizador_sistema=XXX` |
| Content Classifiers | `acao=inteligencia_artificial/classificador_conteudo/listar` |

## Filter Syntax (Classificadores)

When creating keyword filters for classifiers:

| Operator | Function | Example |
|----------|----------|---------|
| `"..."` or `'...'` | Exact phrase | `"aposentadoria especial"` |
| `OU` | One or more words | `aposentadoria OU pensão` |
| `E` | All words required | `incapacidade E permanente` |
| `!` or `NÃO` | Exclude word | `aposentadoria !rural` |
| `()` | Group conditions | `(rural OU urbana) E idade` |

**Note**: System respects accents but ignores case.

## Important Constraints

### Rule Behavior Types

**REMOVER (Remove) Behaviors:**
- `Remover do(s) localizador(es) informado(s)` - Default (remove from origin only)
- `Remover de TODOS os localizadores` - Remove all locators
- `NÃO remover nenhum (apenas acrescentar)` - Add tag without removing (for alerts)

### Automation Controls

**TIPO DE CONTROLE (Trigger Types):**
- `Por Data ou Periodicamente` - Most common, runs daily
- `Por Tempo no localizador` - Based on days in current locator
- `Por Evento` - Triggered by specific events
- `Por Tipo de Petição` - Triggered by petition type

## Current System Status (Dec 2025)

| Resource | Count |
|----------|-------|
| Automation Rules | 17 (only 1 active) |
| Active Classifiers | 1 (Embargos de Declaração) |
| Available Locators | 513 |

**Critical**: Most automation infrastructure exists but is INACTIVE. The 15 rules in `REGRAS_VERSAO_FINAL.md` are ready for production deployment.

## Common Workflows

### Creating a New Automation Rule

1. Identify need and target cases
2. Create content classifier (if needed)
   - Add 3+ example documents
   - Define keyword filters
   - Test in Eproc test area
3. Create automation rule
   - Set origin/destination locators
   - Link classifier (if used)
   - Set trigger type and filters
   - Choose removal behavior
4. Test with simulation engine
5. Implement in Eproc following priority order

### Modifying Existing Rules

1. Read current rule definition from `REGRAS_VERSAO_FINAL.md`
2. Update simulation in `scripts/simulacao_regras.py`
3. Run tests and validate results
4. Update documentation files
5. Apply changes in Eproc system

## Performance Metrics

Target improvements (from `ANALISE_GESTAO_GAB3.md`):

| Metric | Before | Target (30 days) |
|--------|--------|------------------|
| Average triage time | ~2h/day | <30min/day |
| Cases in "Initial Petition" | 467 | <50 |
| Unclassified cases | 40%+ | <10% |
| Stuck case alerts | Manual | Automatic |

## Git Workflow

This repository uses standard git practices:
- Main branch: `master`
- Recent commits focus on automation documentation and rule refinement
- Files marked as deleted (e.g., `PLANO_CONSOLIDADO_AUTOMACAO.md`) have been consolidated into other documents

## Important Notes

- **Always simulate before deploying**: Use `simulacao_regras.py` to validate logic
- **Respect execution order**: Suspension → Triage → Workflow → Deadlines
- **Test edge cases**: Cases may match multiple classifiers; filters prevent conflicts
- **Monitor tolerance**: Classifier tolerance >5% may cause false positives
- **PDF limitation**: Classifiers only work with text PDFs, not scanned images
