@echo off
setlocal

if not exist "D:\coplink-app\package.json" (
    echo.
    echo Fehler: D:\coplink-app wurde nicht gefunden oder ist kein gueltiges Projekt.
    pause
    exit /b 1
)

if exist "D:\coplink-app\src\app\page_phase8.tsx" (
    echo.
    echo Warnung: Alte Problemdatei page_phase8.tsx wurde gefunden und wird entfernt.
    del /f /q "D:\coplink-app\src\app\page_phase8.tsx"
)

where npm >nul 2>nul
if errorlevel 1 (
    echo.
    echo Fehler: npm wurde nicht gefunden. Bitte pruefe deine Node.js-Installation.
    pause
    exit /b 1
)

cd /d D:\coplink-app

if exist ".\node_modules\typescript\bin\tsc" (
    echo.
    echo Pruefe TypeScript...
    node .\node_modules\typescript\bin\tsc --noEmit
    if errorlevel 1 (
        echo.
        echo TypeScript-Fehler gefunden. Start wird abgebrochen.
        pause
        exit /b 1
    )
)

echo.
echo Starte CopLink...
npm run dev
if errorlevel 1 (
    echo.
    echo Fehler beim Starten von CopLink.
    pause
    exit /b 1
)

pause
endlocal