"""
app.py - Ponto de Entrada Principal do Servidor Local e API REST
Arquitetura Multi-threaded Otimizada: Zero-Cache para APIs, Cache Condicional para Estáticos,
MIME Types ESM estritos para Windows, proteção contra Directory Traversal e CORS completo.

Uso:
  python app.py                 (Acesso local: http://localhost:8000)
  python app.py --rede          (Acesso na LAN/Wi-Fi: http://<IP_LOCAL>:8000)
  python app.py -p 3000 --rede  (Porta customizada e rede liberada)
"""

import sys
import os
import json
import socket
import argparse
import urllib.parse
from http import HTTPStatus
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

# Define a raiz do projeto e assegura o diretório backend no sys.path
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(PROJECT_ROOT, "backend")
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

import ml_engine
import orchestrator_sim

# Extensões e caminhos estritamente proibidos para acesso web externo
BLOCKED_EXTENSIONS = {".py", ".pyc", ".pyo", ".pyd", ".bat", ".cmd", ".env", ".git", ".log"}
BLOCKED_PREFIXES = {"backend", ".git", ".agents", "__pycache__", ".vscode", ".idea"}

# Mapa imutável de MIME types para garantir compatibilidade com ESM e navegadores modernos no Windows
MIME_OVERRIDES = {
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".svg": "image/svg+xml",
    ".wasm": "application/wasm",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".ttf": "font/ttf",
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon"
}

def get_local_ip() -> str:
    """
    Detecta o IP local mais adequado para conexão de dispositivos externos na mesma rede.
    Testa rota externa primeiro; se offline, enumera interfaces de rede locais.
    """
    # 1. Tentativa via rota UDP (não transmite pacotes reais)
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            ip = s.getsockname()[0]
            if ip and not ip.startswith("127."):
                return ip
    except Exception:
        pass

    # 2. Tentativa por resolução do hostname
    try:
        hostname = socket.gethostname()
        ip = socket.gethostbyname(hostname)
        if ip and not ip.startswith("127."):
            return ip
        # 3. Varredura das interfaces de host caso retorne loopback
        addr_infos = socket.getaddrinfo(hostname, None, family=socket.AF_INET)
        for info in addr_infos:
            cand = info[4][0]
            if cand and not cand.startswith("127."):
                return cand
    except Exception:
        pass

    return "127.0.0.1"


class ProjectRequestHandler(SimpleHTTPRequestHandler):
    """
    Handler HTTP com suporte a Threads concorrentes, verificação rigorosa de MIME Types,
    prevenção de listagem de diretórios, CORS unificado e roteamento de API REST.
    """

    # Mescla os MIME types conhecidos garantindo que .js e .mjs sejam sempre application/javascript
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, **MIME_OVERRIDES}

    def __init__(self, *args, **kwargs):
        # Serve os arquivos estáticos diretamente da raiz do projeto
        super().__init__(*args, directory=PROJECT_ROOT, **kwargs)

    def setup(self):
        super().setup()
        # No Windows, desativa o algoritmo de Nagle para eliminar atrasos de pacotes pequenos
        try:
            self.request.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
        except (AttributeError, OSError):
            pass

    def guess_type(self, path: str) -> str:
        """Garante a aplicação correta dos MIME types independente do Registro do Windows."""
        ext = os.path.splitext(path)[1].lower()
        if ext in MIME_OVERRIDES:
            return MIME_OVERRIDES[ext]
        return super().guess_type(path)

    def end_headers(self):
        """Aplica cabeçalhos de segurança e CORS globalmente."""
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept")
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def do_OPTIONS(self):
        """Responde às requisições preflight do navegador com cache de pré-voo."""
        self.send_response(HTTPStatus.NO_CONTENT)
        self.send_header("Access-Control-Max-Age", "86400")  # Cache de preflight por 24h
        self.send_header("Content-Length", "0")
        self.end_headers()

    def list_directory(self, path):
        """Desabilita a listagem de pastas por segurança (evita inspecionar código fonte)."""
        self.send_error(HTTPStatus.FORBIDDEN, "Listagem de diretório desabilitada por segurança.")
        return None

    def is_protected_path(self, path: str) -> bool:
        """Verifica se o caminho solicitado corresponde a arquivos ou pastas internas sensíveis."""
        clean_path = path.lstrip("/").replace("\\", "/")
        parts = clean_path.split("/")
        
        # Bloqueia qualquer segmento oculto ou diretórios protegidos
        if any(part.startswith(".") for part in parts if part):
            return True
        if parts and parts[0] in BLOCKED_PREFIXES:
            return True

        _, ext = os.path.splitext(clean_path)
        if ext.lower() in BLOCKED_EXTENSIONS:
            return True

        return False

    def do_GET(self):
        """Roteador para chamadas de API e arquivos estáticos otimizados."""
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        params = urllib.parse.parse_qs(parsed.query)

        # ------------------------------------------------------------------
        # 1. Rotas de API REST (/api/*)
        # ------------------------------------------------------------------
        if path == "/api/status":
            self.send_json_response(200, {
                "status": "online",
                "message": "Servidor Didático de Orquestração Ativo (ThreadingHTTPServer)",
                "python_version": sys.version,
                "project_root": PROJECT_ROOT,
                "concurrency": "Multi-threaded (Daemon Workers)",
                "esm_mime_support": True
            })
            return

        elif path == "/api/ml/simulate":
            try:
                raw_epochs = params.get("epochs", ["20"])[0]
                raw_lr = params.get("lr", ["0.6"])[0]
                epochs = max(1, min(int(raw_epochs), 200))     # Validação defensiva (1 a 200)
                lr = max(0.001, min(float(raw_lr), 5.0))       # Validação defensiva (0.001 a 5.0)
            except (ValueError, TypeError):
                self.send_json_response(400, {"error": "Parâmetros inválidos. Use ?epochs=[1-200]&lr=[0.001-5.0]"})
                return

            try:
                result = ml_engine.run_simulation(epochs=epochs, lr=lr)
                self.send_json_response(200, result)
            except Exception as e:
                self.send_json_response(500, {"error": "Falha na simulação", "detail": str(e)})
            return

        elif path == "/api/deep-dive":
            summary = {
                "video_title": "Pare de Usar 1 Agente de IA Por Vez: Orquestre Agentes de IA",
                "author": "Kauã Miguel (@kc_1t)",
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

        # ------------------------------------------------------------------
        # 2. Proteção de Arquivos Internos
        # ------------------------------------------------------------------
        if self.is_protected_path(path):
            self.send_json_response(403, {"error": "Acesso negado a arquivos ou diretórios de backend."})
            return

        # ------------------------------------------------------------------
        # 3. Arquivos Estáticos com Cache Inteligente (revalidação 304 Not Modified)
        # ------------------------------------------------------------------
        super().do_GET()

    def do_POST(self):
        """Roteador para requisições com payload JSON."""
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/agents/orchestrate":
            try:
                content_length = int(self.headers.get("Content-Length", 0))
            except (ValueError, TypeError):
                content_length = 0

            # Limite máximo de segurança para payload de 2 MB
            if content_length > 2 * 1024 * 1024:
                self.send_json_response(413, {"error": "Payload muito grande (máximo: 2MB)"})
                return

            body_bytes = self.rfile.read(content_length) if content_length > 0 else b"{}"
            try:
                body_data = json.loads(body_bytes.decode("utf-8")) if body_bytes else {}
            except Exception:
                self.send_json_response(400, {"error": "JSON malformado no corpo da requisição"})
                return

            prompt = body_data.get("prompt", "Criar módulo de Autenticação JWT com tela React e API Python")
            if not isinstance(prompt, str) or not prompt.strip():
                prompt = "Criar módulo de Autenticação JWT com tela React e API Python"

            try:
                orch = orchestrator_sim.MultiAgentOrchestrator()
                result = orch.orchestrate_task(prompt=prompt)
                self.send_json_response(200, result)
            except Exception as e:
                self.send_json_response(500, {"error": "Erro durante a orquestração", "detail": str(e)})
            return

        self.send_json_response(404, {"error": "Endpoint não encontrado"})

    def send_json_response(self, code: int, data: dict):
        """Envia resposta JSON codificada em UTF-8 com política anti-cache estrita para APIs."""
        response_bytes = json.dumps(data, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(response_bytes)))
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.end_headers()
        self.wfile.write(response_bytes)


def main():
    parser = argparse.ArgumentParser(description="Servidor Didático de Orquestração de Agentes (Multi-Threaded)")
    parser.add_argument("porta_pos", nargs="?", type=int, default=None, help="Número da porta (opcional, padrão 8000)")
    parser.add_argument("-p", "--porta", "--port", dest="porta_named", type=int, default=8000, help="Porta HTTP (padrão: 8000)")
    parser.add_argument("-r", "--rede", "--network", action="store_true", help="Disponibiliza o servidor para a rede local (Wi-Fi / celular)")
    args = parser.parse_args()

    port = args.porta_pos if args.porta_pos is not None else args.porta_named
    bind_ip = "0.0.0.0" if args.rede else "127.0.0.1"
    local_ip = get_local_ip()

    # Configura ThreadingHTTPServer nativo com daemon threads e reutilização de porta
    server_address = (bind_ip, port)
    
    class ThreadedServer(ThreadingHTTPServer):
        daemon_threads = True
        allow_reuse_address = True

    try:
        httpd = ThreadedServer(server_address, ProjectRequestHandler)
    except OSError as e:
        print(f"\n❌ Erro ao vincular na porta {port}: {e}")
        print("Dica: Verifique se outro processo já está utilizando essa porta ou altere com '-p <outra_porta>'.")
        sys.exit(1)

    print("==================================================================")
    print("  ⚡ Servidor de Estudo de Orquestração - Threading Engine")
    print(f"  Créditos do Conteúdo: Kauã Miguel (@kc_1t)")
    print("==================================================================")
    print(f"  -> Conexão Local (PC): http://localhost:{port}")
    if args.rede:
        print(f"  -> Rede Local (LAN):   http://{local_ip}:{port}")
        print("  Status da Rede:        ATIVO (Dispositivos na mesma rede Wi-Fi liberados)")
    else:
        print(f"  -> Rede Local (LAN):   http://{local_ip}:{port} (bloqueado)")
        print("  Status da Rede:        Apenas Local (Passe '--rede' para expor na rede Wi-Fi)")
    print(f"  Diretório Raiz:        {PROJECT_ROOT}")
    print("  Concorrência:          ThreadingHTTPServer ativo (Requisições paralelas)")
    print("  Suporte ESM / Windows: MIME application/javascript com UTF-8")
    print("------------------------------------------------------------------")
    print("  Pressione Ctrl+C para encerrar o servidor.")
    print("==================================================================")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[OK] Sinal de interrupção recebido. Encerrando servidor...")
    finally:
        httpd.server_close()
        print("[OK] Sockets liberados. Servidor encerrado.")

if __name__ == "__main__":
    main()
