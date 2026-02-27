@echo off
echo ========================================
echo Real Organic - Production Setup Script
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    exit /b 1
)
echo [OK] Node.js is installed

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed
    exit /b 1
)
echo [OK] npm is installed

echo.
echo ========================================
echo Setting up Backend...
echo ========================================

cd backend

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo [WARNING] Please edit backend\.env with your actual credentials
) else (
    echo [OK] .env file already exists
)

REM Install dependencies
echo Installing backend dependencies...
call npm install

echo.
echo ========================================
echo Setting up Frontend...
echo ========================================

cd ..\frontend

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo [WARNING] Please edit frontend\.env with your actual credentials
) else (
    echo [OK] .env file already exists
)

REM Install dependencies
echo Installing frontend dependencies...
call npm install

cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit backend\.env with your MongoDB, Razorpay, and other credentials
echo 2. Edit frontend\.env with your API URL and Firebase credentials
echo 3. Run 'cd backend && npm run validate-env' to validate backend config
echo 4. Run 'cd backend && npm run dev' to start backend server
echo 5. Run 'cd frontend && npm run dev' to start frontend server
echo.
echo For detailed setup instructions, see ENV_SETUP.md
echo For deployment guide, see DEPLOYMENT.md
echo.
pause
