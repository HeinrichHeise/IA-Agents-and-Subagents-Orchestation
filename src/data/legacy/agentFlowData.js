// agentFlowData.js - Como os Agentes de IA aprimoram e expandem a cognição da IA

export const agentCognitionSteps = [
  {
    id: "raw-llm-limits",
    title: "1. O Limite do Modelo Estático (Raw LLM)",
    category: "Problema Base",
    summary: "LLMs puros apenas prevêem o próximo token estatístico sem contato com o mundo real.",
    color: "#ef4444",
    details: {
      conceito: "Um modelo de linguagem comum não 'pensa' no sentido ativo; ele é um preditor autorregressivo de tokens treinado em um ponto estático no tempo.",
      limitacoes: [
        "Alucinações: Inventa fatos plausíveis quando não tem certeza",
        "Conhecimento Congelado: Não sabe dados em tempo real ou alterações recentes",
        "Janela de Contexto Saturada: Textos longos degradam a atenção",
        "Sem Agência: Incapaz de executar código, salvar arquivos ou interagir com APIs"
      ],
      impacto: "Sem um loop de agência, a IA é apenas um conselheiro passivo, passível de erro constante em tarefas complexas."
    }
  },
  {
    id: "perception-goal",
    title: "2. Percepção e Decomposição de Objetivos",
    category: "Planejamento Cognitivo",
    summary: "O agente recebe a instrução do usuário e a decompõe em planos hierárquicos estruturados.",
    color: "#3b82f6",
    details: {
      conceito: "O agente não cospe uma resposta impulsiva. Ele analisa a intenção, identifica pré-requisitos, divide tarefas complexas em etapas acionáveis (Chain-of-Thought / Plan-and-Solve) e define critérios de sucesso.",
      etapas: [
        "Compreensão contextual da intenção do usuário",
        "Decomposição em DAG (Grafo Acíclico Dirigido) de subtarefas",
        "Avaliação de dependências de execução",
        "Definição de hipóteses e planos de contingência"
      ],
      exemplo: "Objetivo: 'Criar uma API de login' -> Subtarefas: [1. Modelar banco, 2. Criar hash de senha, 3. Gerar JWT, 4. Escrever testes unitários]"
    }
  },
  {
    id: "react-loop",
    title: "3. O Ciclo ReAct (Thought -> Action -> Observation)",
    category: "Loop de Raciocínio",
    summary: "O agente pensa antes de agir, toma uma ação concreta e observa o resultado real do ambiente.",
    color: "#8b5cf6",
    details: {
      conceito: "O paradigma ReAct (Reasoning + Acting) combina raciocínio deliberado com ação no ambiente. Cada passo gera um pensamento explícito antes da invocação de uma ação.",
      ciclo: [
        "Thought (Pensamento): O que preciso descobrir agora?",
        "Action (Ação): Executar comando de terminal, ler arquivo, chamar API",
        "Observation (Observação): Leitura do output real produzido pelo ambiente",
        "Update (Atualização): Incorpora o resultado observado no seu estado cognitivo"
      ],
      formula: "\\text{State}_{t+1} = \\text{Agent}(\\text{State}_t, \\text{Observation}_t)"
    }
  },
  {
    id: "tools-grounding",
    title: "4. Uso de Ferramentas e Grounding (Ancoragem na Realidade)",
    category: "Ação no Mundo",
    summary: "Substituição de alucinações por fatos verificados via código, busca e terminal.",
    color: "#10b981",
    details: {
      conceito: "Grounding é o processo de conectar o modelo à realidade física/digital. Ao invés de supor se um código funciona, o agente executa os testes no terminal e lê a saída.",
      ferramentas: [
        "Interpretador de Código (Python/JS) para resolver contas e validar lógica",
        "Leitor/Editor de Arquivos (grep, view_file, replace_file_content)",
        "Navegador / Web Search para documentações atualizadas em tempo real",
        "Comandos de Sistema Operacional (bash, powershell, git)"
      ],
      beneficio: "A precisão salta de suposições estatísticas para validação empírica irrefutável."
    }
  },
  {
    id: "memory-systems",
    title: "5. Sistemas de Memória Multicamadas",
    category: "Persistência Cognitiva",
    summary: "Memória de trabalho, histórico conversacional e banco vetorial de longo prazo (RAG).",
    color: "#f59e0b",
    details: {
      conceito: "Diferente de um chat comum que esquece tudo ao reiniciar o contexto, o agente possui arquitetura de memória estruturada:",
      camadas: [
        "Memória de Trabalho (Working Memory / Scratchpad): Anotações voláteis para o raciocínio em curso",
        "Memória Episódica (Short-Term Memory): Histórico recente da sessão atual",
        "Memória Semântica de Longo Prazo (Long-Term Vector DB / RAG): Recuperação de fatos e regras passadas via similaridade de cosseno"
      ],
      formula: "\\text{Similaridade}(\\vec{q}, \\vec{d}) = \\frac{\\vec{q} \\cdot \\vec{d}}{\\|\\vec{q}\\| \\|\\vec{d}\\|}"
    }
  },
  {
    id: "self-reflection",
    title: "6. Auto-Reflexão e Auto-Correção (Self-Correction)",
    category: "Aperfeiçoamento Contínuo",
    summary: "O agente analisa os próprios erros em tempo de execução e reescreve a estratégia autonomamente.",
    color: "#06b6d4",
    details: {
      conceito: "Se um comando falha ou um teste unitário quebra, o agente não desiste nem transfere a dúvida ao usuário imediatamente. Ele lê o traceback, diagnostica a causa raiz e tenta uma abordagem alternativa.",
      mecanismos: [
        "Crítica Interna (Reflexion): Avaliação da saída contra os critérios de sucesso",
        "Correção de Sintaxe e Lógica a partir de logs de erro do compilador",
        "Iteração até validação formal ou solicitação justificada de ajuda",
        "Preservação do aprendizado para não cometer o mesmo erro nas próximas etapas"
      ],
      resultado: "Elevação exponencial da taxa de sucesso em tarefas de engenharia de software e pesquisa."
    }
  }
];
