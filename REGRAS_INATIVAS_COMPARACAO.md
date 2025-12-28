# Comparação das Regras Inativas - Análise Detalhada

**Data:** 28/12/2024
**Objetivo:** Determinar quais regras podem ser reativadas imediatamente vs. quais precisam ser reconstruídas

---

## Regras Exploradas (3 de 5)

### ✅ Regra 14 - Aposentadoria Especial (TRIA-02)

```yaml
Status: INATIVA
Total de Assuntos: 40 assuntos selecionados
Classificador: ❌ NENHUM (razão da inatividade)
Localizador REMOVER: 2.3 GAB03-TR02 - PETIÇÃO INICIAL
Localizador INCLUIR: 2.3 Ap. Especial/ATC
```

**Assuntos Configurados (40):**
- 1178: Aposentadoria Especial (Art. 57/8)
- 2670: Vigilante
- 2629: Agente Agressivo - Eletricidade
- 2628: Agente Agressivo - Ruído
- 2630: Agente Agressivo - Químicos
- 2631: Agente Agressivo - Biológicos
- 1305: Averbação/Conversão de tempo especial
- [... mais 33 assuntos relacionados a trabalho especial]

**Diagnóstico:**
- ✅ **BEM CONFIGURADA**: 40 assuntos selecionados corretamente
- ❌ **FALTA CLASSIFICADOR**: Precisa criar classificador por conteúdo
- 🎯 **PRIORIDADE**: ALTA - Apenas criar classificador para reativar

**Ação Recomendada:**
1. Criar classificador "Aposentadoria Especial" com filtro:
   ```
   ("aposentadoria especial" OU "tempo especial" OU "atividade especial")
   E (insalubre OU perigoso OU nocivo OU penoso)
   ```
2. Vincular classificador à regra
3. REATIVAR regra

---

### ❌ Regra 10 - Pensão (TRIA-05)

```yaml
Status: INATIVA
Total de Assuntos: 0 (ZERO!)
Classificador: ❌ NENHUM
Localizadores: ❌ NÃO ENCONTRADOS
```

**Dados Extraídos:**
```json
{
  "numero": 10,
  "ativa": false,
  "totalAssuntos": "0",
  "assuntos": [],
  "classificadorSelecionado": "Nenhum",
  "classificadorId": "n/a",
  "removerTexto": "Não encontrado",
  "incluirTexto": "Não encontrado"
}
```

**Diagnóstico:**
- ❌ **COMPLETAMENTE VAZIA**: Nenhum assunto configurado
- ❌ **SEM LOCALIZADORES**: Campos de origem/destino vazios
- ❌ **SEM CLASSIFICADOR**
- 🎯 **PRIORIDADE**: MÉDIA - Precisa reconstruir do zero

**Ação Recomendada:**
1. **NÃO REATIVAR** - Regra precisa ser RECONSTRUÍDA completamente
2. Configurar assuntos relacionados a pensão por morte:
   - Pensão por Morte
   - Pensão por Morte de Servidor
   - Pensão Especial
   - etc.
3. Definir localizadores:
   - REMOVER: `2.3 GAB03-TR02 - PETIÇÃO INICIAL`
   - INCLUIR: `2.3 Pensão` (verificar se existe)
4. Criar classificador "Pensão por Morte"
5. Salvar como NOVA regra

---

### ⚠️ Regra 11 - LOAS (TRIA-01)

```yaml
Status: INATIVA
Localizador REMOVER: 2.3 GAB03-TR02 - 2.3 GAB3TR02 - PETIÇÃO INICIAL
Localizador INCLUIR: 2.3 LOAS - BENEFÍCIO ASSISTENCIAL
Tipo de Controle: Por Data / Todos os dias
Juízo: 2ª Turma Recursal - 3º Juiz Relator (RJ)
```

**Assuntos Visíveis:**
- Deficiente
- Benefício Assistencial (Art. 203,V CF/88)
- DIREITO ASSISTENCIAL

**Diagnóstico (PARCIAL - aguardando extração completa):**
- ✅ **LOCALIZADORES CONFIGURADOS**: Origem e destino corretos
- ✅ **ASSUNTOS APARENTEMENTE OK**: Relacionados a LOAS/BPC
- ❓ **CLASSIFICADOR**: Precisa verificar (provavelmente "Nenhum")
- ❓ **TOTAL DE ASSUNTOS**: Precisa extrair quantidade exata
- 🎯 **PRIORIDADE**: ALTA - Aparenta estar bem configurada

**Ação Pendente:**
- Extrair dados completos (total de assuntos, classificador)
- Se tiver assuntos configurados, criar apenas classificador
- Se não tiver assuntos, reconstruir

---

## Regras Pendentes de Exploração

### 🔍 Regra 12 - Benefício Incapacidade (TRIA-04)
**Status:** Não explorada ainda

**Ação:** Explorar via subagente ou navegação manual

---

### 🔍 Regra 13 - Tema 1.102/STF (SUSP-01)
**Status:** Não explorada ainda

**Ação:** Explorar via subagente ou navegação manual

---

## Matriz de Decisão (Atualizada)

| Regra | Assuntos | Localizadores | Classificador | Status Config | Ação Necessária |
|-------|----------|---------------|---------------|---------------|-----------------|
| **10** (Pensão) | ❌ 0 | ❌ Vazios | ❌ Nenhum | VAZIA | **RECONSTRUIR** do zero |
| **11** (LOAS) | ⚠️ A verificar | ✅ OK | ❓ Verificar | PARCIAL | Verificar + criar classificador |
| **12** (Incapacidade) | ❓ | ❓ | ❓ | ❓ | **EXPLORAR** |
| **13** (Tema 1.102) | ❓ | ❓ | ❓ | ❓ | **EXPLORAR** |
| **14** (Ap. Especial) | ✅ 40 | ✅ OK | ❌ Nenhum | BOA | **CRIAR CLASSIFICADOR** |

---

## Padrão Identificado

**Causa Principal de Inatividade:** Falta de Classificador por Conteúdo

- Regra 14: ✅ Bem configurada, só falta classificador
- Regra 10: ❌ Completamente vazia (caso extremo)
- Regra 11: ⚠️ Parcialmente configurada, provavelmente falta classificador

**Hipótese:** As regras 12 e 13 provavelmente também estão inativas por falta de classificador, mas podem ter assuntos configurados.

---

## Próximos Passos

1. ✅ **Login no Eproc** - Sessão expirou, precisa autenticar novamente
2. 🔍 **Explorar Regra 12** - Benefício Incapacidade
3. 🔍 **Explorar Regra 13** - Tema 1.102/STF
4. 📝 **Consolidar dados completos** de todas as 5 regras
5. 🎯 **Criar plano de implementação** priorizado

---

## Recomendações de Eficiência

- **Usar subagentes** para exploração das Regras 12 e 13 (economia de contexto)
- **Navegação via menu** ao invés de URLs diretas (evita erro "Link sem assinatura")
- **Extração JavaScript** quando possível para dados estruturados
