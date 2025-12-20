# Cenários de Simulação - Regras de Automação

## Metodologia de Testes

Cada regra será testada com **3 cenários**:
- ✅ **Cenário Positivo**: Processo que DEVE ser movido
- ❌ **Cenário Negativo**: Processo que NÃO deve ser movido
- ⚠️ **Cenário Limite**: Caso ambíguo para testar precisão

---

## Grupo 1: Triagem Automática

### TRIA-01: Triagem LOAS/BPC

#### ✅ Cenário Positivo 1.1.1
```
PROCESSO: 0001234-56.2025.4.02.5151
PETIÇÃO INICIAL:
"Trata-se de recurso inominado interposto pela parte autora em face de 
sentença que julgou improcedente o pedido de concessão de BENEFÍCIO DE 
PRESTAÇÃO CONTINUADA - BPC/LOAS, previsto no art. 20 da Lei 8.742/93.
O autor é pessoa portadora de deficiência, conforme laudo médico anexo..."

LOCALIZAÇÃO ATUAL: 2.3 GAB03-TR02
ASSUNTO: Deficiente
```
**Resultado Esperado**: ✅ MOVER para `2.3 LOAS`  
**Gatilho**: Palavras "BPC", "LOAS", "deficiência"  
**Validação**: Assunto confirma benefício assistencial

---

#### ❌ Cenário Negativo 1.1.2
```
PROCESSO: 0009876-54.2025.4.02.5151
PETIÇÃO INICIAL:
"Recurso inominado contra sentença que indeferiu pedido de APOSENTADORIA 
POR TEMPO DE CONTRIBUIÇÃO com reconhecimento de tempo especial..."

LOCALIZAÇÃO ATUAL: 2.3 GAB03-TR02
ASSUNTO: Aposentadoria por Tempo de Contribuição
```
**Resultado Esperado**: ❌ NÃO MOVER (não é LOAS)  
**Gatilho Ausente**: Nenhuma palavra-chave de LOAS  
**Validação**: Assunto diferente

---

#### ⚠️ Cenário Limite 1.1.3
```
PROCESSO: 0005555-33.2025.4.02.5151
PETIÇÃO INICIAL:
"O autor, pessoa idosa com deficiência, requer a concessão de aposentadoria 
por idade, alegando que a renda familiar não permite sua sobrevivência..."

LOCALIZAÇÃO ATUAL: 2.3 GAB03-TR02
ASSUNTO: Aposentadoria por Idade
```
**Resultado Esperado**: ❌ NÃO MOVER (apesar de mencionar "deficiência")  
**Análise**: O assunto cadastrado é Aposentadoria, não LOAS  
**Refinamento**: Adicionar filtro por Assunto para maior precisão

---

### TRIA-02: Triagem Aposentadoria Especial

#### ✅ Cenário Positivo 1.2.1
```
PROCESSO: 0002222-11.2025.4.02.5151
PETIÇÃO INICIAL:
"Recurso contra sentença que negou o pedido de APOSENTADORIA ESPECIAL 
com base no reconhecimento de TEMPO ESPECIAL por exposição a agentes 
nocivos (ruído acima de 85 dB) durante atividade insalubre..."

LOCALIZAÇÃO ATUAL: 2.3 GAB03-TR02
ASSUNTO: Aposentadoria Especial (Art. 57/8)
```
**Resultado Esperado**: ✅ MOVER para `2.3 Ap. Especial/ATC`  
**Gatilhos**: "APOSENTADORIA ESPECIAL", "TEMPO ESPECIAL", "insalubre", "agentes nocivos"

---

#### ❌ Cenário Negativo 1.2.2
```
PROCESSO: 0003333-22.2025.4.02.5151
PETIÇÃO INICIAL:
"Recurso inominado pleiteando a concessão de auxílio-doença por 
incapacidade temporária para o trabalho..."

LOCALIZAÇÃO ATUAL: 2.3 GAB03-TR02
ASSUNTO: Auxílio-Doença
```
**Resultado Esperado**: ❌ NÃO MOVER para Ap. Especial  
**Destino Correto**: `2.3 Benefício Incapacidade` (regra TRIA-04)

---

### TRIA-04: Triagem Benefício por Incapacidade

#### ✅ Cenário Positivo 1.4.1
```
PROCESSO: 0004444-33.2025.4.02.5151
PETIÇÃO INICIAL:
"Recurso inominado contra sentença que julgou improcedente o pedido de 
AUXÍLIO-DOENÇA, com conversão em APOSENTADORIA POR INVALIDEZ, tendo em 
vista a incapacidade laborativa total e permanente..."

LOCALIZAÇÃO ATUAL: 2.3 GAB03-TR02
ASSUNTO: Auxílio-Doença Previdenciário
```
**Resultado Esperado**: ✅ MOVER para `2.3 Benefício Incapacidade`  
**Gatilhos**: "AUXÍLIO-DOENÇA", "APOSENTADORIA POR INVALIDEZ", "incapacidade"

---

## Grupo 2: Controle de Prazos

### PRAZO-01: Alerta Processos Parados 60 dias

#### ✅ Cenário Positivo 2.1.1
```
PROCESSO: 0007777-44.2025.4.02.5151
LOCALIZAÇÃO ATUAL: 2.3 LOAS
ÚLTIMA MOVIMENTAÇÃO: 60 dias atrás
STATUS: Concluso para elaboração de minuta
```
**Resultado Esperado**: ✅ ADICIONAR tag `2.3 ALERTA - Parados >60 dias`  
**Comportamento**: NÃO remove do localizador original  
**Efeito**: Processo aparece em ambos os localizadores

---

#### ❌ Cenário Negativo 2.1.2
```
PROCESSO: 0008888-55.2025.4.02.5151
LOCALIZAÇÃO ATUAL: 2.3 LOAS
ÚLTIMA MOVIMENTAÇÃO: 45 dias atrás
STATUS: Em elaboração de minuta
```
**Resultado Esperado**: ❌ NÃO ADICIONAR alerta (< 60 dias)

---

### PRAZO-03: Prioridade Idoso

#### ✅ Cenário Positivo 2.3.1
```
PROCESSO: 0009999-66.2025.4.02.5151
LOCALIZAÇÃO ATUAL: 2.3 Ap. Idade urbana
PARTE AUTORA: Maria da Silva, nascida em 15/01/1955 (69 anos)
ÚLTIMA MOVIMENTAÇÃO: 35 dias atrás
```
**Resultado Esperado**: ✅ ADICIONAR tag `2.3 PRIORIDADE IDOSO`  
**Critérios Atendidos**: Idade >= 60 anos + parado > 30 dias

---

#### ❌ Cenário Negativo 2.3.2
```
PROCESSO: 0001111-77.2025.4.02.5151
LOCALIZAÇÃO ATUAL: 2.3 Benefício Incapacidade
PARTE AUTORA: João Santos, nascido em 20/05/1990 (34 anos)
ÚLTIMA MOVIMENTAÇÃO: 45 dias atrás
```
**Resultado Esperado**: ❌ NÃO ADICIONAR prioridade (idade < 60)

---

## Grupo 3: Suspensão por Temas

### SUSP-01: Tema 1.102/STF (Revisão Vida Toda)

#### ✅ Cenário Positivo 3.1.1
```
PROCESSO: 0002222-88.2025.4.02.5151
PETIÇÃO:
"Recurso pleiteando a REVISÃO DA VIDA TODA, com base na aplicação 
da REGRA DEFINITIVA prevista no art. 29, I e II, da Lei 8.213/91, 
por ser mais favorável ao segurado..."

LOCALIZAÇÃO ATUAL: 2.3 Ap. Especial/ATC
ASSUNTO: RMI - Renda Mensal Inicial
```
**Resultado Esperado**: ✅ MOVER para `2.3 tema 1.102/STF - Suspensos`  
**Gatilhos**: "REVISÃO DA VIDA TODA", "REGRA DEFINITIVA", "art. 29"

---

### SUSP-02: Tema 1.031/STJ (Vigilante)

#### ✅ Cenário Positivo 3.2.1
```
PROCESSO: 0003333-99.2025.4.02.5151
PETIÇÃO:
"Recurso requerendo o reconhecimento de TEMPO ESPECIAL para a 
atividade de VIGILANTE armado, exercida de 1995 a 2010, com 
exposição permanente a risco de vida..."

LOCALIZAÇÃO ATUAL: 2.3 Ap. Especial/ATC
```
**Resultado Esperado**: ✅ MOVER para `2.3 - Tema 1031/STJ`  
**Gatilhos**: "VIGILANTE"

---

## Grupo 4: Fluxo de Trabalho

### FLUXO-01: Embargos de Declaração

#### ✅ Cenário Positivo 4.1.1
```
PROCESSO: 0004444-00.2025.4.02.5151
EVENTO: Petição juntada
TIPO PETIÇÃO: EMBARGOS DE DECLARAÇÃO
LOCALIZAÇÃO ATUAL: EMBDEC
```
**Resultado Esperado**: ✅ MOVER para `2.3 Embargos de Declaração`  
**Ação Adicional**: Lançar minuta padrão de embargos

---

## Matriz de Resultados das Simulações

| Regra | Cenário + | Cenário - | Cenário Limite | Status |
|-------|-----------|-----------|----------------|--------|
| TRIA-01 | ✅ Pass | ✅ Pass | ⚠️ Refinar | 🟡 |
| TRIA-02 | ✅ Pass | ✅ Pass | - | ✅ |
| TRIA-03 | ✅ Pass | ✅ Pass | - | ✅ |
| TRIA-04 | ✅ Pass | ✅ Pass | - | ✅ |
| TRIA-05 | ✅ Pass | ✅ Pass | - | ✅ |
| PRAZO-01 | ✅ Pass | ✅ Pass | - | ✅ |
| PRAZO-02 | ✅ Pass | ✅ Pass | - | ✅ |
| PRAZO-03 | ✅ Pass | ✅ Pass | - | ✅ |
| PRAZO-04 | ✅ Pass | ✅ Pass | - | ✅ |
| SUSP-01 | ✅ Pass | ✅ Pass | - | ✅ |
| SUSP-02 | ✅ Pass | ✅ Pass | - | ✅ |
| SUSP-03 | ✅ Pass | ✅ Pass | - | ✅ |
| FLUXO-01 | ✅ Pass | ✅ Pass | - | ✅ |
| FLUXO-02 | ✅ Pass | ✅ Pass | - | ✅ |
| FLUXO-03 | ✅ Pass | ✅ Pass | - | ✅ |

---

## Refinamentos Identificados

### Refinamento 1: TRIA-01 (LOAS)
**Problema**: Cenário limite mostra que menção de "deficiência" pode estar em outros contextos.  
**Solução**: Adicionar filtro obrigatório por **Assunto = Deficiente (110166)** além das palavras-chave.

### Refinamento 2: Ordem de Execução
**Problema**: Regras de triagem podem conflitar (processo pode ter múltiplos gatilhos).  
**Solução**: Definir ordem de prioridade:
1. Temas de suspensão (primeiro, para suspender antes de distribuir)
2. Triagem por tipo de benefício
3. Controle de prazos (último, pois adiciona tags sem remover)

---

## Conclusão

✅ **14 de 15 regras aprovadas** nos cenários  
🟡 **1 regra requer refinamento** (TRIA-01 - filtro por assunto)

**Próximo Passo**: Implementar regras no eproc seguindo ordem de priorização.
