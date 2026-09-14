// WorktreeView.js - Visualização de Arquitetura Git Worktree e Catálogo de Ferramentas
import React from 'https://esm.sh/react@18';
import { worktreeDiagramData, videoToolsCatalog } from '../data/videoFlowData.js';
import { i18n } from '../data/i18nData.js';

export function WorktreeView({ paradigm = 'orchestrated', lang = 'pt' }) {
  const t = i18n[lang]?.worktrees || i18n.pt.worktrees;
  const isTraditional = paradigm === 'traditional';

  return React.createElement(
    'div',
    { className: `orchestration-wrapper ${isTraditional ? 'worktrees-traditional' : ''}` },
    // Banner da Arquitetura
    React.createElement(
      'div',
      { className: `orchestration-hero ${isTraditional ? 'yt-worktree-hero' : ''}` },
      React.createElement(
        'div',
        { className: 'hero-title-row' },
        React.createElement(
          'div',
          null,
          React.createElement('h2', { style: { fontSize: '1.6rem', fontWeight: 800 } }, t.heroTitle),
          React.createElement(
            'p',
            { style: { color: isTraditional ? '#666666' : 'var(--text-secondary)', marginTop: '0.4rem' } },
            t.heroDesc
          )
        )
      )
    ),

    // Comparativo: Modelo Serial vs Modelo de Worktrees
    React.createElement(
      'div',
      { className: 'comparison-grid' },
      React.createElement(
        'div',
        { className: `comparison-card bad ${isTraditional ? 'yt-comp-card bad' : ''}` },
        React.createElement(
          'div',
          { className: 'comparison-header', style: { color: isTraditional ? '#cc181e' : 'var(--color-rose)' } },
          t.compBadHeader
        ),
        React.createElement(
          'p',
          { style: { fontSize: '0.86rem', color: isTraditional ? '#555555' : 'var(--text-secondary)', marginBottom: '0.8rem' } },
          t.compBadSub
        ),
        React.createElement(
          'ul',
          { className: `bullet-list ${isTraditional ? 'yt-bullet-list' : ''}` },
          React.createElement('li', null, t.compBad1),
          React.createElement('li', null, t.compBad2),
          React.createElement('li', null, t.compBad3)
        )
      ),
      React.createElement(
        'div',
        { className: `comparison-card good ${isTraditional ? 'yt-comp-card good' : ''}` },
        React.createElement(
          'div',
          { className: 'comparison-header', style: { color: isTraditional ? '#007a3d' : 'var(--color-emerald)' } },
          t.compGoodHeader
        ),
        React.createElement(
          'p',
          { style: { fontSize: '0.86rem', color: isTraditional ? '#555555' : 'var(--text-secondary)', marginBottom: '0.8rem' } },
          t.compGoodSub
        ),
        React.createElement(
          'ul',
          { className: `bullet-list ${isTraditional ? 'yt-bullet-list' : ''}` },
          React.createElement('li', null, t.compGood1),
          React.createElement('li', null, t.compGood2),
          React.createElement('li', null, t.compGood3)
        )
      )
    ),

    // Diagrama de Diretórios com Git Worktree
    React.createElement(
      'div',
      { className: `section-box ${isTraditional ? 'yt-section-box' : ''}`, style: { marginBottom: '2.5rem' } },
      React.createElement(
        'h3',
        { style: { fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' } },
        t.diskTitle
      ),
      React.createElement(
        'p',
        { style: { fontSize: '0.9rem', color: isTraditional ? '#666666' : 'var(--text-secondary)', marginBottom: '1.2rem' } },
        t.diskDesc
      ),
      React.createElement(
        'div',
        {
          style: {
            background: isTraditional ? '#fcfcfc' : '#04070d',
            border: isTraditional ? '1px solid #e0e0e0' : '1px solid #1e293b',
            padding: '1.25rem',
            borderRadius: isTraditional ? '2px' : '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem'
          }
        },
        React.createElement(
          'div',
          { style: { color: isTraditional ? '#007a3d' : '#34d399', fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' } },
          `📁 ${worktreeDiagramData.mainRepo}`
        ),
        React.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'column', gap: '0.85rem' } },
          worktreeDiagramData.worktrees.map((wt, i) =>
            React.createElement(
              'div',
              {
                key: i,
                style: {
                  background: isTraditional ? '#ffffff' : 'rgba(15, 23, 42, 0.7)',
                  borderLeft: `4px solid ${wt.color}`,
                  borderTop: isTraditional ? '1px solid #e8e8e8' : 'none',
                  borderRight: isTraditional ? '1px solid #e8e8e8' : 'none',
                  borderBottom: isTraditional ? '1px solid #e8e8e8' : 'none',
                  padding: '0.85rem 1rem',
                  borderRadius: isTraditional ? '2px' : '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  boxShadow: isTraditional ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                }
              },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'span',
                  { style: { color: isTraditional ? '#111111' : '#38bdf8', fontWeight: 700 } },
                  wt.dir
                ),
                React.createElement(
                  'span',
                  { style: { color: isTraditional ? '#777777' : 'var(--text-muted)', marginLeft: '0.6rem', fontSize: '0.8rem' } },
                  `(branch: ${wt.branch})`
                ),
                React.createElement(
                  'div',
                  { style: { color: isTraditional ? '#555555' : 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '0.25rem' } },
                  wt.task
                )
              ),
              React.createElement(
                'div',
                { style: { display: 'flex', alignItems: 'center', gap: '0.6rem' } },
                React.createElement(
                  'span',
                  {
                    className: 'tool-chip',
                    style: {
                      color: wt.color,
                      borderColor: `${wt.color}40`,
                      background: isTraditional ? '#f5f5f5' : 'rgba(255, 255, 255, 0.04)',
                      margin: 0
                    }
                  },
                  wt.agent
                ),
                React.createElement(
                  'span',
                  {
                    style: {
                      fontSize: '0.75rem',
                      background: isTraditional ? '#eeeeee' : '#0f172a',
                      padding: '0.2rem 0.5rem',
                      borderRadius: isTraditional ? '2px' : '4px',
                      color: isTraditional ? '#444444' : '#94a3b8'
                    }
                  },
                  wt.model
                )
              )
            )
          )
        )
      )
    ),

    // Grid de Ferramentas de Orquestração
    React.createElement(
      'div',
      null,
      React.createElement(
        'h3',
        { style: { fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.2rem', color: isTraditional ? '#222222' : 'inherit' } },
        t.ecosystemTitle
      ),
      React.createElement(
        'div',
        { className: 'tools-grid' },
        videoToolsCatalog.map((tool) =>
          React.createElement(
            'div',
            {
              key: tool.id,
              className: `tool-card ${isTraditional ? 'yt-tool-card' : ''}`,
              style: { '--tool-color': tool.color }
            },
            React.createElement(
              'div',
              null,
              React.createElement(
                'span',
                {
                  className: `tool-badge ${isTraditional ? 'yt-tool-badge' : ''}`,
                  style: { color: tool.color, borderColor: `${tool.color}40` }
                },
                tool.badge
              ),
              React.createElement('h4', { className: 'tool-name' }, tool.name),
              React.createElement('p', { className: 'tool-creator' }, `${t.creatorPrefix}${tool.creator}`),
              React.createElement('p', { className: 'tool-highlight' }, tool.highlight),
              React.createElement(
                'ul',
                { className: `bullet-list ${isTraditional ? 'yt-bullet-list' : ''}`, style: { marginBottom: '1.2rem' } },
                tool.features.map((feat, idx) =>
                  React.createElement('li', { key: idx }, feat)
                )
              )
            ),
            React.createElement(
              'a',
              {
                href: tool.repoUrl,
                target: '_blank',
                rel: 'noreferrer',
                className: `ctrl-btn ${isTraditional ? 'yt-action-btn' : ''}`,
                style: { textAlign: 'center', justifyContent: 'center', textDecoration: 'none', width: '100%' }
              },
              t.accessOfficial
            )
          )
        )
      )
    )
  );
}
