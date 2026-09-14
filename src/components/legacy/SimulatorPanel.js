// SimulatorPanel.js - Laboratório interativo de Machine Learning e Orquestração Multi-Agente
import React, { useState } from 'https://esm.sh/react@18';

export function SimulatorPanel({ backendOnline }) {
  // Estados para ML Simulator
  const [lr, setLr] = useState(0.6);
  const [epochs, setEpochs] = useState(20);
  const [mlLoading, setMlLoading] = useState(false);
  const [mlResult, setMlResult] = useState(null);

  // Estados para Orchestrator Simulator
  const [prompt, setPrompt] = useState('Criar módulo de Autenticação JWT com tela React e API Python');
  const [orchLoading, setOrchLoading] = useState(false);
  const [orchResult, setOrchResult] = useState(null);

  // Executar simulação de ML
  const handleTrainML = async () => {
    setMlLoading(true);
    try {
      if (backendOnline) {
        const res = await fetch(`/api/ml/simulate?epochs=${epochs}&lr=${lr}`);
        const data = await res.json();
        setMlResult(data);
      } else {
        // Simulação client-side se o backend não estiver rodando
        const simulatedHistory = [];
        let curLoss = 0.25;
        for (let ep = 1; ep <= epochs; ep++) {
          curLoss = Math.max(0.01, curLoss * (1 - (lr * 0.12) + (Math.random() * 0.02 - 0.01)));
          simulatedHistory.push({
            epoch: ep,
            avg_loss: Number(curLoss.toFixed(5)),
            weights_sample: [Number((0.5 - ep * 0.01).toFixed(4)), Number((0.3 + ep * 0.015).toFixed(4))]
          });
        }
        setMlResult({
          success: true,
          epochs,
          learning_rate: lr,
          initial_loss: simulatedHistory[0].avg_loss,
          final_loss: simulatedHistory[simulatedHistory.length - 1].avg_loss,
          loss_reduction_pct: Number((((simulatedHistory[0].avg_loss - curLoss) / simulatedHistory[0].avg_loss) * 100).toFixed(2)),
          history: simulatedHistory,
          inference_tests: [
            { input: [0, 0], expected: 0, predicted: 0.08, correct: true },
            { input: [0, 1], expected: 1, predicted: 0.91, correct: true },
            { input: [1, 0], expected: 1, predicted: 0.88, correct: true },
            { input: [1, 1], expected: 0, predicted: 0.12, correct: true }
          ]
        });
      }
    } catch (err) {
      console.error('Erro na simulação ML:', err);
    } finally {
      setMlLoading(false);
    }
  };

  // Executar simulação de Orquestração
  const handleOrchestrate = async () => {
    setOrchLoading(true);
    try {
      if (backendOnline) {
        const res = await fetch('/api/agents/orchestrate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        const data = await res.json();
        setOrchResult(data);
      } else {
        // Simulação client-side fallback
        setOrchResult({
          success: true,
          orchestration_id: `orch-${Math.random().toString(16).slice(2, 8)}`,
          prompt,
          total_tokens_consumed: 9840,
          conflicts_detected: 0,
          timeline: [
            { time: '18:50:01', step: 'DECOMPOSITION', description: `Objetivo: "${prompt}" decomposto em 4 subtarefas.` },
            { time: '18:50:02', step: 'WORKTREE_ISOLATION', description: 'Criando 4 Git Worktrees isolados em .worktrees/' },
            { time: '18:50:04', step: 'PARALLEL_EXECUTION', description: 'DB, Backend, Frontend e QA executando concorrentemente.' },
            { time: '18:50:06', step: 'CRITIC_ARBITRATION', description: 'Agente Crítico validou testes e linters (100% verde).' },
            { time: '18:50:07', step: 'CONVERGENCE_MERGE', description: 'Merge na branch main concluído sem conflitos.' }
          ],
          agents_summary: [
            { name: 'DB-Architect', role: 'Engenheiro de Dados', model: 'Claude 3.7', worktree: '.worktrees/feature/db', tokens: 1840, status: 'MERGED' },
            { name: 'Py-Backend', role: 'Backend Specialist', model: 'Codex / GPT-4.5', worktree: '.worktrees/feature/api', tokens: 3420, status: 'MERGED' },
            { name: 'React-Master', role: 'Frontend Specialist', model: 'Claude 3.7', worktree: '.worktrees/feature/react', tokens: 2950, status: 'MERGED' },
            { name: 'QA-Sentinel', role: 'Agente Crítico', model: 'Gemini 2.5 Pro', worktree: '.worktrees/feature/qa', tokens: 1630, status: 'MERGED' }
          ]
        });
      }
    } catch (err) {
      console.error('Erro na orquestração:', err);
    } finally {
      setOrchLoading(false);
    }
  };

  return React.createElement(
    'div',
    { className: 'simulator-layout' },
    // Painel 1: Machine Learning
    React.createElement(
      'div',
      { className: 'sim-panel' },
      React.createElement('h3', { className: 'sim-panel-title' }, '🧠 Treinamento Neural (Loss & Backprop)'),
      React.createElement('p', { style: { fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' } }, 'Execute o ciclo de Forward Pass, cálculo do erro MSE e atualização dos pesos via Gradiente Descendente em Python/JS:'),
      React.createElement(
        'div',
        { className: 'sim-input-group' },
        React.createElement('label', null, `Taxa de Aprendizado (Learning Rate η): ${lr}`),
        React.createElement('input', {
          type: 'range',
          min: '0.1',
          max: '1.0',
          step: '0.05',
          value: lr,
          onChange: (e) => setLr(Number(e.target.value)),
          style: { width: '100%' }
        })
      ),
      React.createElement(
        'div',
        { className: 'sim-input-group' },
        React.createElement('label', null, `Número de Épocas: ${epochs}`),
        React.createElement('input', {
          type: 'range',
          min: '5',
          max: '40',
          step: '5',
          value: epochs,
          onChange: (e) => setEpochs(Number(e.target.value)),
          style: { width: '100%' }
        })
      ),
      React.createElement(
        'button',
        {
          className: 'ctrl-btn primary',
          style: { width: '100%', justifyContent: 'center' },
          onClick: handleTrainML,
          disabled: mlLoading
        },
        mlLoading ? 'Calculando Gradientes...' : '⚡ Treinar Rede Neural'
      ),
      mlResult &&
        React.createElement(
          'div',
          { style: { marginTop: '1.25rem' } },
          React.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' } },
            React.createElement('span', null, `Loss Inicial: ${mlResult.initial_loss}`),
            React.createElement('span', { style: { color: 'var(--color-emerald)', fontWeight: 700 } }, `Redução de Erro: ${mlResult.loss_reduction_pct}%`),
            React.createElement('span', null, `Loss Final: ${mlResult.final_loss}`)
          ),
          // Mini gráfico de barras do Loss decaindo
          React.createElement(
            'div',
            { className: 'chart-mock-container' },
            mlResult.history.map((h, i) => {
              const maxLoss = mlResult.history[0].avg_loss || 1;
              const heightPct = Math.max(10, Math.round((h.avg_loss / maxLoss) * 100));
              return React.createElement('div', {
                key: i,
                className: 'chart-bar',
                style: { height: `${heightPct}%` },
                'data-val': `Época ${h.epoch}: ${h.avg_loss}`
              });
            })
          ),
          // Testes de inferência
          React.createElement(
            'div',
            { style: { fontSize: '0.8rem', color: 'var(--text-secondary)' } },
            React.createElement('strong', null, 'Inferência após treinamento (XOR):'),
            React.createElement(
              'div',
              { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginTop: '6px' } },
              mlResult.inference_tests.map((t, idx) =>
                React.createElement(
                  'div',
                  {
                    key: idx,
                    style: {
                      background: 'rgba(255,255,255,0.04)',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      borderLeft: `3px solid ${t.correct ? 'var(--color-emerald)' : 'var(--color-amber)'}`
                    }
                  },
                  `Entrada [${t.input.join(',')}] -> Previsto: ${t.predicted} (Alvo: ${t.expected})`
                )
              )
            )
          )
        )
    ),

    // Painel 2: Orquestrador de Agentes
    React.createElement(
      'div',
      { className: 'sim-panel' },
      React.createElement('h3', { className: 'sim-panel-title' }, '🤖 Despacho & Orquestração de Agentes'),
      React.createElement('p', { style: { fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' } }, 'Simule a orquestração concorrente com isolamento por Git Worktrees (conforme vídeo de Kauã Miguel):'),
      React.createElement(
        'div',
        { className: 'sim-input-group' },
        React.createElement('label', null, 'Instrução do Usuário (Objetivo Macro):'),
        React.createElement('input', {
          className: 'sim-input',
          value: prompt,
          onChange: (e) => setPrompt(e.target.value)
        })
      ),
      React.createElement(
        'button',
        {
          className: 'ctrl-btn primary',
          style: { width: '100%', justifyContent: 'center' },
          onClick: handleOrchestrate,
          disabled: orchLoading
        },
        orchLoading ? 'Orquestrando Frotas...' : '🚀 Disparar Orquestração (Git Worktree)'
      ),
      orchResult &&
        React.createElement(
          'div',
          { style: { marginTop: '1.25rem' } },
          React.createElement(
            'div',
            {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                padding: '8px 12px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                marginBottom: '10px'
              }
            },
            React.createElement('span', null, `ID: ${orchResult.orchestration_id}`),
            React.createElement('span', null, `Tokens: ${orchResult.total_tokens_consumed}`),
            React.createElement('span', { style: { color: 'var(--color-emerald)', fontWeight: 700 } }, 'Conflitos de Arquivo: 0')
          ),
          React.createElement(
            'div',
            { className: 'log-console' },
            orchResult.timeline.map((item, idx) =>
              React.createElement(
                'div',
                { key: idx, className: 'log-line' },
                React.createElement('span', { className: 'log-time' }, `[${item.time}] `),
                React.createElement('span', { className: 'log-agent' }, `[${item.step}] `),
                React.createElement('span', null, item.description)
              )
            )
          )
        )
    )
  );
}
