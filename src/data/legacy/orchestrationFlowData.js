// orchestrationFlowData.js - Orquestração de Múltiplos Agentes de IA
// Baseado nas melhores práticas e no deep dive do vídeo de Kauã Miguel:
// "Pare de Usar 1 Agente de IA Por Vez: Orquestre Agentes de IA" (https://youtu.be/8jvrucR7QCU)

export const orchestrationFlowSteps = [
  {
    id: "single-agent-bottleneck",
    title: "1. O Gargalo do Agente Único (Serialização)",
    category: "O Problema da Concorrência",
    summary: "Um único agente tentando fazer tudo sobrecarrega a janela de contexto e transforma o humano no gargalo.",
    color: "#ef4444",
    details: {
      conceito: "A IA não cansa, quem cansa é o desenvolvedor que só consegue gerenciar um terminal ou chat de cada vez. Quando atribuímos frontend, backend, banco de dados e testes a um único agente, seu contexto satura, alucinações disparam e o processo se torna dolorosamente lento e serial.",
      sintomas: [
        "Saturação da Janela de Contexto: Perda de instruções anteriores ao longo da conversa",
        "Gargalo Humano: O desenvolvedor fica preso em 'alt-tab' alternando chats manuais",
        "Risco de Alucinação Cruzada: Confusão de escopo entre regras de banco e estilos visuais",
        "Execução Serial Ineficiente: Testes esperam o backend terminar, que espera o frontend"
      ],
      insightChave: "Orquestrar vem da metáfora da orquestra: em vez de um único músico tentar tocar todos os instrumentos, especialistas tocam juntos em sincronia sob uma regência coordenada."
    }
  },
  {
    id: "orchestration-spectrum",
    title: "2. O Espectro da Orquestração (Do Simples ao Complexo)",
    category: "Níveis de Arquitetura",
    summary: "A orquestração não é binária: vai desde subagents nativos até ADEs (Agent Development Environments) completos.",
    color: "#3b82f6",
    details: {
      conceito: "Orquestrar agentes abrange um espectro contínuo de complexidade e maturidade de ferramentas:",
      niveis: [
        "Nível 1 - Subagents Nativos: Um agente raiz (ex: Claude Code, Antigravity) invoca agentes filhos para subtarefas dentro do seu fluxo",
        "Nível 2 - Múltiplos Terminais/Abas: O desenvolvedor roda agentes independentes em janelas de terminal concorrentes",
        "Nível 3 - Apps de Workspace: Aplicativos desktop dedicados que gerenciam sessões, kanban e consumo (ex: Alethe, CodeAgentSwarm, Claude Squad)",
        "Nível 4 - ADE Completo (Agent Development Environment): Plataformas holísticas como a Orca (onorca.dev), com suporte a múltiplos modelos cruzados, git worktrees e controle mobile"
      ],
      momentoHistorico: "Estamos na fase 'pré-VS Code' dos agentes de IA: ainda não há um padrão hegemônico consolidado, tornando este o momento ideal para experimentação e inovação."
    }
  },
  {
    id: "worktree-isolation",
    title: "3. Isolamento de Concorrência via Git Worktree",
    category: "Engenharia de Software",
    summary: "Prevenção de sobrescrita acidental de código concedendo a cada agente uma cópia isolada do repositório.",
    color: "#f59e0b",
    details: {
      conceito: "Se dois ou mais agentes editam o mesmo diretório local simultaneamente sem isolamento, ocorre condição de corrida: um sobrescreve os arquivos do outro sem aviso, gerando conflitos caóticos detectados apenas no diff final.",
      mecanismo: [
        "Comando Git Worktree: git worktree add ../branch-feature-x branch-feature-x",
        "Cada agente opera em uma pasta física totalmente isolada, apontando para o mesmo histórico git",
        "Zero colisão em arquivos de configuração, nós de dependência ou arquivos de código em edição simultânea",
        "Reconciliação limpa através de Pull Requests ou merges controlados"
      ],
      regraDeOuro: "Rodar múltiplos agentes em modo YOLO (sem confirmação) no mesmo repositório sem isolamento de worktree é garantia de perda de dados e dor de cabeça."
    }
  },
  {
    id: "parallel-execution",
    title: "4. Execução Especializada Concorrente (Swarm / Workers)",
    category: "Processamento Concorrente",
    summary: "Distribuição inteligente de papéis: Frontend, Backend, QA e Documentação trabalhando em paralelo.",
    color: "#8b5cf6",
    details: {
      conceito: "O orquestrador decompõe o objetivo macro em um grafo de tarefas acíclico (DAG) e despacha trabalhadores especializados para suas respectivas worktrees.",
      papeis: [
        "Frontend Specialist: Desenvolve componentes visuais, interações e consumo de APIs",
        "Backend Specialist: Modela tabelas, endpoints, regras de negócio e autenticação",
        "QA / Test Automation Agent: Escreve testes unitários, testes E2E e valida contratos de API",
        "Documentation & DevOps Agent: Gera diagramas de arquitetura, documentação markdown e scripts de deploy"
      ],
      vantagem: "Redução do tempo total de entrega proporcional ao grau de paralelismo das tarefas desacopladas."
    }
  },
  {
    id: "critic-arbitration",
    title: "5. Agente Crítico, Validação e Resolução de Conflitos",
    category: "Governança e Qualidade",
    summary: "Um agente avaliador independente analisa diffs, executa testes e arbitra discrepâncias antes do merge.",
    color: "#10b981",
    details: {
      conceito: "Antes de aceitar as alterações dos agentes trabalhadores na branch principal, um Agente Revisor (Critic / Arbiter) analisa o código gerado, garantindo conformidade arquitetural e prevenindo alucinações silenciosas.",
      etapas: [
        "Execução de linters, analisadores estáticos de tipo e suítes de testes automatizados",
        "Auditoria de segurança e detecção de dependências vulneráveis ou desnecessárias",
        "Reconciliação semântica de interfaces entre Frontend e Backend",
        "Aprovação automatizada ou solicitação de auto-correção para o agente responsável"
      ],
      beneficio: "Confiabilidade corporativa: o código integrado possui garantia matemática e empírica de execução."
    }
  },
  {
    id: "autonomous-delivery",
    title: "6. Convergência, Merge Seguro e Autonomia (YOLO com Guardrails)",
    category: "Integração Contínua",
    summary: "Integração harmônica na branch principal com transição gradual de supervisão humana para automação confiável.",
    color: "#06b6d4",
    details: {
      conceito: "Com isolamento por worktree e validação pelo agente crítico, o desenvolvedor pode transitar com segurança do modo 'Human-in-the-Loop' para o modo autônomo ('YOLO Mode' supervisionado por métricas).",
      recursosAvancados: [
        "Remote Control: Acompanhamento e aprovação de tarefas pelo celular via QR Code (como na ferramenta Alethe e Orca)",
        "Controle de Custos e Limites: Monitoramento em tempo real de tokens consumidos por modelo",
        "Merge Automatizado: Fusão limpa da worktree na branch principal após validação 100% verde",
        "Histórico e Auditoria: Registro persistente de todas as conversas, ferramentas chamadas e diffs gerados"
      ],
      impactoFinal: "Multiplicação da velocidade de desenvolvimento de software em até 5x a 10x sem degradação de qualidade."
    }
  }
];

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
