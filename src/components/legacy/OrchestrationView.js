// OrchestrationView.js - Visualizador avançado do Deep Dive de Orquestração de Agentes
// Baseado no vídeo de Kauã Miguel (https://youtu.be/8jvrucR7QCU)
import React from 'https://esm.sh/react@18';
import { orchestrationToolsData, orchestrationFlowSteps } from '../data/orchestrationFlowData.js';
import { FlowChart } from './FlowChart.js';

export function OrchestrationView({ currentStepIndex, onSelectStep, onOpenDetails }) {
  return React.createElement(
    'div',
    { className: 'orchestration-wrapper' },
    // Hero Banner
    React.createElement(
      'div',
      { className: 'orchestration-hero' },
      React.createElement(
        'div',
        { className: 'hero-title-row' },
        React.createElement(
          'div',
          null,
          React.createElement('h2', { style: { fontSize: '1.6rem', fontWeight: 800 } }, 'Orquestração de Agentes de IA: Do Simples ao ADE'),
          React.createElement('p', { style: { color: 'var(--text-secondary)', marginTop: '0.4rem' } }, 'Como a orquestração resolve o gargalo humano e permite que múltiplos modelos trabalhem em paralelo sem conflito.')
        ),
        React.createElement(
          'div',
          { className: 'video-ref-card' },
          React.createElement('span', { style: { fontSize: '1.2rem' } }, '▶'),
          React.createElement(
            'div',
            null,
            React.createElement('div', { style: { fontWeight: 700 } }, 'Vídeo de Referência:'),
            React.createElement('a', { href: 'https://youtu.be/8jvrucR7QCU?si=tyZnklMmEOVBlcXc', target: '_blank', rel: 'noreferrer' }, 'Pare de Usar 1 Agente de IA Por Vez (Kauã Miguel)')
          )
        )
      )
    ),

    // Comparison Section: 1 Agente vs Orquestrador
    React.createElement(
      'div',
      { className: 'comparison-grid' },
      React.createElement(
        'div',
        { className: 'comparison-card bad' },
        React.createElement('div', { className: 'comparison-header', style: { color: 'var(--color-rose)' } }, '❌ 1 Agente Serial (Gargalo Humano)'),
        React.createElement('p', { style: { fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' } }, 'O desenvolvedor opera em "alt-tab hell", abrindo e fechando chats manualmente. Um agente tenta fazer tudo.'),
        React.createElement(
          'ul',
          { className: 'bullet-list' },
          React.createElement('li', null, 'Janela de contexto satura rapidamente (perde o fio da meada)'),
          React.createElement('li', null, 'Risco crítico de colisões: dois agentes editam o mesmo arquivo e sobrescrevem código'),
          React.createElement('li', null, 'O humano se torna o gargalo: a IA espera você ler e responder')
        )
      ),
      React.createElement(
        'div',
        { className: 'comparison-card good' },
        React.createElement('div', { className: 'comparison-header', style: { color: 'var(--color-emerald)' } }, '✅ Orquestração com Git Worktrees'),
        React.createElement('p', { style: { fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' } }, 'Múltiplos agentes especialistas alocados em cópias isoladas do repositório, com árbitro de merge.'),
        React.createElement(
          'ul',
          { className: 'bullet-list' },
          React.createElement('li', null, 'Isolamento por Git Worktree: zero conflito em tempo de edição'),
          React.createElement('li', null, 'Especialização por domínio: Front, Back, QA e Documentação em paralelo'),
          React.createElement('li', null, 'Agente Crítico de QA roda testes antes do merge final na branch main')
        )
      )
    ),

    // Flowchart dos passos da orquestração
    React.createElement(
      'div',
      { style: { marginBottom: '2rem' } },
      React.createElement('h3', { style: { fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' } }, 'Ciclo de Vida da Orquestração Multi-Agente'),
      React.createElement(FlowChart, {
        steps: orchestrationFlowSteps,
        currentStepIndex: currentStepIndex,
        onSelectStep: onSelectStep,
        onOpenDetails: onOpenDetails
      })
    ),

    // Visualização da Arquitetura Git Worktree
    React.createElement(
      'div',
      { className: 'section-box', style: { marginBottom: '2rem' } },
      React.createElement('h4', null, '🌳 Arquitetura de Isolamento com Git Worktree'),
      React.createElement('p', { style: { fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' } }, 'Como cada agente trabalha em seu próprio diretório físico sem poluir a branch principal antes da validação:'),
      React.createElement(
        'div',
        {
          style: {
            background: '#060a12',
            padding: '1.25rem',
            borderRadius: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: '#38bdf8',
            lineHeight: 1.6
          }
        },
        React.createElement('div', { style: { color: '#34d399', fontWeight: 700 } }, 'repositorio-principal/ (branch: main)'),
        React.createElement('div', null, '├── .worktrees/feature-db/         ──> [DB-Architect] (Claude 3.7)'),
        React.createElement('div', null, '├── .worktrees/feature-api/        ──> [Py-Backend] (Codex / GPT-4.5)'),
        React.createElement('div', null, '├── .worktrees/feature-frontend/   ──> [React-Master] (Claude 3.7)'),
        React.createElement('div', null, '└── .worktrees/feature-qa/         ──> [QA-Sentinel] (Agente Crítico & Pytest)')
      )
    ),

    // Ferramentas Comparadas no Vídeo
    React.createElement(
      'div',
      null,
      React.createElement('h3', { style: { fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' } }, 'Ferramentas de Orquestração Analisadas no Vídeo'),
      React.createElement(
        'div',
        { className: 'tools-grid' },
        orchestrationToolsData.map((tool) =>
          React.createElement(
            'div',
            {
              key: tool.id,
              className: 'tool-card',
              style: { '--tool-color': tool.color }
            },
            React.createElement(
              'div',
              null,
              React.createElement('span', { className: 'tool-badge', style: { color: tool.color } }, tool.badge),
              React.createElement('h4', { className: 'tool-name' }, tool.name),
              React.createElement('p', { className: 'tool-creator' }, `Criador: ${tool.creator}`),
              React.createElement('p', { className: 'tool-highlight' }, tool.highlight),
              React.createElement(
                'ul',
                { className: 'bullet-list', style: { marginBottom: '1rem' } },
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
                className: 'ctrl-btn',
                style: { textAlign: 'center', justifyContent: 'center', textDecoration: 'none' }
              },
              'Acessar Repositório / Site ↗'
            )
          )
        )
      )
    )
  );
}
