// Controls.js - Barra de controle de reprodução do fluxograma
import React from 'https://esm.sh/react@18';

export function Controls({
  isPlaying,
  setIsPlaying,
  currentStepIndex,
  totalSteps,
  onPrev,
  onNext,
  onReset,
  speed,
  setSpeed
}) {
  const progressPct = totalSteps > 0 ? Math.round(((currentStepIndex + 1) / totalSteps) * 100) : 0;

  return React.createElement(
    'div',
    { className: 'controls-panel' },
    React.createElement(
      'div',
      { className: 'controls-group' },
      React.createElement(
        'button',
        {
          className: 'ctrl-btn primary',
          onClick: () => setIsPlaying(!isPlaying),
          title: isPlaying ? 'Pausar animação automática' : 'Iniciar animação automática'
        },
        isPlaying ? '⏸ Pausar' : '▶ Animar Fluxo'
      ),
      React.createElement(
        'button',
        {
          className: 'ctrl-btn',
          onClick: onPrev,
          disabled: currentStepIndex <= 0,
          style: { opacity: currentStepIndex <= 0 ? 0.5 : 1 },
          title: 'Etapa Anterior'
        },
        '⏮ Anterior'
      ),
      React.createElement(
        'button',
        {
          className: 'ctrl-btn',
          onClick: onNext,
          disabled: currentStepIndex >= totalSteps - 1,
          style: { opacity: currentStepIndex >= totalSteps - 1 ? 0.5 : 1 },
          title: 'Próxima Etapa'
        },
        'Próximo ⏭'
      ),
      React.createElement(
        'button',
        {
          className: 'ctrl-btn',
          onClick: onReset,
          title: 'Reiniciar do Início'
        },
        '↺ Reiniciar'
      )
    ),
    React.createElement(
      'div',
      { className: 'controls-group' },
      React.createElement(
        'label',
        { style: { fontSize: '0.85rem', color: 'var(--text-secondary)' } },
        'Velocidade:'
      ),
      React.createElement(
        'select',
        {
          className: 'speed-select',
          value: speed,
          onChange: (e) => setSpeed(Number(e.target.value))
        },
        React.createElement('option', { value: 4000 }, '0.5x (Lento)'),
        React.createElement('option', { value: 2500 }, '1.0x (Normal)'),
        React.createElement('option', { value: 1200 }, '2.0x (Rápido)')
      ),
      React.createElement(
        'div',
        { className: 'progress-indicator' },
        React.createElement(
          'span',
          null,
          `Etapa ${currentStepIndex + 1} de ${totalSteps}`
        ),
        React.createElement(
          'div',
          { className: 'progress-bar-bg' },
          React.createElement('div', {
            className: 'progress-bar-fill',
            style: { width: `${progressPct}%` }
          })
        )
      )
    )
  );
}
