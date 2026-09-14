# Regra de Projeto: Zero Meta-Prompt Leakage na Interface do Usuário (Clean UI)

## Diretriz Primária e Inegociável

> **NUNCA ESCREVA NA TELA DOS PROJETOS AQUILO QUE O USUÁRIO PEDIU PARA QUE VOCÊ FIZESSE.**

Ao desenvolver, modificar ou refatorar interfaces visuais (HTML, React, Vue, CSS, Mobile, Desktop ou Web), o assistente está estritamente proibido de incluir textos, badges, alertas, banners, subtítulos ou placeholders que ecoem os pedidos ou comandos do desenvolvedor/usuário.

---

## 1. Princípio do Design Nativo e Profissional

- **Aparência Autêntica**: A interface visual de qualquer projeto deve parecer que foi desenhada daquela maneira desde o primeiro dia.
- **Perspectiva do Usuário Final**: Todo elemento visível na tela deve fazer sentido exclusivamente para o usuário final do produto, e nunca como um relatório de tarefas executadas pela IA.
- **Proibição de Meta-Comentários**: Nenhuma tela deve conter textos que expliquem o que foi adicionado, removido ou alterado a pedido do prompt.

---

## 2. Exemplos Práticos: O que NUNCA Fazer vs O que Fazer

| Situação / Pedido do Usuário | ❌ ANTI-PADRÃO (PROIBIDO NA TELA) | ✅ PADRÃO CORRETO (PROFISSIONAL) |
| :--- | :--- | :--- |
| *"Remova o botão de play e deixe animando"* | `'Animação ativa (Sem botão Play)'` ou `'Versão sem botão de play'` | `'Fluxo em Tempo Real'` ou apenas a animação fluindo naturalmente. |
| *"Mude a cor do botão para verde"* | `'Novo botão verde atualizado'` | `'Confirmar'`, `'Salvar'` (apenas com o estilo verde aplicado). |
| *"Remova o modo escuro e deixe apenas claro"* | `'Modo escuro removido a pedido'` | Interface no tema claro sem menção a remoções. |
| *"Foque o projeto apenas no vídeo do Kauã"* | `'Projeto alterado conforme pedido pelo usuário'` | Título e conteúdo oficiais do produto, sem meta-justificativas. |
| *"Adicione suporte a exportação CSV"* | `'Funcionalidade solicitada: Exportar CSV'` | `'Exportar Relatório (.csv)'`. |

---

## 3. Checklist Obrigatório Pré-Entrega de Interface

Antes de finalizar qualquer modificação em arquivos de interface (`.html`, `.jsx`, `.tsx`, `.vue`, `.js`, etc.):

1. [ ] Nenhum texto na tela contém palavras como: *"removido"*, *"sem botão X"*, *"a pedido do usuário"*, *"conforme solicitado"*, *"versão nova sem Y"*.
2. [ ] Nenhum badge, título ou rodapé revela as instruções fornecidas no prompt.
3. [ ] Todos os textos são 100% profissionais, nativos e voltados ao produto final.
