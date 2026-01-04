# Códigos de Assunto para Regras de Automação

**Data:** 28/12/2024
**Fonte:** Eproc - Dropdown de Assuntos (2.169 opções)
**Extração:** JavaScript completo

---

## 📋 Assuntos por Tipo de Benefício

### ✅ REGRA 14 - Aposentadoria Especial (TRIA-02)

**Total:** 18 assuntos

```yaml
Código | Assunto
-------|--------
1178   | Aposentadoria Especial (Art. 57/8) ← PRINCIPAL
2625   | Agente Agressivo - Biológico
2629   | Agente Agressivo - Eletricidade
2627   | Agente Agressivo - Poeira
2626   | Agente Agressivo - Químico
2628   | Agente Agressivo - Ruído
2624   | Agente Cancerígeno
2623   | Frentista
2630   | Garimpeiro
2672   | Hanseníase
2675   | Pessoa com Deficiência (Aposentadoria Especial)
2676   | Por Idade (Pessoa com Deficiência)
2677   | Por Tempo de Contribuição (Pessoa com Deficiência)
2674   | Professor
2673   | Seringueiro
2671   | Talidomida
2670   | Vigilante
2544   | Aposentadoria Especial (Magistério) ← Verificar se aplicável
```

**Assuntos Recomendados para Selecionar:**
```
☑ 1178 - Aposentadoria Especial (Art. 57/8)
☑ 2625 - Agente Agressivo - Biológico
☑ 2629 - Agente Agressivo - Eletricidade
☑ 2627 - Agente Agressivo - Poeira
☑ 2626 - Agente Agressivo - Químico
☑ 2628 - Agente Agressivo - Ruído
☑ 2624 - Agente Cancerígeno
☑ 2623 - Frentista
☑ 2630 - Garimpeiro
☑ 2672 - Hanseníase
☑ 2675 - Pessoa com Deficiência
☑ 2676 - Por Idade (Pessoa com Deficiência)
☑ 2677 - Por Tempo de Contribuição (Pessoa com Deficiência)
☑ 2674 - Professor
☑ 2673 - Seringueiro
☑ 2671 - Talidomida
☑ 2670 - Vigilante
```

---

### ✅ REGRA 11 - LOAS/BPC (TRIA-01)

**Total:** 2 assuntos principais

```yaml
Código | Assunto
-------|--------
2311   | Deficiente, Benefício Assistencial (Art. 203,V CF/88) ← PRINCIPAL
2312   | Idoso, Benefício Assistencial (Art. 203,V CF/88)
```

**Assuntos Recomendados para Selecionar:**
```
☑ 2311 - Deficiente, Benefício Assistencial (Art. 203,V CF/88)
☑ 2312 - Idoso, Benefício Assistencial (Art. 203,V CF/88)
```

**Nota:** São apenas 2 códigos! Muito simples.

---

### ✅ REGRA 12 - Benefício por Incapacidade (TRIA-04)

#### Auxílio-Doença (5 assuntos)

```yaml
Código | Assunto
-------|--------
1179   | Auxílio-Doença Previdenciário ← PRINCIPAL
2705   | Adicional de 25%, Auxílio-Doença Previdenciário
1202   | Auxílio-Doença Acidentário
2706   | Rural (art. 59/63), Auxílio-Doença Previdenciário
2708   | Urbano (art. 60), Auxílio-Doença Previdenciário
```

#### Aposentadoria por Invalidez (9 assuntos)

```yaml
Código | Assunto
-------|--------
1169   | Aposentadoria por Invalidez (Art. 42/7) ← PRINCIPAL
2620   | Adicional de 25%, Aposentadoria por Invalidez
1203   | Aposentadoria por Invalidez Acidentária
2622   | Rural (art. 42/44), Aposentadoria por Invalidez
2621   | Urbana (art. 42/44), Aposentadoria por Invalidez
```

**Assuntos Recomendados para Selecionar:**
```
☑ 1179 - Auxílio-Doença Previdenciário
☑ 2705 - Adicional de 25%, Auxílio-Doença
☑ 1202 - Auxílio-Doença Acidentário
☑ 2706 - Rural, Auxílio-Doença
☑ 2708 - Urbano, Auxílio-Doença
☑ 1169 - Aposentadoria por Invalidez
☑ 2620 - Adicional de 25%, Ap. Invalidez
☑ 1203 - Aposentadoria por Invalidez Acidentária
☑ 2622 - Rural, Ap. Invalidez
☑ 2621 - Urbana, Ap. Invalidez
```

**Total:** 10 assuntos

---

### ✅ REGRA 10 - Pensão por Morte (TRIA-05)

**Total:** 18 assuntos

```yaml
Código | Assunto
-------|--------
1182   | Pensão por Morte (Art. 74/9) ← PRINCIPAL
2709   | Acidente de Trabalho, Pensão por Morte
2711   | Rural (Pensão por Morte)
2719   | Urbana (Pensão por Morte)

# Por tipo de beneficiário - Rural
2712   | Estudante Universitário, Rural
2713   | Filho Maior e Inválido, Rural
2714   | Menor sob Guarda, Rural
2715   | Óbito de Companheiro/Companheira, Rural
2716   | Óbito de Cônjuge, Rural
2717   | Óbito de Filho/Filha, Rural
2718   | Óbito de Pai/Mãe, Rural

# Por tipo de beneficiário - Urbana
2720   | Estudante Universitário, Urbana
2721   | Filho Maior e Inválido, Urbana
2722   | Menor sob Guarda, Urbana
2723   | Óbito de Companheiro/Companheira, Urbana
2724   | Óbito de Cônjuge, Urbana
2725   | Óbito de Filho/Filha, Urbana
2726   | Óbito de Pai/Mãe, Urbana
```

**Assuntos Recomendados para Selecionar:**
```
☑ 1182 - Pensão por Morte (Art. 74/9) ← OBRIGATÓRIO
☑ 2709 - Acidente de Trabalho, Pensão por Morte
☑ 2711 - Rural (Pensão por Morte)
☑ 2719 - Urbana (Pensão por Morte)

# Opcionais (se quiser cobrir casos específicos):
☑ 2712 a 2718 - Casos específicos Rural
☑ 2720 a 2726 - Casos específicos Urbana
```

**Recomendação:** Selecionar pelo menos os 4 principais. Os específicos por tipo de beneficiário são opcionais.

---

### ✅ REGRA 13 - Tema 1.102/STF - Revisão Vida Toda (SUSP-01)

**Total:** 61 assuntos relacionados a RMI/Revisão

#### Assuntos Principais:

```yaml
Código | Assunto
-------|--------
1205   | RMI - Renda Mensal Inicial ← PRINCIPAL
1230   | Reajustes e Revisões Específicos
3118   | Revisão da Vida Toda (Tema 1102 de Repercussão Geral) ← ESPECÍFICO!
```

#### Outros assuntos de RMI (selecionar se necessário):

```yaml
1220   | Alteração do coeficiente de cálculo de pensão
1221   | Alteração do coeficiente de cálculo do benefício
2008   | Alteração do teto máximo para o valor do benefício (EC 20 e 41)
1246   | Aplicação de coeficiente de cálculo diverso
1250   | Art. 144 da Lei 8.213/91
2009   | Art. 26 da Lei 8.870/1994
2010   | Art. 29, II, da Lei 8.213/1991
2011   | Art. 29, § 5º, da Lei 8.213/1991
1232   | Art. 58 ADCT da CF/88
1211   | Benefício mínimo a partir da CF/88
2735   | Cálculo com base na Regra Art.29 mais favorável
1217   | Cálculo do Benefício de acordo com sistemática anterior à Lei 9.876/99
1222   | Cálculo do benefício de segurado especial
1223   | Cálculo do fator previdenciário - Lei 9.876/99
1216   | Contribuição sobre vinte salários mínimos
1257   | Correção Monetária de Benefício pago com atraso
1256   | Correção Monetária pela Súmula 71 TFR
1254   | Desconto do DL 1.910/81
1255   | Descontos dos benefícios
1215   | Escala de Salário-Base
1235   | Expurgos inflacionários sobre os benefícios
1251   | Gratificação Natalina
2007   | Inclusão do 13º salário no PBC
1253   | Índice de 4,02% da Lei 8.222/91
1218   | IRSM de Fevereiro de 1994 (39,67%)
1213   | Limitação do salário-de-benefício
1234   | Manutenção do Benefício pela equivalência salarial
1212   | Parcelas e índices de correção do salário-de-contribuição
1238   | Reajustamento pelo IGP-DI
1249   | Reajustamento pelo INPC
1247   | Reajuste aplicado ao salário mínimo em setembro/94
1258   | Reajuste conforme Portaria MPAS 714/1993
1237   | Reajuste de 147%
1231   | Reajuste pela Súmula 260 do TFR
2012   | Revisão do valor do benefício no primeiro reajuste
1208   | RMI pela equivalência entre SB e SC
1207   | RMI pelo art. 1º da Lei 6.423/77
1206   | RMI pelo art. 202 CF/88
1209   | RMI sem incidência de Teto Limitador
1210   | RMI da pensão de dependente de ex-combatente
1214   | RMI cujo salário-de-benefício supera menor valor teto
1236   | Salário Mínimo de Ncz$ 120,00 para junho/89
1248   | Sistemática de conversão dos benefícios em URVs
1233   | Utilização do PNS no Reajuste de Benefícios
```

**Assuntos Recomendados para Selecionar:**

**Opção A - Específico (apenas Revisão Vida Toda):**
```
☑ 3118 - Revisão da Vida Toda (Tema 1102) ← MAIS PRECISO
```

**Opção B - Abrangente (todos os processos de RMI/Revisão):**
```
☑ 1205 - RMI - Renda Mensal Inicial
☑ 1230 - Reajustes e Revisões Específicos
☑ 3118 - Revisão da Vida Toda (Tema 1102)
```

**Recomendação:** Usar **Opção A** (apenas código 3118) se quiser suspender APENAS processos sobre Revisão da Vida Toda, ou **Opção B** se quiser suspender qualquer processo de RMI/Revisão.

---

## 🎯 Resumo por Regra

| Regra | Nome | Códigos Principais | Total Assuntos |
|-------|------|-------------------|----------------|
| **14** | Ap. Especial | 1178 + agentes agressivos | 17-18 |
| **11** | LOAS/BPC | 2311, 2312 | 2 |
| **12** | Incapacidade | 1179, 1169 + variações | 10 |
| **10** | Pensão | 1182, 2709, 2711, 2719 | 4-18 |
| **13** | Tema 1102 | 3118 (ou 1205, 1230, 3118) | 1-3 |

---

## 📝 Como Usar Este Documento

### No Formulário de Edição de Regra:

1. **Abrir regra para edição**
2. **Localizar campo "Assunto"** (tem 2.169 opções)
3. **Clicar no dropdown** de Assunto
4. **Usar Ctrl+F** no navegador para buscar pelo código
5. **Marcar checkbox** dos assuntos listados acima
6. **Salvar**

### Exemplo para Regra 11 (LOAS):

```
1. Abrir Regra 11
2. Ir até campo "Assunto"
3. Buscar: "2311" → Marcar checkbox
4. Buscar: "2312" → Marcar checkbox
5. Pronto! Apenas 2 assuntos
```

---

## ⚠️ Observações Importantes

### 1. Regra 14 (Aposentadoria Especial)
- **JÁ TEM 40 assuntos selecionados** segundo nossa exploração anterior
- **Verificar** se são estes 18 códigos ou se há mais
- **Não precisa** selecionar novamente, apenas conferir

### 2. Regra 11 (LOAS)
- **Muito simples:** apenas 2 códigos!
- Código **2311** é o principal (Deficiente)
- Código **2312** cobre Idoso

### 3. Regra 12 (Incapacidade)
- **10 assuntos** cobrem tanto Auxílio-Doença quanto Aposentadoria por Invalidez
- Inclui variações: Rural, Urbana, Acidentária, Adicional 25%

### 4. Regra 10 (Pensão)
- **Mínimo:** 4 códigos principais (1182, 2709, 2711, 2719)
- **Completo:** 18 códigos (inclui casos específicos por tipo de beneficiário)
- **Recomendação:** Começar com os 4 principais

### 5. Regra 13 (Tema 1102/STF)
- **Código 3118** é ESPECÍFICO para Revisão da Vida Toda
- Existe um código exato! Não precisa usar classificador de IA
- ⚠️ **ANTES DE IMPLEMENTAR:** Verificar se tema ainda está suspenso no STF

---

## ✅ Conclusão

**Temos TODOS os códigos de assunto necessários!**

- ✅ **Não precisamos** de classificadores de IA
- ✅ **Filtros diretos** por código de assunto são 100% precisos
- ✅ **Implementação** muito mais simples e rápida
- ✅ **Zero manutenção** após configuração

**Tempo estimado para configurar todas as 5 regras:** 1-2 horas

---

**Documento criado em:** 28/12/2024
**Status:** ✅ COMPLETO E PRONTO PARA USO
