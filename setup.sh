#!/bin/bash

echo "🚀 Real Organic - Production Setup Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js
echo "Checking prerequisites..."
if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node --version)${NC}"

# Check npm
if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm --version)${NC}"

echo ""
echo "=========================================="
echo "Setting up Backend..."
echo "=========================================="

cd backend

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit backend/.env with your actual credentials${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Install dependencies
echo "Installing backend dependencies..."
npm install

echo ""
echo "=========================================="
echo "Setting up Frontend..."
echo "=========================================="

cd ../frontend

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit frontend/.env with your actual credentials${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Install dependencies
echo "Installing frontend dependencies..."
npm install

cd ..

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your MongoDB, Razorpay, and other credentials"
echo "2. Edit frontend/.env with your API URL and Firebase credentials"
echo "3. Run 'cd backend && npm run validate-env' to validate backend config"
echo "4. Run 'cd backend && npm run dev' to start backend server"
echo "5. Run 'cd frontend && npm run dev' to start frontend server"
echo ""
echo "For detailed setup instructions, see ENV_SETUP.md"
echo "For deployment guide, see DEPLOYMENT.md"
