# Regras de Automação Existentes - Eproc 2ª TR

**Órgão:** 2ª Turma Recursal (RJRIOTR02)  
**Data de extração:** 19/12/2025

---

## Resumo
- **Total de regras:** 17
- **Regras ATIVAS:** 1 (Regra 15)
- **Regras INATIVAS:** 16

---

## Lista de Regras

### Distribuição Inicial (Regras 1-6) - INATIVAS

| # | Origem | Gatilho | Destino |
|---|--------|---------|---------|
| 1 | Petição Inicial/Cautelar/Criminal | Por Evento: Distribuído | 2.1 - 02TR-GAB1 |
| 2 | Petição Inicial/Cautelar/Criminal | Por Evento: Distribuído | 2.2 - 02TR-GAB2 |
| 3 | Petição Inicial/Cautelar/Criminal | Por Evento: Distribuído | 2.3 - 02TR-GAB3 |
| 4 | PETIÇÃO INICIAL | Por Evento: Distribuído | 2.1 - 02TR-GAB1 |
| 5 | PETIÇÃO INICIAL | Por Evento: Distribuído | 2.2 - 02TR-GAB2 |
| 6 | PETIÇÃO INICIAL | Por Evento: Distribuído | 2.3 - 02TR-GAB3 |

---

### Triagem por Tema/Tipo (Regras 7-14) - INATIVAS

| # | Origem | Gatilho | Destino |
|---|--------|---------|---------|
| 7 | 2.1 GAB01-TR02 - PETIÇÃO INICIAL | Por Data: Todos os dias | 2.1 tema 1.102/STF + Mesa Larissa |
| 8 | 2.1 GAB01-TR02 - PETIÇÃO INICIAL | Por Data: Todos os dias | 2.1 Aposentadoria |
| 9 | 2.2 GAB02-TR02 - PETIÇÃO INICIAL | Por Data: Todos os dias | 2.2 tema 1.102/STF + Mesa Larissa |
| 10 | 2.2 GAB02-TR02 - PETIÇÃO INICIAL | Por Data: Todos os dias | 2.2 Aposentadoria |
| 12 | 2.3 GAB03-TR02 - PETIÇÃO INICIAL | Por Data: Todos os dias | 2.3 tema 1.102/STF + Mesa Larissa |
| 13 | 2.3 GAB03-TR02 - PETIÇÃO INICIAL | Por Data: Todos os dias | 2.3 Mesa Larissa Maia |
| 14 | 2.3 GAB03-TR02 - PETIÇÃO INICIAL | Por Data: Todos os dias | 2.3 Aposentadoria |

---

### Controle de Processos Parados (Regras 11, 15) - **REGRA 15 ATIVA**

| # | Origem | Gatilho | Destino | Status |
|---|--------|---------|---------|--------|
| 11 | 2.2 Benefício Incapacidade/REVISÃO | Verificação: 115 dias | 2.2 Parados + 150 dias | INATIVA |
| **15** | **2.3 Aposentadoria/Benefício/REVISÃO** | **Verificação: 115 dias** | **2.3 Parados + 150 dias** | **ATIVA** |

---

### Embargos de Declaração (Regras 16-17) - INATIVAS

| # | Origem | Gatilho | Destino | Ação |
|---|--------|---------|---------|------|
| 16 | EMBDEC | Por Tipo Petição: EMBARGOS | 2.3 Embargos de Declaração | Lançar Minuta |
| 17 | EMBDEC | Por Data: Todos os dias | 2.3 Embargos de Declaração | Lançar Evento |

---

## Observações

1. **Maioria INATIVA**: 16 das 17 regras estão desativadas
2. **Única ativa**: A regra 15 move processos parados há +115 dias para localizador de alerta
3. **Tema 1.102/STF**: Múltiplas regras para triagem de Revisão da Vida Toda (todas inativas)
4. **Falta regra 11 no GAB3**: Há regras de "parados" para GAB2 e GAB3, mas não para GAB1
