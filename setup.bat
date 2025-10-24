@echo off
echo 🚀 Setting up Simple Notes App - MERN Stack
echo =============================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version

REM Setup Backend
echo.
echo 📦 Setting up backend...
cd backend
call npm install
echo ✅ Backend dependencies installed

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    echo MONGODB_URI=mongodb://localhost:27017/notesapp > .env
    echo PORT=5000 >> .env
    echo ✅ .env file created
) else (
    echo ✅ .env file already exists
)

cd ..

REM Setup Frontend
echo.
echo 📦 Setting up frontend...
cd frontend
call npm install
echo ✅ Frontend dependencies installed

cd ..

echo.
echo 🎉 Setup complete!
echo.
echo To run the application:
echo 1. Make sure MongoDB is running
echo 2. Start the backend: cd backend ^&^& npm run dev
echo 3. Start the frontend: cd frontend ^&^& npm start
echo.
echo The app will be available at http://localhost:3000
pause
