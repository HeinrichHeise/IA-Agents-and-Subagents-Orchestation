// Navbar.js - Barra de navegação com título 'IA Orchestation learn', crédito a Kauã Miguel, i18n e ParadigmToggle
import React from 'https://esm.sh/react@18';
import { videoMetadata } from '../data/videoFlowData.js';
import { i18n } from '../data/i18nData.js';
import { LanguageSelector } from './LanguageSelector.js';
import { ParadigmToggle } from './ParadigmToggle.js';

export function Navbar({
  activeView,
  setActiveView,
  totalNodes,
  paradigm,
  setParadigm,
  lang = 'pt',
  setLang
}) {
  const t = i18n[lang]?.nav || i18n.pt.nav;

  const isTraditional = paradigm === 'traditional';

  return React.createElement(
    'header',
    { className: `header-container ${isTraditional ? 'theme-traditional' : 'theme-orchestrated'}` },
    React.createElement(
      'div',
      { className: 'header-top' },
      // Marca e Título Principal
      React.createElement(
        'div',
        { className: 'logo-brand' },
        React.createElement(
          'div',
          { className: `logo-icon ${isTraditional ? 'yt-icon' : ''}` },
          isTraditional ? '▶' : '⚡'
        ),
        React.createElement(
          'div',
          { className: 'logo-text' },
          React.createElement('h1', null, t.title),
          React.createElement(
            'p',
            null,
            t.subtitle,
            React.createElement(
              'a',
              {
                href: videoMetadata.videoUrl,
                target: '_blank',
                rel: 'noreferrer',
                className: 'author-highlight-link'
              },
              t.authorLink
            )
          )
        )
      ),

      // Ações do Cabeçalho: Seletor de Idiomas, Interruptor de Paradigma e Botão Oficial
      React.createElement(
        'div',
        { className: 'header-actions' },
        // Seletor de Idiomas (PT, EN, DE)
        React.createElement(LanguageSelector, {
          currentLang: lang,
          onSelectLang: setLang
        }),

        // Interruptor Único de Paradigma Arquitetural
        React.createElement(ParadigmToggle, {
          paradigm: paradigm,
          onToggle: setParadigm,
          lang: lang
        }),

        // Badge de Contagem de Fases
        React.createElement(
          'div',
          { className: `status-badge ${isTraditional ? 'traditional-badge' : ''}` },
          React.createElement('span', { className: `status-indicator-dot ${isTraditional ? 'yt-dot' : ''}` }),
          `${totalNodes} ${t.phasesSuffix}`
        ),

        // Botão Canônico de Redirecionamento ao Vídeo Oficial no YouTube
        React.createElement(
          'a',
          {
            href: videoMetadata.videoUrl,
            target: '_blank',
            rel: 'noreferrer',
            className: `ctrl-btn ${isTraditional ? 'yt-watch-btn' : 'primary'}`,
            style: { textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }
          },
          t.watchOnYoutube
        )
      )
    ),

    // Abas de Navegação Principal
    React.createElement(
      'nav',
      { className: 'nav-tabs' },
      React.createElement(
        'button',
        {
          className: `tab-btn ${activeView === 'flowchart' ? 'active' : ''}`,
          onClick: () => setActiveView('flowchart')
        },
        React.createElement('span', { className: 'tab-icon' }, isTraditional ? '📺' : '⚡'),
        React.createElement('span', null, t.flowTab),
        React.createElement('span', { className: 'tab-badge' }, totalNodes)
      ),
      React.createElement(
        'button',
        {
          className: `tab-btn ${activeView === 'worktrees' ? 'active' : ''}`,
          onClick: () => setActiveView('worktrees')
        },
        React.createElement('span', { className: 'tab-icon' }, '🌳'),
        React.createElement('span', null, t.worktreeTab),
        React.createElement('span', { className: 'tab-badge' }, '4')
      )
    )
  );
}
