# Análise Detalhada - Regra 14: Aposentadoria Especial

**Data:** 28/12/2024
**Fonte:** Extração via JavaScript da página de edição
**URL:** https://eproc.jfrj.jus.br/eproc/controlador.php?acao=automatizar_localizadores_alterar&id_controle_localizador_sistema=511744300830918488353210151092

---

## Identificação

| Campo | Valor |
|-------|-------|
| **Número** | 14 |
| **Nome Oficial** | Editar Regra 14 |
| **Nossa Classificação** | **TRIA-02: Aposentadoria Especial** |
| **Status** | ❌ **INATIVA** |
| **Motivo da Inativação** | ❌ **SEM CLASSIFICADOR VINCULADO** |

---

## Configuração Atual

### Localizadores

```yaml
REMOVER do Localizador:
  - 2.3 GAB03-TR02 - 2.3 GAB3TR02 - PETIÇÃO INICIAL

Comportamento REMOVER:
  - Remover o processo do(s) localizador(es) informado(s)

INCLUIR no Localizador:
  - 2.3 Aposentadoria - APOSENTADORIA
```

### Tipo de Controle

```yaml
Tipo: Por Data ou Periodicamente
Periodicidade: Todos os dias

Descrição:
"NA DATA OU NO PERÍODO especificado, todos os processos que estiverem
no localizador 2.3 GAB03-TR02 - 2.3 GAB3TR02 - PETIÇÃO INICIAL serão
incluídos no localizador 2.3 Aposentadoria - APOSENTADORIA e removidos
do localizador 2.3 GAB03-TR02 - 2.3 GAB3TR02 - PETIÇÃO INICIAL, conforme
o que foi definido no comportamento do localizador REMOVER."
```

### Filtros Opcionais

```yaml
Executar Ação: ❌ NÃO (checkbox desmarcado)
Juízo do Processo: (nada selecionado)
Classe: (vazio)
Competência: (vazio)
Rito: (vazio)
Processo Originário: (não configurado)
Por Dado Complementar: (vazio)
Prazo: (vazio)
Última Movimentação: (vazio)
Por Situação do Processo: (vazio)
Usuário Criador de Documento: (vazio)
Precedente qualificado: (vazio)
Tipo de filtro: (nada selecionado)
Nível de Sigilo: (nada selecionado)
```

### Filtros por Localizadores

```yaml
Localizador (Que Contenha Todos): (nada selecionado)
Localizador (Que Contenha ao Menos Um): (nada selecionado)
Localizador (Que NÃO Contenha Nenhum): (nada selecionado)
```

### Outros Filtros

```yaml
Data de Autuação: (nada selecionado)
Valor da Causa: 0.00
Último Evento: (nada selecionado)
Documentos Evento/Petição: (nada selecionado)
Motivo da Devolução do eCarta: (nada selecionado)
```

### Dados Previdenciários

```yaml
Resultado do último Laudo Médico de Incapacidade: (nada selecionado)
Dado do Painel Previdenciário: Que contenha / (não configurado)
Conector dos itens da expressão: "E" (selecionado)
```

### Dados de Órgão

```yaml
Origem da Remessa ou Redistribuição: (nada selecionado)
Subseção de Origem da Regionalização: (nada selecionado)
Resultado de Ordem de Consulta/Restrição: (nada selecionado)
```

### Filtros de Partes

```yaml
Dado Complementar da Parte: (nada selecionado)
Litisconsórcio: (nada selecionado)
Representação Processual das Partes: (nada selecionado)
Tipo de Pessoa: (nada selecionado)
Dígito de Distribuição do Processo: (nenhum dígito marcado)
```

### Entidade

```yaml
Entidade: (vazio)
Tipo Parte Entidade: (não configurado)
```

### Advogado/Procurador

```yaml
Nome ou Login doAdvogado/Procurador: (vazio)
Tipo Parte Representada: (não configurado)
```

### 🤖 Classificação por Conteúdo (CRÍTICO!)

```yaml
Classificador por Conteúdo: ❌ Nenhum selecionado

Status: SEM CLASSIFICADOR VINCULADO
Motivo da Inativação: Esta regra não pode funcionar sem um classificador!
```

### Leitura do Processo

```yaml
Por Evento/Tipo de Petição (Leitura do Processo): (não configurado)
Considerar apenas os últimos eventos: (não marcado)
```

---

## 🎯 Assuntos Selecionados (40 de 2169)

### Categoria 1: Aposentadoria Especial (Principal)

| Código | Nome Completo |
|--------|---------------|
| **1178** | **Aposentadoria Especial (Art. 57/8), Benefícios em Espécie, DIREITO PREVIDENCIÁRIO** |
| 2670 | Vigilante, Aposentadoria Especial (Art. 57/8) |
| 2629 | Agente Agressivo - Eletricidade, Aposentadoria Especial (Art. 57/8) |
| 2628 | Agente Agressivo - Ruído, Aposentadoria Especial (Art. 57/8) |
| 2626 | Agente Agressivo - Químico, Aposentadoria Especial (Art. 57/8) |
| 2627 | Agente Agressivo - Poeira, Aposentadoria Especial (Art. 57/8) |
| 2625 | Agente Agressivo - Biológico, Aposentadoria Especial (Art. 57/8) |
| 2624 | Agente Cancerígeno, Aposentadoria Especial (Art. 57/8) |
| 2623 | Frentista, Aposentadoria Especial (Art. 57/8) |
| 2630 | Garimpeiro, Aposentadoria Especial (Art. 57/8) |
| 2674 | Professor, Aposentadoria Especial (Art. 57/8) |
| 2673 | Seringueiro, Aposentadoria Especial (Art. 57/8) |
| 2671 | Talidomida, Aposentadoria Especial (Art. 57/8) |
| 2672 | Hanseníase, Aposentadoria Especial (Art. 57/8) |

### Categoria 2: Conversão/Averbação de Tempo Especial

| Código | Nome |
|--------|------|
| **1305** | **Averbação/Cômputo/Conversão de tempo de serviço especial** |
| 419 | Averbação / Contagem de Tempo Especial, Servidor Público Civil |
| 2736 | Averbação/Cômputo de Auxílio Doença Não Acidentário como Tempo de Serviço |
| 2737 | Averbação/Cômputo de Tempo de Serviço com Base em Sentença Trabalhista |
| 1310 | Averbação/Cômputo de tempo de serviço de empregado doméstico |
| 1306 | Averbação/Cômputo de tempo de serviço de segurado especial |
| 1308 | Averbação/Cômputo do tempo de serviço como aluno aprendiz |

### Categoria 3: Aposentadoria por Tempo de Contribuição

| Código | Nome |
|--------|------|
| 1201 | Aposentadoria por Tempo de Contribuição (Art. 55/6) |
| 1200 | Aposentadoria por Tempo de Serviço (Art. 52/4) |
| 1296 | Regra de Transição para Aposentadoria - Pedágio |

### Categoria 4: Pessoa com Deficiência

| Código | Nome |
|--------|------|
| 2675 | Pessoa com Deficiência, Aposentadoria Especial (Art. 57/8) |
| 2676 | Por Idade, Pessoa com Deficiência, Aposentadoria Especial (Art. 57/8) |
| 2677 | Por Tempo de Contribuição, Pessoa com Deficiência |

### Categoria 5: Aposentadoria Híbrida

| Código | Nome |
|--------|------|
| 2566 | Híbrida (Art. 48/106), Aposentadoria por Idade (Art. 48/51) |

### Categoria 6: Servidor Público (Aposentadoria Especial)

| Código | Nome |
|--------|------|
| 270 | Aposentadoria, Magistratura, Agentes Políticos |
| 2223 | Aposentadoria compulsória (art. 42, V, Lei Complementar 35/1979), Magistratura |
| 277 | Aposentadoria, Ministério Público, Agentes Políticos |
| 2239 | Aposentadoria Compulsória, Ministério Público |
| 414 | Aposentadoria, Servidor Público Civil |
| 416 | Compulsória, Aposentadoria, Servidor Público Civil |
| 417 | Voluntária, Aposentadoria, Servidor Público Civil |
| 2136 | Especial, Aposentadoria, Servidor Público Civil |
| 420 | Averbação / Contagem Recíproca, Servidor Público Civil |

### Categoria 7: Outros

| Código | Nome |
|--------|------|
| 2544 | Aposentadoria Especial, VALORIZAÇÃO DO MAGISTÉRIO |
| 950 | Aposentadoria/Retorno aoTrabalho, Contribuições Previdenciárias |
| 843 | Incidência sobre Aposentadoria, IRPF/Imposto de Renda de Pessoa Física |

---

## 📊 Análise dos Assuntos

### Distribuição por Tipo

| Tipo | Quantidade | % |
|------|------------|---|
| Aposentadoria Especial (Agentes Nocivos) | 14 | 35% |
| Conversão/Averbação Tempo Especial | 7 | 17.5% |
| Servidor Público (Apos. Especial) | 9 | 22.5% |
| Tempo de Contribuição | 3 | 7.5% |
| Pessoa com Deficiência | 3 | 7.5% |
| Outros | 4 | 10% |

### Descoberta Principal

**Esta regra foca PRINCIPALMENTE em APOSENTADORIA ESPECIAL e CONVERSÃO DE TEMPO ESPECIAL!**

Assuntos cobertos:
- ✅ Aposentadoria Especial (todos os agentes nocivos)
- ✅ Vigilante
- ✅ Eletricidade
- ✅ Ruído, Químico, Poeira, Biológico
- ✅ Conversão de tempo especial
- ✅ Tempo de Contribuição
- ✅ Pessoa com Deficiência

Assuntos NÃO cobertos:
- ❌ Aposentadoria por Idade (urbana/rural)
- ❌ Aposentadoria por Invalidez
- ❌ Auxílio-Doença
- ❌ Pensão por Morte
- ❌ LOAS/BPC

---

## 🔍 Conclusões

### Identificação Correta

✅ **Regra 14 = TRIA-02: Aposentadoria Especial/Conversão Tempo**

**NÃO é:**
- Regra genérica de "Aposentadoria"
- TRIA-03 (Aposentadoria por Idade)
- Qualquer outra categoria

### Motivo da Inativação

🔴 **Classificador por Conteúdo: AUSENTE**

A regra está bem configurada em termos de:
- ✅ Localizadores corretos
- ✅ 40 assuntos selecionados (muito específicos)
- ✅ Tipo de controle definido
- ✅ Comportamento de remoção configurado

**MAS:**
- ❌ NÃO tem classificador de IA vinculado
- ❌ Sem classificador, a regra não consegue analisar o CONTEÚDO das petições
- ❌ Apenas o filtro de "Assunto" não é suficiente (muitos processos não têm assunto cadastrado ou têm assunto genérico)

### Por Que Não Funciona Apenas com Filtro de Assunto?

**Problema:**
1. Nem todos os processos têm assunto cadastrado corretamente
2. Muitos processos têm assunto genérico ("Aposentadoria")
3. Sistema depende de humanos classificarem o assunto na distribuição
4. Assuntos podem estar incorretos

**Solução:**
- Usar **Classificador por Conteúdo** (IA)
- IA lê o conteúdo da petição inicial
- Identifica palavras-chave: "tempo especial", "agente nocivo", "ruído", "vigilante", etc.
- Funciona mesmo se assunto estiver errado ou genérico

---

## 🎯 Plano de Reativação

### Etapa 1: Criar Classificador de IA

```yaml
Nome: Aposentadoria Especial/Conversão Tempo

Filtro de Palavras-Chave:
  (
    "aposentadoria especial" OU "tempo especial" OU "atividade especial"
  )
  OU
  (
    "conversão de tempo" OU "conversão do tempo"
  )
  OU
  (
    (insalubre OU perigoso OU penoso OU "agente nocivo")
    E
    (aposentadoria OU tempo OU "tempo de contribuição")
  )
  OU
  (
    vigilante OU eletricista OU frentista OU "trabalhador rural"
  )

Tolerância: 5%

Documentos Exemplo Necessários:
  - 3+ petições de aposentadoria especial
  - Incluir casos de vigilante
  - Incluir casos de eletricidade
  - Incluir casos de conversão de tempo especial
  - Incluir casos de agentes nocivos (ruído, químico, etc.)
```

### Etapa 2: Vincular Classificador à Regra

1. Acessar edição da Regra 14
2. Rolar até seção "Classificação por Conteúdo"
3. Selecionar classificador criado no dropdown
4. Salvar

### Etapa 3: Testar Antes de Ativar

```yaml
Processos de Teste:
  - 3 processos de aposentadoria especial (esperado: mover)
  - 3 processos de conversão tempo especial (esperado: mover)
  - 3 processos de aposentadoria por idade (esperado: NÃO mover)
  - 3 processos de LOAS (esperado: NÃO mover)
  - 3 processos de pensão (esperado: NÃO mover)
```

### Etapa 4: Ativar

1. Marcar checkbox "Ativa"
2. Salvar
3. Monitorar por 48 horas
4. Verificar:
   - Falsos positivos (moveu processo que não deveria)
   - Falsos negativos (não moveu processo que deveria)
5. Ajustar classificador se necessário

### Etapa 5: Criar Regras Complementares

Esta regra cobre apenas **Aposentadoria Especial**. Ainda faltam:

| Nossa ID | Nome | Status | Ação |
|----------|------|--------|------|
| TRIA-01 | LOAS | Regra 11 inativa | Verificar e reativar |
| TRIA-03 | Ap. Idade | Não existe | **CRIAR** |
| TRIA-04 | Benefício Incapacidade | Regra 12 inativa | Verificar e reativar |
| TRIA-05 | Pensão | Regra 10 inativa | Verificar e reativar |
| TRIA-06 | Ap. Rural | Não existe | **CRIAR** |
| TRIA-07 | Aux-Acidente | Não existe | **CRIAR** |

---

## ⚠️ Riscos e Cuidados

### Risco 1: Overlap com Outras Regras

**Problema:** Alguns assuntos podem overlap com outras categorias:
- "Pessoa com Deficiência" pode ser confundido com LOAS
- "Aposentadoria Híbrida" pode ser confundida com Rural

**Mitigação:**
- Ordem de execução: SUSP → TRIA (Especial deve executar ANTES de Idade/Rural)
- Filtros de exclusão no classificador
- Usar "E NÃO" para excluir termos ambíguos

### Risco 2: Classificador Muito Amplo

**Problema:** Filtro atual pode capturar também:
- Aposentadoria por Idade com conversão de tempo
- Aposentadoria Rural com tempo especial

**Mitigação:**
- Testar exaustivamente antes de ativar
- Começar com tolerância baixa (5%)
- Monitorar primeiros 50 processos movidos

### Risco 3: Assuntos de Servidor Público

**Problema:** Regra inclui aposentadorias de servidor público, mas localizador destino é "2.3 Aposentadoria"

**Mitigação:**
- Verificar se processos de servidor público devem ir para este localizador
- Considerar criar localizador separado se houver volume significativo
- Ou remover assuntos de servidor público (códigos 270, 277, 414, etc.) da regra

---

## 📝 Checklist de Implementação

### Preparação
- [ ] Coletar 3-5 processos exemplo de aposentadoria especial
- [ ] Coletar 3-5 processos exemplo de conversão de tempo
- [ ] Identificar casos de vigilante e eletricidade
- [ ] Anotar termos-chave das petições

### Criação do Classificador
- [ ] Acessar interface de classificadores
- [ ] Criar novo classificador "Aposentadoria Especial/Conversão Tempo"
- [ ] Inserir filtro de palavras (conforme proposta acima)
- [ ] Definir tolerância = 5%
- [ ] Adicionar documentos exemplo
- [ ] Marcar como INATIVO inicialmente
- [ ] Salvar

### Teste do Classificador
- [ ] Usar área de teste (se disponível)
- [ ] Testar com 5 processos positivos
- [ ] Testar com 5 processos negativos
- [ ] Verificar % de similaridade
- [ ] Ajustar filtro se necessário
- [ ] Ajustar tolerância se necessário

### Vinculação à Regra
- [ ] Acessar edição da Regra 14
- [ ] Rolar até "Classificação por Conteúdo"
- [ ] Selecionar classificador criado
- [ ] Verificar todos os outros campos estão corretos
- [ ] Salvar (ainda mantendo regra INATIVA)

### Teste da Regra
- [ ] Simular execução mentalmente com processos conhecidos
- [ ] Verificar se localizadores existem
- [ ] Confirmar comportamento de remoção correto
- [ ] Identificar possíveis conflitos com outras regras

### Ativação
- [ ] Marcar checkbox "Ativa"
- [ ] Salvar
- [ ] Aguardar execução da próxima rodada (próximo dia)
- [ ] Verificar logs de execução

### Monitoramento (48h)
- [ ] Verificar quantos processos foram movidos
- [ ] Amostrar 10 processos movidos aleatoriamente
- [ ] Confirmar que foram movidos corretamente
- [ ] Verificar se houve falsos positivos
- [ ] Verificar se processos conhecidos foram movidos (falsos negativos)
- [ ] Ajustar se necessário

### Ajustes Pós-Ativação
- [ ] Se falsos positivos >5%: tornar filtro mais específico
- [ ] Se falsos negativos >5%: tornar filtro mais abrangente
- [ ] Documentar ajustes feitos
- [ ] Re-testar após ajustes

---

## 🔗 Próximos Passos

1. **Explorar Regra 10 (Pensão)** - Verificar assuntos e classificador
2. **Explorar Regra 11 (LOAS)** - Verificar assuntos e classificador
3. **Explorar Regra 12 (Benefício Incapacidade)** - Verificar assuntos e classificador
4. **Explorar Regra 13 (Tema 1.102/STF)** - Verificar assuntos e classificador
5. **Criar documento consolidado** com análise de todas as 5 regras inativas
6. **Priorizar reativação** com base em impacto e facilidade

---

**Documento gerado em:** 28/12/2024
**Fonte:** Extração via JavaScript + Análise manual
**Status:** ✅ COMPLETO - Pronto para implementação
