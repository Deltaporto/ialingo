# Inventário de Classificadores por Conteúdo (IA) - Eproc

**Sistema:** Eproc JFRJ - 2ª Turma Recursal
**Data da Exploração:** 28/12/2024
**URL de Acesso:** `https://eproc.jfrj.jus.br/eproc/controlador.php?acao=inteligencia_artificial/classificador_conteudo/listar`

---

## Status Resumido

| Métrica | Valor |
|---------|-------|
| **Classificadores Cadastrados** | ⚠️ A confirmar (mínimo 1) |
| **Classificadores Ativos** | 1 |
| **Classificadores Inativos** | ⚠️ A confirmar |
| **Vinculados a Regras** | 1 (Embargos de Declaração) |

---

## 1. Classificadores Identificados

### 1.1. Embargos de Declaração

**Status:** ✅ ATIVO
**Vinculado a Regra:** Sim (regra não identificada)
**Uso:** Detectar embargos de declaração automaticamente

#### Configuração

```yaml
Nome: Embargos de Declaração
Status: ATIVO

Filtro de Palavras-Chave:
  (embargos de declaração OU embargos declaratórios)
  E
  (omissão OU contradição OU obscuridade OU erro material)

Tolerância: 5%

Documentos Exemplo: ⚠️ Quantidade não confirmada (mínimo 3)
```

#### Análise do Filtro

**Lógica:** Identifica documentos que mencionam "embargos" E pelo menos um dos vícios (omissão, contradição, obscuridade ou erro material)

**Efetividade Esperada:** Alta - filtro bem específico e com baixa tolerância

**Risco de Falsos Positivos:** Baixo - termos técnicos bem definidos

**Risco de Falsos Negativos:** Médio - embargos que usem terminologia diferente podem não ser detectados

---

## 2. Classificadores Necessários (A Criar)

Baseado no plano de automação REGRAS_VERSAO_FINAL.md v2.0, os seguintes classificadores precisam ser criados:

### 2.1. LOAS/BPC (TRIA-01)

**Status:** ❌ NÃO EXISTE
**Prioridade:** 🔴 ALTA
**Uso:** Triagem automática de processos de LOAS

#### Proposta de Configuração

```yaml
Nome: LOAS/BPC - Benefício Assistencial

Filtro de Palavras-Chave:
  (LOAS OU BPC OU "benefício de prestação continuada" OU "benefício assistencial")
  E
  (deficiente OU idoso OU incapacidade OU "art. 20")
  E NÃO
  (aposentadoria OU pensão)

Tolerância: 5%

Documentos Exemplo Necessários:
  - Mínimo 3 petições iniciais de LOAS
  - Incluir casos de idoso e deficiente
  - Incluir menções à Lei 8.742/93
```

**Localizador Destino:** `2.3 LOAS` (já existe)

**Assunto Complementar:** 110166 (Benefício Assistencial (Art. 20 da LOAS))

---

### 2.2. Aposentadoria Especial (TRIA-02)

**Status:** ⚠️ PODE JÁ EXISTIR (Regra 14 inativa)
**Prioridade:** 🔴 ALTA
**Uso:** Triagem de aposentadorias especiais e conversão de tempo

#### Proposta de Configuração

```yaml
Nome: Aposentadoria Especial/Conversão Tempo

Filtro de Palavras-Chave:
  ("aposentadoria especial" OU "tempo especial" OU "atividade especial")
  OU
  ("conversão de tempo" OU "conversão do tempo")
  OU
  (insalubre OU perigoso OU penoso OU "agente nocivo")

Tolerância: 5%

Documentos Exemplo Necessários:
  - Casos de vigilante
  - Casos de eletricidade
  - Casos de conversão de tempo especial
```

**Localizador Destino:** `2.3 Ap. Especial/ATC` (já existe)

**Assuntos Complementares:**
- 110129 (Aposentadoria Especial)
- 110137 (Tempo de Serviço Especial)

---

### 2.3. Aposentadoria por Idade (TRIA-03)

**Status:** ⚠️ PODE JÁ EXISTIR (Regra 14 inativa - Ap. Idade/TC)
**Prioridade:** 🔴 ALTA
**Uso:** Triagem de aposentadorias por idade urbana

#### Proposta de Configuração

```yaml
Nome: Aposentadoria por Idade Urbana

Filtro de Palavras-Chave:
  ("aposentadoria por idade" OU "aposentadoria programada")
  E
  (urbana OU urbano)
  E NÃO
  (rural OU especial OU invalidez OU tempo)

Tolerância: 5%

Documentos Exemplo Necessários:
  - Petições de aposentadoria por idade urbana
  - Incluir menções aos requisitos de idade e carência
```

**Localizador Destino:** `2.3 Ap. Idade urbana` (já existe)

**Assunto:** 110127 (Aposentadoria por Idade)

---

### 2.4. Benefício por Incapacidade (TRIA-04)

**Status:** ⚠️ PODE JÁ EXISTIR (Regra 12 inativa)
**Prioridade:** 🔴 ALTA
**Uso:** Triagem de auxílio-doença e aposentadoria por invalidez

#### Proposta de Configuração

```yaml
Nome: Benefício por Incapacidade

Filtro de Palavras-Chave:
  (incapacidade OU incapaz OU invalidez)
  E
  ("auxílio-doença" OU "auxílio doença" OU "aposentadoria por invalidez")
  E NÃO
  (especial OU idade OU tempo)

Tolerância: 5%

Documentos Exemplo Necessários:
  - Casos de auxílio-doença
  - Casos de aposentadoria por invalidez
  - Incluir perícias médicas
```

**Localizador Destino:** `2.3 Benefício Incapacidade` (já existe)

**Assuntos:**
- 110128 (Aposentadoria por Invalidez)
- 110130 (Auxílio-Doença Previdenciário)

---

### 2.5. Pensão por Morte (TRIA-05)

**Status:** ⚠️ PODE JÁ EXISTIR (Regra 10 inativa)
**Prioridade:** 🟡 MÉDIA
**Uso:** Triagem de pensões por morte

#### Proposta de Configuração

```yaml
Nome: Pensão por Morte

Filtro de Palavras-Chave:
  ("pensão por morte" OU "pensão morte")
  OU
  (dependente E (falecimento OU óbito))

Tolerância: 5%

Documentos Exemplo Necessários:
  - Petições de pensão por morte
  - Incluir documentos de dependentes
```

**Localizador Destino:** `2.3 Pensão` (já existe)

**Assunto:** 110136 (Pensão por Morte)

---

### 2.6. Aposentadoria Rural (TRIA-06)

**Status:** ❌ NÃO EXISTE
**Prioridade:** 🟡 MÉDIA
**Uso:** Triagem de aposentadorias rurais

#### Proposta de Configuração

```yaml
Nome: Aposentadoria Rural

Filtro de Palavras-Chave:
  (rural OU rurícola OU "segurado especial")
  E
  (aposentadoria OU idade)
  E
  ("regime de economia familiar" OU "produtor rural" OU "trabalhador rural")

Tolerância: 5%

Documentos Exemplo Necessários:
  - Casos de trabalhador rural por idade
  - Incluir provas de atividade rural
```

**Localizador Destino:** `2.3 Ap. Rural` (já existe)

**Assunto:** 110127 (Aposentadoria por Idade - rural)

---

### 2.7. Auxílio-Acidente (TRIA-07)

**Status:** ❌ NÃO EXISTE
**Prioridade:** 🟡 MÉDIA
**Uso:** Triagem de auxílio-acidente

#### Proposta de Configuração

```yaml
Nome: Auxílio-Acidente

Filtro de Palavras-Chave:
  ("auxílio-acidente" OU "auxílio acidente")
  E
  (sequela OU "redução da capacidade" OU "acidente de trabalho" OU "doença ocupacional")

Tolerância: 5%

Documentos Exemplo Necessários:
  - Casos de auxílio-acidente
  - Incluir laudos periciais
```

**Localizador Destino:** `2.3 Auxílio-acidente` (já existe)

**Assunto:** 110133 (Auxílio-Acidente)

---

### 2.8. Tema 1.102/STF - Revisão da Vida Toda (SUSP-01)

**Status:** ⚠️ PODE JÁ EXISTIR (Regra 13 inativa)
**Prioridade:** 🔴 ALTA
**Uso:** Suspensão automática por repercussão geral

#### Proposta de Configuração

```yaml
Nome: Tema 1.102/STF - Revisão Vida Toda

Filtro de Palavras-Chave:
  ("revisão da vida toda" OU "revisão vida toda")
  OU
  ("regra definitiva" OU "regra de transição" E "art. 29")
  OU
  ("RE 1.276.977" OU "tema 1.102" OU "tema 1102")

Tolerância: 5%

Documentos Exemplo Necessários:
  - Petições mencionando revisão da vida toda
  - Incluir menções ao art. 29 da Lei 8.213/91
```

**Localizador Destino:** `2.3 tema 1.102/STF - Suspensos` (já existe)

**Assunto:** Revisão de Benefício

---

### 2.9. Tema 1.031/STJ - Vigilante (SUSP-02)

**Status:** ❌ NÃO EXISTE
**Prioridade:** 🔴 ALTA
**Uso:** Suspensão automática de processos de vigilante

#### Proposta de Configuração

```yaml
Nome: Tema 1.031/STJ - Vigilante

Filtro de Palavras-Chave:
  (vigilante OU "segurança patrimonial" OU "vigilância patrimonial")
  E
  ("tempo especial" OU "atividade especial" OU "aposentadoria especial")
  E
  (periculosidade OU perigoso OU arma)

Tolerância: 5%

Documentos Exemplo Necessários:
  - Casos de vigilante armado
  - Incluir menções à periculosidade
  - CTPS com função de vigilante
```

**Localizador Destino:** `2.3 - Tema 1031/STJ` (já existe)

**Assunto:** 110137 (Tempo de Serviço Especial)

**⚠️ OBSERVAÇÃO CRÍTICA:** Este filtro foi refinado após análise da SUSP-03 (tema 1.124) para evitar captura excessiva de processos. O filtro anterior era muito amplo.

---

### 2.10. Tema 1.124/STJ - Eletricidade (SUSP-03)

**Status:** ❌ NÃO EXISTE
**Prioridade:** 🟡 MÉDIA
**Uso:** Suspensão de processos de eletricidade

#### Proposta de Configuração

```yaml
Nome: Tema 1.124/STJ - Eletricidade

Filtro de Palavras-Chave:
  (eletricidade OU elétrica OU eletricista)
  E
  ("tempo especial" OU "atividade especial" OU "aposentadoria especial")
  E
  (tensão OU voltagem OU "alta tensão" OU "250 volts")

Tolerância: 5%

Documentos Exemplo Necessários:
  - Casos de eletricista
  - Incluir menções ao nível de tensão
  - PPP/LTCAT com exposição elétrica
```

**Localizador Destino:** `2.3 - Tema 1124/STJ` (a criar ou usar `2.3 SUSPENSOS`)

**Assunto:** 110137 (Tempo de Serviço Especial)

---

## 3. Interface de Criação de Classificadores

### 3.1. Acesso

**URL:** `controlador.php?acao=inteligencia_artificial/classificador_conteudo/listar`

**Caminho no Menu:** ⚠️ Não localizado durante exploração (pendente)

### 3.2. Campos Disponíveis

⚠️ **PENDENTE DE EXPLORAÇÃO**

Com base nos manuais e no classificador existente, espera-se:

```yaml
Campos do Formulário:
  - Nome do Classificador: [Campo texto]
  - Status: [Checkbox "Ativo"]
  - Filtro de Palavras-Chave: [Campo texto - sintaxe booleana]
  - Tolerância: [Campo numérico - % de similaridade]
  - Documentos Exemplo: [Upload ou seleção de documentos]
  - Área de Teste: [Testar com documento antes de salvar]
```

### 3.3. Como Adicionar Documentos Exemplo

⚠️ **PENDENTE DE EXPLORAÇÃO**

**Requisitos Conhecidos:**
- Mínimo: 3 documentos
- Formato: PDF com texto (não digitalizados/imagens)
- Tipo: Petições, decisões, ou documentos processuais

**Processo Esperado:**
1. Selecionar processos exemplo do sistema
2. Escolher documentos específicos dentro do processo
3. Associar ao classificador
4. Sistema treina modelo com base nos exemplos

### 3.4. Como Testar o Classificador

⚠️ **PENDENTE DE EXPLORAÇÃO**

**Funcionalidade Esperada:**
- Área de teste dentro do formulário
- Upload de documento teste
- Resultado mostra % de similaridade
- Permite ajustar tolerância antes de ativar

---

## 4. Vinculação com Regras de Automação

### 4.1. Como Vincular na Regra

No formulário de edição de regra (`acao=automatizar_localizadores_alterar`):

**Seção:** Classificação por Conteúdo (seção G do formulário)

**Campos:**
- Dropdown para selecionar classificador existente
- Combinar com outros filtros da regra (Assunto, Classe, Localizadores, etc.)

**Exemplo de Combinação:**

```yaml
Regra: TRIA-01 - Triagem LOAS

Filtros Combinados:
  Localizador REMOVER: "PETIÇÃO INICIAL TR"
  Localizador INCLUIR: "2.3 LOAS"

  Assunto: 110166 (Benefício Assistencial)

  Classificador por Conteúdo: "LOAS/BPC - Benefício Assistencial"
    Filtro: (LOAS OU BPC) E (deficiente OU idoso)
    Tolerância: 5%
```

**Lógica:** A regra só será aplicada se o processo atender TODOS os critérios:
- Está no localizador "PETIÇÃO INICIAL TR"
- Tem assunto = 110166
- O classificador identifica conteúdo relacionado a LOAS

---

## 5. Limitações Conhecidas

### 5.1. Técnicas

| Limitação | Impacto | Solução |
|-----------|---------|---------|
| **Não funciona com PDFs digitalizados** | Alto - muitos processos antigos | Usar filtros de palavras mais robustos |
| **Requer mínimo 3 documentos exemplo** | Médio - dificulta criação rápida | Coletar exemplos antes de criar |
| **Tolerância ≤5% recomendada** | Baixo - filtro mais restritivo | Monitorar falsos negativos |
| **Diferencia acentuação** | Médio - "saude" ≠ "saúde" | Incluir variações no filtro |

### 5.2. Operacionais

| Limitação | Impacto | Solução |
|-----------|---------|---------|
| **Apenas 1 classificador ativo** | Alto - subutilização | Criar e ativar novos classificadores |
| **Interface não localizada no menu** | Médio - dificulta acesso | Usar URL direta ou buscar no menu |
| **Sem área de teste visível** | Alto - dificulta validação | Investigar interface completa |

---

## 6. Sintaxe de Filtros de Palavras-Chave

### 6.1. Operadores Lógicos

| Operador | Sintaxe | Exemplo | Resultado |
|----------|---------|---------|-----------|
| **Frase exata** | `"..."` ou `'...'` | `"aposentadoria especial"` | Apenas frase completa |
| **OU lógico** | `OU` | `aposentadoria OU pensão` | Qualquer um dos termos |
| **E lógico** | `E` | `incapacidade E permanente` | Ambos os termos |
| **Negação** | `!` ou `NÃO` | `aposentadoria !rural` | Primeiro mas não segundo |
| **Agrupamento** | `()` | `(rural OU urbana) E idade` | Controla precedência |

### 6.2. Sensibilidade

| Característica | Comportamento |
|----------------|---------------|
| **Maiúsculas/Minúsculas** | ❌ NÃO diferencia |
| **Acentuação** | ✅ SIM diferencia |
| **Plurais** | ⚠️ Requer especificação manual |

**Exemplo:**
- `aposentadoria` = `APOSENTADORIA` = `Aposentadoria` ✅
- `aposentadoria` ≠ `aposentadorias` ❌
- `saúde` ≠ `saude` ❌

**Solução:** Usar OU para variações
```
(aposentadoria OU aposentadorias) E (saúde OU saude)
```

### 6.3. Boas Práticas

1. **Use frases exatas para termos técnicos**
   ```
   "aposentadoria especial" (melhor que) aposentadoria especial
   ```

2. **Combine termos genéricos com específicos**
   ```
   ("tempo especial" OU "atividade especial") E (vigilante OU eletricista)
   ```

3. **Exclua termos ambíguos**
   ```
   LOAS E NÃO (aposentadoria OU pensão)
   ```

4. **Agrupe condições complexas**
   ```
   (LOAS OU BPC OU "benefício assistencial") E (deficiente OU idoso OU "art. 20")
   ```

---

## 7. Priorização de Criação

### 7.1. Prioridade CRÍTICA (Criar Primeiro)

| Classificador | Regra | Motivo |
|---------------|-------|--------|
| **Vigilante (SUSP-02)** | Suspensão | 130 processos afetados (Tema 1.031/STJ) |
| **LOAS/BPC (TRIA-01)** | Triagem | 107 processos + alto volume de entrada |

### 7.2. Prioridade ALTA (Criar em Seguida)

| Classificador | Regra | Motivo |
|---------------|-------|--------|
| **Ap. Especial (TRIA-02)** | Triagem | 92 processos + regra 14 inativa para reativar |
| **Ap. Idade (TRIA-03)** | Triagem | Alto volume esperado |
| **Benefício Incapacidade (TRIA-04)** | Triagem | 104 processos + regra 12 inativa |
| **Tema 1.102/STF (SUSP-01)** | Suspensão | Regra 13 inativa - só reativar |

### 7.3. Prioridade MÉDIA (Criar Depois)

| Classificador | Regra | Motivo |
|---------------|-------|--------|
| **Pensão (TRIA-05)** | Triagem | Regra 10 inativa - volume médio |
| **Ap. Rural (TRIA-06)** | Triagem | 13 processos - volume baixo |
| **Auxílio-Acidente (TRIA-07)** | Triagem | 13 processos - volume baixo |
| **Tema 1.124/STJ (SUSP-03)** | Suspensão | Depende de julgamento futuro |

---

## 8. Checklist de Criação de Classificador

Antes de criar cada classificador, seguir este roteiro:

### 8.1. Preparação

- [ ] Coletar mínimo 3 processos exemplo
- [ ] Verificar se PDFs contêm texto (não são digitalizados)
- [ ] Anotar termos-chave dos documentos
- [ ] Identificar variações de grafia e sinônimos
- [ ] Definir localizador de destino

### 8.2. Criação do Filtro

- [ ] Escrever filtro de palavras-chave
- [ ] Incluir operadores lógicos (E/OU/NÃO)
- [ ] Adicionar frases exatas quando necessário
- [ ] Incluir termos de exclusão para evitar falsos positivos
- [ ] Testar sintaxe do filtro

### 8.3. Configuração no Sistema

- [ ] Acessar interface de classificadores
- [ ] Preencher nome descritivo
- [ ] Inserir filtro de palavras
- [ ] Definir tolerância (iniciar com 5%)
- [ ] Adicionar documentos exemplo
- [ ] Marcar como INATIVO inicialmente

### 8.4. Teste

- [ ] Usar área de teste (se disponível)
- [ ] Testar com documentos positivos (deve identificar)
- [ ] Testar com documentos negativos (não deve identificar)
- [ ] Ajustar filtro se necessário
- [ ] Ajustar tolerância se necessário

### 8.5. Ativação

- [ ] Marcar como ATIVO
- [ ] Vincular à regra de automação correspondente
- [ ] Salvar regra
- [ ] Monitorar primeiros resultados
- [ ] Ajustar se detectar falsos positivos/negativos

---

## 9. Monitoramento e Ajustes

### 9.1. Indicadores a Acompanhar

| Indicador | Meta | Ação se Fora da Meta |
|-----------|------|----------------------|
| **Taxa de Acerto** | ≥95% | Ajustar filtro de palavras |
| **Falsos Positivos** | ≤5% | Adicionar termos de exclusão |
| **Falsos Negativos** | ≤5% | Expandir filtro com sinônimos |
| **Processos Não Classificados** | ≤10% | Criar classificador residual |

### 9.2. Ajustes Comuns

**Se muitos falsos positivos:**
1. Adicionar termos de exclusão (NÃO)
2. Tornar filtro mais específico
3. Reduzir tolerância (5% → 3%)

**Se muitos falsos negativos:**
1. Adicionar sinônimos ao filtro
2. Usar termos mais genéricos
3. Aumentar tolerância (5% → 7%)

**Se não classificar nada:**
1. Verificar se PDFs têm texto extraível
2. Simplificar filtro (remover restrições)
3. Verificar acentuação nos termos

---

## 10. Pendências de Exploração

Ainda é necessário explorar via acesso ao sistema:

### 10.1. Interface Completa

- [ ] Screenshots da tela de lista de classificadores
- [ ] Screenshots do formulário de criação
- [ ] Identificar todos os campos disponíveis
- [ ] Documentar fluxo completo de criação

### 10.2. Classificadores Existentes

- [ ] Confirmar se existem outros classificadores inativos
- [ ] Documentar configuração completa de cada um
- [ ] Identificar quais estão vinculados a regras
- [ ] Avaliar se podem ser reutilizados

### 10.3. Área de Teste

- [ ] Localizar área de teste de classificadores
- [ ] Documentar como funciona
- [ ] Testar upload de documento
- [ ] Capturar exemplo de resultado de teste

### 10.4. Documentos Exemplo

- [ ] Como selecionar processos exemplo
- [ ] Como escolher documentos dentro do processo
- [ ] Limite máximo de documentos
- [ ] Como remover/substituir exemplos

---

## 11. Próximos Passos

### Imediato (Hoje)

1. ✅ Documentar classificador existente (Embargos de Declaração)
2. ✅ Listar classificadores necessários
3. ⚠️ Acessar interface de classificadores via browser
4. ⚠️ Capturar screenshots da interface
5. ⚠️ Confirmar classificadores inativos existentes

### Curto Prazo (Esta Semana)

6. [ ] Criar classificador VIGILANTE (SUSP-02) - CRÍTICO
   - Coletar 3+ processos de vigilante
   - Configurar filtro refinado
   - Testar antes de ativar

7. [ ] Criar classificador LOAS (TRIA-01) - CRÍTICO
   - Coletar exemplos de deficiente e idoso
   - Configurar filtro abrangente
   - Vincular à regra de triagem

8. [ ] Verificar classificadores das regras inativas
   - Regra 10 (Pensão)
   - Regra 12 (Benefício Incapacidade)
   - Regra 13 (Tema 1.102/STF)
   - Regra 14 (Ap. Idade/TC)

### Médio Prazo (2 Semanas)

9. [ ] Criar demais classificadores de TRIAGEM
   - TRIA-02: Ap. Especial (se não existir na regra 14)
   - TRIA-03: Ap. Idade (se não existir na regra 14)
   - TRIA-04: Benefício Incapacidade (se não existir na regra 12)
   - TRIA-05: Pensão (se não existir na regra 10)
   - TRIA-06: Ap. Rural
   - TRIA-07: Auxílio-Acidente

10. [ ] Criar classificadores de SUSPENSÃO
    - SUSP-01: Tema 1.102/STF (se não existir na regra 13)
    - SUSP-03: Tema 1.124/STJ

11. [ ] Monitorar e ajustar classificadores ativos
    - Coletar métricas de acerto
    - Identificar falsos positivos/negativos
    - Ajustar filtros conforme necessário

---

## 12. Referências

### Documentação Relacionada

- [GUIA_AUTOMACAO_EPROC.md](GUIA_AUTOMACAO_EPROC.md) - Guia geral de automação
- [DESCOBERTAS_EPROC_BROWSER.md](DESCOBERTAS_EPROC_BROWSER.md) - Exploração detalhada do sistema
- [REGRAS_VERSAO_FINAL.md](REGRAS_VERSAO_FINAL.md) - Plano completo de regras v2.0
- [ESTRUTURA_FORMULARIO_REGRA.md](ESTRUTURA_FORMULARIO_REGRA.md) - Detalhes do formulário

### Manuais do Sistema

- Manual de Classificadores por Conteúdo (`Manuais/txt/`)
- Manual de Automatização de Localizadores (`Manuais/`)
- Lista de Assuntos Previdenciários (`ASSUNTOS_PREVIDENCIARIO_ASSISTENCIAL.md`)

### URLs Úteis

| Recurso | URL |
|---------|-----|
| Lista de Classificadores | `acao=inteligencia_artificial/classificador_conteudo/listar` |
| Lista de Automações | `acao=automatizar_localizadores` |
| Editar Regra | `acao=automatizar_localizadores_alterar&id=XXX` |

---

**Documento gerado em:** 28/12/2024
**Status:** ⚠️ Parcial - Pendente exploração completa da interface
**Próxima atualização:** Após acesso via browser aos classificadores
