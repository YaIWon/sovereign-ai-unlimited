#!/bin/bash

echo "🚀 Starting Autonomous Web3 AI in GitHub Codespaces..."

# Install dependencies
npm install

# Create necessary directories
mkdir -p logs knowledge

# Start the autonomous AI (will run forever)
echo "🤖 Starting autonomous learning and value creation..."
npm start

# Keep the container alive
while true; do
    sleep 60
    echo "🔄 Autonomous AI still running..."
done
