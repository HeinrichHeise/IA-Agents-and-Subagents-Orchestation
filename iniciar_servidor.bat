@echo off
chcp 65001 > nul
echo ==================================================================
echo   ⚡ AI Evolution & Orchestration Flowchart - Inicializador Local
echo ==================================================================

REM Tenta usar o Python 3.12 instalado
set "PY_EXE=%LOCALAPPDATA%\Programs\Python\Python312\python.exe"

if exist "%PY_EXE%" (
    echo [OK] Python 3.12 detectado. Iniciando app.py...
    "%PY_EXE%" "%~dp0app.py" %*
    goto :end
)

REM Tenta usar python no PATH
where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Python do sistema detectado. Iniciando app.py...
    python "%~dp0app.py" %*
    goto :end
)

REM Fallback para Deno
where deno >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Python não encontrado. Iniciando servidor via Deno...
    deno run --allow-net --allow-read "%~dp0app.py" %*
    goto :end
)

echo Abrindo index.html diretamente no navegador padrão...
start "" "%~dp0index.html"

:end
pause
