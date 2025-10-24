#!/bin/bash

echo "🚀 Setting up Simple Notes App - MERN Stack"
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"

# Setup Backend
echo ""
echo "📦 Setting up backend..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    echo "MONGODB_URI=mongodb://localhost:27017/notesapp" > .env
    echo "PORT=5000" >> .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up frontend..."
cd frontend
npm install
echo "✅ Frontend dependencies installed"

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To run the application:"
echo "1. Make sure MongoDB is running"
echo "2. Start the backend: cd backend && npm run dev"
echo "3. Start the frontend: cd frontend && npm start"
echo ""
echo "The app will be available at http://localhost:3000"
