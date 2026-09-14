// ParadigmToggle.js - Interruptor de Arquitetura: Modelo Tradicional (Serial) vs Orquestrado (Concorrente)
import React from 'https://esm.sh/react@18';
import { i18n } from '../data/i18nData.js';

export function ParadigmToggle({ paradigm, onToggle, lang = 'pt' }) {
  const t = i18n[lang]?.toggle || i18n.pt.toggle;

  return React.createElement(
    'div',
    {
      className: 'paradigm-toggle-container',
      role: 'group',
      'aria-label': 'Seleção de Paradigma Arquitetural'
    },
    // Botão Modelo Tradicional (Serial)
    React.createElement(
      'button',
      {
        type: 'button',
        className: `paradigm-toggle-btn traditional ${paradigm === 'traditional' ? 'active' : ''}`,
        onClick: () => onToggle('traditional'),
        'aria-pressed': paradigm === 'traditional',
        title: 'Alternar para visualização do Modelo Tradicional Serial'
      },
      React.createElement('span', { className: 'toggle-btn-icon' }, '📺'),
      React.createElement('span', { className: 'toggle-btn-label' }, t.traditional)
    ),

    // Divisor visual sutil
    React.createElement('div', { className: 'paradigm-toggle-divider' }),

    // Botão Modelo Orquestrado (Concorrente)
    React.createElement(
      'button',
      {
        type: 'button',
        className: `paradigm-toggle-btn orchestrated ${paradigm === 'orchestrated' ? 'active' : ''}`,
        onClick: () => onToggle('orchestrated'),
        'aria-pressed': paradigm === 'orchestrated',
        title: 'Alternar para visualização do Modelo Orquestrado Concorrente'
      },
      React.createElement('span', { className: 'toggle-btn-icon' }, '⚡'),
      React.createElement('span', { className: 'toggle-btn-label' }, t.orchestrated)
    )
  );
}
