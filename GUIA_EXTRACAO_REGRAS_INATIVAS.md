# Guia de Extração Manual - Regras Inativas

**Data:** 28/12/2024
**Objetivo:** Coletar informações completas das Regras 10, 11, 12 e 13

---

## Procedimento para Cada Regra

### Para Cada Regra Inativa (10, 11, 12, 13):

1. **Acesse a lista de automações**
   - URL: `https://eproc.jfrj.jus.br/eproc/controlador.php?acao=automatizar_localizadores`

2. **Clique no ícone de editar (lápis) da regra**

3. **Cole este código JavaScript no console do browser:**

```javascript
// COLE ESTE CÓDIGO NO CONSOLE DO BROWSER (F12)
const extrairRegra = () => {
  const regra = {
    numero: parseInt(document.querySelector('h1')?.textContent.match(/\d+/)?.[0]),

    // Status
    ativa: document.querySelector('input[name*="ativa"], input[name*="Ativa"]')?.checked || false,

    // Localizadores
    removerTexto: document.querySelector('select[id*="remover"] option:checked, div[id*="remover"] option:checked')?.textContent?.trim() || 'Não encontrado',
    incluirTexto: document.querySelector('select[id*="incluir"] option:checked, div[id*="incluir"] option:checked')?.textContent?.trim() || 'Não encontrado',

    // Assuntos (CRÍTICO!)
    totalAssuntos: document.querySelector('button[id*="assunto"]')?.textContent?.match(/\d+/)?.[0] || '0',
    assuntos: Array.from(document.querySelectorAll('select[id*="assunto"] option:checked')).map(o => ({
      codigo: o.value,
      nome: o.textContent.trim()
    })),

    // Classificador (CRÍTICO!)
    classificadorSelecionado: document.querySelector('select[id*="classificador"] option:checked')?.textContent?.trim() || 'Nenhum',
    classificadorId: document.querySelector('select[id*="classificador"] option:checked')?.value || 'n/a',

    // Tipo de controle
    tipoControle: document.querySelector('select[id*="tipo"][id*="controle"] option:checked')?.textContent?.trim(),
    periodicidade: document.querySelector('select[id*="data"][id*="controle"] option:checked')?.textContent?.trim()
  };

  // Imprimir resultado formatado
  console.log('='.repeat(80));
  console.log(`REGRA ${regra.numero}`);
  console.log('='.repeat(80));
  console.log(`Status: ${regra.ativa ? 'ATIVA' : 'INATIVA'}`);
  console.log(`Total de Assuntos: ${regra.totalAssuntos}`);
  console.log(`Classificador: ${regra.classificadorSelecionado}`);
  console.log(`Classificador ID: ${regra.classificadorId}`);
  console.log('');
  console.log('LOCALIZADORES:');
  console.log(`  REMOVER: ${regra.removerTexto}`);
  console.log(`  INCLUIR: ${regra.incluirTexto}`);
  console.log('');
  console.log('TIPO DE CONTROLE:');
  console.log(`  Tipo: ${regra.tipoControle}`);
  console.log(`  Periodicidade: ${regra.periodicidade}`);
  console.log('');
  console.log('ASSUNTOS SELECIONADOS:');
  regra.assuntos.forEach((a, i) => {
    console.log(`  ${i+1}. [${a.codigo}] ${a.nome}`);
  });
  console.log('='.repeat(80));

  return regra;
};

// Executar
const resultado = extrairRegra();

// Copiar para clipboard (para colar no documento)
copy(JSON.stringify(resultado, null, 2));
console.log('✅ Dados copiados para clipboard! Cole no documento.');

resultado;
```

4. **Copie a saída do console**

5. **Cole no template abaixo**

---

## Template de Documentação por Regra

### Regra 10 - Pensão (TRIA-05)

```yaml
Número: 10
Status: [ATIVA/INATIVA]
Total de Assuntos: [número]
Classificador: [nome ou "Nenhum"]
Classificador ID: [id ou "n/a"]

LOCALIZADORES:
  REMOVER: [texto]
  INCLUIR: [texto]

TIPO DE CONTROLE:
  Tipo: [tipo]
  Periodicidade: [periodicidade]

ASSUNTOS SELECIONADOS:
  [colar lista de assuntos aqui]
```

**Análise:**
- [ ] Assuntos cobrem pensão por morte?
- [ ] Tem classificador vinculado?
- [ ] Se sim, qual o nome?
- [ ] Localizador destino existe?

**Decisão:**
- [ ] REATIVAR imediatamente
- [ ] Criar classificador primeiro
- [ ] Ajustar assuntos antes

---

### Regra 11 - LOAS (TRIA-01)

```yaml
Número: 11
Status: [ATIVA/INATIVA]
Total de Assuntos: [número]
Classificador: [nome ou "Nenhum"]
Classificador ID: [id ou "n/a"]

LOCALIZADORES:
  REMOVER: [texto]
  INCLUIR: [texto]

TIPO DE CONTROLE:
  Tipo: [tipo]
  Periodicidade: [periodicidade]

ASSUNTOS SELECIONADOS:
  [colar lista de assuntos aqui]
```

**Análise:**
- [ ] Assuntos cobrem LOAS/BPC/Deficiente?
- [ ] Tem classificador vinculado?
- [ ] Se sim, qual o nome?
- [ ] Localizador destino: "2.3 LOAS - BENEFÍCIO ASSISTENCIAL"?

**Decisão:**
- [ ] REATIVAR imediatamente
- [ ] Criar classificador primeiro
- [ ] Ajustar assuntos antes

---

### Regra 12 - Benefício Incapacidade (TRIA-04)

```yaml
Número: 12
Status: [ATIVA/INATIVA]
Total de Assuntos: [número]
Classificador: [nome ou "Nenhum"]
Classificador ID: [id ou "n/a"]

LOCALIZADORES:
  REMOVER: [texto]
  INCLUIR: [texto]

TIPO DE CONTROLE:
  Tipo: [tipo]
  Periodicidade: [periodicidade]

ASSUNTOS SELECIONADOS:
  [colar lista de assuntos aqui]
```

**Análise:**
- [ ] Assuntos cobrem auxílio-doença e aposentadoria por invalidez?
- [ ] Tem classificador vinculado?
- [ ] Se sim, qual o nome?
- [ ] Localizador destino: "2.3 Benefício Incapacidade"?

**Decisão:**
- [ ] REATIVAR imediatamente
- [ ] Criar classificador primeiro
- [ ] Ajustar assuntos antes

---

### Regra 13 - Tema 1.102/STF (SUSP-01)

```yaml
Número: 13
Status: [ATIVA/INATIVA]
Total de Assuntos: [número]
Classificador: [nome ou "Nenhum"]
Classificador ID: [id ou "n/a"]

LOCALIZADORES:
  REMOVER: [texto]
  INCLUIR: [texto]

TIPO DE CONTROLE:
  Tipo: [tipo]
  Periodicidade: [periodicidade]

ASSUNTOS SELECIONADOS:
  [colar lista de assuntos aqui]
```

**Análise:**
- [ ] Assuntos cobrem revisão de benefício?
- [ ] Tem classificador vinculado?
- [ ] Se sim, qual o nome e filtro?
- [ ] Localizador destino: "2.3 tema 1.102/STF - Suspensos"?
- [ ] Tema 1.102/STF ainda está suspenso?

**Decisão:**
- [ ] REATIVAR imediatamente
- [ ] Criar classificador primeiro
- [ ] Verificar status do tema no STF
- [ ] Ajustar assuntos antes

---

## Checklist Geral

### Para CADA regra documentada:

- [ ] Número da regra confirmado
- [ ] Status (ativa/inativa) anotado
- [ ] Total de assuntos anotado
- [ ] Lista de assuntos completa copiada
- [ ] Classificador identificado (nome + ID)
- [ ] Localizadores confirmados
- [ ] Tipo de controle anotado
- [ ] Decisão tomada (reativar/criar classificador/ajustar)

---

## Após Coletar TODAS as 4 Regras

### Criar Documento Consolidado

Junte todas as informações em um único documento:

```
REGRAS_INATIVAS_COMPLETO.md

Contendo:
1. Sumário executivo
2. Comparação das 5 regras (10, 11, 12, 13, 14)
3. Matriz de decisão (qual reativar primeiro)
4. Classificadores necessários
5. Plano de implementação
```

### Matriz de Decisão

| Regra | Classificador Existe? | Assuntos OK? | Prioridade | Ação |
|-------|----------------------|--------------|------------|------|
| 10 (Pensão) | ? | ? | Média | ? |
| 11 (LOAS) | ? | ? | ALTA | ? |
| 12 (Incapacidade) | ? | ? | ALTA | ? |
| 13 (Tema 1.102) | ? | ? | ALTA | ? |
| 14 (Ap. Especial) | ❌ NÃO | ✅ SIM | ALTA | Criar classificador |

---

## Alternativa: Exportar Via Interface

Se o JavaScript não funcionar, você também pode:

1. **Tirar screenshots de cada seção:**
   - Localizadores (REMOVER + INCLUIR)
   - Filtros de Assunto (clicar no botão "X de 2169 selecionados")
   - Classificação por Conteúdo
   - Tipo de Controle

2. **Anotar manualmente:**
   - Usar template acima
   - Preencher com informações dos screenshots

---

## Observações Importantes

### Campo "Assunto"

- **Crítico:** Este campo mostra "X de 2169 selecionados"
- **Clicar no botão/dropdown** para ver quais estão selecionados
- **Copiar TODOS os assuntos** para análise
- Assuntos determinam qual tipo de processo a regra pega

### Campo "Classificador por Conteúdo"

- **Crítico:** Este é o motivo das regras estarem inativas
- Se aparecer "Nenhum selecionado" ou dropdown vazio = precisa criar
- Se aparecer um nome = verificar se classificador está ativo
- Sem classificador, regra não funciona (apenas filtro de assunto não basta)

### Comportamento do Localizador

- Verificar se é "Remover do(s) localizador(es) informado(s)"
- Ou "Remover de TODOS"
- Ou "NÃO remover"

---

## Próximos Passos Após Coleta

1. **Analisar padrões** entre as 5 regras
2. **Identificar classificadores** que precisam ser criados
3. **Priorizar reativação** (qual fazer primeiro)
4. **Criar classificadores faltantes**
5. **Reativar regras** uma por vez
6. **Monitorar resultados**

---

**Este guia garante que coletamos TODAS as informações necessárias para reativar as regras inativas de forma segura e eficiente.**
