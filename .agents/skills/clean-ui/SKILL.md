---
name: clean-ui
description: >-
  Diretriz mandatória de Clean UI e Zero Meta-Prompt Leakage. Use sempre ao gerar,
  editar ou refatorar interfaces (HTML, React, CSS, Mobile, Web) para garantir que
  nenhuma solicitação, comando ou instrução do prompt do usuário seja escrita na tela.
---

# Clean UI: Zero Meta-Prompt Leakage

## Regra Fundamental

> **NUNCA ESCREVA NA TELA DOS PROJETOS AQUILO QUE O USUÁRIO PEDIU PARA QUE VOCÊ FIZESSE.**

Interfaces gráficas devem ser limpas, profissionais e desenhadas exclusivamente sob a perspectiva do usuário final da aplicação.

---

## Diretrizes de Execução

1. **Zero Meta-Textos**:
   - Não use termos como `(Sem botão X)`, `Conforme solicitado`, `Pedido pelo usuário`, `Versão sem Y`, `Removido a pedido`.
2. **Design Nativo**:
   - Componentes adicionados ou removidos devem parecer planejados nativamente desde a concepção do produto.
3. **Auditoria Visual Pré-Commit**:
   - Antes de entregar, leia todos os textos renderizados na UI e assegure que nenhum detalhe de prompt ou conversa interna vazou para os elementos visuais.
