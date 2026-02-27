@echo off
echo ========================================
echo Real Organic - Setup Validation
echo ========================================
echo.

echo Checking Backend Configuration...
echo ========================================
cd backend
if not exist .env (
    echo [ERROR] backend\.env file not found!
    echo Please run setup.bat first or copy .env.example to .env
    cd ..
    pause
    exit /b 1
)

echo Running backend environment validation...
call npm run validate-env
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Backend validation failed!
    cd ..
    pause
    exit /b 1
)

echo.
echo ========================================
echo Checking Frontend Configuration...
echo ========================================
cd ..\frontend

if not exist .env (
    echo [ERROR] frontend\.env file not found!
    echo Please run setup.bat first or copy .env.example to .env
    cd ..
    pause
    exit /b 1
)

echo [OK] Frontend .env file exists

echo.
echo ========================================
echo Checking Dependencies...
echo ========================================

cd ..\backend
if not exist node_modules (
    echo [WARNING] Backend dependencies not installed
    echo Run: cd backend && npm install
) else (
    echo [OK] Backend dependencies installed
)

cd ..\frontend
if not exist node_modules (
    echo [WARNING] Frontend dependencies not installed
    echo Run: cd frontend && npm install
) else (
    echo [OK] Frontend dependencies installed
)

cd ..

echo.
echo ========================================
echo Validation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Start backend: cd backend && npm run dev
echo 2. Start frontend: cd frontend && npm run dev
echo 3. Visit: http://localhost:5173
echo.
pause
