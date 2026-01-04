# Análise das Regras Inativas - Eproc 2ª Turma Recursal

**Data:** 28/12/2024
**Sistema:** Eproc JFRJ - https://eproc.jfrj.jus.br/eproc/
**Status:** Análise baseada em exploração prévia + pendente acesso ao sistema

---

## Sumário Executivo

### Situação Atual
- **Total de regras cadastradas:** 17
- **Regras ATIVAS:** 5 (29%)
- **Regras INATIVAS:** 12 (71%)

### Descoberta Crítica
Das 12 regras inativas, **4 correspondem exatamente ao nosso plano de automação:**

| Regra Eproc | Nome | Nossa Regra | Tipo | Status |
|-------------|------|-------------|------|--------|
| **Regra 10** | Pensão | TRIA-05 | Triagem | INATIVA |
| **Regra 12** | Benefício Incapacidade | TRIA-04 | Triagem | INATIVA |
| **Regra 13** | Tema 1.102/STF | SUSP-01 | Suspensão | INATIVA |
| **Regra 14** | Aposentadoria Idade/TC | TRIA-02 | Triagem | INATIVA |

### Impacto
**Economia de trabalho:** 4 regras não precisam ser criadas do zero - apenas reativadas e ajustadas!

---

## 1. Regras Prioritárias (Nosso Plano)

### Regra 10: Pensão (TRIA-05)

**Status:** INATIVA

#### Configuração Esperada
```yaml
Nome: Triagem - Pensão
Tipo: Triagem por tipo de benefício
Localizador Origem: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Localizador Destino: 2.3 Pensão (RGPS)
```

#### Filtros Esperados
```yaml
Assuntos do Processo:
  - Pensão por Morte Previdenciária (RGPS)
  - Pensão por Morte
  - Pensão Especial

Classificador por Conteúdo:
  Palavras-chave: "pensão por morte" OU "dependente" OU "óbito do segurado"
  Tolerância: ≤5%
```

#### Motivos Possíveis de Inativação
- [ ] Classificador não vinculado ou inativo
- [ ] Filtro de assunto incompleto
- [ ] Localizador de destino incorreto
- [ ] Desativada para testes e não reativada
- [ ] Conflito com outra regra
- [ ] Erro na configuração que causa falsos positivos/negativos

#### O que Verificar para Reativar
1. **Classificador vinculado?** Verificar se existe classificador "Pensão" ativo
2. **Localizador destino existe?** Confirmar que "2.3 Pensão (RGPS)" existe
3. **Filtro de assunto correto?** Validar códigos de assunto
4. **Conflitos?** Verificar se outra regra ativa pode conflitar
5. **Checkbox "Ativa" marcado?** Garantir que a flag está ativada

#### Ações Necessárias
- [ ] Acessar configuração da Regra 10
- [ ] Documentar configuração atual completa
- [ ] Verificar vinculação do classificador
- [ ] Revisar filtros de assunto
- [ ] Testar em ambiente de simulação
- [ ] Reativar e monitorar

---

### Regra 12: Benefício Incapacidade (TRIA-04)

**Status:** INATIVA

#### Configuração Esperada
```yaml
Nome: Triagem - Benefício por Incapacidade
Tipo: Triagem por tipo de benefício
Localizador Origem: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Localizador Destino: 2.3 Benefício Incapacidade
```

#### Filtros Esperados
```yaml
Assuntos do Processo:
  - Auxílio-Doença Previdenciário
  - Aposentadoria por Invalidez
  - Benefícios por Incapacidade

Classificador por Conteúdo:
  Palavras-chave: ("auxílio-doença" OU "auxílio doença" OU "aposentadoria por invalidez")
                   E (incapacidade OU "perícia médica" OU "capacidade laborativa")
  Tolerância: ≤5%
```

#### Motivos Possíveis de Inativação
- [ ] Classificador não vinculado ou inativo
- [ ] Filtro muito amplo gerando falsos positivos
- [ ] Conflito com TRIA-02 (Aposentadoria Especial)
- [ ] Localizador de destino não existe
- [ ] Desativada durante ajustes e não reativada

#### O que Verificar para Reativar
1. **Classificador vinculado?** Verificar se existe classificador "Benefício Incapacidade" ativo
2. **Localizador destino existe?** Confirmar que "2.3 Benefício Incapacidade" existe (já confirmado - 104 processos)
3. **Filtros precisos?** Evitar overlap com outras regras de aposentadoria
4. **Exclusões necessárias?** Pode precisar excluir "aposentadoria especial" e "LOAS"
5. **Documentos exemplo?** Classificador tem mínimo 3 documentos?

#### Ações Necessárias
- [ ] Acessar configuração da Regra 12
- [ ] Documentar configuração atual completa
- [ ] Verificar vinculação do classificador
- [ ] Revisar filtros de assunto e exclusões
- [ ] Adicionar documentos exemplo se necessário
- [ ] Testar com processos conhecidos
- [ ] Reativar e monitorar

---

### Regra 13: Tema 1.102/STF (SUSP-01)

**Status:** INATIVA

#### Configuração Esperada
```yaml
Nome: Suspensão - Tema 1.102/STF - Revisão Vida Toda
Tipo: Suspensão por tema STF
Localizador Origem: QUALQUER (todos os gabinetes)
Localizador Destino: 2.3 tema 1.102/STF - Suspensos
```

#### Filtros Esperados
```yaml
Assuntos do Processo:
  - Revisão de Benefício
  - Reafirmação de Benefício
  - Aposentadoria por Tempo de Contribuição

Classificador por Conteúdo:
  Palavras-chave: ("revisão da vida toda" OU "regra definitiva" OU "art. 29" OU "art. 29, I")
                   E (aposentadoria OU benefício)
  Tolerância: ≤5%

Exclusões:
  NÃO Contém Localizador: "2.3 Minutados" (já julgados)
```

#### Motivos Possíveis de Inativação
- [ ] STF julgou o tema e regra não é mais necessária?
- [ ] Classificador muito sensível (muitos falsos positivos)
- [ ] Filtro muito amplo suspendendo processos incorretos
- [ ] Aguardando julgamento definitivo do STF
- [ ] Desativada temporariamente para ajuste

#### O que Verificar para Reativar
1. **Tema ainda suspenso?** Verificar se STF já julgou definitivamente
2. **Classificador ativo?** Validar configuração e exemplos
3. **Filtros precisos?** Evitar suspender processos que não tratam do tema
4. **Exclusões corretas?** Não suspender processos já julgados ou minutados
5. **Localizador destino existe?** Confirmar criação do localizador

#### Ações Necessárias
- [ ] Verificar status do Tema 1.102/STF no sistema do STF
- [ ] Acessar configuração da Regra 13
- [ ] Documentar configuração atual completa
- [ ] Validar classificador e documentos exemplo
- [ ] Revisar filtros e exclusões
- [ ] Confirmar necessidade de reativação com magistrado
- [ ] Reativar se tema ainda está suspenso

---

### Regra 14: Aposentadoria Idade/TC (TRIA-02)

**Status:** INATIVA

**NOTA:** Há uma discrepância aqui. No nosso plano, TRIA-02 é "Aposentadoria Especial", mas a Regra 14 é "Aposentadoria Idade/TC". Precisamos verificar se:
- A) Regra 14 na verdade é Aposentadoria Especial (nome incorreto)
- B) Existe outra regra para Especial
- C) Precisamos criar TRIA-02 do zero

#### Configuração Esperada (Se for Ap. Especial)
```yaml
Nome: Triagem - Aposentadoria Especial
Tipo: Triagem por tipo de benefício
Localizador Origem: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Localizador Destino: 2.3 Ap. Especial/ATC
```

#### Filtros Esperados (Se for Ap. Especial)
```yaml
Assuntos do Processo:
  - Aposentadoria Especial (Art. 57/8)
  - Reconhecimento de Tempo de Serviço Especial

Classificador por Conteúdo:
  Palavras-chave: ("aposentadoria especial" OU "tempo especial" OU "atividade insalubre"
                   OU "agente nocivo" OU "periculosidade" OU "penosidade")
  Tolerância: ≤5%

Exclusões:
  Assunto NÃO contém: "Idade" OU "LOAS" OU "Invalidez"
```

#### Configuração Esperada (Se for Ap. Idade/TC)
```yaml
Nome: Triagem - Aposentadoria por Idade ou Tempo de Contribuição
Tipo: Triagem por tipo de benefício
Localizador Origem: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Localizador Destino: 2.3 Ap. Idade urbana
```

#### Filtros Esperados (Se for Ap. Idade/TC)
```yaml
Assuntos do Processo:
  - Aposentadoria por Idade
  - Aposentadoria por Tempo de Contribuição

Classificador por Conteúdo:
  Palavras-chave: (("aposentadoria por idade" OU "aposentadoria por tempo de contribuição")
                   E !("especial" OU "invalidez" OU "rural"))
  Tolerância: ≤5%
```

#### Motivos Possíveis de Inativação
- [ ] Nome/configuração incorreta
- [ ] Conflito com outras regras de triagem
- [ ] Classificador não vinculado
- [ ] Filtro muito amplo ou muito restritivo
- [ ] Localizador de destino incorreto

#### O que Verificar para Reativar
1. **Qual é o verdadeiro propósito?** Especial ou Idade/TC?
2. **Classificador existe?** Verificar vinculação
3. **Localizador correto?** Validar destino
4. **Conflitos?** Verificar overlap com outras regras
5. **Documentos exemplo suficientes?** Mínimo 3 processos

#### Ações Necessárias
- [ ] PRIORIDADE: Acessar e identificar o verdadeiro propósito
- [ ] Documentar configuração atual completa
- [ ] Corrigir nome se necessário
- [ ] Verificar vinculação do classificador
- [ ] Revisar filtros e exclusões
- [ ] Reativar ou criar regra correta

---

## 2. Outras Regras Inativas (Investigação Pendente)

### Regra 4
**Status:** INATIVA
**Informações:** Não coletadas ainda
**Ação:** Investigar configuração completa

### Regra 5
**Status:** INATIVA
**Informações:** Não coletadas ainda
**Ação:** Investigar configuração completa

### Regra 6
**Status:** INATIVA
**Informações:** Não coletadas ainda
**Ação:** Investigar configuração completa

### Regra 7
**Status:** INATIVA
**Informações:** Não coletadas ainda
**Ação:** Investigar configuração completa

### Regra 8
**Status:** INATIVA
**Informações:** Não coletadas ainda
**Ação:** Investigar configuração completa

### Regra 11
**Status:** INATIVA
**Informações:** Não coletadas ainda
**Ação:** Investigar configuração completa

### Regra 16
**Status:** INATIVA
**Informações:** Não coletadas ainda
**Ação:** Investigar configuração completa

### Regra 17
**Status:** INATIVA
**Informações:** Não coletadas ainda
**Ação:** Investigar configuração completa

---

## 3. Checklist de Reativação de Regras

### Para Cada Regra Inativa:

#### A. Coleta de Informações
- [ ] Acessar URL da regra: `acao=automatizar_localizadores_alterar&id_controle_localizador_sistema=XXX`
- [ ] Capturar nome completo da regra
- [ ] Verificar checkbox "Ativa" (desmarcado)
- [ ] Documentar localizador(es) de origem
- [ ] Documentar localizador de destino
- [ ] Documentar comportamento do REMOVER (todos/selecionados/não remover)

#### B. Análise de Filtros
- [ ] Verificar filtros de processo (Juízo, Classe, Assunto, etc.)
- [ ] Verificar filtros por localizadores (contém/não contém)
- [ ] Verificar tipo de controle (tempo/data/evento)
- [ ] Verificar dados previdenciários (se aplicável)

#### C. Classificadores
- [ ] Verificar se há classificador vinculado
- [ ] Se sim, anotar nome do classificador
- [ ] Acessar classificador: `acao=inteligencia_artificial/classificador_conteudo/listar`
- [ ] Verificar se classificador está ATIVO
- [ ] Verificar filtro de palavras-chave
- [ ] Verificar tolerância configurada
- [ ] Contar documentos exemplo (mínimo 3)

#### D. Validação
- [ ] Verificar se localizadores de origem existem
- [ ] Verificar se localizador de destino existe
- [ ] Verificar conflitos com outras regras ativas
- [ ] Identificar possíveis causas de inativação
- [ ] Avaliar necessidade de ajustes antes de reativar

#### E. Testes
- [ ] Selecionar 3-5 processos conhecidos que deveriam ser afetados
- [ ] Simular aplicação da regra mentalmente
- [ ] Verificar se resultado seria correto
- [ ] Identificar possíveis falsos positivos/negativos

#### F. Reativação
- [ ] Fazer ajustes necessários nos filtros
- [ ] Reativar classificador se necessário
- [ ] Marcar checkbox "Ativa"
- [ ] Salvar regra
- [ ] Monitorar aplicação por 1 semana
- [ ] Ajustar conforme necessário

---

## 4. Causas Comuns de Inativação

### Causas Técnicas
1. **Classificador inativo ou deletado**
   - Solução: Recriar ou reativar classificador

2. **Localizador de destino não existe**
   - Solução: Criar localizador antes de reativar regra

3. **Conflito com outras regras**
   - Solução: Ajustar ordem de execução ou filtros

4. **Filtros muito amplos (muitos falsos positivos)**
   - Solução: Refinar filtros e adicionar exclusões

5. **Filtros muito restritivos (poucos processos afetados)**
   - Solução: Ampliar critérios ou revisar palavras-chave

### Causas Administrativas
1. **Desativada para testes e esquecida**
   - Solução: Revisar e reativar

2. **Aguardando julgamento de tema (suspensão)**
   - Solução: Verificar status do tema antes de reativar

3. **Mudança de fluxo de trabalho**
   - Solução: Adaptar regra ao novo fluxo

4. **Substituída por outra regra**
   - Solução: Verificar se pode ser deletada ou reaproveitada

5. **Erro na configuração inicial**
   - Solução: Corrigir configuração e reativar

---

## 5. Priorização de Reativação

### Alta Prioridade (Fazer Primeiro)
1. **Regra 10 - Pensão (TRIA-05)**
   - Motivo: Triagem automática reduz trabalho manual
   - Impacto: Médio volume de processos

2. **Regra 12 - Benefício Incapacidade (TRIA-04)**
   - Motivo: Localizador já tem 104 processos - regra foi usada antes
   - Impacto: Alto volume de processos

3. **Regra 13 - Tema 1.102/STF (SUSP-01)**
   - Motivo: Suspensão automática evita trabalho desnecessário
   - Impacto: Depende de quantos processos tratam do tema

### Média Prioridade
4. **Regra 14 - Aposentadoria (TRIA-02 ou TRIA-03)**
   - Motivo: Triagem automática, mas precisa esclarecer propósito
   - Impacto: Potencialmente alto volume

### Baixa Prioridade (Investigar Depois)
5-12. **Regras 4, 5, 6, 7, 8, 11, 16, 17**
   - Motivo: Desconhecemos o propósito
   - Impacto: A avaliar após investigação

---

## 6. Riscos de Reativação

### Riscos Altos
- **Regra com filtro muito amplo:** Pode mover processos incorretos
- **Classificador desatualizado:** Pode gerar muitos falsos positivos
- **Conflito com regras ativas:** Pode criar loops ou movimentações contraditórias
- **Tema já julgado:** Suspensão desnecessária

### Mitigação
1. **Sempre testar antes de reativar**
2. **Começar com uma regra por vez**
3. **Monitorar resultados por 1 semana**
4. **Ter processos de exemplo para validar**
5. **Documentar configuração atual antes de modificar**
6. **Fazer backup da configuração (screenshot ou anotação)**

---

## 7. Próximos Passos

### Imediato (Hoje)
1. Fazer login no sistema Eproc
2. Acessar URL: `https://eproc.jfrj.jus.br/eproc/controlador.php?acao=automatizar_localizadores`
3. Clicar em "Editar" nas Regras 10, 12, 13, 14
4. Documentar configuração completa de cada uma
5. Atualizar este documento com informações reais

### Esta Semana
6. Acessar lista de classificadores: `acao=inteligencia_artificial/classificador_conteudo/listar`
7. Verificar quais classificadores estão vinculados às 4 regras prioritárias
8. Verificar status (ativo/inativo) de cada classificador
9. Coletar documentos exemplo se necessário
10. Testar reativação de uma regra (começar pela menos crítica)

### Próxima Semana
11. Investigar as outras 8 regras inativas (4-8, 11, 16, 17)
12. Decidir quais podem ser reaproveitadas
13. Criar plano de reativação gradual
14. Implementar monitoramento de resultados

---

## 8. Template de Documentação

### Para cada regra investigada, preencher:

```yaml
REGRA: [Número]
ID_SISTEMA: [id_controle_localizador_sistema]
URL: https://eproc.jfrj.jus.br/eproc/controlador.php?acao=automatizar_localizadores_alterar&id_controle_localizador_sistema=[ID]

IDENTIFICAÇÃO:
  Nome: [Nome completo da regra]
  Status: [ATIVA/INATIVA]
  Equivalente no Plano: [TRIA-XX, SUSP-XX, etc. ou "Não identificado"]

LOCALIZADORES:
  Origem:
    - [Nome do localizador 1]
    - [Nome do localizador 2]
  Comportamento REMOVER: [Todos/Selecionados/Não remover]
  Destino:
    - [Nome do localizador destino]

TIPO_CONTROLE:
  Gatilho: [Tempo no Localizador/Tempo na Situação/Por Data/Por Evento]
  Valor: [X dias / Data específica / Nome do evento]

FILTROS_PROCESSO:
  Juízo: [Código ou "Todos"]
  Classe: [Código ou "Todos"]
  Assunto: [Códigos separados por vírgula ou "Todos"]
  Competência: [Código ou "Todos"]
  Rito: [Código ou "Todos"]

FILTROS_LOCALIZADORES:
  Contém ao menos um: [Lista de localizadores]
  Contém todos: [Lista de localizadores]
  NÃO contém nenhum: [Lista de localizadores]

CLASSIFICADOR:
  Vinculado: [SIM/NÃO]
  Nome: [Nome do classificador]
  Status: [ATIVO/INATIVO]
  ID: [ID do classificador]

DADOS_PREVIDENCIARIOS:
  [Campos específicos se aplicável]

ANÁLISE:
  Configuração parece correta: [SIM/NÃO/PARCIAL]
  Possível motivo de inativação: [Descrição]
  Ajustes necessários: [Lista de ajustes]
  Pode ser reativada imediatamente: [SIM/NÃO]
  Observações: [Observações adicionais]

RECOMENDAÇÃO:
  Ação: [REATIVAR/AJUSTAR E REATIVAR/DELETAR/MANTER INATIVA]
  Prioridade: [ALTA/MÉDIA/BAIXA]
  Justificativa: [Explicação da recomendação]
```

---

## 9. Informações de Contexto

### Localizadores Conhecidos que Existem

#### Triagem (TRIA)
- `2.3 GAB03-TR02 - PETIÇÃO INICIAL` (451 processos) - Origem principal
- `2.3 LOAS` (107 processos) - Destino TRIA-01
- `2.3 Ap. Especial/ATC` (92 processos) - Destino TRIA-02
- `2.3 Ap. Idade urbana` - Destino TRIA-03
- `2.3 Benefício Incapacidade` (104 processos) - Destino TRIA-04
- `2.3 Pensão (RGPS)` - Destino TRIA-05
- `2.3 Ap. Rural` (13 processos) - Destino TRIA-06
- `2.3 Auxílio-acidente` (13 processos) - Destino TRIA-07
- `2.3 Outros Previ` - Destino TRIA-07 (outros)

#### Suspensão (SUSP)
- `2.3 tema 1.102/STF - Suspensos` - Destino SUSP-01
- `2.3 - Tema 1031/STJ` (130 processos) - Destino SUSP-02
- `2.3 SUSPENSOS` (174 processos) - Genérico

#### Controle de Prazo
- `2.3 Aguardando recebimento` (537 processos) - GARGALO
- `2.3 Idoso paralisado há mais de 150 dias` (92 processos)
- `2.3 GAB3TR02 - Parados + 150 dias` (11 processos)

### Classificador Conhecido Ativo
- **Embargos de Declaração** (ativo)
  - Filtro: `(embargos de declaração OU embargos declaratórios) E (omissão OU contradição OU obscuridade OU erro material)`
  - Tolerância: 5%

---

## 10. Referências

- **GUIA_AUTOMACAO_EPROC.md** - Guia de conceitos e templates
- **DESCOBERTAS_EPROC_BROWSER.md** - Exploração completa do sistema (28/12/2024)
- **resultados_simulacao.txt** - Resultados dos testes de regras (17/17 passaram)
- **Sistema Eproc:** https://eproc.jfrj.jus.br/eproc/controlador.php?acao=automatizar_localizadores

---

## Conclusão

Este documento será **atualizado** assim que tivermos acesso ao sistema para documentar a configuração real de cada uma das 12 regras inativas.

**Status:** PENDENTE LOGIN NO SISTEMA

**Próxima ação:** Fazer login e acessar detalhes das Regras 10, 12, 13, 14 (prioridade alta)

---

**Documento criado em:** 28/12/2024
**Última atualização:** 28/12/2024 - Versão preliminar
**Responsável:** Análise automatizada + Pendente validação manual
