// FlowChart.js - Fluxograma Reativo: YouTube 2015-2017 (Traditional) & Dark Fiber-Optic (Orchestrated)
import React from 'https://esm.sh/react@18';
import { i18n, nodeTranslations } from '../data/i18nData.js';

export function FlowChart({
  steps,
  selectedStepId,
  onSelectStep,
  onOpenDetails,
  paradigm = 'orchestrated',
  lang = 'pt'
}) {
  const t = i18n[lang]?.flowchart || i18n.pt.flowchart;
  const isTraditional = paradigm === 'traditional';

  if (!steps || steps.length === 0) {
    return React.createElement(
      'div',
      { className: 'empty-flow' },
      t.emptyState
    );
  }

  // Duração da animação dos conectores
  const animDuration = isTraditional ? 2.6 : 2.2;

  return React.createElement(
    'div',
    {
      className: `flowchart-container ${isTraditional ? 'flowchart-traditional' : 'flowchart-orchestrated'}`,
      style: { '--flow-duration': `${animDuration}s` }
    },

    // Cadeia Central em Linha Simétrica
    React.createElement(
      'div',
      { className: `pure-flowchart-chain ${isTraditional ? 'chain-traditional' : ''}` },
      steps.map((step, index) => {
        const isSelected = step.id === selectedStepId;
        const cardColor = step.color || (isTraditional ? '#cc181e' : '#3b82f6');
        const hasNext = index < steps.length - 1;
        const nextStep = steps[index + 1];

        // Tradução dinâmica de nós
        const trans = (lang !== 'pt' && nodeTranslations[step.id]?.[lang]) || {};
        const title = trans.title || step.title;
        const category = trans.category || step.category;
        const summary = trans.summary || step.summary;

        return React.createElement(
          'div',
          {
            key: step.id,
            className: `neural-node-wrapper ${isTraditional ? 'node-wrapper-yt' : ''}`,
            style: { '--active-color': cardColor }
          },

          // Card do Nó da Arquitetura
          React.createElement(
            'div',
            {
              className: `neural-node-card ${isTraditional ? 'yt-card-2015' : 'continuous-glow'} ${isSelected ? 'active' : ''}`,
              onClick: () => {
                onSelectStep(step.id);
                onOpenDetails(step);
              },
              title: isTraditional
                ? 'Clique para inspecionar os detalhes desta fase no padrão YouTube'
                : 'Clique para inspecionar as especificações técnicas deste nó'
            },

            // Porta de Entrada Superior
            index > 0 &&
              React.createElement('div', {
                className: `synapse-port top ${isTraditional ? 'yt-port' : ''}`,
                style: { backgroundColor: cardColor },
                title: 'Canal de Entrada'
              }),

            // Cabeçalho do Nó
            React.createElement(
              'div',
              { className: 'node-header' },
              React.createElement(
                'div',
                { style: { display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' } },
                React.createElement('span', { style: { fontSize: '1.25rem' } }, step.icon || (isTraditional ? '📺' : '⚡')),
                React.createElement(
                  'span',
                  {
                    className: `node-category ${isTraditional ? 'yt-category-badge' : ''}`,
                    style: { color: isTraditional ? '#333333' : cardColor, borderColor: `${cardColor}40` }
                  },
                  category
                ),
                // Badge de Duração de Vídeo (Estética YouTube 2015-2017)
                isTraditional && step.durationBadge &&
                  React.createElement(
                    'span',
                    { className: 'yt-video-time-badge' },
                    `⏱ ${step.durationBadge}`
                  ),
                // Latência no modelo tradicional
                isTraditional && step.latencyLabel &&
                  React.createElement(
                    'span',
                    { className: 'yt-latency-chip' },
                    `Latência: ${step.latencyLabel}`
                  )
              ),
              React.createElement(
                'span',
                {
                  className: `node-step-badge ${isTraditional ? 'yt-step-pill' : ''}`,
                  style: { backgroundColor: cardColor }
                },
                `${t.phaseLabel} ${step.stepNumber || index + 1}`
              )
            ),

            // Corpo Simétrico com Título e Resumo
            React.createElement(
              'div',
              { className: 'node-body' },
              React.createElement('h3', { className: `node-title ${isTraditional ? 'yt-title' : ''}` }, title),
              React.createElement('p', { className: `node-summary ${isTraditional ? 'yt-summary' : ''}` }, summary)
            ),

            // Rodapé do Nó
            React.createElement(
              'div',
              { className: 'node-footer' },
              React.createElement(
                'div',
                { style: { display: 'flex', alignItems: 'center', gap: '0.4rem' } },
                React.createElement('span', {
                  className: isTraditional ? 'yt-indicator-dot' : 'pulse-dot-green',
                  style: { backgroundColor: cardColor, boxShadow: isTraditional ? 'none' : `0 0 8px ${cardColor}` }
                }),
                React.createElement(
                  'span',
                  { style: { fontSize: '0.78rem', color: isTraditional ? '#666666' : 'var(--text-secondary)', fontWeight: 600 } },
                  t.stepOf.replace('{current}', index + 1).replace('{total}', steps.length)
                )
              ),
              React.createElement(
                'span',
                { className: `node-inspect-cta ${isTraditional ? 'yt-cta' : ''}` },
                t.inspectBtn
              )
            ),

            // Porta de Saída Inferior
            hasNext &&
              React.createElement('div', {
                className: `synapse-port bottom ${isTraditional ? 'yt-port' : ''}`,
                style: { backgroundColor: cardColor },
                title: 'Canal de Saída'
              })
          ),

          // Conector Animado
          hasNext &&
            (isTraditional
              ? // Conector Estilo YouTube 2015 (Scrubber / Timeline com Playhead Vermelho)
                React.createElement(
                  'div',
                  { className: 'yt-connector-box' },
                  React.createElement(
                    'svg',
                    {
                      className: 'yt-svg-scrubber',
                      viewBox: '0 0 100 68',
                      preserveAspectRatio: 'none'
                    },
                    // Trilha de fundo cinza da barra de progresso do player
                    React.createElement('line', {
                      x1: '50',
                      y1: '0',
                      x2: '50',
                      y2: '68',
                      stroke: '#e0e0e0',
                      strokeWidth: '4'
                    }),
                    // Barra vermelha de buffer/reprodução
                    React.createElement('line', {
                      x1: '50',
                      y1: '0',
                      x2: '50',
                      y2: '68',
                      stroke: '#cc181e',
                      strokeWidth: '4',
                      strokeDasharray: '12 18',
                      className: 'yt-scrubber-progress'
                    }),
                    // Playhead circular do YouTube 2015-2017 descendo suavemente
                    React.createElement(
                      'circle',
                      {
                        r: '6',
                        fill: '#cc181e',
                        stroke: '#ffffff',
                        strokeWidth: '2.5'
                      },
                      React.createElement('animateMotion', {
                        path: 'M 50 0 L 50 68',
                        dur: `${animDuration}s`,
                        repeatCount: 'indefinite'
                      })
                    )
                  ),
                  // Badge Central do Scrubber
                  React.createElement(
                    'div',
                    { className: 'yt-connector-badge' },
                    step.signalToNext || t.transitionDefault.replace('{next}', index + 2)
                  )
                )
              : // Conector Laser Fibra Óptica (Modo Orquestrado Neon)
                React.createElement(
                  'div',
                  { className: 'synaptic-connector-box' },
                  React.createElement(
                    'svg',
                    {
                      className: 'synapse-svg-refined',
                      viewBox: '0 0 100 68',
                      preserveAspectRatio: 'none'
                    },
                    React.createElement(
                      'defs',
                      null,
                      React.createElement(
                        'linearGradient',
                        {
                          id: `fiberGrad-${step.id}`,
                          x1: '0%',
                          y1: '0%',
                          x2: '0%',
                          y2: '100%'
                        },
                        React.createElement('stop', { offset: '0%', stopColor: cardColor, stopOpacity: 0.95 }),
                        React.createElement('stop', {
                          offset: '100%',
                          stopColor: nextStep?.color || '#3b82f6',
                          stopOpacity: 0.95
                        })
                      ),
                      React.createElement(
                        'filter',
                        { id: `glow-${step.id}`, x: '-20%', y: '-20%', width: '140%', height: '140%' },
                        React.createElement('feGaussianBlur', { stdDeviation: '2', result: 'coloredBlur' }),
                        React.createElement(
                          'feMerge',
                          null,
                          React.createElement('feMergeNode', { in: 'coloredBlur' }),
                          React.createElement('feMergeNode', { in: 'SourceGraphic' })
                        )
                      ),
                      React.createElement(
                        'marker',
                        {
                          id: `arrow-${step.id}`,
                          viewBox: '0 0 10 10',
                          refX: '5',
                          refY: '5',
                          markerWidth: '6',
                          markerHeight: '6',
                          orient: 'auto-start-reverse'
                        },
                        React.createElement('path', {
                          d: 'M 0 0 L 10 5 L 0 10 z',
                          fill: cardColor
                        })
                      )
                    ),
                    // Linha de trilha
                    React.createElement('path', {
                      className: 'synapse-track',
                      d: 'M 50 0 L 50 68'
                    }),
                    // Feixe de laser
                    React.createElement('path', {
                      className: 'synapse-laser-beam',
                      d: 'M 50 0 L 50 68',
                      stroke: `url(#fiberGrad-${step.id})`,
                      filter: `url(#glow-${step.id})`,
                      markerEnd: `url(#arrow-${step.id})`
                    }),
                    // Fóton em trânsito perpétuo
                    React.createElement(
                      'circle',
                      {
                        r: '3.5',
                        fill: '#ffffff',
                        filter: `drop-shadow(0 0 8px ${cardColor})`
                      },
                      React.createElement('animateMotion', {
                        path: 'M 50 0 L 50 68',
                        dur: `${animDuration}s`,
                        repeatCount: 'indefinite'
                      })
                    )
                  ),
                  // Badge de Transição
                  React.createElement(
                    'div',
                    {
                      className: 'synapse-label-badge continuous-pulse',
                      style: {
                        borderColor: `${cardColor}60`,
                        color: cardColor
                      }
                    },
                    step.signalToNext || t.transitionDefault.replace('{next}', index + 2)
                  )
                ))
        );
      })
    ),

    // Card de Conclusão da Arquitetura
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          marginTop: '1.5rem'
        }
      },
      React.createElement(
        'div',
        { className: `feedback-loop-card ${isTraditional ? 'yt-feedback-card' : ''}` },
        React.createElement(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: '0.85rem' } },
          React.createElement('span', { style: { fontSize: '1.6rem' } }, isTraditional ? '⚠️' : '🚀'),
          React.createElement(
            'div',
            null,
            React.createElement(
              'h4',
              {
                style: {
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: isTraditional ? '#cc181e' : '#38bdf8',
                  marginBottom: '0.25rem'
                }
              },
              isTraditional ? t.conclusionTitleTraditional : t.conclusionTitleOrchestrated
            ),
            React.createElement(
              'p',
              {
                style: {
                  fontSize: '0.84rem',
                  color: isTraditional ? '#555555' : 'var(--text-secondary)',
                  lineHeight: 1.5,
                  margin: 0
                }
              },
              isTraditional ? t.conclusionDescTraditional : t.conclusionDescOrchestrated
            )
          )
        ),
        React.createElement(
          'span',
          {
            className: `ctrl-btn ${isTraditional ? 'yt-warning-btn' : ''}`,
            style: {
              fontSize: '0.8rem',
              borderColor: isTraditional ? '#cc181e' : 'rgba(56, 189, 248, 0.4)',
              color: isTraditional ? '#cc181e' : '#38bdf8',
              cursor: 'default',
              whiteSpace: 'nowrap'
            }
          },
          isTraditional ? t.conclusionBadgeTraditional : t.conclusionBadgeOrchestrated
        )
      )
    )
  );
}
