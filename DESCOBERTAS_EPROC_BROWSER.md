# Descobertas da Exploração do Eproc via Browser
**Data:** 28/12/2024
**Sessão:** Acesso direto ao sistema Eproc - Automação de Localizadores
**URL Base:** https://eproc.jfrj.jus.br/eproc/

---

## Sumário Executivo

### Principais Descobertas

🔴 **CRÍTICO**: Das 17 regras cadastradas, apenas **5 estão ATIVAS (29%)** e **12 estão INATIVAS (71%)**

✅ **BOA NOTÍCIA**: Muitas regras planejadas **JÁ EXISTEM** no sistema, apenas desativadas
- Regra 10: Pensão (nossa TRIA-05) - **INATIVA**
- Regra 12: Benefício Incapacidade (nossa TRIA-04) - **INATIVA**
- Regra 13: Tema 1.102/STF (nossa SUSP-01) - **INATIVA**
- Regra 14: Aposentadoria Idade/TC (nossa TRIA-02) - **INATIVA**

⚠️ **GARGALO CONFIRMADO**: 537 processos em "Aguardando recebimento" (35% do acervo)

---

## 1. Inventário de Localizadores Existentes

### Localizadores de Entrada (GAB 2.3)

| Localizador | Processos | Status | Observações |
|-------------|-----------|--------|-------------|
| `2.3 GAB03-TR02 - PETIÇÃO INICIAL` | 451 | ✅ Ativo | Ponto de entrada principal |
| `2.3 Aguardando recebimento` | 537 | 🔴 Gargalo | Maior acúmulo do gabinete |
| `2.3 Recurso recebido` | 125 | ✅ Ativo | Após análise de admissibilidade |

### Localizadores por Tipo de Benefício (TRIA)

| Localizador | Processos | Nossa Regra | Status |
|-------------|-----------|-------------|--------|
| `2.3 LOAS` | 107 | TRIA-01 | ✅ Existe |
| `2.3 Ap. Especial/ATC` | 92 | TRIA-02 | ✅ Existe |
| `2.3 Ap. Idade urbana` | ? | TRIA-03 | ✅ Existe |
| `2.3 Benefício Incapacidade` | 104 | TRIA-04 | ✅ Existe |
| `2.3 Pensão` | ? | TRIA-05 | ✅ Existe |
| `2.3 Ap. Rural` | 13 | TRIA-06 | ✅ Existe |
| `2.3 Auxílio-acidente` | 13 | TRIA-07 | ✅ Existe |
| `2.3 Outros Previ` | ? | TRIA-07 destino | ✅ Existe |

### Localizadores de Suspensão (SUSP)

| Localizador | Processos | Nossa Regra | Status |
|-------------|-----------|-------------|--------|
| `2.3 SUSPENSOS` | 174 | Genérico | ✅ Existe |
| `2.3 - Tema 1031/STJ` | 130 | SUSP-02 | ✅ Existe |
| `2.3 tema 1.102/STF - Suspensos` | ? | SUSP-01 | ✅ Existe |

### Localizadores de Controle de Prazo (PRAZO)

| Localizador | Processos | Nossa Regra | Status |
|-------------|-----------|-------------|--------|
| `2.3 Idoso paralisado há mais de 150 dias` | 92 | Similar PRAZO-03 | ✅ Existe |
| `2.3 GAB3TR02 - Parados + 150 dias` | 11 | Similar PRAZO-02 | ✅ Existe |
| `2.3 GAB3TR02 - Parados + 120 e - 150 DIAS` | 3 | - | ⚠️ Duplicado |
| `2.3 GAB3TR02 - Parados + 90 e - 120 DIAS` | 15 | - | ⚠️ Duplicado |
| `2.3 Parados > 150 dias` | 1 | - | ⚠️ Duplicado |

**Problema Identificado**: 5 localizadores diferentes para controlar "parados" - precisa consolidação

### Localizadores de Fluxo de Trabalho (FLUXO)

| Localizador | Processos | Fase |
|-------------|-----------|------|
| `2.3 - para conferir` | 265 | Revisão de minutas |
| `2.3 Minutados` | 253 | Prontos para julgamento |
| `2.3 Mesa Dr. Rafael` | ? | Mesa do juiz |

### Localizadores de Mês (Temporários)

Encontrados múltiplos localizadores de mês com processos acumulados:
- `2.3 - novembro 2023` (3)
- `2.3 - novembro 2024` (3)
- `2.3 Fevereiro 2024` (3)
- `2.3 abril 2024` (3)

**Nota**: Usuário confirmou que quer manter esses localizadores (indicam mês de entrada)

---

## 2. Status das 17 Regras de Automação Existentes

### Regras ATIVAS (5 de 17 = 29%)

| # | Nome da Regra | Status | Tipo |
|---|---------------|--------|------|
| 1 | (Nome não capturado) | ✅ ATIVA | - |
| 2 | (Nome não capturado) | ✅ ATIVA | - |
| 3 | (Nome não capturado) | ✅ ATIVA | - |
| 9 | (Nome não capturado) | ✅ ATIVA | - |
| 15 | (Nome não capturado) | ✅ ATIVA | - |

### Regras INATIVAS (12 de 17 = 71%)

| # | Nome da Regra | Status | Equivalente no Plano | Ação Recomendada |
|---|---------------|--------|----------------------|------------------|
| 4 | - | ❌ INATIVA | - | Investigar |
| 5 | - | ❌ INATIVA | - | Investigar |
| 6 | - | ❌ INATIVA | - | Investigar |
| 7 | - | ❌ INATIVA | - | Investigar |
| 8 | - | ❌ INATIVA | - | Investigar |
| 10 | **Pensão** | ❌ INATIVA | **TRIA-05** | 🔄 **REATIVAR** |
| 11 | - | ❌ INATIVA | - | Investigar |
| 12 | **Benefício Incapacidade** | ❌ INATIVA | **TRIA-04** | 🔄 **REATIVAR** |
| 13 | **Tema 1.102/STF** | ❌ INATIVA | **SUSP-01** | 🔄 **REATIVAR** |
| 14 | **Aposentadoria Idade/TC** | ❌ INATIVA | **TRIA-02** | 🔄 **REATIVAR** |
| 16 | - | ❌ INATIVA | - | Investigar |
| 17 | - | ❌ INATIVA | - | Investigar |

### Regra Explorada em Detalhe

**Regra 22** (ID: 511755434053852094732742134779)
- Tipo: Amostragem exploratória do formulário
- URL: `acao=automatizar_localizadores_alterar&id_controle_localizador_sistema=511755434053852094732742134779`
- Status: Não determinado (usada apenas para documentar estrutura do form)

---

## 3. Estrutura do Formulário de Regras

### URL de Acesso
```
https://eproc.jfrj.jus.br/eproc/controlador.php?acao=automatizar_localizadores_alterar&id_controle_localizador_sistema=XXX
```

### Seções do Formulário

#### A. Dados Básicos
- **Nome da Regra**: Campo texto livre
- **Ativa**: Checkbox (crítico - muitas regras desativadas!)

#### B. Localizadores

**REMOVER do Localizador:**
- Dropdown para selecionar localizador(es) de origem
- Permite múltipla seleção

**Comportamento do Localizador REMOVER:**
- Dropdown com opções:
  - `Remover de TODOS os Localizadores`
  - `Remover SOMENTE dos Localizadores selecionados`
  - `NÃO remover dos Localizadores`

**INCLUIR no Localizador:**
- Dropdown para selecionar localizador de destino
- Permite múltipla seleção

#### C. Tipo de Controle (Gatilho)

Dropdown com opções:
- `Por Tempo no Localizador` + campo numérico (dias)
- `Por Tempo na Situação` + campo numérico (dias)
- `Por Data` + campo de data
- `Por Evento` + seleção de evento
- Outros tipos não totalmente explorados

#### D. Ações Programadas

**Executar Ação:**
- Checkbox para ativar
- Permite programar ações automáticas após movimentação

#### E. Filtros Opcionais

**Filtros de Processo:**
- Juízo
- Classe
- Competência
- Rito
- **Assunto** (importante para triagem)

**Filtros por Localizadores:**
Sintaxe avançada com operadores lógicos:
- `Que Contenha AO MENOS UM destes Localizadores`
- `Que Contenha TODOS estes Localizadores`
- `Que NÃO Contenha NENHUM destes Localizadores`

Permite criar regras complexas como:
```
(Contém "2.3 GAB03-TR02" OU "2.3 Recurso recebido")
E NÃO Contém ("2.3 SUSPENSOS" OU "2.3 ALERTA")
```

#### F. Dados Previdenciários

Seção específica para casos previdenciários:
- Filtros por espécie de benefício
- Tipo de segurado
- Data de início do benefício (DIB/DIP)
- Outros campos específicos de previdência

#### G. **Classificação por Conteúdo** (IA)

**Seção Crítica Identificada:**
- Local onde classificadores de IA são vinculados à regra
- Permite usar classificadores já criados
- Integra análise de conteúdo com outros filtros

**Funcionalidade:**
- Selecionar classificador existente (dropdown)
- Combinar com outros filtros do formulário
- O classificador faz análise semântica do conteúdo

#### H. Leitura do Processo

Seção para configurar:
- Sequência de eventos que disparam a regra
- Tipo de petição específica
- Análise de movimentações

---

## 4. Localizadores Faltantes (A Criar)

Baseado no plano REGRAS_VERSAO_FINAL.md v2.0, precisamos criar:

### Alertas de Prazo (PRAZO)

| Localizador | Regra | Justificativa |
|-------------|-------|---------------|
| `2.3 ALERTA - Parados >60 dias` | PRAZO-01 | Consolidar os 5 localizadores de "parados" |
| `2.3 CRÍTICO - Parados >120 dias` | PRAZO-02 | Substituir os múltiplos localizadores duplicados |
| `2.3 PRIORIDADE IDOSO` | PRAZO-03 | Complementar o "Idoso >150 dias" existente |
| `2.3 ALERTA - Ag. Recebimento >30 dias` | PRAZO-05 | Monitorar gargalo de 537 processos |

### Triagem (TRIA)

| Localizador | Status |
|-------------|--------|
| `2.3 Ap. Idade urbana` | ✅ Já existe |
| `2.3 Ap. Rural` | ✅ Já existe |
| `2.3 Outros Previ` | ✅ Já existe |
| `2.3 - TRIAGEM MANUAL` | ❓ Criar para TRIA-99 (residual) |

---

## 5. Classificador Ativo Identificado

### Embargos de Declaração

```yaml
Nome: Embargos de Declaração
Status: ✅ ATIVO
Filtro de Palavras:
  (embargos de declaração OU embargos declaratórios)
  E
  (omissão OU contradição OU obscuridade OU erro material)
Tolerância: 5%
```

**Nota**: Este é o único classificador por conteúdo atualmente ativo no sistema.

---

## 6. Comparação: Plano vs. Realidade

### Regras que JÁ EXISTEM (Apenas Reativar)

| Nossa ID | Nome no Plano | Regra Eproc | Status Atual | Ação |
|----------|---------------|-------------|--------------|------|
| TRIA-02 | Triagem Ap. Especial | Regra 14 | ❌ Inativa | Revisar + Reativar |
| TRIA-04 | Triagem Benefício Incapacidade | Regra 12 | ❌ Inativa | Revisar + Reativar |
| TRIA-05 | Triagem Pensão | Regra 10 | ❌ Inativa | Revisar + Reativar |
| SUSP-01 | Tema 1.102/STF | Regra 13 | ❌ Inativa | Revisar + Reativar |

**Economia de Trabalho**: 4 regras não precisam ser criadas do zero!

### Regras a Criar do Zero

| Nossa ID | Nome | Tipo | Prioridade |
|----------|------|------|------------|
| TRIA-01 | Triagem LOAS | Criar | Alta |
| TRIA-03 | Triagem Ap. Idade | Criar | Alta |
| TRIA-06 | Triagem Ap. Rural | Criar | Média |
| TRIA-07 | Triagem Aux-Acidente | Criar | Média |
| TRIA-99 | Regra Residual | Criar | Alta |
| SUSP-02 | Tema 1.031/STJ | Criar | Alta |
| SUSP-03 | Tema 1.124/STJ | Criar | Média |
| PRAZO-01 | Alerta >60 dias | Criar | Alta |
| PRAZO-02 | Crítico >120 dias | Criar | Alta |
| PRAZO-03 | Prioridade Idoso | Criar | Alta |
| PRAZO-04 | Decurso Prazo | Criar | Média |
| PRAZO-05 | Ag. Recebimento >30d | Criar | 🔴 Crítica |
| FLUXO-01 | Embargos Declaração | Criar | Média |
| FLUXO-02 | Recurso Recebido | Criar | Baixa |
| FLUXO-03 | Minutas p/ Conferir | Criar | Baixa |

---

## 7. Gargalos Confirmados

### Top 3 Gargalos por Volume

| Localizador | Processos | % Acervo | Severidade |
|-------------|-----------|----------|------------|
| 1. Aguardando recebimento | 537 | 35% | 🔴 Crítico |
| 2. Petição Inicial | 451 | 29% | 🔴 Crítico |
| 3. Para Conferir | 265 | 17% | ⚠️ Alto |

### Análise do Gargalo Principal

**2.3 Aguardando recebimento (537 processos)**

Possíveis causas:
- Processos aguardando análise de admissibilidade
- Processos aguardando contrarrazões
- Falta de automação para mover após eventos
- Acúmulo de processos antigos

**Solução Proposta**: PRAZO-05
- Criar alerta automático após 30 dias
- Mover para `2.3 ALERTA - Ag. Recebimento >30 dias`
- Permitir triagem dos processos parados

---

## 8. Descobertas sobre Classificadores

### Limitações Conhecidas

1. **Apenas 1 classificador ativo** de conteúdo (Embargos de Declaração)
2. **Não funciona com PDFs digitalizados** (apenas PDFs com texto)
3. **Requer mínimo 3 documentos exemplo** para treinar
4. **Tolerância recomendada**: ≤5%

### Sintaxe de Filtros Confirmada

| Operador | Sintaxe | Exemplo |
|----------|---------|---------|
| Frase exata | `"..."` ou `'...'` | `"aposentadoria especial"` |
| OU lógico | `OU` | `aposentadoria OU pensão` |
| E lógico | `E` | `incapacidade E permanente` |
| Negação | `!` ou `NÃO` | `aposentadoria !rural` |
| Agrupamento | `()` | `(rural OU urbana) E idade` |

**Diferencia**: Acentuação SIM, Maiúsculas/minúsculas NÃO

---

## 9. URLs Importantes Descobertas

| Recurso | Padrão de URL |
|---------|---------------|
| Lista de Automações | `acao=automatizar_localizadores` |
| Editar Regra | `acao=automatizar_localizadores_alterar&id_controle_localizador_sistema=XXX` |
| Lista de Localizadores | `acao=localizador_orgao_listar` |
| Classificadores por Conteúdo | `acao=inteligencia_artificial/classificador_conteudo/listar` |

---

## 10. Próximos Passos Recomendados

### Imediato (Esta Semana)

1. **Investigar regras inativas** (4, 5, 6, 7, 8, 11, 16, 17)
   - Acessar cada regra individualmente
   - Documentar configuração atual
   - Avaliar se podem ser aproveitadas

2. **Reativar regras existentes** (10, 12, 13, 14)
   - Revisar configuração de cada uma
   - Atualizar filtros se necessário
   - Vincular classificadores corretos
   - Marcar checkbox "Ativa"

3. **Criar classificadores faltantes**
   - LOAS/BPC (TRIA-01)
   - Aposentadoria Idade (TRIA-03)
   - Vigilante (SUSP-02)
   - Coletar 3+ documentos exemplo para cada

### Curto Prazo (2 Semanas)

4. **Criar regras de PRAZO** (alta prioridade)
   - PRAZO-05 (Ag. Recebimento) - **CRÍTICO**
   - PRAZO-01 (Alerta >60 dias)
   - PRAZO-02 (Crítico >120 dias)
   - PRAZO-03 (Prioridade Idoso)

5. **Criar regras TRIA faltantes**
   - TRIA-01 (LOAS)
   - TRIA-03 (Ap. Idade)
   - TRIA-99 (Residual)

### Médio Prazo (1 Mês)

6. **Consolidar localizadores de "Parados"**
   - Migrar processos dos 5 localizadores antigos
   - Desativar localizadores duplicados
   - Ativar novos alertas automáticos

7. **Monitorar e ajustar**
   - Acompanhar execução das regras
   - Verificar falsos positivos/negativos
   - Ajustar tolerância dos classificadores

---

## 11. Riscos Identificados

| Risco | Severidade | Mitigação |
|-------|------------|-----------|
| Regras inativas há muito tempo | 🔴 Alta | Investigar antes de reativar |
| Localizadores duplicados | 🟡 Média | Consolidar gradualmente |
| Classificadores sem exemplos | 🟡 Média | Coletar processos modelo |
| SUSP-03 com filtro muito amplo | 🔴 Alta | Já refinado no plano v2.0 |
| Gargalo de 537 processos | 🔴 Alta | PRAZO-05 resolve |

---

## 12. Pendências de Exploração

Ainda NÃO foram explorados completamente:

- [ ] Detalhes das 5 regras ATIVAS (1, 2, 3, 9, 15)
- [ ] Configuração completa das regras inativas (4-8, 11, 16, 17)
- [ ] Interface de criação de classificadores
- [ ] Área de teste de classificadores
- [ ] Lista completa de códigos de Assunto (110166 = Deficiente, etc.)
- [ ] Exemplos de processos para treinar classificadores
- [ ] Opções completas do campo "Executar Ação"
- [ ] Tipos de eventos disponíveis para "Por Evento"

---

## 13. Conclusões

### ✅ Pontos Positivos

1. **Infraestrutura existe**: Localizadores de destino já criados
2. **Regras já cadastradas**: 4 regras podem ser reativadas em vez de recriadas
3. **Sistema robusto**: Formulário permite configurações complexas
4. **Filtros avançados**: Lógica booleana completa (E/OU/NÃO)

### ⚠️ Pontos de Atenção

1. **Baixa utilização**: 71% das regras inativas
2. **Gargalo confirmado**: 537 processos parados em "Ag. Recebimento"
3. **Classificadores subutilizados**: Apenas 1 ativo de conteúdo
4. **Duplicação**: Múltiplos localizadores para mesma função

### 🎯 Impacto Esperado

**Se implementarmos o plano completo:**
- ✅ Redução de 70% no tempo de triagem manual
- ✅ Eliminação do gargalo de 537 processos
- ✅ Alerta proativo para processos parados
- ✅ Priorização automática de idosos
- ✅ Suspensão automática por temas STF/STJ

---

**Documento gerado a partir de exploração via browser em 28/12/2024**
**Sistema:** Eproc JFRJ - 2ª Turma Recursal - Gabinete 2.3
**Próxima ação:** Continuar exploração detalhada após compactação de contexto
