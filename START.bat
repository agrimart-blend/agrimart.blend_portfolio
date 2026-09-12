@echo off
cd /d "%~dp0"
echo =============================================
echo   AGRIMART PORTFOLIO  -  v4
echo =============================================
echo.
echo [1/2] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: npm install failed.
    echo Make sure Node.js is installed: https://nodejs.org
    pause & exit /b 1
)
echo.
echo [2/2] Starting dev server...
echo.
echo When ready, open:  http://localhost:5173
echo Press Ctrl+C to stop.
echo.
call npm run dev
pause
