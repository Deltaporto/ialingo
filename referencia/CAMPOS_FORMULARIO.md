# Campos e Filtros Disponíveis - Formulário de Regras de Automação

**Data:** 28/12/2024
**Fonte:** Regra 17 (Eproc) - Extração JavaScript completa

---

## 🎯 TIPO DE CONTROLE (Campo Principal)

O campo **TIPO DE CONTROLE** define quando/como a regra será executada:

```yaml
Opções Disponíveis (8):
  1. Por Evento OU Tipo de Petição OU Documento
  2. Por Evento
  3. Por Tipo de Petição
  4. Por Documento
  5. Por Data ou Periodicamente ← USADO ATUALMENTE
  6. Por Tempo no localizador ← RECOMENDADO PARA TRIAGEM!
  7. Por Tempo na situação
  8. Verificação processos sem movimentação
```

### ✅ **RECOMENDAÇÃO: Usar "Por Tempo no Localizador"**

Para triagem de processos recém-chegados:
- **Tipo Controle**: "Por Tempo no localizador"
- **Tempo**: 0-1 dias (processos que acabaram de chegar)
- **Localizador Origem**: PETIÇÃO INICIAL

**Vantagem:** Pega apenas processos NOVOS, evita reprocessar os mesmos processos todos os dias!

---

## 📋 FILTROS OPCIONAIS PARA OS PROCESSOS

### 1. **Juízo do Processo**
```yaml
Campo: compSelVarJuizo
Opções (3):
  - 2ª Turma Recursal - 1º Juiz Relator (RJ)
  - 2ª Turma Recursal - 2º Juiz Relator (RJ)
  - 2ª Turma Recursal - 3º Juiz Relator (RJ) ← NOSSO JUÍZO
```

**USO:** Filtrar apenas processos do nosso gabinete (3º Juiz Relator)

---

### 2. **Classe**
```yaml
Campo: Classe
Total: 261 classes disponíveis
Exemplos:
  - AÇÃO CIVIL PÚBLICA
  - AÇÃO PENAL
  - EMBARGOS DE DECLARAÇÃO
  - HABEAS CORPUS
  - MANDADO DE SEGURANÇA
  - RECURSO INOMINADO
```

---

### 3. **Competência** ⭐ IMPORTANTE
```yaml
Campo: selCompetencia
Total: 67 competências
Principais para nós:
  - JEF Previdenciária ← FILTRAR APENAS PROCESSOS PREVIDENCIÁRIOS
  - JEF Aduaneira
  - JEF Habitacional
  - Cível
  - Cível/Servidor Público
```

**USO:** Filtrar apenas processos da competência previdenciária!

---

### 4. **Rito**
```yaml
Campo: selRitoProcesso
Opções (3):
  - (vazio)
  - JUIZADO ESPECIAL FEDERAL ← NOSSOS PROCESSOS
  - RITO ORDINÁRIO (COMUM)
```

---

### 5. **Assunto** ⭐⭐ CRÍTICO
```yaml
Campo: selAssuntoMultiplo
Total: 2.169 assuntos disponíveis!

Permite MÚLTIPLA SELEÇÃO (checkboxes)

CÓDIGOS COMPLETOS EXTRAÍDOS! Ver: CODIGOS_ASSUNTO_REGRAS.md

Exemplos de assuntos previdenciários com CÓDIGOS:
  - 1178: Aposentadoria Especial (Art. 57/8)
  - 1170: Aposentadoria por Idade (Art. 48/51)
  - 1169: Aposentadoria por Invalidez (Art. 42/7)
  - 1179: Auxílio-Doença Previdenciário
  - 1182: Pensão por Morte (Art. 74/9)
  - 2311: Deficiente, Benefício Assistencial (LOAS)
  - 2312: Idoso, Benefício Assistencial (LOAS)
  - 1205: RMI - Renda Mensal Inicial
  - 3118: Revisão da Vida Toda (Tema 1102) ← ESPECÍFICO!

Total de assuntos previdenciários extraídos: ~200+
```

**USO:** Este é o filtro PRINCIPAL para triagem por tipo de benefício!

**📄 DOCUMENTO COMPLETO:** `CODIGOS_ASSUNTO_REGRAS.md` contém TODOS os códigos organizados por tipo de benefício, prontos para copiar e colar!

---

### 6. **Situação do Processo**
```yaml
Campo: Por Situação do Processo
Total: 76 situações
Opções:
  - Todas (exceto baixados e eliminados) ← PADRÃO
  - BAIXADO
  - ANISTIA-BAIXADO
  - BAIXA - Acordo Art. 28-A CPP
  - etc.
```

---

### 7. **Prazo**
```yaml
Campo: selPrazoMultiplo
Total: 21 opções
Exemplos:
  - Processos COM prazo aberto/ag. abertura
  - Processos SEM prazo aberto/ag. abertura
  - Processos COM prazo aberto DO PÓLO PASSIVO
  - Processos COM prazo aberto DO PÓLO ATIVO
  - Processos SEM prazo aberto DO PÓLO PASSIVO ← ÚTIL PARA DECURSO
```

---

### 8. **Última Movimentação**
```yaml
Campo: Última Movimentação
Opções (6):
  - (vazio)
  - Somente processos sem movimentação nos últimos 15 dias
  - Somente processos sem movimentação nos últimos 30 dias
  - Somente processos sem movimentação nos últimos 45 dias
  - Somente processos sem movimentação nos últimos 60 dias
  - Somente processos sem movimentação (Por Tempo no Localizador)
```

---

### 9. **Precedente Qualificado** (Temas STF/STJ)
```yaml
Campo: Precedente qualificado
Total: 3.348 precedentes!
Exemplos:
  - Tema STJ - 181 (12)
  - Tema STJ - 52 (15)
  - Tema STJ - 233 (16)
  - (incluindo Tema 1.102/STF)
```

**USO:** Filtrar processos sobre temas específicos de suspensão!

---

### 10. **Resultado Laudo Pericial**
```yaml
Campo: Resultado Laudo Pericial
Opções (7):
  - --- HÁ Laudo Pericial (QUALQUER RESULTADO) ---
  - --- NÃO HÁ Laudo Pericial ---
  - Laudo Pericial Capaz
  - Laudo Pericial Incapaz (Redução da Capacidade)
  - Laudo Pericial Incapaz (Incapacidade Pretérita)
  - Laudo Pericial Incapaz (Incapacidade Temporária)
  - Laudo Pericial Incapaz (Permanente - Qualquer Atividade)
```

**USO:** Útil para filtrar processos de incapacidade!

---

### 11. **Entidade**
```yaml
Campo: selEntidadeMultiplo
Total: 1.358 entidades
Exemplos:
  - INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS ← PRINCIPAL
  - MPF
  - União Federal
```

**USO:** Filtrar processos onde o INSS é parte (réu)

---

### 12. **Tipo Parte Entidade**
```yaml
Campo: Tipo Parte Entidade
Opções (7):
  - (vazio)
  - AUTOR
  - RÉU ← INSS geralmente é RÉU
  - INTERESSADO
  - QUALQUER
  - MPF
  - EXCETO PETICIONANTE
```

---

### 13. **Classificador por Conteúdo** (IA)
```yaml
Campo: Classificador por Conteúdo
Total: 2 opções apenas
  - (vazio)
  - Embargos de Declaração ← ÚNICO CLASSIFICADOR ATIVO
```

**CONCLUSÃO:** Classificadores de IA são escassos. Melhor usar filtros diretos!

---

### 14. **Dados Complementares**
```yaml
Campo: selDadoComplementar
Total: 209 opções
Exemplos:
  - Ação Coletiva de subst. processual
  - Admitida execução
  - Antecipação de Tutela
  - Decisão liminar
```

---

### 15. **Nível de Sigilo**
```yaml
Campo: compSelNivelSigilo
Opções (6):
  - Somente Processos Sem Sigilo
  - Segredo de Justiça (Nível 1)
  - Sigiloso (Níveis 2-5)
```

---

### 16. **Evento** ⭐ MUITO ÚTIL
```yaml
Campo: compSelIdEvento
Total: 12.387 eventos disponíveis!

Exemplos úteis:
  - Distribuição por Dependência
  - Abertura de Vista
  - Expedida/certificada a intimação eletrônica
  - Juntada de petição
  - Sentença
  - Acórdão
```

**USO:** Para regras baseadas em eventos (ex: decurso de prazo após intimação)

---

### 17. **Tipo de Petição**
```yaml
Campo: Tipo de Petição
Total: 115 tipos
Exemplos:
  - APELAÇÃO
  - AGRAVO INTERNO
  - ALEGAÇÕES FINAIS
  - EMBARGOS DE DECLARAÇÃO
  - RECURSO INOMINADO
```

---

### 18. **Dados Previdenciários Específicos** ⭐⭐ AVANÇADO

O Eproc tem campos ESPECÍFICOS para processos previdenciários!

```yaml
Campos disponíveis:
  - Procuração (poderes específicos)
  - Pedido Principal (Averbação, Concessão, Revisão)
  - Pedido Subsidiário
  - Benefício Principal (Ap. Especial, Ap. Idade, etc.)
  - Benefício Subsidiário
  - Prova Judicial (CTPS, PPP, SB40, Laudo, etc.)
  - Tipo de Contagem (Com contribuição, Independente, etc.)
  - Espécie de Período (Tempo especial, rural, urbano)
  - Tipo de Vínculo (Empregado, Contribuinte individual, etc.)
  - CBO (Código Brasileiro de Ocupações) - 2.557 códigos!
  - Setor de Trabalho - 253 setores!
  - Tipo de Função - 500 funções!
  - Forma de Contagem TE (15, 20, 25 anos)
  - Fundamento Especialidade (Categoria, Insalubridade, Penosidade, Periculosidade)
  - Fator de Risco (Agentes biológicos, químicos, calor, frio, ruído, etc.)
```

**POTENCIAL ENORME:** Podemos criar regras muito específicas baseadas nestes campos!

---

## 🎯 ESTRATÉGIA RECOMENDADA PARA TRIAGEM

### Abordagem Simples e Eficaz (SEM IA):

```yaml
Configuração Base:
  TIPO DE CONTROLE: "Por Tempo no localizador"
  Tempo no Localizador: 0-1 dias (processos novos)

  Filtros Obrigatórios:
    - Juízo: 2ª Turma Recursal - 3º Juiz Relator (RJ)
    - Competência: JEF Previdenciária
    - Rito: JUIZADO ESPECIAL FEDERAL

  Filtro Específico por Regra:
    - Assunto: [selecionar assuntos específicos]
```

### Exemplo: Regra de Triagem LOAS

```yaml
Nome: Triagem LOAS - Entrada Automática
Tipo Controle: Por Tempo no localizador (0-1 dias)

Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Localizador INCLUIR: 2.3 LOAS - BENEFÍCIO ASSISTENCIAL
Comportamento: Remover do localizador informado

Filtros:
  ✅ Juízo: 2ª TR - 3º Juiz Relator
  ✅ Competência: JEF Previdenciária
  ✅ Assunto (selecionar):
      - Deficiente, Benefício Assistencial (Art. 203,V CF/88)
      - LOAS
      - BPC
  ❌ Classificador: NENHUM (não precisa!)

Vantagens:
  ✓ Executa apenas 1 vez por processo (quando entra no localizador)
  ✓ Não precisa rodar "todos os dias"
  ✓ Não precisa de classificador de IA
  ✓ Mais rápido e confiável
```

---

## 📊 Comparação: Abordagem Antiga vs. Nova

| Aspecto | ❌ Abordagem Antiga (com IA) | ✅ Abordagem Nova (filtros diretos) |
|---------|------------------------------|-------------------------------------|
| **Tipo Controle** | Por Data - Todos os dias | Por Tempo no Localizador (0-1 dias) |
| **Execuções** | Todos os dias para TODOS os processos | Apenas 1 vez quando processo entra |
| **Filtro Principal** | Classificador de IA | Assunto + Competência + Juízo |
| **Complexidade** | Alta (criar classificador, docs exemplo, tolerância) | Baixa (apenas selecionar assuntos) |
| **Manutenção** | Precisa ajustar tolerância, adicionar docs | Praticamente zero |
| **Precisão** | ~95% (depende da tolerância) | ~100% (filtro exato) |
| **Performance** | Lenta (IA analisa documentos) | Rápida (filtro de banco de dados) |
| **Dependências** | Precisa de 3+ documentos exemplo | Nenhuma |

---

## 🔄 Ordem de Execução Correta

### Prioridade de Regras:

```
1º SUSPENSÕES (filtro por Precedente Qualificado)
   ↓
2º TRIAGENS por Assunto (filtro por tempo no localizador = 0-1 dias)
   ↓
3º FLUXO por Evento (ex: após intimação)
   ↓
4º PRAZOS por Tempo (ex: decurso de prazo)
```

---

## 📝 Template de Regra Recomendado

```yaml
# REGRA DE TRIAGEM - TEMPLATE

Nome: Triagem [TIPO DE BENEFÍCIO]
Grupo: TRIA-XX
Prioridade: [número]

# CONFIGURAÇÃO BÁSICA
Órgão: 2ª TURMA RECURSAL DO RIO DE JANEIRO

Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Comportamento REMOVER: Remover do localizador informado

Localizador INCLUIR: 2.3 [DESTINO]

TIPO DE CONTROLE: Por Tempo no localizador
Tempo: Entre 0 e 1 dias

# FILTROS OBRIGATÓRIOS (para garantir que pegamos apenas nossos processos)
Juízo do Processo: 2ª Turma Recursal - 3º Juiz Relator (RJ)
Competência: JEF Previdenciária
Rito: JUIZADO ESPECIAL FEDERAL

# FILTRO ESPECÍFICO
Assunto: [SELECIONAR ASSUNTOS RELACIONADOS]
  ☑ [Assunto 1]
  ☑ [Assunto 2]
  ☑ [Assunto 3]

# OPCIONAL (se necessário filtrar mais)
Entidade: INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS
Tipo Parte Entidade: RÉU

# NÃO USAR (nesta fase)
Classificador por Conteúdo: (vazio) ← NÃO PRECISA!
```

---

## ✅ Próximos Passos

1. **Identificar códigos de assunto** para cada tipo de benefício
2. **Repensar as 5 regras inativas** usando esta nova abordagem
3. **Criar regras simples** sem dependência de IA
4. **Testar com 1-2 processos** para validar
5. **Monitorar por 1 semana** e ajustar se necessário

---

## 🎯 Conclusão

**SIM, temos TODAS as informações necessárias!**

A abordagem correta é:
- ✅ Usar **"Por Tempo no Localizador"** ao invés de "Por Data - Todos os dias"
- ✅ Filtrar por **Assunto + Juízo + Competência**
- ✅ **NÃO usar Classificadores de IA** nesta fase
- ✅ Regras **executam 1 vez** por processo (mais eficiente)

**Tempo estimado para implementar 5 regras:** 1-2 horas (muito mais rápido que criar classificadores!)

---

**Documento gerado em:** 28/12/2024
**Fonte:** Análise completa do formulário de regras (Regra 17)
