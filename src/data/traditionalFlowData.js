// traditionalFlowData.js - Dados estruturados do Modelo Tradicional (Serial)
// Representa o fluxo convencional síncrono com suas 6 fases críticas e limitações
// Estética associada: YouTube 2015-2017 (Hitchhiker / Material v1) com badges de duração de vídeo

export const traditionalFlowMetadata = {
  title: "Modelo Tradicional (Serial): O Paradigma do Terminal Único",
  paradigm: "traditional",
  badge: "Fluxo Serial Convencional",
  summary: "Execução sequencial em terminal único, com altos custos de troca de contexto (Alt-Tab), ociosidade de hardware, risco crítico de colisão de arquivos no disco e degradação contínua da janela de contexto."
};

export const traditionalFlowNodes = [
  {
    id: "trad-prompt-manual",
    stepNumber: 1,
    title: "1. Prompt Manual Isolado & Sobrecarga Monolítica",
    category: "Entrada Monolítica",
    icon: "📝",
    color: "#cc181e",
    durationBadge: "0:45",
    latencyLabel: "0.8 ms",
    summary: "Envio de prompts manuais gigantescos tentando instruir o modelo a realizar tarefas diversas em uma única janela de terminal.",
    signalToNext: "🔻 Latência de Processamento e Ociosidade",
    details: {
      conceito: "No paradigma tradicional, o desenvolvedor digita manualmente instruções extensas em uma única janela de terminal ou chat web. O modelo recebe instruções conflitantes de arquitetura, banco, frontend e testes em um único bloco, forçando compressão excessiva de raciocínio e diluição de atenção.",
      citacaoVideo: "A gente abre um terminal, passa um prompt gigante para o agente fazer tudo de uma vez, e fica torcendo para dar certo... Colocar frontend, backend, banco e testes em um único chat satura o contexto desde a primeira mensagem.",
      comparacao: {
        tradicional: "Um único prompt massivo tentando resolver frontend, backend e testes juntos em uma sessão contínua.",
        orquestrado: "Tarefas atômicas distribuídas para agentes especializados com contextos cirúrgicos, paralelos e independentes."
      },
      codigoPratico: {
        tipo: "Prompt Monolítico Típico (Anti-Padrão)",
        snippet: `// PROMPT SERIAL CONVENCIONAL:
"Crie as rotas Express em Node.js, implemente os componentes React no frontend,
crie o schema Prisma no PostgreSQL, configure os testes no Vitest e corrija o erro de build..."

// Consequência direta:
// - Perda de precisão técnica
// - Falta de especificidade em cada camada da aplicação
// - Compressão do raciocínio e ausência de validação cruzada`
      },
      ferramentas: ["Terminal Simples", "Web Chat Monolítico", "Copy-Paste Manual"]
    }
  },
  {
    id: "trad-machine-idleness",
    stepNumber: 2,
    title: "2. Ociosidade da Máquina & Latência de Espera",
    category: "Latência Computacional",
    icon: "⏳",
    color: "#e53935",
    durationBadge: "2:15",
    latencyLabel: "142 ms",
    summary: "A infraestrutura e o hardware passam até 85% do tempo ociosos aguardando a intervenção e leitura manual do desenvolvedor.",
    signalToNext: "🔻 Sobrecarga Cognitiva e Troca de Janelas",
    details: {
      conceito: "Enquanto um LLM gera código em segundos, o desenvolvedor humano consome minutos lendo a saída, entendendo as alterações e preparando a próxima ação. Em fluxos seriais, a máquina fica parada aguardando a entrada do usuário, desperdiçando a capacidade computacional disponível.",
      citacaoVideo: "A IA não cansa. Quem cansa é você, que só consegue olhar para um terminal de cada vez e deixa a máquina ociosa esperando sua resposta.",
      comparacao: {
        tradicional: "Hardware ocioso esperando o humano inspecionar a saída linha por linha antes de disparar o próximo passo.",
        orquestrado: "Execução contínua em segundo plano de múltiplos agentes trabalhando em paralelo enquanto o desenvolvedor supervisiona."
      },
      codigoPratico: {
        tipo: "Cronograma de Tempo no Fluxo Serial",
        snippet: `# DESPERDÍCIO TEMPORAL NO MODELO SERIAL:
Geração do LLM:     [=== 10s ===]
Espera do Humano:    [======================================== 120s ========================================]

# Conclusão de Engenharia:
# A máquina passa 92% do tempo em standby aguardando interação manual.`
      },
      ferramentas: ["CLI Síncrona", "Prompt Sequencial", "Execução Bloqueante"]
    }
  },
  {
    id: "trad-human-bottleneck",
    stepNumber: 3,
    title: "3. Gargalo Humano & O Fenômeno 'Alt-Tab Hell'",
    category: "Assimetria Cognitiva",
    icon: "🔄",
    color: "#d32f2f",
    durationBadge: "4:30",
    latencyLabel: "380 ms",
    summary: "O desenvolvedor se torna o estafeta manual de dados, alternando freneticamente entre abas para copiar e colar respostas.",
    signalToNext: "🔻 Execução e Validação Manual",
    details: {
      conceito: "A tentativa de coordenar tarefas manualmente resulta no fenômeno do 'Alt-Tab Hell'. O desenvolvedor precisa copiar código do chat, colar no editor, abrir o terminal, rodar o build, copiar o log de erro e colar de volta no chat. O humano se torna o gargalo primário da esteira de software.",
      citacaoVideo: "No fim, o gargalo da produtividade vira o humano, e não o agente. Você fica alternando abas feito louco copiando e colando entre terminal, editor e chat.",
      comparacao: {
        tradicional: "O programador faz o papel de ponte de dados manual entre ferramentas desconectadas.",
        orquestrado: "Ferramentas ADE orquestram os agentes diretamente no sistema de arquivos com feedback automatizado de execução."
      },
      codigoPratico: {
        tipo: "Ciclo Vicioso do Alt-Tab Hell",
        snippet: `CICLO OPERACIONAL SERIAL:
1. [Chat] Copiar snippet de código gerado
2. [Alt-Tab] Colar no arquivo correto no editor
3. [Alt-Tab] Abrir o terminal de compilação
4. [Terminal] Executar: npm run test
5. [Alt-Tab] Copiar stack trace de erro
6. [Chat] Colar erro de volta para o agente responder`
      },
      ferramentas: ["Múltiplas janelas manuais", "Clipboard do SO", "Terminal único"]
    }
  },
  {
    id: "trad-manual-execution-errors",
    stepNumber: 4,
    title: "4. Execução & Erros Manuais em Cascata",
    category: "Execução Frágil",
    icon: "⚠️",
    color: "#c62828",
    durationBadge: "7:12",
    latencyLabel: "620 ms",
    summary: "Erros de digitação, dependências esquecidas e comandos executados no diretório errado quebram o ambiente local.",
    signalToNext: "🔻 Risco de Destruição de Código",
    details: {
      conceito: "Como cada comando é rodado à mão pelo desenvolvedor cansado, erros humanos acumulam-se rapidamente: instalação de dependências globais em vez de locais, variáveis de ambiente ausentes e arquivos editados fora de sincronia geram bugs em cascata difíceis de depurar.",
      citacaoVideo: "Quando você faz tudo na mão de forma serial, um erro que você não viu no terminal do meio quebra todo o restante da cadeia.",
      comparacao: {
        tradicional: "Comandos disparados manualmente e propensos a falhas de digitação e esquecimentos.",
        orquestrado: "Pipelines declarativos com agentes de teste validando suítes completas de forma automatizada e protegida."
      },
      codigoPratico: {
        tipo: "Falhas de Execução em Cadeia",
        snippet: `$ npm run build
Error: Module not found: Can't resolve './components/AuthButton'
$ npm install  # executado na pasta errada!
$ git status   # 47 arquivos alterados sem rastreabilidade
-> Quebra silenciosa da compilação e contaminação do ambiente.`
      },
      ferramentas: ["Scripts manuais", "Terminal sem automação", "Testes ad-hoc"]
    }
  },
  {
    id: "trad-race-condition",
    stepNumber: 5,
    title: "5. Condição de Corrida no Disco Local",
    category: "Conflito de Arquivos",
    icon: "💥",
    color: "#b71c1c",
    durationBadge: "11:45",
    latencyLabel: "1.2 s",
    summary: "Tentativa ingênua de rodar múltiplos agentes na mesma pasta física causa sobrescrita silenciosa de arquivos.",
    signalToNext: "🔻 Colapso de Contexto do Modelo",
    details: {
      conceito: "Ao tentar acelerar o fluxo abrindo duas janelas para rodar agentes simultaneamente na mesma pasta do projeto, cria-se uma condição de corrida destrutiva. O agente 1 escreve uma função em 'api.js'; segundos depois, o agente 2 grava 'api.js' com sua versão, deletando as alterações anteriores sem qualquer alerta de conflito.",
      citacaoVideo: "Se você colocar dois agentes para mexer no mesmo repositório na mesma pasta física ao mesmo tempo sem isolamento, um vai sobrescrever o código do outro silenciosamente. Rodar no modo YOLO assim é certeza de dor de cabeça.",
      comparacao: {
        tradicional: "Múltiplos processos disputando o mesmo ponteiro de arquivo em diretório compartilhado.",
        orquestrado: "Git Worktrees alocando pastas físicas completamente independentes para cada agente com branches segregadas."
      },
      codigoPratico: {
        tipo: "Cenário de Condição de Corrida no Disco",
        snippet: `// LINHA DO TEMPO DA DESTRUIÇÃO:
15:30:10 -> Agente Frontend salva src/App.js (Adicionou Header e Menu)
15:30:12 -> Agente Backend salva src/App.js (Adicionou Provedor de Autenticação)
15:30:13 -> O Header e o Menu foram SOBRESCRITOS e apagados do disco!
// Conflito silencioso e irreversível sem isolamento físico.`
      },
      ferramentas: ["Diretório único compartilhado", "Git sem worktree", "Edição concorrente desprotegida"]
    }
  },
  {
    id: "trad-context-saturation",
    stepNumber: 6,
    title: "6. Saturação da Janela de Contexto & Alucinações",
    category: "Exaustão de Memória",
    icon: "📉",
    color: "#880e4f",
    durationBadge: "18:20",
    latencyLabel: "3.4 s",
    summary: "Conforme a conversa acumula dezenas de mensagens, a atenção do modelo se degrada e regras cruciais são esquecidas.",
    signalToNext: "🏁 Colapso do Fluxo Serial",
    details: {
      conceito: "À medida que a sessão serial avança, dezenas de milhares de tokens de código intermediário, erros e conversas preenchem a janela de contexto. Ocorre a diluição de atenção (Attention Drift): o modelo 'esquece' regras ditadas no início da conversa, contradiz decisões prévias e passa a inventar APIs inexistentes.",
      citacaoVideo: "Colocar tudo no mesmo chat satura o contexto. O modelo começa a esquecer o que você falou 10 minutos atrás e alucina.",
      comparacao: {
        tradicional: "Chat monolítico com 150k tokens acumulando ruído, logs e alucinações crescentes.",
        orquestrado: "Subagentes descartáveis e focados com prompts cirúrgicos, contexto renovado e escopo delimitado."
      },
      codigoPratico: {
        tipo: "Degradação por Saturação de Tokens",
        snippet: `ESTADO DA JANELA DE CONTEXTO:
[Instruções de Negócio: 5%] -> [Histórico de Erros: 60%] -> [Snippets Antigos: 30%]

RESULTADO DA ATENÇÃO:
- Ignora regras de formatação originais
- Reintroduz bugs já corrigidos anteriormente
- Alucina métodos e bibliotecas não existentes`
      },
      ferramentas: ["Chat persistente sobrecarregado", "Histórico infinito de conversa"]
    }
  }
];
