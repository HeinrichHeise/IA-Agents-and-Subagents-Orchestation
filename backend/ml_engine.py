"""
ml_engine.py - Motor Didático de Machine Learning em Python Puro
Demonstra matematicamente os conceitos apresentados no fluxograma:
1. Ingestão de vetores numéricos
2. Forward Pass (combinação linear W*x + b e função de ativação)
3. Cálculo da Função de Perda (MSE - Mean Squared Error)
4. Retropropagação (Backpropagation via Regra da Cadeia)
5. Descida do Gradiente (Atualização dos Pesos)
"""

import math
import json
import random

def sigmoid(x):
    """Função de ativação Sigmoide: mapeia valores reais para o intervalo (0, 1)"""
    try:
        if x < -700:
            return 0.0
        elif x > 700:
            return 1.0
        return 1.0 / (1.0 + math.exp(-x))
    except OverflowError:
        return 0.0 if x < 0 else 1.0

def sigmoid_derivative(output):
    """Derivada da sigmoide em relação à sua saída: σ'(z) = σ(z) * (1 - σ(z))"""
    return output * (1.0 - output)

class ToyNeuralNetwork:
    """
    Rede neural didática de 2 camadas para demonstrar o ciclo de aprendizado.
    Estrutura: 2 Entradas -> 2 Neurônios Ocultos -> 1 Neurônio de Saída.
    """
    def __init__(self, seed=42):
        random.seed(seed)
        # Pesos da camada oculta (W1: matriz 2x2) e bias (b1: vetor 2)
        self.W1 = [
            [random.uniform(-0.5, 0.5), random.uniform(-0.5, 0.5)],
            [random.uniform(-0.5, 0.5), random.uniform(-0.5, 0.5)]
        ]
        self.b1 = [0.1, -0.1]
        
        # Pesos da camada de saída (W2: vetor 2) e bias (b2: escalar)
        self.W2 = [random.uniform(-0.5, 0.5), random.uniform(-0.5, 0.5)]
        self.b2 = 0.2

    def forward(self, x):
        """Passo 2 do Fluxograma: Propagação Direta (Forward Pass)"""
        # Camada Oculta: z1 = W1 * x + b1; a1 = sigmoid(z1)
        z1_0 = self.W1[0][0] * x[0] + self.W1[0][1] * x[1] + self.b1[0]
        z1_1 = self.W1[1][0] * x[0] + self.W1[1][1] * x[1] + self.b1[1]
        a1_0 = sigmoid(z1_0)
        a1_1 = sigmoid(z1_1)
        
        # Camada de Saída: z2 = W2 * a1 + b2; a2 = sigmoid(z2)
        z2 = self.W2[0] * a1_0 + self.W2[1] * a1_1 + self.b2
        y_pred = sigmoid(z2)
        
        cache = {
            "x": x,
            "z1": [z1_0, z1_1],
            "a1": [a1_0, a1_1],
            "z2": z2,
            "y_pred": y_pred
        }
        return y_pred, cache

    def train_step(self, x, y_true, learning_rate=0.5):
        """
        Executa 1 iteração completa de aprendizado:
        Forward -> Loss -> Backprop -> Gradient Descent
        """
        # 1. Forward Pass
        y_pred, cache = self.forward(x)
        
        # 2. Cálculo da Função de Perda (MSE)
        # L = 0.5 * (y_pred - y_true)^2
        loss = 0.5 * ((y_pred - y_true) ** 2)
        
        # 3. Backpropagation (Regra da Cadeia)
        # dL/dy_pred = (y_pred - y_true)
        # dy_pred/dz2 = sigmoid_derivative(y_pred)
        # delta_out = dL/dz2 = (y_pred - y_true) * sigmoid'(y_pred)
        delta_out = (y_pred - y_true) * sigmoid_derivative(y_pred)
        
        # Gradientes para W2 e b2
        dW2 = [delta_out * cache["a1"][0], delta_out * cache["a1"][1]]
        db2 = delta_out
        
        # Propagando o erro para a camada oculta:
        # delta_hidden_j = delta_out * W2_j * sigmoid'(a1_j)
        delta_hidden = [
            delta_out * self.W2[0] * sigmoid_derivative(cache["a1"][0]),
            delta_out * self.W2[1] * sigmoid_derivative(cache["a1"][1])
        ]
        
        # Gradientes para W1 e b1
        dW1 = [
            [delta_hidden[0] * x[0], delta_hidden[0] * x[1]],
            [delta_hidden[1] * x[0], delta_hidden[1] * x[1]]
        ]
        db1 = [delta_hidden[0], delta_hidden[1]]
        
        # 4. Gradient Descent: W_novo = W_antigo - (eta * dW)
        self.W2[0] -= learning_rate * dW2[0]
        self.W2[1] -= learning_rate * dW2[1]
        self.b2 -= learning_rate * db2
        
        for i in range(2):
            for j in range(2):
                self.W1[i][j] -= learning_rate * dW1[i][j]
            self.b1[i] -= learning_rate * db1[i]
            
        return {
            "loss": round(loss, 6),
            "y_pred": round(y_pred, 4),
            "y_true": y_true,
            "dW2": [round(g, 5) for g in dW2],
            "W2_current": [round(w, 4) for w in self.W2],
            "delta_out": round(delta_out, 5)
        }

    def train_dataset(self, dataset, epochs=25, learning_rate=0.6):
        """Treina a rede sobre um dataset e registra o histórico passo a passo"""
        history = []
        for epoch in range(1, epochs + 1):
            epoch_loss = 0.0
            steps = []
            for sample in dataset:
                step_res = self.train_step(sample["input"], sample["target"], learning_rate)
                epoch_loss += step_res["loss"]
                steps.append(step_res)
            avg_loss = epoch_loss / len(dataset)
            history.append({
                "epoch": epoch,
                "avg_loss": round(avg_loss, 6),
                "weights_sample": [round(self.W2[0], 4), round(self.W2[1], 4)],
                "step_detail": steps[0]
            })
        return history

def run_simulation(epochs=20, lr=0.5):
    """Executa e retorna a simulação didática completa"""
    # Dataset lógico didático (Função XOR simplificada / Não linear)
    dataset = [
        {"input": [0.0, 0.0], "target": 0.0},
        {"input": [0.0, 1.0], "target": 1.0},
        {"input": [1.0, 0.0], "target": 1.0},
        {"input": [1.0, 1.0], "target": 0.0},
    ]
    net = ToyNeuralNetwork(seed=123)
    history = net.train_dataset(dataset, epochs=epochs, learning_rate=lr)
    
    # Teste de inferência final
    inference_tests = []
    for sample in dataset:
        pred, _ = net.forward(sample["input"])
        inference_tests.append({
            "input": sample["input"],
            "expected": sample["target"],
            "predicted": round(pred, 4),
            "correct": abs(pred - sample["target"]) < 0.45
        })
        
    return {
        "success": True,
        "epochs": epochs,
        "learning_rate": lr,
        "initial_loss": history[0]["avg_loss"],
        "final_loss": history[-1]["avg_loss"],
        "loss_reduction_pct": round((1.0 - (history[-1]["avg_loss"] / (history[0]["avg_loss"] or 1))) * 100, 2),
        "history": history,
        "inference_tests": inference_tests
    }

if __name__ == "__main__":
    print("=== MOTOR DIDÁTICO DE MACHINE LEARNING ===")
    res = run_simulation(epochs=30, lr=0.8)
    print(f"Loss Inicial: {res['initial_loss']} -> Loss Final: {res['final_loss']}")
    print(f"Redução de Erro: {res['loss_reduction_pct']}%")
    print("Resultados de Inferência:")
    for t in res["inference_tests"]:
        print(f"  Entrada: {t['input']} -> Esperado: {t['expected']} | Previsto: {t['predicted']} | OK: {t['correct']}")
