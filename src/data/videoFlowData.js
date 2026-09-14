// videoFlowData.js - Dados estruturados fiéis ao vídeo de estudo:
// "Pare de Usar 1 Agente de IA Por Vez: Orquestre Agentes de IA" por Kauã Miguel (@kc_1t)
// Link Canônico: https://youtu.be/8jvrucR7QCU?si=tyZnklMmEOVBlcXc

export const videoMetadata = {
  title: "Pare de Usar 1 Agente de IA Por Vez: Orquestre Agentes de IA",
  originalAuthor: "Kauã Miguel",
  authorHandle: "@kc_1t",
  authorProfile: "https://github.com/Kc1t",
  channel: "Kauã Miguel",
  videoUrl: "https://youtu.be/8jvrucR7QCU?si=tyZnklMmEOVBlcXc",
  tagline: "A IA não cansa. Quem cansa é você, que só consegue gerenciar um terminal por vez.",
  summary: "Estudo sobre como migrar do uso serial e ineficiente de um único agente para sistemas orquestrados concorrentes, resolvendo o gargalo humano e as colisões de arquivos com Git Worktrees e ADEs.",
  legal: {
    purpose: "Estudo acadêmico, educacional e análise didática de engenharia de software",
    nature: "Obra didática derivada não-comercial (Educational study companion)",
    statutoryBasisBrazil: "Lei Federal nº 9.610/1998, Art. 46, incisos III (citação para fins de estudo) e VIII (pequenos trechos didáticos)",
    statutoryBasisInternational: "Fair Use Doctrine (17 U.S.C. § 107 - Non-profit educational purposes & transformative work)",
    attributionNotice: "Todos os direitos autorais, marcas e propriedade intelectual sobre a obra audiovisual original pertencem integralmente a Kauã Miguel (@kc_1t).",
    endorsementDisclaimer: "Este projeto independente não é patrocinado, endossado ou formalmente vinculado a Kauã Miguel ou ao YouTube."
  }
};

export const videoFlowNodes = [
  {
    id: "solo-agent-paradigm",
    stepNumber: 1,
    title: "1. O Paradigma do Agente Solitário & A Metáfora da Orquestra",
    category: "Gargalo Inicial",
    icon: "🎻",
    color: "#ef4444",
    summary: "Colocar frontend, backend, banco e testes em um único chat satura o contexto e dilui a atenção do modelo.",
    signalToNext: "⚡ Saturação da Janela de Contexto (Attention Drift)",
    details: {
      conceito: "Na maioria dos fluxos tradicionais, o desenvolvedor usa o modelo de forma monolítica: abre uma sessão de chat ou terminal e pede para um único agente fazer tudo. Esse agente rapidamente satura sua janela de contexto com centenas de milhares de tokens, perde instruções anteriores e começa a alucinar.",
      citacaoVideo: "Orquestrar vem da metáfora da orquestra: em vez de um único músico tentar tocar violino, violoncelo, trompete e percussão correndo de um lado para o outro, uma orquestra possui especialistas dedicados que tocam juntos em sincronia sob uma regência coordenada.",
      comparacao: {
        tradicional: "Um agente solitário tentando programar o banco de dados, a API Express, o frontend React e os testes na mesma conversa.",
        orquestrado: "Divisão do trabalho em múltiplos agentes especializados, cada um responsável por um domínio específico e com contexto cirúrgico."
      },
      codigoPratico: {
        tipo: "O Anti-Padrão do Agente Solitário",
        snippet: `// PROMPT SOBRECARREGADO (ANTI-PADRÃO):
"Crie o banco de dados PostgreSQL, a API em Python, o design do frontend em React,
configure os testes no Jest e arrume o erro que deu no build..."
// Consequência: Context window sobrecarregada, perda de regras e alucinações.`
      },
      ferramentas: ["ChatGPT", "Claude Chat Convencional", "Copilot Chat"]
    }
  },
  {
    id: "human-bottleneck",
    stepNumber: 2,
    title: "2. O Verdadeiro Gargalo: O Humano e o 'Alt-Tab Hell'",
    category: "Assimetria Cognitiva",
    icon: "🔄",
    color: "#f97316",
    summary: "A IA não cansa. Quem cansa é o humano alternando abas de terminal manualmente enquanto a máquina espera.",
    signalToNext: "⚡ Tentativa de Execução Concorrente Manual",
    details: {
      conceito: "Existe uma assimetria fundamental entre a velocidade do modelo e a do desenvolvedor. Quando operamos agentes de forma serial manual, ficamos presos no 'Alt-Tab Hell': aguardamos o agente gerar o código, copiamos a saída, colamos no terminal, rodamos, copiamos o erro e colamos de volta. O recurso computacional fica 80% do tempo ocioso esperando o humano.",
      citacaoVideo: "A IA não cansa. Quem cansa é você, que só consegue olhar para um terminal de cada vez. No fim, o gargalo da produtividade vira o humano, e não o agente.",
      comparacao: {
        tradicional: "O desenvolvedor atua como estafeta manual de dados, alternando freneticamente entre janelas de terminal.",
        orquestrado: "O desenvolvedor assume a função de Tech Lead / Maestro, supervisionando múltiplos agentes rodando em background com relatórios consolidados."
      },
      codigoPratico: {
        tipo: "Latência Operacional",
        snippet: `# ONDE O TEMPO É GASTO NO FLUXO SERIAL:
Geração do LLM:      ~5 a 15 segundos
Aguardando o Humano: ~60 a 180 segundos (Leitura, troca de abas, cópia)
Conclusão: O humano serializa um processo que deveria ser paralelo!`
      },
      ferramentas: ["Tmux manual", "Abas do Windows Terminal", "Terminais múltiplos"]
    }
  },
  {
    id: "file-collision-race-condition",
    stepNumber: 3,
    title: "3. O Risco Crítico da Concorrência: A Colisão de Arquivos",
    category: "Engenharia de Concorrência",
    icon: "💥",
    color: "#dc2626",
    summary: "Colocar múltiplos agentes na mesma pasta física causa condições de corrida onde um sobrescreve o outro sem aviso.",
    signalToNext: "⚡ Necessidade Inegociável de Isolamento Físico",
    details: {
      conceito: "Quando o desenvolvedor decide abrir 3 ou 4 abas de terminal para rodar agentes simultâneos na mesma pasta do projeto, ele cria uma condição de corrida (Race Condition): o Agente A altera 'routes.ts', o Agente B simultaneamente escreve sua versão de 'routes.ts', apagando o trabalho do Agente A. No final, o código quebra e horas de trabalho são perdidas.",
      citacaoVideo: "Se você colocar dois agentes para mexer no mesmo repositório na mesma pasta física ao mesmo tempo sem isolamento, um vai sobrescrever o código do outro silenciosamente. Rodar no modo YOLO assim é certeza de dor de cabeça.",
      comparacao: {
        tradicional: "Múltiplos agentes editando simultaneamente o diretório local compartilhado sem isolamento de workspace.",
        orquestrado: "Cada agente trabalha em sua própria pasta física isolada apontando para sua respectiva branch."
      },
      codigoPratico: {
        tipo: "Cenário de Condição de Corrida (Sem Isolamento)",
        snippet: `14:00:01 - Agente 1 (Frontend) edita src/index.js adicionando rotas de login
14:00:03 - Agente 2 (Backend) edita src/index.js adicionando middleware de log
14:00:04 - Agente 2 SALVA POR CIMA! As rotas de login foram deletadas do disco!`
      },
      ferramentas: ["Git sem worktree", "Sistema de arquivos compartilhado"]
    }
  },
  {
    id: "git-worktree-solution",
    stepNumber: 4,
    title: "4. A Solução Canônica da Engenharia: Git Worktrees",
    category: "Isolamento de Workspace",
    icon: "🌳",
    color: "#10b981",
    summary: "O Git Worktree cria diretórios físicos independentes vinculados ao mesmo repositório com custo zero de duplicação.",
    signalToNext: "⚡ Ambientes Isolados Prontos para Concorrência Segura",
    details: {
      conceito: "A solução canônica de engenharia apresentada é o uso do comando 'git worktree'. Em vez de fazer clones pesados do repositório, o Git Worktree cria uma pasta separada para cada agente, vinculada a uma branch isolada, mas compartilhando o mesmo histórico '.git'. Assim, cada agente tem liberdade total de criar, deletar e editar arquivos sem interferir nos demais.",
      citacaoVideo: "O Git Worktree é a chave de ouro: você tem múltiplas pastas no seu disco, cada uma em uma branch diferente, mas todas apontando para o mesmo Git central. Zero colisão de arquivos!",
      comparacao: {
        tradicional: "'git clone' repetido ocupando gigabytes de espaço e duplicando pastas node_modules pesadas.",
        orquestrado: "'git worktree add': criação instantânea em milissegundos com isolamento físico absoluto."
      },
      codigoPratico: {
        tipo: "Comandos Git Worktree Reais",
        snippet: `# Cria pastas de trabalho físicas isoladas para cada agente:
git worktree add ../.worktrees/agente-front -b feature/front-ui
git worktree add ../.worktrees/agente-back -b feature/back-api
git worktree add ../.worktrees/agente-qa -b feature/qa-tests

# Cada agente opera exclusivamente no seu diretório sem colidir!`
      },
      ferramentas: ["Git Worktree CLI", "Orca Native Worktrees", "Alethe Workspaces"]
    }
  },
  {
    id: "orchestration-spectrum-levels",
    stepNumber: 5,
    title: "5. O Espectro da Orquestração: Os 4 Níveis de Maturidade",
    category: "Evolução Arquitetural",
    icon: "📊",
    color: "#3b82f6",
    summary: "A orquestração não é binária: vai de subagentes nativos até ADEs (Agent Development Environments) completos.",
    signalToNext: "⚡ Transição para Ferramentas Especializadas",
    details: {
      conceito: "A evolução da orquestração de agentes se distribui em um espectro contínuo de complexidade e maturidade:",
      citacaoVideo: "Orquestrar agentes não é preto no branco. Existe uma escada de evolução: você começa com subagentes na CLI, passa por múltiplos terminais, depois usa workspaces dedicados até chegar nos ADEs completos.",
      comparacao: {
        tradicional: "Achar que orquestração é apenas dar um prompt melhor para um modelo único.",
        orquestrado: "Escolher a ferramenta certa para cada nível: desde subagentes rápidos até plataformas holísticas com ADE."
      },
      codigoPratico: {
        tipo: "Os 4 Níveis de Maturidade",
        snippet: `Nível 1: Subagents Nativos (Claude Code, Antigravity)
Nível 2: Múltiplos Terminais / CLI (Abas paralelas, Tmux)
Nível 3: Desktop Workspaces & Kanban (Alethe, CodeAgentSwarm, Claude Squad)
Nível 4: ADE Completo (Orca - Agent Development Environment com Worktree nativo)`
      },
      ferramentas: ["Claude Code", "Alethe", "Orca", "CodeAgentSwarm"]
    }
  },
  {
    id: "tools-deep-dive",
    stepNumber: 6,
    title: "6. As Ferramentas em Análise: Alethe, Orca, Swarm e Squad",
    category: "Ecossistema Prático",
    icon: "🛠️",
    color: "#8b5cf6",
    summary: "Análise das ferramentas apresentadas: Alethe, Orca (onorca.dev), CodeAgentSwarm e Claude Squad.",
    signalToNext: "⚡ Definição de Governança e Modos de Operação",
    details: {
      conceito: "Visão aprofundada do ecossistema prático de ferramentas de orquestração:",
      citacaoVideo: "Alethe eu criei para resolver a minha própria dor com foco no terminal e controle pelo celular via QR Code. E a Orca é o que eu considero hoje a ferramenta mais completa, com suporte nativo a Git Worktrees e encadeamento entre modelos diferentes.",
      comparacao: {
        tradicional: "Ficar restrito a interfaces web de chat que não conversam com o sistema de arquivos.",
        orquestrado: "Uso de ferramentas desenhadas para orquestração de frotas com controle de tokens, histórico persistente e visualização de diffs."
      },
      codigoPratico: {
        tipo: "Destaques das Principais Ferramentas",
        snippet: `• Alethe (Kauã Miguel): Foco em terminal, limites de tokens de Claude/Codex e Remote Control no celular via QR Code.
• Orca (onorca.dev): ADE completo, Git Worktrees automáticos, suporte cruzado a múltiplos modelos de IA e app mobile.
• CodeAgentSwarm: Quadro Kanban visual para delegar backlog e acompanhar custos.
• Claude Squad: Orquestrador ágil diretamente no terminal.`
      },
      ferramentas: ["Alethe", "Orca", "CodeAgentSwarm", "Claude Squad", "Maestro"]
    }
  },
  {
    id: "governance-hitl-yolo",
    stepNumber: 7,
    title: "7. Modos de Operação: Human-in-the-Loop vs Modo YOLO",
    category: "Governança e Segurança",
    icon: "🛡️",
    color: "#06b6d4",
    summary: "Quando usar confirmação manual vs autonomia total (YOLO) com isolamento de worktree e agente de testes.",
    signalToNext: "⚡ Transição Histórica para a Era dos ADEs",
    details: {
      conceito: "A transição responsável de autonomia: no modo Human-in-the-Loop (HITL), o desenvolvedor confirma cada comando perigoso. No modo YOLO (autonomia irrestrita), o agente executa comandos e edições sem pedir confirmação — o que só deve ser feito se houver Git Worktree e testes automatizados.",
      citacaoVideo: "Se você vai deixar a IA rodar solta no modo YOLO, você PRECISA de duas coisas: isolamento por Git Worktree para não perder o projeto, e testes automatizados para validar que ela não quebrou nada antes do merge.",
      comparacao: {
        tradicional: "Rodar em modo YOLO na branch principal e torcer para o código não apagar arquivos críticos.",
        orquestrado: "Modo YOLO protegido: agente roda em worktree isolada e os testes precisam passar 100% no terminal antes de qualquer merge."
      },
      codigoPratico: {
        tipo: "A Regra dos Guardrails para Modo YOLO",
        snippet: `REQUISITOS PARA MODO YOLO SEGURO:
1. Pasta física isolada via Git Worktree (conter possíveis estragos)
2. Agente Crítico de Testes executando Pytest/Vitest no terminal
3. NUNCA dar merge cego na branch main sem conferir o git diff final!`
      },
      ferramentas: ["Git Diffs", "Test Runners", "Linters", "Agente Crítico"]
    }
  },
  {
    id: "pre-vscode-era",
    stepNumber: 8,
    title: "8. O Momento Histórico: A Fase 'Pré-VS Code' dos Agentes",
    category: "Visão de Futuro",
    icon: "🚀",
    color: "#ec4899",
    summary: "Estamos na fase embrionária dos ADEs: quem dominar a orquestração agora terá uma enorme vantagem competitiva.",
    signalToNext: "🏁 Ciclo Completo da Arquitetura",
    details: {
      conceito: "A conclusão traz uma visão histórica indispensável: estamos vivenciando com os agentes de IA o mesmo momento dos editores de código nos anos 90, antes da consolidação de gigantes como o VS Code. Mais de 150 ferramentas estão sendo criadas (como listado no repositório Awesome Agent Orchestrators), e o desenvolvedor moderno precisa se posicionar como um maestro de múltiplos agentes.",
      citacaoVideo: "A gente está vivendo a fase pré-VS Code dos agentes de IA. Ainda não existe um padrão definitivo estabelecido. Quem começar a orquestrar múltiplos agentes hoje vai sair muito na frente na engenharia de software.",
      comparacao: {
        tradicional: "Aguardar anos até que a indústria defina uma única ferramenta padrão para começar a aprender.",
        orquestrado: "Experimentar ativamente subagentes, múltiplos terminais, Alethe e Orca para liderar a nova era do desenvolvimento autônomo."
      },
      codigoPratico: {
        tipo: "Evolução Histórica das Ferramentas",
        snippet: `ANOS 90: Notepad/Vi ──────> IDEs (Eclipse, NetBeans, IntelliJ, VS Code)
HOJE:   1 Chat Serial ───> ADEs (Orca, Alethe, Swarms de Agentes Concorrentes)
Resultado: Multiplicação de velocidade com governança estrita.`
      },
      ferramentas: ["Awesome Agent Orchestrators (150+ ferramentas)", "Orca", "Alethe"]
    }
  }
];

export const videoToolsCatalog = [
  {
    id: "alethe",
    name: "Alethe",
    creator: "Kauã Miguel (Dev / Open Source)",
    badge: "Criado por Kauã Miguel (@kc_1t)",
    color: "#f59e0b",
    repoUrl: "https://github.com/Kc1t/alethe-agents",
    highlight: "Interface focada em terminais persistentes sem sobrecarga visual, limites de tokens de Claude e Codex, e Remote Control via celular por QR Code.",
    features: [
      "Foco 100% no terminal sem poluição visual excessiva",
      "Persistência de sessões para não perder o histórico ao fechar a janela",
      "Monitoramento de cotas e limites de mensagens de Claude Code e Codex",
      "Remote Control pelo smartphone através de QR Code dinâmico no terminal",
      "Agrupamento de múltiplos projetos simultâneos em 'Current View'",
      "Código aberto no GitHub disponível para a comunidade"
    ]
  },
  {
    id: "orca",
    name: "Orca",
    creator: "Orca Team",
    badge: "O Mais Completo ADE",
    color: "#3b82f6",
    repoUrl: "https://www.onorca.dev",
    highlight: "O verdadeiro Agent Development Environment (ADE): une subagentes cruzados entre modelos, Git Worktrees automáticos, visualização estilo VS Code e CLI.",
    features: [
      "Conceito formal de ADE (Agent Development Environment)",
      "Capacidade de encadeamento entre modelos diferentes (Claude chamando Codex, etc.)",
      "Gerenciamento nativo e automatizado de Git Worktrees para isolamento",
      "Interface rica com histórico de agentes, Explorer de arquivos e Pull Requests",
      "Orca CLI para orquestração direta via linha de comando",
      "App mobile oficial para acompanhamento e controle remoto"
    ]
  },
  {
    id: "code-agent-swarm",
    name: "CodeAgentSwarm",
    creator: "CodeAgentSwarm",
    badge: "Kanban Integrado",
    color: "#8b5cf6",
    repoUrl: "https://www.codeagentswarm.com",
    highlight: "Ambiente desktop com Kanban visual para gerenciamento de backlog de tarefas e atribuição direta a frotas de agentes de IA.",
    features: [
      "Quadro Kanban nativo para criar, mover e atribuir tarefas a agentes",
      "Visão de Product Owner / Scrum Master para frotas de agentes autônomos",
      "Painel de métricas de consumo de tokens por agente",
      "Interface desktop gráfica com visualização lado a lado",
      "Suporte a branches e controle de sessões"
    ]
  },
  {
    id: "claude-squad",
    name: "Claude Squad",
    creator: "smtg-ai",
    badge: "100% Terminal CLI",
    color: "#10b981",
    repoUrl: "https://github.com/smtg-ai/claude-squad",
    highlight: "Gerenciamento direto no terminal para orquestrar agentes como Claude Code, Codex e Aider sem sobreposição de arquivos.",
    features: [
      "Orquestração ágil diretamente no terminal",
      "Gerencia múltiplos agentes (Claude Code, Codex, Aider)",
      "Separação das áreas de trabalho para evitar conflitos",
      "Leve, rápido e sem sobrecarga de interfaces pesadas",
      "Totalmente voltado para entusiastas de CLI"
    ]
  },
  {
    id: "maestro",
    name: "Maestro",
    creator: "The Maestri Team (macOS)",
    badge: "Canvas Infinito",
    color: "#ec4899",
    repoUrl: "https://themaestri.app",
    highlight: "Canvas infinito onde você organiza terminais de agentes visualmente no espaço 2D bidimensional com zoom livre.",
    features: [
      "Mesa de trabalho visual infinita com zoom e pan livre",
      "Disposição espacial intuitiva de múltiplos fluxos de trabalho de IA",
      "Design de ponta com foco em experiência de usuário",
      "Referência visual de organização espacial para novos ADEs"
    ]
  },
  {
    id: "awesome-orchestrators",
    name: "Awesome Agent Orchestrators",
    creator: "Comunidade Open Source (andyrewlee)",
    badge: "+150 Ferramentas Mapeadas",
    color: "#06b6d4",
    repoUrl: "https://github.com/andyrewlee/awesome-agent-orchestrators",
    highlight: "Repositório curado reunindo mais de 150 ferramentas e frameworks de orquestração de agentes de IA.",
    features: [
      "Catálogo vivo com mais de 150 ferramentas de orquestração",
      "Categorias por CLI, ADEs, Frameworks e Extensões",
      "A melhor referência para explorar o ecossistema em expansão",
      "Comprovante de que estamos na fase 'pré-VS Code' dos agentes"
    ]
  }
];

export const worktreeDiagramData = {
  mainRepo: "repositorio-central/ (branch: main)",
  worktrees: [
    {
      dir: ".worktrees/feature-front/",
      branch: "feat/front-ui",
      agent: "Agente Frontend",
      model: "Claude 3.7 Sonnet",
      color: "#10b981",
      task: "Desenvolvimento de telas e componentes em pasta isolada."
    },
    {
      dir: ".worktrees/feature-back/",
      branch: "feat/back-api",
      agent: "Agente Backend",
      model: "GPT-4.5 / Codex",
      color: "#3b82f6",
      task: "Desenvolvimento de endpoints e regras de negócio sem tocar no front."
    },
    {
      dir: ".worktrees/feature-db/",
      branch: "feat/db-migrations",
      agent: "Agente Banco de Dados",
      model: "Claude 3.7 Sonnet",
      color: "#f59e0b",
      task: "Modelagem de schema, tabelas e migrações SQL segregadas."
    },
    {
      dir: ".worktrees/feature-qa/",
      branch: "feat/qa-tests",
      agent: "Agente Crítico de QA",
      model: "Gemini 2.5 Pro / Test Runner",
      color: "#8b5cf6",
      task: "Auditoria de diffs, execução de suíte de testes e linters antes do merge."
    }
  ]
};
