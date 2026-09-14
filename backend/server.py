"""
server.py - Servidor HTTP e API REST nativo em Python
Permite servir o frontend web e responder a requisições de simulação didática de ML e Agentes.
Sem dependências externas: usa apenas a biblioteca padrão do Python.
"""

import sys
import os
import json
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Adiciona o diretório backend ao path para importação
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, ".."))
sys.path.insert(0, CURRENT_DIR)

import ml_engine
import orchestrator_sim

PORT = 8000

class ProjectRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Define a raiz do servidor como a pasta raiz do projeto
        super().__init__(*args, directory=PROJECT_ROOT, **kwargs)

    def end_headers(self):
        # Permite CORS para requisições cross-origin e desabilita cache durante o desenvolvimento
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        params = urllib.parse.parse_qs(parsed.query)

        if path == "/api/status":
            self.send_json_response(200, {
                "status": "online",
                "message": "Servidor Didático de ML & Agentes Ativo",
                "python_version": sys.version,
                "project_root": PROJECT_ROOT
            })
            return

        elif path == "/api/ml/simulate":
            epochs = int(params.get("epochs", [20])[0])
            lr = float(params.get("lr", [0.6])[0])
            result = ml_engine.run_simulation(epochs=epochs, lr=lr)
            self.send_json_response(200, result)
            return

        elif path == "/api/deep-dive":
            summary = {
                "video_title": "Pare de Usar 1 Agente de IA Por Vez: Orquestre Agentes de IA",
                "author": "Kauã Miguel - Dev",
                "youtube_url": "https://youtu.be/8jvrucR7QCU?si=tyZnklMmEOVBlcXc",
                "core_takeaways": [
                    "A orquestração de agentes vai de subagents nativos até ADEs completos.",
                    "O gargalo do desenvolvimento com IA não é o agente, é o desenvolvedor tentando gerenciar uma IA de cada vez de forma serial.",
                    "Isolamento por Git Worktree é indispensável para evitar que múltiplos agentes sobrescrevam o mesmo repositório simultaneamente.",
                    "Ferramentas analisadas: Alethe (open source por Kauã Miguel), Orca (ADE com worktree), CodeAgentSwarm (Kanban), Claude Squad (CLI), Maestro (macOS canvas)."
                ]
            }
            self.send_json_response(200, summary)
            return

        # Para todos os demais caminhos, serve arquivos estáticos do projeto
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/agents/orchestrate":
            content_length = int(self.headers.get("Content-Length", 0))
            body_bytes = self.rfile.read(content_length) if content_length > 0 else b"{}"
            try:
                body_data = json.loads(body_bytes.decode("utf-8")) if body_bytes else {}
            except Exception:
                body_data = {}

            prompt = body_data.get("prompt", "Criar módulo de Autenticação JWT com tela React e API Python")
            orch = orchestrator_sim.MultiAgentOrchestrator()
            result = orch.orchestrate_task(prompt=prompt)
            self.send_json_response(200, result)
            return

        self.send_json_response(404, {"error": "Endpoint não encontrado"})

    def send_json_response(self, code, data):
        response_bytes = json.dumps(data, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(response_bytes)))
        self.end_headers()
        self.wfile.write(response_bytes)

def start_server(port=PORT):
    server_address = ("", port)
    httpd = HTTPServer(server_address, ProjectRequestHandler)
    print(f"==================================================")
    print(f" Servidor Didático Iniciado com Sucesso!")
    print(f" Acesse a aplicação no navegador em:")
    print(f" -> http://localhost:{port}")
    print(f" -> http://127.0.0.1:{port}")
    print(f" Diretório Raiz: {PROJECT_ROOT}")
    print(f" Pressione Ctrl+C para encerrar.")
    print(f"==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.")
        httpd.server_close()

if __name__ == "__main__":
    port_arg = PORT
    if len(sys.argv) > 1:
        try:
            port_arg = int(sys.argv[1])
        except ValueError:
            pass
    start_server(port_arg)
