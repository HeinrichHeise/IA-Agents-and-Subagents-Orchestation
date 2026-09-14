// mlFlowData.js - Dados estruturados e didáticos do ciclo de Machine Learning

export const mlFlowSteps = [
  {
    id: "data-ingestion",
    title: "1. Ingestão e Pré-Processamento de Dados",
    category: "Entrada",
    summary: "Transformação de dados brutos do mundo real em vetores matemáticos numéricos.",
    color: "#3b82f6",
    details: {
      conceito: "Uma inteligência artificial não compreende palavras, imagens ou áudios diretamente. Tudo precisa ser convertido em matrizes e vetores numéricos de alta dimensão.",
      etapas: [
        "Coleta de dados brutos (texto, imagens, tabulares)",
        "Limpeza de ruídos e normalização de escala (Z-score ou Min-Max)",
        "Tokenização (divisão em subpalavras e IDs de vocabulário)",
        "Geração de Embeddings vetoriais densos no hiperespaço"
      ],
      formula: "\\vec{x} = \\text{Embedding}(token_i) \\in \\mathbb{R}^d",
      exemplo: "'Aprender IA' -> Tokens: [1542, 8931] -> Vetor: [0.24, -0.81, 0.55, ...]"
    }
  },
  {
    id: "forward-pass",
    title: "2. Propagação Direta (Forward Pass)",
    category: "Processamento Neural",
    summary: "Os dados fluem pelas camadas neurais gerando combinações lineares e ativações não-lineares.",
    color: "#8b5cf6",
    details: {
      conceito: "Os vetores de entrada multiplicam os pesos sinápticos (W), somam o viés (bias b) e passam por funções de ativação que introduzem não-linearidade, permitindo à rede aprender padrões complexos.",
      etapas: [
        "Combinação Linear: z = W · x + b",
        "Ativação Não-Linear: a = σ(z) (ReLU, GELU, Sigmoide, Softmax)",
        "Propagação sucessiva camada a camada (Hidden Layers)",
        "Cálculo dos Logits e probabilidades na camada de saída"
      ],
      formula: "a^{[l]} = \\sigma\\left(W^{[l]} a^{[l-1]} + b^{[l]}\\right)",
      exemplo: "Entrada [1.0, 0.5] * W [[0.2, 0.8], [-0.5, 0.1]] + b -> Ativação ReLU -> [0.35, 0.85]"
    }
  },
  {
    id: "loss-calculation",
    title: "3. Cálculo da Função de Perda (Loss / Erro)",
    category: "Avaliação",
    summary: "Medição quantitativa matemática de quão errada está a previsão atual da IA.",
    color: "#ef4444",
    details: {
      conceito: "A função de perda é o termômetro do aprendizado. Ela compara a saída predita pela rede (ŷ) com o rótulo real esperado (y). Quanto maior a perda, mais distante da resposta correta a IA está.",
      etapas: [
        "Comparação entre a predição ŷ e o alvo real y",
        "Regressão: Erro Quadrático Médio (MSE - Mean Squared Error)",
        "Classificação / LLMs: Entropia Cruzada (Cross-Entropy Loss)",
        "Geração de um escalar numérico de penalidade"
      ],
      formula: "\\mathcal{L}_{CE} = -\\sum_{c=1}^C y_c \\log(\\hat{y}_c) \\quad \\text{ou} \\quad \\mathcal{L}_{MSE} = \\frac{1}{N}\\sum (y - \\hat{y})^2",
      exemplo: "Alvo: Gato (1.0). Predição: 0.12. Erro elevado -> Loss: 2.12"
    }
  },
  {
    id: "backpropagation",
    title: "4. Retropropagação (Backpropagation)",
    category: "Cálculo do Gradiente",
    summary: "Cálculo das derivadas parciais usando a Regra da Cadeia para descobrir o impacto de cada peso no erro.",
    color: "#f59e0b",
    details: {
      conceito: "O erro flui de trás para frente na rede neural. Utilizando a Regra da Cadeia do Cálculo Diferencial, calculamos o gradiente (derivada parcial) de cada peso em relação à perda total.",
      etapas: [
        "Cálculo do erro na camada final: ∂L / ∂a_out",
        "Aplicação da Regra da Cadeia pelas camadas ocultas",
        "Determinação do gradiente do peso: ∂L / ∂W",
        "Determinação do gradiente do bias: ∂L / ∂b"
      ],
      formula: "\\frac{\\partial \\mathcal{L}}{\\partial W^{[l]}} = \\frac{\\partial \\mathcal{L}}{\\partial a^{[l]}} \\cdot \\frac{\\partial a^{[l]}}{\\partial z^{[l]}} \\cdot \\frac{\\partial z^{[l]}}{\\partial W^{[l]}}",
      exemplo: "Descobre que aumentar o peso W_12 em 0.01 aumenta o erro em 0.4. Logo, o gradiente é positivo e devemos reduzi-lo."
    }
  },
  {
    id: "gradient-descent",
    title: "5. Otimização e Atualização dos Pesos",
    category: "Otimizador",
    summary: "Descida do Gradiente atualizando os pesos na direção que minimiza a função de perda.",
    color: "#10b981",
    details: {
      conceito: "Os pesos da rede são ajustados dando um passo na direção oposta ao gradiente. O tamanho desse passo é controlado pela Taxa de Aprendizado (Learning Rate, η).",
      etapas: [
        "Ajuste da Taxa de Aprendizado (Learning Rate - η)",
        "Algoritmos de Otimização: SGD com Momentum, RMSprop, AdamW",
        "Atualização formal da matriz de pesos",
        "Repetição por milhares ou bilhões de iterações (Épocas / Steps)"
      ],
      formula: "W_{\\text{novo}} = W_{\\text{antigo}} - \\eta \\cdot \\nabla_W \\mathcal{L}",
      exemplo: "Se W = 1.5, η = 0.01 e gradiente = 2.0 -> W_novo = 1.5 - (0.01 * 2.0) = 1.48"
    }
  },
  {
    id: "inference-generalization",
    title: "6. Convergência e Inferência (Generalização)",
    category: "Aplicação",
    summary: "O modelo atinge a perda mínima aceitável e consegue responder a dados nunca antes vistos.",
    color: "#06b6d4",
    details: {
      conceito: "Após convergir, os pesos sinápticos são 'congelados'. O modelo agora é capaz de receber novos dados do usuário e realizar predições precisas com alta capacidade de generalização.",
      etapas: [
        "Avaliação em conjunto de testes independente (evitar Overfitting)",
        "Congelamento de pesos para produção (Inference Mode)",
        "Quantização e Otimização para GPU/CPU (FP16, INT8, INT4)",
        "Geração de respostas e previsões em tempo real"
      ],
      formula: "\\hat{y}_{novo} = f_{\\theta^*}(x_{novo}) \\quad \\text{onde } \\theta^* = \\arg\\min_\\theta \\mathcal{L}",
      exemplo: "Apresenta uma imagem nunca vista de um gato -> Modelo prediz 'Gato' com 99.4% de confiança."
    }
  }
];
