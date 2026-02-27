#!/bin/bash

echo "========================================"
echo "Real Organic - Setup Validation"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "Checking Backend Configuration..."
echo "========================================"
cd backend

if [ ! -f .env ]; then
    echo -e "${RED}[ERROR] backend/.env file not found!${NC}"
    echo "Please run setup.sh first or copy .env.example to .env"
    exit 1
fi

echo "Running backend environment validation..."
npm run validate-env
if [ $? -ne 0 ]; then
    echo -e "${RED}[ERROR] Backend validation failed!${NC}"
    exit 1
fi

echo ""
echo "========================================"
echo "Checking Frontend Configuration..."
echo "========================================"
cd ../frontend

if [ ! -f .env ]; then
    echo -e "${RED}[ERROR] frontend/.env file not found!${NC}"
    echo "Please run setup.sh first or copy .env.example to .env"
    exit 1
fi

echo -e "${GREEN}[OK] Frontend .env file exists${NC}"

echo ""
echo "========================================"
echo "Checking Dependencies..."
echo "========================================"

cd ../backend
if [ ! -d node_modules ]; then
    echo -e "${YELLOW}[WARNING] Backend dependencies not installed${NC}"
    echo "Run: cd backend && npm install"
else
    echo -e "${GREEN}[OK] Backend dependencies installed${NC}"
fi

cd ../frontend
if [ ! -d node_modules ]; then
    echo -e "${YELLOW}[WARNING] Frontend dependencies not installed${NC}"
    echo "Run: cd frontend && npm install"
else
    echo -e "${GREEN}[OK] Frontend dependencies installed${NC}"
fi

cd ..

echo ""
echo "========================================"
echo -e "${GREEN}Validation Complete!${NC}"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Start backend: cd backend && npm run dev"
echo "2. Start frontend: cd frontend && npm run dev"
echo "3. Visit: http://localhost:5173"
echo ""
