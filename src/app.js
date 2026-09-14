// app.js - Componente Raiz da Aplicação com Suporte a Paradigmas (Traditional / Orchestrated) e i18n (PT, EN, DE)
import React, { useState, useEffect } from 'https://esm.sh/react@18';
import { videoMetadata, videoFlowNodes } from './data/videoFlowData.js';
import { traditionalFlowNodes } from './data/traditionalFlowData.js';
import { i18n } from './data/i18nData.js';
import { Navbar } from './components/Navbar.js';
import { FlowChart } from './components/FlowChart.js';
import { WorktreeView } from './components/WorktreeView.js';
import { NodeDetailModal } from './components/NodeDetailModal.js';
import { Footer } from './components/Footer.js';

export function App() {
  const [activeView, setActiveView] = useState('flowchart'); // 'flowchart' | 'worktrees'
  const [paradigm, setParadigm] = useState('orchestrated'); // 'traditional' | 'orchestrated'
  const [lang, setLang] = useState('pt'); // 'pt' | 'en' | 'de'

  const currentSteps = paradigm === 'traditional' ? traditionalFlowNodes : videoFlowNodes;
  const [selectedStepId, setSelectedStepId] = useState(currentSteps[0].id);
  const [selectedDetailStep, setSelectedDetailStep] = useState(null);

  const t = i18n[lang]?.hero || i18n.pt.hero;
  const isTraditional = paradigm === 'traditional';

  // Sincroniza o atributo data-theme no body do documento para controle global de estilos CSS
  useEffect(() => {
    document.body.setAttribute('data-theme', paradigm);
    document.documentElement.lang = lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'pt-BR';
  }, [paradigm, lang]);

  // Ao alternar entre paradigmas, reajusta o nó selecionado
  const handleToggleParadigm = (newParadigm) => {
    setParadigm(newParadigm);
    const newSteps = newParadigm === 'traditional' ? traditionalFlowNodes : videoFlowNodes;
    setSelectedStepId(newSteps[0].id);
    if (selectedDetailStep) {
      setSelectedDetailStep(null);
    }
  };

  const handleSelectStep = (stepId) => {
    setSelectedStepId(stepId);
  };

  return React.createElement(
    'div',
    { className: `app-container ${isTraditional ? 'theme-traditional' : 'theme-orchestrated'}` },
    // Navbar Principal (Com Seletor de Idiomas, Interruptor de Paradigma e Botão Oficial do YouTube)
    React.createElement(Navbar, {
      activeView: activeView,
      setActiveView: setActiveView,
      totalNodes: currentSteps.length,
      paradigm: paradigm,
      setParadigm: handleToggleParadigm,
      lang: lang,
      setLang: setLang
    }),

    // Conteúdo Principal
    React.createElement(
      'main',
      { className: 'main-wrapper' },

      // Hero Banner Informativo
      React.createElement(
        'div',
        { className: `video-hero-banner ${isTraditional ? 'yt-hero-banner' : ''}` },
        React.createElement(
          'div',
          { className: 'video-hero-content' },
          React.createElement(
            'div',
            { className: 'video-badge-row' },
            React.createElement(
              'span',
              { className: `video-pill ${isTraditional ? 'yt-pill' : ''}` },
              t.studyBadge
            ),
            React.createElement(
              'span',
              { className: `video-author-pill ${isTraditional ? 'yt-author-pill' : ''}` },
              t.authorBadge
            )
          ),
          React.createElement(
            'h2',
            { className: `video-hero-title ${isTraditional ? 'yt-hero-title' : ''}` },
            t.mainTitle
          ),
          React.createElement(
            'blockquote',
            { className: `video-hero-quote ${isTraditional ? 'yt-hero-quote' : ''}` },
            `"${videoMetadata.tagline}"`
          ),
          React.createElement(
            'p',
            { className: `video-hero-desc ${isTraditional ? 'yt-hero-desc' : ''}` },
            isTraditional ? t.descTraditional : t.descOrchestrated
          )
        ),
        React.createElement(
          'div',
          { className: 'video-hero-actions' },
          React.createElement(
            'div',
            { className: `continuous-animation-badge ${isTraditional ? 'yt-status-badge' : ''}` },
            React.createElement('span', {
              className: isTraditional ? 'yt-status-dot' : 'pulse-dot-green'
            }),
            isTraditional ? t.pipelineStatusTraditional : t.pipelineStatusOrchestrated
          )
        )
      ),

      // Visualização 1: Fluxograma da Arquitetura
      activeView === 'flowchart' &&
        React.createElement(FlowChart, {
          steps: currentSteps,
          selectedStepId: selectedStepId,
          onSelectStep: handleSelectStep,
          onOpenDetails: setSelectedDetailStep,
          paradigm: paradigm,
          lang: lang
        }),

      // Visualização 2: Arquitetura Git Worktree & Ferramentas ADE
      activeView === 'worktrees' &&
        React.createElement(WorktreeView, {
          paradigm: paradigm,
          lang: lang
        })
    ),

    // Rodapé Legal e de Atribuição
    React.createElement(Footer, {
      paradigm: paradigm,
      lang: lang
    }),

    // Modal de Detalhes e Especificações Técnicas
    selectedDetailStep &&
      React.createElement(NodeDetailModal, {
        step: selectedDetailStep,
        onClose: () => setSelectedDetailStep(null),
        paradigm: paradigm,
        lang: lang
      })
  );
}
