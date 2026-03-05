@echo off
echo ==================================================
echo   🛒 UltraMart AI - Master Setup Script
echo ==================================================
echo.

echo [1/6] Installing Backend dependencies...
cd backend
call npm install
echo.

echo [2/6] Creating Backend .env...
if not exist .env copy .env.example .env
echo.

echo [3/6] Installing Frontend dependencies...
cd ../frontend
call npm install
echo.

echo [4/6] Creating Frontend .env.local...
echo NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1 > .env.local
echo.

echo [5/6] Installing Seller Dashboard dependencies...
cd ../seller-dashboard
call npm install
echo.

echo [6/6] Installing Admin Dashboard dependencies...
cd ../admin-dashboard
call npm install
echo.

echo Setup Complete!
echo.
echo To start UltraMart AI, follow these steps in separate terminals:
echo 1. Backend:  cd backend ^&^& npm run dev
echo 2. Frontend: cd frontend ^&^& npm run dev
echo 3. Seller:   cd seller-dashboard ^&^& npm run dev
echo 4. Admin:    cd admin-dashboard ^&^& npm run dev
echo 5. Seed:     cd backend ^&^& npm run seed (Run once to create sample data)
echo.
pause
