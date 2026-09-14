// orchestrationLearningFlow.js - Trilha Completa de Aprendizado de Orquestração de IA
// Baseado em arquiteturas de ponta de multiagentes e no deep dive do vídeo de Kauã Miguel:
// "Pare de Usar 1 Agente de IA Por Vez: Orquestre Agentes de IA" (https://youtu.be/8jvrucR7QCU)

export const orchestrationStages = [
  { id: 'fase-1', name: 'Fase 1: O Gargalo do Agente Único', color: '#ef4444', icon: '⚠️' },
  { id: 'fase-2', name: 'Fase 2: Decomposição & Orquestrador', color: '#f59e0b', icon: '🧠' },
  { id: 'fase-3', name: 'Fase 3: Isolamento com Git Worktree', color: '#10b981', icon: '🌳' },
  { id: 'fase-4', name: 'Fase 4: Especialização & Paralelismo', color: '#3b82f6', icon: '⚡' },
  { id: 'fase-5', name: 'Fase 5: Crítica, Consenso & Testes', color: '#8b5cf6', icon: '🛡️' },
  { id: 'fase-6', name: 'Fase 6: Convergência & Merge Seguro', color: '#06b6d4', icon: '🔀' },
  { id: 'fase-7', name: 'Fase 7: Produção & Ecossistema ADE', color: '#ec4899', icon: '🚀' }
];

export const orchestrationLearningNodes = [
  {
    id: "single-agent-limits",
    stageId: "fase-1",
    stageName: "Fase 1: O Gargalo do Agente Único",
    stepNumber: 1,
    title: "1. O Limite do Agente Serial & Saturação de Contexto",
    category: "Gargalos de Arquitetura",
    icon: "🛑",
    color: "#ef4444",
    summary: "Colocar frontend, backend, banco e testes no mesmo chat satura a janela de contexto e induz alucinações irreversíveis.",
    signalToNext: "⚡ Detecção de Saturação de Contexto",
    details: {
      conceito: "Quando um único agente LLM é encarregado de construir um sistema inteiro em um único chat, a janela de contexto acumula centenas de milhares de tokens irrelevantes. Isso degrada a atenção do modelo (context drift), faz com que ele esqueça regras estipuladas no início da sessão e aumenta a taxa de alucinação de código em até 60%.",
      comparacao: {
        tradicional: "1 chat serial aberto onde o desenvolvedor cola erros de terminal, pede refatorações de CSS e scripts de SQL juntos.",
        orquestrado: "Divisão do problema em subdomínios restritos onde cada agente recebe apenas os tokens estritamente relevantes para seu escopo."
      },
      codigoPratico: {
        tipo: "Prompt Problemático (Anti-Padrão)",
        snippet: `// ANTI-PADRÃO: Prompt sobrecarregado para 1 único agente
"Você é um engenheiro full-stack. Crie o schema PostgreSQL de autenticação, 
a API Express com JWT, a interface React com Tailwind, configure os testes 
Jest e corrija esse erro de TypeScript que acabou de acontecer no build..."
// Consequência: O modelo perde o foco, esquece validações e gera código inconsistente.`
      },
      insightVideo: "Como pontuado por Kauã Miguel: 'A IA não cansa, quem cansa é o humano tentando coordenar na mão um agente sobrecarregado que começa a esquecer instruções anteriores.'",
      ferramentas: ["ChatGPT UI", "Claude Chat", "Copilot Chat"]
    }
  },
  {
    id: "human-bottleneck-alt-tab",
    stageId: "fase-1",
    stageName: "Fase 1: O Gargalo do Agente Único",
    stepNumber: 2,
    title: "2. O Gargalo Humano e o 'Alt-Tab Hell'",
    category: "Problema Operacional",
    icon: "🔄",
    color: "#f87171",
    summary: "Se o desenvolvedor precisa trocar de aba manualmente a cada mensagem gerada, a IA passa mais tempo esperando o humano do que trabalhando.",
    signalToNext: "⚡ Transição para Orquestração Autônoma",
    details: {
      conceito: "No fluxo não-orquestrado, o desenvolvedor atua como o roteador humano de pacotes: copia a saída do terminal, cola no chat do agente A, copia o código gerado, cola no editor, roda o linter, copia o erro, cola no agente B. A velocidade do desenvolvimento fica limitada à agilidade motora do desenvolvedor.",
      comparacao: {
        tradicional: "Desenvolvedor preso em alternância de janelas (Alt-Tab Hell) gerenciando conversas síncronas manuais.",
        orquestrado: "Um orquestrador automatiza o ciclo de retroalimentação: o agente executa, lê o stderr e se auto-corrige em background."
      },
      codigoPratico: {
        tipo: "Métrica de Eficiência",
        snippet: `# CÁLCULO DE LATÊNCIA OPERACIONAL
Tempo de resposta do LLM: ~5 a 15 segundos
Tempo de leitura e cópia humana (Alt-Tab): ~45 a 120 segundos
Gargalo real: 85% do tempo do projeto é desperdiçado em fricção operacional!`
      },
      insightVideo: "O desenvolvedor deve atuar como Diretor de Orquestra ou Scrum Master de IA, e não como estafeta que carrega mensagens de um terminal para outro.",
      ferramentas: ["Terminais Múltiplos", "Tmux Manual", "Alethe Remote Control"]
    }
  },
  {
    id: "task-decomposition-dag",
    stageId: "fase-2",
    stageName: "Fase 2: Decomposição & Orquestrador",
    stepNumber: 3,
    title: "3. Decomposição de Tarefas em Grafo DAG",
    category: "Planejamento Cognitivo",
    icon: "🗺️",
    color: "#f59e0b",
    summary: "O orquestrador recebe o objetivo macro e gera um Grafo Acíclico Dirigido (DAG) desacoplando dependências paralelas.",
    signalToNext: "⚡ Grafo de Subtarefas Desacopladas (DAG)",
    details: {
      conceito: "Em vez de executar código impulsivamente, um agente planejador (Lead Planner) analisa o pedido e constrói um DAG (Directed Acyclic Graph). Tarefas independentes (ex: criar schema de banco e criar mockups de UI) são marcadas como paralelas; tarefas dependentes (ex: integrar API no frontend) aguardam os nós pais.",
      comparacao: {
        tradicional: "Execução linear tentativa-e-erro sem plano formal de dependências.",
        orquestrado: "Planejamento explícito com DAG estruturado em JSON com nós, dependências, critérios de sucesso e arquivos afetados."
      },
      codigoPratico: {
        tipo: "Estrutura JSON de Decomposição DAG",
        snippet: `{
  "projectId": "auth-system",
  "dag": [
    { "id": "task-db", "role": "db-specialist", "dependsOn": [] },
    { "id": "task-ui-tokens", "role": "front-specialist", "dependsOn": [] },
    { "id": "task-backend-api", "role": "api-specialist", "dependsOn": ["task-db"] },
    { "id": "task-qa-e2e", "role": "qa-specialist", "dependsOn": ["task-backend-api", "task-ui-tokens"] }
  ]
}`
      },
      insightVideo: "A decomposição clara evita que agentes comecem a codificar partes do sistema antes dos contratos de dados estarem definidos.",
      ferramentas: ["LangGraph", "LlamaIndex Workflows", "Antigravity Plan Engine"]
    }
  },
  {
    id: "orchestrator-dispatch",
    stageId: "fase-2",
    stageName: "Fase 2: Decomposição & Orquestrador",
    stepNumber: 4,
    title: "4. Padrão Orchestrator-Workers & Despacho",
    category: "Coordenação Hierárquica",
    icon: "👑",
    color: "#fbbf24",
    summary: "O Agente Orquestrador supervisiona o ciclo de vida dos agentes trabalhadores (workers), alocando escopo estrito.",
    signalToNext: "⚡ Ordens de Despacho para Subagentes",
    details: {
      conceito: "O orquestrador atua como o Maestro da arquitetura: ele não implementa código linha por linha; sua responsabilidade é instanciar agentes especializados, fornecer o prompt com o contrato da tarefa, monitorar o progresso, recuperar erros e coordenar a montagem das entregas.",
      comparacao: {
        tradicional: "Agente monolítico que tenta tomar decisões de arquitetura e ao mesmo tempo formatar CSS.",
        orquestrado: "Separação de responsabilidades: Agente Orquestrador focado em governança; Workers especializados focados em execução."
      },
      codigoPratico: {
        tipo: "Assinatura do Orquestrador (Python / Pseudocódigo)",
        snippet: `class Orchestrator:
    def dispatch(self, task: Task):
        worker = self.spawn_agent(role=task.role, model=task.preferred_model)
        isolated_env = self.worktree_manager.create_isolated_workspace(task.id)
        result = worker.execute(task=task, cwd=isolated_env)
        return self.critic.audit(result)`
      },
      insightVideo: "No vídeo de Kauã Miguel, ferramentas como Orca e CodeAgentSwarm usam essa lógica para manter painéis onde cada worker tem seu backlog exclusivo.",
      ferramentas: ["Orca", "CodeAgentSwarm", "AutoGPT Forge", "CrewAI"]
    }
  },
  {
    id: "file-collision-problem",
    stageId: "fase-3",
    stageName: "Fase 3: Isolamento com Git Worktree",
    stepNumber: 5,
    title: "5. O Problema Fatal da Colisão de Arquivos",
    category: "Engenharia de Concorrência",
    icon: "💥",
    color: "#ef4444",
    summary: "Se múltiplos agentes operam na mesma pasta física, um sobrescreve silenciosamente o código do outro, corrompendo o projeto.",
    signalToNext: "⚡ Alerta Crítico: Necessidade de Isolamento Físico",
    details: {
      conceito: "Quando 2 ou mais agentes trabalham concorrentemente em um único diretório de repositório, ocorre a clássica condição de corrida (Race Condition): o Agente A salva `routes.ts`, o Agente B simultaneamente escreve sua versão de `routes.ts`, apagando todas as funções geradas pelo Agente A. O desenvolvedor só descobre o desastre quando a aplicação não compila.",
      comparacao: {
        tradicional: "Vários agentes ou abas de terminal rodando no mesmo diretório local `C:\\projeto`.",
        orquestrado: "Cada agente trabalha em um diretório físico totalmente independente através de Git Worktrees apontando para branches segregadas."
      },
      codigoPratico: {
        tipo: "Cenário de Desastre (Sem Isolamento)",
        snippet: `// Linha do tempo da colisão:
10:00:01 - Agente Frontend cria export function UserList() em components.tsx
10:00:03 - Agente Auth modifica components.tsx adicionando LoginForm()
10:00:04 - Agente Auth SOBRESCREVE o arquivo inteiro!
Resultado: UserList() desapareceu e o código do Agente Frontend foi perdido!`
      },
      insightVideo: "Kauã Miguel enfatiza enfaticamente este ponto: rodar múltiplos agentes em modo YOLO (sem confirmação) no mesmo repositório sem isolamento é receita garantida para dor de cabeça e perda de trabalho.",
      ferramentas: ["Git", "File Watchers", "Locking Mechanisms"]
    }
  },
  {
    id: "git-worktree-architecture",
    stageId: "fase-3",
    stageName: "Fase 3: Isolamento com Git Worktree",
    stepNumber: 6,
    title: "6. A Solução Definitiva: Isolamento via Git Worktree",
    category: "Engenharia de Software",
    icon: "🌳",
    color: "#10b981",
    summary: "O Git Worktree cria pastas físicas separadas ligadas ao mesmo banco de objetos do Git, permitindo edição simultânea e segura.",
    signalToNext: "⚡ Ambientes Físicos Isolados & Branches Segregadas",
    details: {
      conceito: "O Git Worktree permite ter múltiplos diretórios de trabalho (working trees) vinculados a um único repositório Git local. Cada agente recebe sua própria pasta física independente (`.worktrees/feature-api`, `.worktrees/feature-front`). Não há colisão de arquivos, travamento de lock ou conflito em tempo de escrita!",
      comparacao: {
        tradicional: "Fazer múltiplos clones pesados do repositório (`git clone`) duplicando dezenas de megabytes de histórico e `node_modules`.",
        orquestrado: "`git worktree add`: criação instantânea em milissegundos compartilhando o mesmo histórico `.git` central com isolamento absoluto de arquivos."
      },
      codigoPratico: {
        tipo: "Comandos Git Worktree Reais",
        snippet: `# Criação de worktrees dedicadas para agentes concorrentes
git worktree add .worktrees/agent-backend -b feat/backend-api
git worktree add .worktrees/agent-frontend -b feat/frontend-ui
git worktree add .worktrees/agent-qa -b feat/qa-validation

# Cada agente opera exclusivamente no seu diretório:
# Agente 1 trabalha em: /projeto/.worktrees/agent-backend
# Agente 2 trabalha em: /projeto/.worktrees/agent-frontend`
      },
      insightVideo: "O software Orca (onorca.dev) apresentado no vídeo utiliza exatamente Git Worktrees nos bastidores para orquestrar agentes sem colisão.",
      ferramentas: ["Git Worktree CLI", "Orca Native Worktree Engine", "Alethe Workspaces"]
    }
  },
  {
    id: "specialized-swarm-workers",
    stageId: "fase-4",
    stageName: "Fase 4: Especialização & Paralelismo",
    stepNumber: 7,
    title: "7. O Squad Especializado (Swarm de Especialistas)",
    category: "Execução Concorrente",
    icon: "👥",
    color: "#3b82f6",
    summary: "Agentes operam em paralelo sob personas especializadas: DB Architect, API Engineer, UI Specialist e QA Sentinel.",
    signalToNext: "⚡ Diffs e Artefatos Produzidos em Paralelo",
    details: {
      conceito: "Em vez de um agente generalista mediano, o orquestrador invoca modelos ajustados para cada papel: Claude 3.7 Sonnet para UI refinada e raciocínio complexo; GPT-4.5 / Codex para backend e lógica algorítmica; modelos rápidos para testes e linting. Cada agente possui seu próprio System Prompt especializado e ferramentas adequadas.",
      comparacao: {
        tradicional: "Um único prompt tentando ensinar React, SQL, Docker e testes simultaneamente.",
        orquestrado: "Squad de 4 a 6 agentes cirúrgicos, com foco restrito, operando concorrentemente em suas respectivas worktrees."
      },
      codigoPratico: {
        tipo: "Configuração do Squad",
        snippet: `[Squad de Agentes em Paralelo]
├── Worker 1 (UI Master)      -> Foco: Componentes Tailwind & Acessibilidade
├── Worker 2 (Backend Dev)    -> Foco: Rotas Express, JWT & Prisma ORM
├── Worker 3 (DB Architect)   -> Foco: Migrations SQL & Índices de Banco
└── Worker 4 (DevOps/Docs)    -> Foco: Dockerfile, Swagger & OpenAPI specs`
      },
      insightVideo: "No vídeo, Kauã compara essa divisão à estrutura de uma fábrica moderna de software: equipes paralelas que entregam suas partes prontas para montagem.",
      ferramentas: ["Claude Code", "Aider", "Codex CLI", "Claude Squad"]
    }
  },
  {
    id: "message-bus-mcp",
    stageId: "fase-4",
    stageName: "Fase 4: Especialização & Paralelismo",
    stepNumber: 8,
    title: "8. Barramento de Mensagens & Protocolo MCP",
    category: "Intercomunicação de Agentes",
    icon: "📡",
    color: "#60a5fa",
    summary: "Comunicação padronizada entre agentes via Barramento de Eventos e Model Context Protocol (MCP) para acesso seguro a ferramentas.",
    signalToNext: "⚡ Notificação de Conclusão de Tarefas para o Árbitro",
    details: {
      conceito: "Como os agentes trocam contratos e avisam quando suas APIs estão prontas? Através de um Barramento de Eventos (Event Bus) e do protocolo padronizado MCP (Model Context Protocol). O Agente Backend emite um evento `api:contracts:ready` com o schema OpenAPI; o Agente Frontend consome o evento e gera os types TypeScript correspondentes.",
      comparacao: {
        tradicional: "O usuário tem que avisar o agente frontend quais rotas o agente backend criou.",
        orquestrado: "Intercomunicação nativa (Agent-to-Agent - A2A) via JSON-RPC ou MCP Servers com validação de tipagem estrita."
      },
      codigoPratico: {
        tipo: "Evento de Comunicação entre Agentes",
        snippet: `// Evento emitido pelo Worker Backend no barramento
{
  "sender": "worker-backend",
  "recipient": "worker-frontend",
  "topic": "contracts_published",
  "payload": {
    "endpoint": "/api/v1/auth/login",
    "method": "POST",
    "schema": { "email": "string", "passwordHash": "string" }
  }
}`
      },
      insightVideo: "O protocolo MCP padroniza como agentes lêem bancos de dados, exploram arquivos e invocam ferramentas sem necessidade de scripts proprietários frágeis.",
      ferramentas: ["Model Context Protocol (MCP)", "Redis Pub/Sub", "RabbitMQ", "Kafka"]
    }
  },
  {
    id: "critic-arbiter-agent",
    stageId: "fase-5",
    stageName: "Fase 5: Crítica, Consenso & Testes",
    stepNumber: 9,
    title: "9. O Agente Crítico (Critic-Arbiter) e Linters",
    category: "Governança e Qualidade",
    icon: "🧐",
    color: "#8b5cf6",
    summary: "Nenhum código entra na branch principal sem passar pelo crivo de um Agente Revisor independente focado em segurança e padrões.",
    signalToNext: "⚡ Relatório de Auditoria de Código & Diffs",
    details: {
      conceito: "O modelo que escreve o código sofre do mesmo viés de confirmação que programadores humanos: ele tem dificuldade em enxergar seus próprios erros. O padrão Critic-Arbiter introduz um segundo agente cujo prompt instrui ser cético, caçar vulnerabilidades, avaliar violações de SOLID e rodar análise estática de tipos (TypeScript, ESLint, Ruff).",
      comparacao: {
        tradicional: "Confiança cega no código gerado pelo modelo sem nenhuma revisão intermediária.",
        orquestrado: "Revisão por pares automatizada: o Agente Crítico reprova o diff e envia feedback detalhado com linha e sugestão de correção."
      },
      codigoPratico: {
        tipo: "Prompt do Agente Crítico",
        snippet: `SYSTEM_PROMPT: "Você é o Agente Crítico de Segurança e Arquitetura.
Sua missão NÃO é criar código, mas auditar o git diff gerado pelo worker.
Verifique:
1. Há injeções de SQL ou segredos vazados no código?
2. A tipagem TypeScript possui 'any' desnecessário?
3. Se reprovar, gere um relatório de correção para o worker."`
      },
      insightVideo: "No vídeo de Kauã Miguel, a importância de checar os diffs é realçada: 'Você nunca deve dar merge cego em código sem que uma esteira ou árbitro tenha validado os testes.'",
      ferramentas: ["SonarQube", "ESLint", "Biome", "CodeQL"]
    }
  },
  {
    id: "automated-test-suite",
    stageId: "fase-5",
    stageName: "Fase 5: Crítica, Consenso & Testes",
    stepNumber: 10,
    title: "10. Bateria de Testes Automatizados (Pytest / Vitest)",
    category: "Verificação Empírica",
    icon: "🧪",
    color: "#a78bfa",
    summary: "A IA executa os testes unitários e de integração no terminal da worktree: verde avança, vermelho dispara auto-correção.",
    signalToNext: "⚡ Status dos Testes: 100% Passed (Verde)",
    details: {
      conceito: "A única garantia de que um código de IA funciona de verdade não são os textos amigáveis do chat, mas a execução empírica dos testes no terminal. A worktree do agente executa a suíte de testes isolada. Se houver falha, o traceback é injetado diretamente no contexto do agente para auto-correção imediata.",
      comparacao: {
        tradicional: "O desenvolvedor descobre os bugs dias depois em produção.",
        orquestrado: "Loop fechado de auto-reparo (Self-Correction Loop): o agente tenta até o comando `npm test` ou `pytest` retornar código 0."
      },
      codigoPratico: {
        tipo: "Loop de Auto-Correção por Terminal",
        snippet: `while attempts < max_retries:
    result = run_command("npm test", cwd=agent_worktree)
    if result.exit_code == 0:
        return "SUCCESS: Código 100% validado por testes!"
    else:
        # Alimenta o erro de volta para o agente
        agent.prompt(f"Os testes falharam com o erro: {result.stderr}. Corrija os arquivos.")
        attempts += 1`
      },
      insightVideo: "Testes automatizados são os guardrails fundamentais para liberar o desenvolvedor do medo de que a IA quebre funcionalidades existentes.",
      ferramentas: ["Vitest", "Jest", "Pytest", "Playwright"]
    }
  },
  {
    id: "semantic-conflict-resolution",
    stageId: "fase-6",
    stageName: "Fase 6: Convergência & Merge Seguro",
    stepNumber: 11,
    title: "11. Reconciliação Semântica e Resolução de Conflitos",
    category: "Integração Contínua",
    icon: "🔀",
    color: "#06b6d4",
    summary: "Antes do merge final, as alterações isoladas das branches de cada agente passam por reconciliação semântica de interfaces.",
    signalToNext: "⚡ Pull Request Validado & Sem Conflitos",
    details: {
      conceito: "Conflitos de merge tradicionais acontecem no nível de linha (Git diff). A orquestração moderna adiciona Reconciliação Semântica: um agente verifica se as funções exportadas pelo Backend casam precisamente com as chamadas feitas pelos componentes do Frontend criados na outra worktree.",
      comparacao: {
        tradicional: "Conflitos manuais resolvidos no VS Code com marcadores `<<<<<<< HEAD` pelo desenvolvedor.",
        orquestrado: "Um Agente de Reconciliação avalia os Pull Requests concorrentes e propõe a união das interfaces harmoniosamente."
      },
      codigoPratico: {
        tipo: "Checklist de Reconciliação",
        snippet: `# Validação Cruzada entre Worktrees:
[OK] /api/login schema bate com SignInForm.tsx
[OK] Nomes de variáveis de ambiente unificados no .env.example
[OK] Nenhuma migração de banco com ID duplicado
[OK] Zero conflitos sintáticos de Git na branch de integração`
      },
      insightVideo: "O uso de worktrees garante que a reconciliação aconteça em uma branch de staging ou PR intermediário, sem jamais tocar na branch de produção sem validação.",
      ferramentas: ["GitHub PRs", "Git Merge Tool", "Semantic Diffs"]
    }
  },
  {
    id: "safe-merge-main",
    stageId: "fase-6",
    stageName: "Fase 6: Convergência & Merge Seguro",
    stepNumber: 12,
    title: "12. Merge Seguro na Branch Main & Limpeza de Worktree",
    category: "Entrega Contínua",
    icon: "🛡️",
    color: "#22d3ee",
    summary: "Fusão atômica das features validadas na branch principal e desmontagem automática da worktree temporária.",
    signalToNext: "⚡ Release Integrada na Branch Main",
    details: {
      conceito: "Com todos os testes verdes e a auditoria do crítico aprovada, o orquestrador executa o merge atômico na branch `main` e remove a pasta de worktree temporária. O histórico de commits permanece limpo, com rastreabilidade de qual agente e modelo realizou cada entrega.",
      comparacao: {
        tradicional: "Commits desordenados com mensagens genéricas misturando 10 arquivos diferentes.",
        orquestrado: "Commits semânticos atômicos (`feat(auth): ...`), rastreáveis por subtarefa e worktree descartada após o sucesso."
      },
      codigoPratico: {
        tipo: "Desmontagem Segura da Worktree",
        snippet: `# Merge da branch validada na branch principal
git checkout main
git merge --no-ff feat/backend-api -m "feat(api): endpoints de autenticação via Agent 1"

# Desmontagem limpa da pasta de trabalho isolada
git worktree remove .worktrees/agent-backend`
      },
      insightVideo: "O ciclo se fecha: o repositório principal está atualizado, validado e limpo, sem lixo temporário.",
      ferramentas: ["Git CLI", "GitHub Actions", "GitLab CI"]
    }
  },
  {
    id: "cost-tokens-remote-control",
    stageId: "fase-7",
    stageName: "Fase 7: Produção & Ecossistema ADE",
    stepNumber: 13,
    title: "13. Monitoramento de Custos & Controle Remoto",
    category: "Operação e Observabilidade",
    icon: "📱",
    color: "#ec4899",
    summary: "Acompanhamento em tempo real de consumo de tokens por agente e controle remoto mobile com QR Code.",
    signalToNext: "⚡ Governança de Recursos & Autonomia",
    details: {
      conceito: "Rodar 4 a 8 agentes em paralelo consome tokens de API em larga escala. Sistemas modernos de orquestração implementam limitadores de orçamento (Token Budgets), prevenindo loops infinitos de custo, e permitem que o desenvolvedor acompanhe e aprove passos críticos pelo celular.",
      comparacao: {
        tradicional: "Surtos de fatura na OpenAI/Anthropic por agentes presos em loops de erro sem supervisão.",
        orquestrado: "Painel em tempo real de tokens/custo por tarefa + aprovação de diffs na palma da mão via app mobile."
      },
      codigoPratico: {
        tipo: "Monitoramento de Métricas",
        snippet: `[Dashboard de Orquestração em Tempo Real]
Worker UI:        42.150 tokens  | $0.12 | Status: Idle
Worker Backend:   89.300 tokens  | $0.27 | Status: Testing
Worker QA:        18.400 tokens  | $0.05 | Status: Complete
-----------------------------------------------------------
Total Gasto: $0.44 | Tempo Total: 2m 14s | Economia vs Dev Humano: ~90%`
      },
      insightVideo: "Na ferramenta Alethe (criada por Kauã Miguel) e na Orca, você escaneia um QR Code no terminal e acompanha o status de cada terminal pelo celular.",
      ferramentas: ["Alethe QR Remote", "Orca Mobile App", "OpenTelemetry", "Langfuse"]
    }
  },
  {
    id: "ecosystem-tools-ade",
    stageId: "fase-7",
    stageName: "Fase 7: Produção & Ecossistema ADE",
    stepNumber: 14,
    title: "14. O Ecossistema de ADEs (O Futuro da Programação)",
    category: "Maturidade Tecnológica",
    icon: "✨",
    color: "#f43f5e",
    summary: "Estamos na fase 'pré-VS Code' dos agentes de IA: a ascensão dos ADEs (Agent Development Environments).",
    signalToNext: "🏁 Ciclo Completo de Aprendizado de Orquestração",
    details: {
      conceito: "O IDE tradicional foi feito para humanos digitarem caracteres linha por linha. O ADE (Agent Development Environment) é construído desde o núcleo para humanos gerenciarem frotas de agentes autônomos. Ele combina visualização de worktrees, múltiplos terminais, barramento de eventos, chat supervisor e controle de consumo.",
      comparacao: {
        tradicional: "IDEs convencionais que adicionaram apenas uma caixa de chat na barra lateral direita.",
        orquestrado: "ADEs holísticos que orquestram dezenas de agentes concorrentes com isolamento, telemetria e integração contínua nativa."
      },
      codigoPratico: {
        tipo: "Panorama dos 4 Níveis de Orquestração",
        snippet: `Nível 1: Subagents no Chat (ex: Claude Code 'Agent', Antigravity)
Nível 2: Múltiplos Terminais CLI (ex: Claude Squad, Tmux scripts)
Nível 3: Workspace Apps (ex: Alethe com Remote Control, CodeAgentSwarm Kanban)
Nível 4: ADE Completo (ex: Orca onorca.dev, Maestro Infinite Canvas)`
      },
      insightVideo: "Kauã Miguel destaca que quem aprender a orquestrar agentes agora terá a mesma vantagem competitiva de quem dominou Git e Cloud no início dos anos 2010.",
      ferramentas: ["Orca (onorca.dev)", "Alethe (github.com/Kc1t/alethe-agents)", "CodeAgentSwarm", "Claude Squad", "Maestro"]
    }
  }
];

export const worktreeArchitectureModel = {
  mainRepo: "repositorio-central/ (branch: main)",
  worktrees: [
    {
      dir: ".worktrees/feature-db/",
      branch: "feat/database-schema",
      agent: "DB Architect",
      model: "Claude 3.7 Sonnet",
      status: "Finalizado",
      color: "#f59e0b",
      task: "Definição de tabelas, migrações SQL e índices relacionais."
    },
    {
      dir: ".worktrees/feature-backend/",
      branch: "feat/rest-api",
      agent: "Backend Engineer",
      model: "GPT-4.5 / Codex",
      status: "Em Execução (Testes)",
      color: "#3b82f6",
      task: "Criação de endpoints REST, autenticação JWT e validação Zod."
    },
    {
      dir: ".worktrees/feature-frontend/",
      branch: "feat/interactive-ui",
      agent: "UI Specialist",
      model: "Claude 3.7 Sonnet",
      status: "Em Execução (Estilos)",
      color: "#10b981",
      task: "Componentes React, estilização Tailwind e animações SVG."
    },
    {
      dir: ".worktrees/feature-qa/",
      branch: "feat/qa-sentinel",
      agent: "QA Sentinel (Critic)",
      model: "Gemini 2.5 Pro / Pytest",
      status: "Auditando Diffs",
      color: "#8b5cf6",
      task: "Suíte de testes de integração, linters e auditoria de segurança."
    }
  ]
};

export const orchestrationToolsData = [
  {
    id: "alethe",
    name: "Alethe",
    creator: "Kauã Miguel (Dev / Open Source)",
    type: "Terminal-Centric Agent Workspace",
    badge: "Open Source & Criador do Vídeo",
    repoUrl: "https://github.com/Kc1t/alethe-agents",
    highlight: "Interface limpa focada em terminais persistentes, controle de limites de tokens e remote control mobile via QR Code.",
    features: [
      "Foco total no terminal sem poluição visual excessiva",
      "Persistência de sessões para não perder o histórico de trabalho",
      "Monitoramento de atividade e limites de mensagens de Claude Code e Codex",
      "Remote control pelo smartphone através de QR Code dinâmico",
      "Agrupamento de múltiplos projetos simultâneos em 'Current View'",
      "100% Open Source com suporte a contribuições da comunidade"
    ],
    color: "#f59e0b"
  },
  {
    id: "orca",
    name: "Orca",
    creator: "Orca Team",
    type: "Full ADE (Agent Development Environment)",
    badge: "O Mais Completo (ADE)",
    repoUrl: "https://www.onorca.dev",
    highlight: "O verdadeiro ADE: une subagents cruzados entre modelos, Git Worktrees automáticos, visualização estilo VS Code e CLI.",
    features: [
      "Conceito formal de ADE (Agent Development Environment)",
      "Capacidade de encadeamento entre modelos diferentes (Claude chamando Codex, etc.)",
      "Gerenciamento nativo de Git Worktrees para isolamento de arquivos",
      "Interface rica com histórico de agentes, Explorer de arquivos, Git e Pull Requests",
      "Orca CLI para orquestração direta via terminal de comando",
      "App mobile para acompanhamento e controle remoto"
    ],
    color: "#3b82f6"
  },
  {
    id: "code-agent-swarm",
    name: "CodeAgentSwarm",
    creator: "CodeAgentSwarm",
    type: "Visual Desktop Workspace",
    badge: "Kanban Integrado",
    repoUrl: "https://www.codeagentswarm.com",
    highlight: "Ambiente desktop com Kanban visual para gerenciamento de backlog de tarefas e atribuição direta a agentes.",
    features: [
      "Quadro Kanban nativo para criar, mover e atribuir tarefas a agentes",
      "Visão de Product Owner / Scrum Master para frotas de agentes",
      "Painel de métricas de consumo de tokens por IA",
      "Interface desktop gráfica com visualização lado a lado",
      "Suporte a branches e controle de sessões"
    ],
    color: "#8b5cf6"
  },
  {
    id: "claude-squad",
    name: "Claude Squad",
    creator: "smtg-ai",
    type: "Terminal-Based Multi-Agent Manager",
    badge: "100% Terminal",
    repoUrl: "https://github.com/smtg-ai/claude-squad",
    highlight: "Gerenciamento direto no terminal para orquestrar agentes como Claude Code, Codex e Aider sem sobreposição.",
    features: [
      "Orquestração ágil diretamente no terminal",
      "Gerencia múltiplos agentes (Claude Code, Codex, Aider)",
      "Separação das áreas de trabalho para evitar conflitos",
      "Leve, rápido e sem sobrecarga de interfaces pesadas",
      "Totalmente voltado para entusiastas de CLI"
    ],
    color: "#10b981"
  },
  {
    id: "maestro",
    name: "Maestro",
    creator: "The Maestri Team",
    type: "Infinite Canvas Workspace (macOS)",
    badge: "Canvas Infinito",
    repoUrl: "https://themaestri.app",
    highlight: "Canvas infinito estilo Figma/Canva onde você organiza terminais de agentes visualmente no espaço 2D.",
    features: [
      "Mesa de trabalho visual infinita com zoom e pan livre",
      "Disposição espacial intuitiva de múltiplos fluxos de trabalho de IA",
      "Design de ponta com foco em experiência de usuário",
      "Referência visual de organização espacial para novas ferramentas"
    ],
    color: "#ec4899"
  }
];
