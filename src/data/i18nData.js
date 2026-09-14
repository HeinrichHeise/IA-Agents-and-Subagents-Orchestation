// i18nData.js - Sistema completo de Internacionalização (PT-BR, EN-US, DE)
// Suporta tradução integral da interface, abas, paradigmas, nós de arquitetura e modais

export const supportedLanguages = [
  { code: 'pt', label: 'PT', flag: '🇧🇷', name: 'Português' },
  { code: 'en', label: 'EN', flag: '🇺🇸', name: 'English' },
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' }
];

export const i18n = {
  pt: {
    nav: {
      title: "IA Orchestation learn",
      subtitle: "Estudo Didático Baseado na Obra de ",
      authorLink: "Kauã Miguel (@kc_1t)",
      flowTab: "Fluxo de Orquestração",
      worktreeTab: "Git Worktrees & ADEs",
      watchOnYoutube: "▶ Assistir no YouTube",
      phasesSuffix: "Fases da Arquitetura"
    },
    toggle: {
      traditional: "📺 Modelo Tradicional (Serial)",
      orchestrated: "⚡ Modelo Orquestrado (Concorrente)"
    },
    hero: {
      studyBadge: "📖 Estudo Didático",
      authorBadge: "Autor do Conteúdo: Kauã Miguel (@kc_1t)",
      mainTitle: "Pare de Usar 1 Agente de IA Por Vez: Orquestre Agentes de IA",
      tagline: "A IA não cansa. Quem cansa é você, que só consegue gerenciar um terminal por vez.",
      descOrchestrated: "Estudo sobre como migrar do uso serial e ineficiente de um único agente para sistemas orquestrados concorrentes, resolvendo o gargalo humano e as colisões de arquivos com Git Worktrees e ADEs.",
      descTraditional: "Visualização do fluxo serial convencional: execução passo a passo em terminal único, com altos custos de troca de contexto (Alt-Tab), ociosidade de hardware e risco constante de colisão de arquivos.",
      pipelineStatusOrchestrated: "Pipeline Concorrente Ativo",
      pipelineStatusTraditional: "Fluxo Serial / Bloqueante"
    },
    flowchart: {
      inspectBtn: "Inspecionar Detalhes 🔍",
      phaseLabel: "Fase",
      stepOf: "Etapa {current} de {total}",
      transitionDefault: "⚡ Transição para Fase {next}",
      conclusionTitleOrchestrated: "Conclusão da Arquitetura: A Nova Era dos ADEs",
      conclusionDescOrchestrated: "O desenvolvimento moderno com IA transcende o chat serial. O futuro pertence a arquiteturas concorrentes governadas por Git Worktrees, testes automatizados e plataformas ADE especializadas.",
      conclusionBadgeOrchestrated: "✨ Arquitetura Validada",
      conclusionTitleTraditional: "Gargalo Crítico do Modelo Serial Monolítico",
      conclusionDescTraditional: "A abordagem serial tradicional subutiliza a infraestrutura de computação, sobrecarrega o desenvolvedor com tarefas manuais de cópia e cola, e acumula dívida técnica silenciosa por colisões de arquivos.",
      conclusionBadgeTraditional: "⚠️ Limitações Evidenciadas",
      emptyState: "Nenhuma etapa disponível no fluxograma."
    },
    modal: {
      closeBtn: "Fechar Especificação ✕",
      phasePrefix: "Fase",
      specSuffix: "Especificação Técnica",
      referenceQuoteTitle: "💬 Citação de Referência (Kauã Miguel)",
      architectureTitle: "📖 Fundamentação Arquitetural",
      comparisonTitle: "Comparação Arquitetural",
      compBadTag: "❌ Abordagem Tradicional (Serial)",
      compGoodTag: "✅ Arquitetura Concorrente (Worktrees)",
      practicalCodeTitle: "💻 Comandos & Exemplos Práticos",
      copyBtn: "Copiar Comandos",
      copiedBtn: "✓ Copiado!",
      toolsTitle: "🛠️ Ferramentas & Padrões em Foco",
      durationLabel: "Duração Estimada:",
      latencyLabel: "Latência Típica:"
    },
    worktrees: {
      heroTitle: "🌳 A Solução Canônica: Isolamento via Git Worktree",
      heroDesc: "A arquitetura física para eliminar condições de corrida no sistema de arquivos e permitir que múltiplos agentes codifiquem em paralelo sem colisão.",
      compBadHeader: "❌ Execução Serial Compartilhada (Colisão)",
      compBadSub: "Múltiplos agentes operando simultaneamente na mesma pasta física do repositório.",
      compBad1: "Risco crítico de Race Condition: dois processos salvam por cima do mesmo arquivo",
      compBad2: "Janela de contexto poluída com responsabilidades cruzadas de todo o projeto",
      compBad3: "Conflitos caóticos detectados tardiamente em tempo de compilação ou execução",
      compGoodHeader: "✅ Orquestração com Git Worktrees (Isolamento)",
      compGoodSub: "Múltiplos agentes especialistas alocados em cópias físicas isoladas do repositório.",
      compGood1: "Zero colisão de escrita: cada agente possui seu diretório físico segregado",
      compGood2: "Especialização por domínio: Frontend, Backend, Banco de Dados e QA em paralelo",
      compGood3: "Reconciliação limpa: Pull Requests atômicos com suíte de testes automatizados",
      diskTitle: "🗂️ Estrutura Física de Diretórios no Disco",
      diskDesc: 'Como o comando "git worktree add" divide fisicamente os diretórios para que cada agente opere sem interferência mútua:',
      ecosystemTitle: "🛠️ Ecossistema de Ferramentas de Orquestração",
      creatorPrefix: "Criador / Equipe: ",
      accessOfficial: "Acessar Ferramenta Oficial ↗"
    },
    footer: {
      badgeEdu: "⚖️ Estudo Educacional Não-Comercial",
      badgeLaw: "Art. 46, III e VIII - Lei 9.610/98",
      badgeFairUse: "Fair Use (17 U.S.C. § 107)",
      badgeAuthor: "Autor Original: @kc_1t (Kauã Miguel)",
      originalRefPrefix: "Obra de referência original: ",
      publishedBy: " publicada por ",
      channelLink: "Kauã Miguel (@kc_1t) no YouTube ↗",
      rightsNotice: ". Todos os direitos morais e patrimoniais sobre o roteiro, falas e produção audiovisual pertencem estrita e exclusivamente ao autor original.",
      disclaimer: "Aviso Legal: Este software é um artefato interativo de estudo independente criado para fins puramente didáticos, acadêmicos e analíticos de engenharia de software. Não possui fins lucrativos, não comercializa ou monetiza conteúdo e não é patrocinado, licenciado ou formalmente afiliado a Kauã Miguel ou à plataforma YouTube. Para assistir à íntegra da obra original, acesse o canal oficial no YouTube."
    }
  },

  en: {
    nav: {
      title: "IA Orchestation learn",
      subtitle: "Educational Study Based on the Work of ",
      authorLink: "Kauã Miguel (@kc_1t)",
      flowTab: "Orchestration Flow",
      worktreeTab: "Git Worktrees & ADEs",
      watchOnYoutube: "▶ Watch on YouTube",
      phasesSuffix: "Architecture Phases"
    },
    toggle: {
      traditional: "📺 Traditional Model (Serial)",
      orchestrated: "⚡ Orchestrated Model (Concurrent)"
    },
    hero: {
      studyBadge: "📖 Educational Study",
      authorBadge: "Content Author: Kauã Miguel (@kc_1t)",
      mainTitle: "Stop Using 1 AI Agent at a Time: Orchestrate AI Agents",
      tagline: "AI doesn't get tired. What gets tired is you, who can only manage one terminal at a time.",
      descOrchestrated: "Study on transitioning from inefficient serial single-agent usage to concurrent orchestrated systems, eliminating human bottlenecks and file collisions with Git Worktrees and ADEs.",
      descTraditional: "Visualization of the conventional serial workflow: step-by-step execution in a single terminal, with high context-switching costs (Alt-Tab), hardware idleness, and constant file collision risks.",
      pipelineStatusOrchestrated: "Active Concurrent Pipeline",
      pipelineStatusTraditional: "Serial / Blocking Flow"
    },
    flowchart: {
      inspectBtn: "Inspect Details 🔍",
      phaseLabel: "Phase",
      stepOf: "Step {current} of {total}",
      transitionDefault: "⚡ Transition to Phase {next}",
      conclusionTitleOrchestrated: "Architecture Conclusion: The New Era of ADEs",
      conclusionDescOrchestrated: "Modern AI development transcends serial chat. The future belongs to concurrent architectures governed by Git Worktrees, automated tests, and specialized ADE platforms.",
      conclusionBadgeOrchestrated: "✨ Validated Architecture",
      conclusionTitleTraditional: "Critical Bottleneck of the Monolithic Serial Model",
      conclusionDescTraditional: "The traditional serial approach underutilizes computing infrastructure, burdens the developer with manual copy-paste tasks, and accumulates silent technical debt due to file collisions.",
      conclusionBadgeTraditional: "⚠️ Evidenced Limitations",
      emptyState: "No steps available in the flowchart."
    },
    modal: {
      closeBtn: "Close Specification ✕",
      phasePrefix: "Phase",
      specSuffix: "Technical Specification",
      referenceQuoteTitle: "💬 Reference Quote (Kauã Miguel)",
      architectureTitle: "📖 Architectural Foundation",
      comparisonTitle: "Architectural Comparison",
      compBadTag: "❌ Traditional Approach (Serial)",
      compGoodTag: "✅ Concurrent Architecture (Worktrees)",
      practicalCodeTitle: "💻 Practical Commands & Code",
      copyBtn: "Copy Commands",
      copiedBtn: "✓ Copied!",
      toolsTitle: "🛠️ Tools & Patterns in Focus",
      durationLabel: "Estimated Duration:",
      latencyLabel: "Typical Latency:"
    },
    worktrees: {
      heroTitle: "🌳 The Canonical Solution: Isolation via Git Worktree",
      heroDesc: "The physical architecture to eliminate filesystem race conditions and enable multiple agents to code concurrently without collisions.",
      compBadHeader: "❌ Shared Serial Execution (Collision)",
      compBadSub: "Multiple agents operating concurrently in the exact same physical directory.",
      compBad1: "Critical Race Condition risk: two processes overwrite the same file",
      compBad2: "Context window polluted with cross-cutting project responsibilities",
      compBad3: "Chaotic merge conflicts detected late at compile or runtime",
      compGoodHeader: "✅ Orchestration with Git Worktrees (Isolation)",
      compGoodSub: "Multiple specialist agents allocated in isolated physical copies of the repository.",
      compGood1: "Zero write collisions: each agent operates in a segregated physical directory",
      compGood2: "Domain specialization: Frontend, Backend, Database, and QA concurrently",
      compGood3: "Clean reconciliation: atomic Pull Requests validated with automated tests",
      diskTitle: "🗂️ Physical Directory Structure on Disk",
      diskDesc: 'How the "git worktree add" command physically segregates directories so each agent operates without mutual interference:',
      ecosystemTitle: "🛠️ Orchestration Tools Ecosystem",
      creatorPrefix: "Creator / Team: ",
      accessOfficial: "Access Official Tool ↗"
    },
    footer: {
      badgeEdu: "⚖️ Non-Commercial Educational Study",
      badgeLaw: "Art. 46, III & VIII - Law 9.610/98",
      badgeFairUse: "Fair Use (17 U.S.C. § 107)",
      badgeAuthor: "Original Author: @kc_1t (Kauã Miguel)",
      originalRefPrefix: "Original reference work: ",
      publishedBy: " published by ",
      channelLink: "Kauã Miguel (@kc_1t) on YouTube ↗",
      rightsNotice: ". All moral and intellectual property rights regarding the script, speech, and audiovisual production belong strictly and exclusively to the original author.",
      disclaimer: "Legal Notice: This software is an independent educational study companion created purely for instructional, academic, and software engineering analysis purposes. It is non-profit, does not sell or monetize content, and is not sponsored, endorsed, or affiliated with Kauã Miguel or YouTube. To watch the original full work, visit the official YouTube channel."
    }
  },

  de: {
    nav: {
      title: "IA Orchestation learn",
      subtitle: "Didaktische Studie basierend auf dem Werk von ",
      authorLink: "Kauã Miguel (@kc_1t)",
      flowTab: "Orchestrierungsablauf",
      worktreeTab: "Git Worktrees & ADEs",
      watchOnYoutube: "▶ Auf YouTube ansehen",
      phasesSuffix: "Architekturphasen"
    },
    toggle: {
      traditional: "📺 Traditionelles Modell (Seriell)",
      orchestrated: "⚡ Orchestriertes Modell (Nebenläufig)"
    },
    hero: {
      studyBadge: "📖 Didaktische Studie",
      authorBadge: "Inhaltsautor: Kauã Miguel (@kc_1t)",
      mainTitle: "Hören Sie auf, 1 KI-Agenten gleichzeitig zu nutzen: Orchestrieren Sie KI-Agenten",
      tagline: "Die KI wird nicht müde. Sie werden müde, da Sie immer nur ein Terminal gleichzeitig verwalten können.",
      descOrchestrated: "Studie über den Übergang von der ineffizienten seriellen Einzelagentennutzung zu nebenläufigen orchestrierten Systemen, die menschliche Engpässe und Dateikollisionen mit Git Worktrees und ADEs beseitigt.",
      descTraditional: "Visualisierung des konventionellen seriellen Arbeitsablaufs: schrittweise Ausführung in einem einzelnen Terminal mit hohen Kontextwechselkosten (Alt-Tab), Hardware-Leerlauf und ständigen Dateikollisionsrisiken.",
      pipelineStatusOrchestrated: "Aktive nebenläufige Pipeline",
      pipelineStatusTraditional: "Serieller / Blockierender Ablauf"
    },
    flowchart: {
      inspectBtn: "Details inspizieren 🔍",
      phaseLabel: "Phase",
      stepOf: "Schritt {current} von {total}",
      transitionDefault: "⚡ Übergang zu Phase {next}",
      conclusionTitleOrchestrated: "Architektur-Fazit: Die neue Ära der ADEs",
      conclusionDescOrchestrated: "Die moderne Softwareentwicklung mit KI überwindet den seriellen Chat. Die Zukunft gehört nebenläufigen Architekturen, gesteuert durch Git Worktrees, automatisierte Tests und spezialisierte ADE-Plattformen.",
      conclusionBadgeOrchestrated: "✨ Validierte Architektur",
      conclusionTitleTraditional: "Kritischer Engpass des monolithischen seriellen Modells",
      conclusionDescTraditional: "Der traditionelle serielle Ansatz schöpft die Recheninfrastruktur nicht aus, überlastet den Entwickler mit manuellem Kopieren und Einfügen und häuft stille technische Schulden durch Dateikollisionen an.",
      conclusionBadgeTraditional: "⚠️ Nachgewiesene Einschränkungen",
      emptyState: "Keine Schritte im Ablaufdiagramm verfügbar."
    },
    modal: {
      closeBtn: "Spezifikation schließen ✕",
      phasePrefix: "Phase",
      specSuffix: "Technische Spezifikation",
      referenceQuoteTitle: "💬 Referenzzitat (Kauã Miguel)",
      architectureTitle: "📖 Architektonische Grundlagen",
      comparisonTitle: "Architektonischer Vergleich",
      compBadTag: "❌ Traditioneller Ansatz (Seriell)",
      compGoodTag: "✅ Nebenläufige Architektur (Worktrees)",
      practicalCodeTitle: "💻 Praktische Befehle & Codebeispiele",
      copyBtn: "Befehle kopieren",
      copiedBtn: "✓ Kopiert!",
      toolsTitle: "🛠️ Werkzeuge & Muster im Fokus",
      durationLabel: "Geschätzte Dauer:",
      latencyLabel: "Typische Latenz:"
    },
    worktrees: {
      heroTitle: "🌳 Die kanonische Lösung: Isolation über Git Worktree",
      heroDesc: "Die physische Architektur zur Beseitigung von Dateisystem-Race-Conditions, damit mehrere Agenten parallel ohne Konflikte programmieren können.",
      compBadHeader: "❌ Geteilte serielle Ausführung (Kollision)",
      compBadSub: "Mehrere Agenten arbeiten gleichzeitig im selben physischen Repository-Verzeichnis.",
      compBad1: "Kritisches Race-Condition-Risiko: zwei Prozesse überschreiben dieselbe Datei",
      compBad2: "Kontextfenster überladen mit querliegenden Projektzuständigkeiten",
      compBad3: "Chaotische Konflikte werden erst spät zur Build- oder Laufzeit bemerkt",
      compGoodHeader: "✅ Orchestrierung mit Git Worktrees (Isolation)",
      compGoodSub: "Mehrere spezialisierte Agenten in isolierten physischen Kopien des Repositories.",
      compGood1: "Null Schreibkollisionen: Jeder Agent besitzt einen getrennten physischen Ordner",
      compGood2: "Domänenspezialisierung: Frontend, Backend, Datenbank und QA parallel",
      compGood3: "Saubere Zusammenführung: atomare Pull Requests mit automatisierter Testsuite",
      diskTitle: "🗂️ Physische Verzeichnisstruktur auf der Festplatte",
      diskDesc: 'Wie der Befehl "git worktree add" die Verzeichnisse physisch trennt, damit jeder Agent störungsfrei arbeiten kann:',
      ecosystemTitle: "🛠️ Ökosystem der Orchestrierungswerkzeuge",
      creatorPrefix: "Entwickler / Team: ",
      accessOfficial: "Offizielles Tool öffnen ↗"
    },
    footer: {
      badgeEdu: "⚖️ Nicht-kommerzielle didaktische Studie",
      badgeLaw: "Art. 46, III & VIII - Gesetz 9.610/98",
      badgeFairUse: "Fair Use (17 U.S.C. § 107)",
      badgeAuthor: "Originalautor: @kc_1t (Kauã Miguel)",
      originalRefPrefix: "Originales Referenzwerk: ",
      publishedBy: " veröffentlicht von ",
      channelLink: "Kauã Miguel (@kc_1t) auf YouTube ↗",
      rightsNotice: ". Alle Urheber- und Verwertungsrechte bezüglich Drehbuch, Ton und audiovisueller Produktion liegen ausschließlich beim Originalautor.",
      disclaimer: "Rechtlicher Hinweis: Diese Software ist ein unabhängiges Lernwerkzeug zu didaktischen, akademischen und softwaretechnischen Analysezwecken. Es ist gemeinnützig, kommerzialisiert oder monetarisiert keine Inhalte und steht in keinerlei geschäftlicher Verbindung zu Kauã Miguel oder YouTube. Das vollständige Originalvideo finden Sie auf YouTube."
    }
  }
};

// Dicionário de títulos e resumos traduzidos para os nós
export const nodeTranslations = {
  // Nós Orquestrados (videoFlowNodes)
  "solo-agent-paradigm": {
    en: {
      title: "1. The Solo Agent Paradigm & The Orchestra Metaphor",
      category: "Initial Bottleneck",
      summary: "Putting frontend, backend, database, and tests into a single chat saturates context and dilutes model attention."
    },
    de: {
      title: "1. Das Solo-Agenten-Paradigma & Die Orchestermetapher",
      category: "Anfänglicher Engpass",
      summary: "Frontend, Backend, Datenbank und Tests in einem einzigen Chat sättigen den Kontext und schwächen die Modellaufmerksamkeit."
    }
  },
  "human-bottleneck": {
    en: {
      title: "2. The True Bottleneck: The Human & 'Alt-Tab Hell'",
      category: "Cognitive Asymmetry",
      summary: "AI does not get tired. What gets tired is the human manually switching terminal tabs while the machine waits idle."
    },
    de: {
      title: "2. Der wahre Engpass: Der Mensch & die 'Alt-Tab-Hölle'",
      category: "Kognitive Asymmetrie",
      summary: "Die KI ermüdet nicht. Es ermüdet der Mensch, der manuell zwischen Terminal-Tabs wechselt, während die Maschine wartet."
    }
  },
  "file-collision-race-condition": {
    en: {
      title: "3. Critical Concurrency Risk: File Collision",
      category: "Concurrency Engineering",
      summary: "Placing multiple agents in the same physical directory causes race conditions where one silently overwrites another."
    },
    de: {
      title: "3. Kritisches Nebenläufigkeitsrisiko: Dateikollision",
      category: "Nebenläufigkeit",
      summary: "Mehrere Agenten im selben physischen Ordner führen zu Race Conditions, bei denen einer die Arbeit des anderen still überschreibt."
    }
  },
  "git-worktree-solution": {
    en: {
      title: "4. Canonical Engineering Solution: Git Worktrees",
      category: "Workspace Isolation",
      summary: "Git Worktree creates independent physical directories linked to the same repository with zero clone duplication cost."
    },
    de: {
      title: "4. Kanonische Ingenieurlösung: Git Worktrees",
      category: "Arbeitsbereich-Isolation",
      summary: "Git Worktree erzeugt unabhängige physische Verzeichnisse im selben Repository ohne Dateiduplizierungskosten."
    }
  },
  "orchestration-spectrum-levels": {
    en: {
      title: "5. The Orchestration Spectrum: 4 Maturity Levels",
      category: "Architectural Evolution",
      summary: "Orchestration is not binary: it ranges from native subagents to full Agent Development Environments (ADEs)."
    },
    de: {
      title: "5. Das Orchestrierungsspektrum: 4 Reifegrade",
      category: "Architekturelle Evolution",
      summary: "Orchestrierung ist nicht binär: Sie reicht von nativen Subagenten bis hin zu vollständigen ADEs."
    }
  },
  "tools-deep-dive": {
    en: {
      title: "6. Tools in Analysis: Alethe, Orca, Swarm, and Squad",
      category: "Practical Ecosystem",
      summary: "Deep analysis of featured tools: Alethe, Orca (onorca.dev), CodeAgentSwarm, and Claude Squad."
    },
    de: {
      title: "6. Werkzeuge in der Analyse: Alethe, Orca, Swarm und Squad",
      category: "Praktisches Ökosystem",
      summary: "Eingehende Analyse der vorgestellten Werkzeuge: Alethe, Orca, CodeAgentSwarm und Claude Squad."
    }
  },
  "governance-hitl-yolo": {
    en: {
      title: "7. Operation Modes: Human-in-the-Loop vs YOLO Mode",
      category: "Governance & Safety",
      summary: "When to use manual confirmation vs full autonomy (YOLO) with worktree isolation and automated testing agents."
    },
    de: {
      title: "7. Betriebsmodi: Human-in-the-Loop vs. YOLO-Modus",
      category: "Governance & Sicherheit",
      summary: "Wann man manuelle Bestätigung vs. volle Autonomie (YOLO) mit Worktree-Isolation und Testagenten einsetzt."
    }
  },
  "pre-vscode-era": {
    en: {
      title: "8. The Historical Moment: The 'Pre-VS Code' Era of Agents",
      category: "Future Outlook",
      summary: "We are in the embryonic phase of ADEs: those who master multi-agent orchestration now will gain a decisive edge."
    },
    de: {
      title: "8. Der historische Moment: Die 'Vor-VS-Code'-Ära der Agenten",
      category: "Zukunftsausblick",
      summary: "Wir befinden uns in der Frühphase der ADEs: Wer Multi-Agenten-Orchestrierung jetzt meistert, erringt einen massiven Vorteil."
    }
  },

  // Nós Tradicionais (traditionalFlowNodes)
  "trad-prompt-manual": {
    en: {
      title: "1. Isolated Manual Prompt & Monolithic Overload",
      category: "Monolithic Input",
      summary: "Sending massive manual prompts attempting to instruct the model on diverse tasks within a single terminal window."
    },
    de: {
      title: "1. Isolierter manueller Prompt & Monolithische Überlastung",
      category: "Monolithische Eingabe",
      summary: "Senden riesiger manueller Prompts, um dem Modell verschiedene Aufgaben in einem einzigen Terminal zu übertragen."
    }
  },
  "trad-machine-idleness": {
    en: {
      title: "2. Machine Idleness & Waiting Latency",
      category: "Compute Latency",
      summary: "Computing infrastructure sits idle up to 85% of the time waiting for manual developer reading and intervention."
    },
    de: {
      title: "2. Maschinen-Leerlauf & Wartelatenz",
      category: "Rechenlatenz",
      summary: "Die Recheninfrastruktur verbringt bis zu 85% der Zeit im Leerlauf, während sie auf manuelle Benutzereingaben wartet."
    }
  },
  "trad-human-bottleneck": {
    en: {
      title: "3. Human Bottleneck & The 'Alt-Tab Hell' Phenomenon",
      category: "Cognitive Asymmetry",
      summary: "The developer becomes a manual data courier, frantically switching tabs to copy-paste responses."
    },
    de: {
      title: "3. Menschlicher Engpass & das 'Alt-Tab-Hölle'-Phänomen",
      category: "Kognitive Asymmetrie",
      summary: "Der Entwickler wird zum manuellen Datenkurier, der hektisch zwischen Tabs wechselt, um Antworten zu kopieren."
    }
  },
  "trad-manual-execution-errors": {
    en: {
      title: "4. Manual Execution & Cascading Errors",
      category: "Fragile Execution",
      summary: "Typing mistakes, omitted dependencies, and commands executed in the wrong directory break the local environment."
    },
    de: {
      title: "4. Manuelle Ausführung & Kaskadierende Fehler",
      category: "Fragile Ausführung",
      summary: "Tippfehler, vergessene Abhängigkeiten und im falschen Verzeichnis ausgeführte Befehle beschädigen die lokale Umgebung."
    }
  },
  "trad-race-condition": {
    en: {
      title: "5. Local Disk Race Condition",
      category: "File Collision",
      summary: "Naive attempts to run multiple agents in the same folder cause silent file overwrites and loss of work."
    },
    de: {
      title: "5. Race Condition auf der lokalen Festplatte",
      category: "Dateikollision",
      summary: "Naive Versuche, mehrere Agenten im selben Ordner auszuführen, führen zu stillem Überschreiben von Dateien."
    }
  },
  "trad-context-saturation": {
    en: {
      title: "6. Context Window Saturation & Hallucinations",
      category: "Memory Exhaustion",
      summary: "As the chat accumulates dozens of messages, attention degrades and crucial business rules are forgotten."
    },
    de: {
      title: "6. Kontextfenster-Sättigung & Halluzinationen",
      category: "Speichererschöpfung",
      summary: "Wenn der Chat Dutzende Nachrichten sammelt, sinkt die Modellaufmerksamkeit und entscheidende Regeln gehen verloren."
    }
  }
};
