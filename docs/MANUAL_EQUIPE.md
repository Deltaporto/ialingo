# Manual da Equipe e FAQ

## Glossário Rápido

| Localizador | O que é | Ação |
| :--- | :--- | :--- |
| **2.3 TRIAGEM - Geral** | Entrada de novos processos. | Nenhuma (Robô age aqui). |
| **2.3 ASSUNTO - ...** | Identidade fixa do processo. | **Nunca remover.** |
| **2.3 MESA - [Nome]** | Processo em trabalho. | Adicionar quando puxar. |

---

## Procedimentos Operacionais

### 1. Puxar Processo para Trabalhar
1.  Filtre por `2.3 PRAZO - Urgente` ou `2.3 ASSUNTO`.
2.  Altere o localizador:
    *   **INCLUIR:** `2.3 MESA - [Seu Nome]`.
    *   **MANTER:** `2.3 ASSUNTO - [Tema]`.
    *   **MANTER:** `2.3 PRAZO - ...`.

### 2. Entregar Minuta
1.  Altere o localizador:
    *   **REMOVER:** `2.3 MESA - [Seu Nome]`.
    *   **INCLUIR:** `2.3 GABINETE - Minutados`.
    *   **MANTER:** `2.3 ASSUNTO - [Tema]`.

### 3. Devolver com Ajustes (Juiz)
1.  Altere o localizador:
    *   **REMOVER:** `2.3 GABINETE - Minutados`.
    *   **INCLUIR:** `2.3 GABINETE - Ajustes` + `2.3 MESA - [Nome Assessor]`.

### 4. Suspender (Tema Repetitivo)
1.  Altere o localizador:
    *   **ADICIONAR:** `2.3 SUSPENSO - Tema [X]`.
    *   **REMOVER:** Todos os `2.3 PRAZO - ...`.
    *   **MANTER:** `2.3 ASSUNTO - [Tema]`.

---

## Solução de Problemas (Troubleshooting)

### Regra não está movendo processos
*   **Causa:** Filtro de Juízo incompleto ou regra inativa.
*   **Solução:** Verifique se o filtro é exatamente "2ª Turma Recursal - 3º Juiz Relator".

### Processos movidos mais de uma vez (loop)
*   **Causa:** Tipo de controle configurado como "Por Data".
*   **Solução:** Alterar para **"Por Tempo no localizador" (0-1 dias)**. Isso garante execução única.

### Não encontro o código do assunto
*   **Solução:** Use `Ctrl+F` no navegador dentro do dropdown de assuntos do eproc, pois a lista não está em ordem alfabética perfeita. Códigos úteis: `2311` (LOAS Deficiente), `1178` (Ap. Especial), `3118` (Rev. Vida Toda).
