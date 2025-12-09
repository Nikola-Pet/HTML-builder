#!/bin/bash
# Quick Start Script for Newsletter Backend
# This script installs dependencies and starts both servers

echo "🚀 Newsletter Backend Quick Start"
echo "=================================="
echo ""

# Check if node_modules exists in main directory
if [ ! -d "node_modules" ]; then
    echo "📦 Installing main dependencies..."
    npm install
else
    echo "✓ Main dependencies already installed"
fi

# Check if node_modules exists in server directory
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd server && npm install && cd ..
else
    echo "✓ Backend dependencies already installed"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Starting both servers..."
echo "- Frontend: http://localhost:8080"
echo "- Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
npm run dev:all
