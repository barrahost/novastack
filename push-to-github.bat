@echo off
echo ========================================
echo  NovaStack Africa — Push to GitHub
echo ========================================
echo.
cd /d "%~dp0"

git init
git remote remove origin 2>nul
git remote add origin https://github.com/barrahost/novastack.git
git checkout -b main 2>nul || git checkout main
git add -A
git commit -m "feat: complete NovaStack Africa website refonte"
git push -u origin main --force

echo.
echo ========================================
echo  Done! Check https://github.com/barrahost/novastack
echo ========================================
pause
