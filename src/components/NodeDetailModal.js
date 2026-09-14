// NodeDetailModal.js - Painel modal expansível para inspeção técnica da fase arquitetural
import React, { useState } from 'https://esm.sh/react@18';
import { i18n, nodeTranslations } from '../data/i18nData.js';

export function NodeDetailModal({ step, onClose, paradigm = 'orchestrated', lang = 'pt' }) {
  if (!step) return null;

  const [copied, setCopied] = useState(false);
  const t = i18n[lang]?.modal || i18n.pt.modal;
  const isTraditional = paradigm === 'traditional';

  // Tradução do nó
  const trans = (lang !== 'pt' && nodeTranslations[step.id]?.[lang]) || {};
  const title = trans.title || step.title;
  const category = trans.category || step.category;
  const summary = trans.summary || step.summary;

  const details = step.details || {};

  const handleCopyCode = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return React.createElement(
    'div',
    { className: 'modal-backdrop', onClick: onClose },
    React.createElement(
      'div',
      {
        className: `modal-content ${isTraditional ? 'modal-traditional' : ''}`,
        onClick: (e) => e.stopPropagation()
      },
      // Botão de fechar
      React.createElement(
        'button',
        {
          className: `modal-close-btn ${isTraditional ? 'yt-modal-close' : ''}`,
          onClick: onClose,
          title: 'Fechar (Esc)'
        },
        '✕'
      ),

      // Cabeçalho com indicador de etapa
      React.createElement(
        'div',
        { className: 'modal-header' },
        React.createElement(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' } },
          React.createElement(
            'span',
            {
              className: `node-category ${isTraditional ? 'yt-category-badge' : ''}`,
              style: { color: isTraditional ? '#333333' : step.color, borderColor: `${step.color}50` }
            },
            category
          ),
          React.createElement(
            'span',
            {
              className: `node-step-badge ${isTraditional ? 'yt-step-pill' : ''}`,
              style: { backgroundColor: step.color }
            },
            `${t.phasePrefix} ${step.stepNumber || '•'} • ${t.specSuffix}`
          ),
          isTraditional && step.durationBadge &&
            React.createElement(
              'span',
              { className: 'yt-video-time-badge' },
              `⏱ ${step.durationBadge}`
            )
        ),
        React.createElement(
          'h2',
          { className: 'modal-title', style: { display: 'flex', alignItems: 'center', gap: '0.6rem' } },
          React.createElement('span', null, step.icon || (isTraditional ? '📺' : '⚡')),
          title
        ),
        React.createElement(
          'p',
          { style: { color: isTraditional ? '#555555' : 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.95rem' } },
          summary
        )
      ),

      // 1. Citação de Referência (Kauã Miguel)
      details.citacaoVideo &&
        React.createElement(
          'div',
          {
            className: `section-box ${isTraditional ? 'yt-section-box' : ''}`,
            style: {
              borderLeft: `4px solid ${step.color || (isTraditional ? '#cc181e' : 'var(--color-cyan)')}`,
              background: isTraditional ? '#fafafa' : 'rgba(15, 23, 42, 0.75)'
            }
          },
          React.createElement(
            'h4',
            { style: { color: step.color, display: 'flex', alignItems: 'center', gap: '0.45rem' } },
            t.referenceQuoteTitle
          ),
          React.createElement(
            'p',
            {
              style: {
                color: isTraditional ? '#222222' : '#f8fafc',
                fontStyle: 'italic',
                lineHeight: 1.65,
                fontSize: '0.96rem'
              }
            },
            `"${details.citacaoVideo}"`
          )
        ),

      // 2. Fundamentação Arquitetural
      React.createElement(
        'div',
        { className: `section-box ${isTraditional ? 'yt-section-box' : ''}` },
        React.createElement('h4', null, t.architectureTitle),
        React.createElement(
          'p',
          { style: { color: isTraditional ? '#333333' : 'var(--text-primary)', lineHeight: 1.7, fontSize: '0.92rem' } },
          details.conceito
        )
      ),

      // 3. Comparação Arquitetural: Serial vs Concorrente
      details.comparacao &&
        React.createElement(
          'div',
          { className: 'modal-comparison-grid' },
          React.createElement(
            'div',
            { className: `modal-comp-card bad ${isTraditional ? 'yt-comp-card bad' : ''}` },
            React.createElement('div', { className: 'modal-comp-tag bad' }, t.compBadTag),
            React.createElement(
              'p',
              { style: { color: isTraditional ? '#444444' : 'inherit' } },
              details.comparacao.tradicional
            )
          ),
          React.createElement(
            'div',
            { className: `modal-comp-card good ${isTraditional ? 'yt-comp-card good' : ''}` },
            React.createElement('div', { className: 'modal-comp-tag good' }, t.compGoodTag),
            React.createElement(
              'p',
              { style: { color: isTraditional ? '#444444' : 'inherit' } },
              details.comparacao.orquestrado
            )
          )
        ),

      // 4. Código Prático ou Comando CLI
      details.codigoPratico &&
        React.createElement(
          'div',
          { className: `section-box ${isTraditional ? 'yt-section-box' : ''}` },
          React.createElement(
            'div',
            {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.6rem'
              }
            },
            React.createElement('h4', { style: { margin: 0 } }, `💻 ${details.codigoPratico.tipo}`),
            React.createElement(
              'button',
              {
                className: `ctrl-btn small ${isTraditional ? 'yt-action-btn' : ''}`,
                onClick: () => handleCopyCode(details.codigoPratico.snippet),
                style: { fontSize: '0.75rem', padding: '0.2rem 0.6rem' }
              },
              copied ? t.copiedBtn : t.copyBtn
            )
          ),
          React.createElement(
            'pre',
            {
              className: 'modal-code-block',
              style: {
                background: isTraditional ? '#f5f5f5' : '#030712',
                border: isTraditional ? '1px solid #e0e0e0' : '1px solid #1f2937',
                color: isTraditional ? '#111111' : '#e5e7eb'
              }
            },
            React.createElement('code', null, details.codigoPratico.snippet)
          )
        ),

      // 5. Ferramentas Mencionadas
      details.ferramentas && details.ferramentas.length > 0 &&
        React.createElement(
          'div',
          { className: `section-box ${isTraditional ? 'yt-section-box' : ''}` },
          React.createElement('h4', null, t.toolsTitle),
          React.createElement(
            'div',
            { style: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' } },
            details.ferramentas.map((tool, idx) =>
              React.createElement(
                'span',
                {
                  key: idx,
                  className: 'tool-chip',
                  style: {
                    borderColor: `${step.color}40`,
                    color: isTraditional ? '#222222' : step.color,
                    background: isTraditional ? '#f0f0f0' : 'rgba(255, 255, 255, 0.04)'
                  }
                },
                tool
              )
            )
          )
        ),

      // 6. Botão de Fechamento
      React.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' } },
        React.createElement(
          'button',
          {
            onClick: onClose,
            className: `ctrl-btn ${isTraditional ? 'yt-action-btn' : ''}`,
            style: { fontSize: '0.85rem' }
          },
          t.closeBtn
        )
      )
    )
  );
}
