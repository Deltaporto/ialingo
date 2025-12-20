# Estrutura Completa do Formulário de Regras - Eproc

**Baseado na Regra 12 - Capturado em 19/12/2025**

---

## Screenshot do Formulário

![Formulário de Edição de Regra](C:/Users/Casa/.gemini/antigravity/brain/aa5c5f16-e4b1-44d6-a54c-fd83ec0b8dfe/edit_rule_top_1766191377049.png)

---

## 1. Configuração Principal (Obrigatórios)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| **REMOVER do Localizador** | Autocomplete | Localizador de origem |
| **Comportamento REMOVER** | Dropdown | Como remover (padrão, todos, exceto sistema, etc.) |
| **INCLUIR no Localizador** | Autocomplete | Localizador de destino |
| **TIPO DE CONTROLE** | Dropdown | Gatilho da regra |

### Opções do TIPO DE CONTROLE:
- Por Evento OU Tipo de Petição OU Documento
- Por Evento / Por Tipo de Petição / Por Documento
- **Por Data ou Periodicamente** ← Mais comum
- Por Tempo no localizador / Por Tempo na situação
- Verificação de processos sem movimentação

### Opções de Comportamento REMOVER:
- Remover do(s) localizador(es) informado(s) ← Padrão
- Remover apenas os de sistema
- Remover de TODOS os localizadores
- Remover de TODOS, EXCETO os de sistema
- NÃO remover nenhum (apenas acrescentar)

---

## 2. Executar Ação (Opcional)

Checkbox: **Programar ação após execução da regra**

Ações disponíveis:
- Lançar evento automatizado
- Lançar minuta em evento automatizado
- Preparar minuta para assinatura
- Retificar autuação
- Incluir lembrete

---

## 3. Filtros de Processo

| Campo | Tipo | Exemplo |
|-------|------|---------|
| Juízo do Processo | Dropdown | 2ª TR - 3º Juiz Relator |
| Classe | Multi-select | AC, HC, Procedimento Comum |
| Competência | Multi-select | Cível, JEF Previdenciária |
| Rito | Dropdown | Juizado Especial Federal |
| Assunto | Multi-select | Auxílio-Doença, LOAS |
| Situação | Multi-select | Suspenso, Sobrestado |
| Nível de Sigilo | Dropdown | Público, Sigiloso |
| Dígito Distribuição | Texto | 0-9 |

---

## 4. Filtros de Localizadores (Lógica E/OU/NÃO)

| Campo | Função |
|-------|--------|
| Que Contenha TODOS | Lógica E (todos devem estar) |
| Que Contenha AO MENOS UM | Lógica OU (qualquer um) |
| Que NÃO Contenha NENHUM | Exclusão |

---

## 5. Eventos e Documentos

| Campo | Descrição |
|-------|-----------|
| Último Evento | Código do evento mais recente |
| Documentos | Tipos de docs presente no processo |
| Leitura do Processo | Filtros por sequência de eventos |

---

## 6. Dados Previdenciários (Específico JEF)

| Campo | Descrição |
|-------|-----------|
| Resultado Laudo Médico | Capaz, Incapaz Temp/Perm |
| Dado Painel Previdenciário | Espécie benefício, NB |

---

## 7. Classificação por Conteúdo

| Campo | Descrição |
|-------|-----------|
| Classificadores | Etiquetas baseadas em análise de IA |

> Requer cadastro prévio via Menu > Localizadores > Classificador por Conteúdo
