@echo off
setlocal

REM Always run from this script's directory
cd /d "%~dp0"

REM Build image
docker build -t personal-website .
if errorlevel 1 (
  echo Docker build failed.
  pause
  exit /b 1
)

REM Run container and expose only to local machine
docker rm -f personal-website >nul 2>&1
docker run -d -p 127.0.0.1:5000:5000 --name personal-website personal-website gunicorn --bind 0.0.0.0:5000 app:app

if errorlevel 1 (
  echo Docker container failed to start.
  pause
  exit /b 1
)

echo Website is running at: http://localhost:5000
start "" http://localhost:5000

echo.
echo Streaming container logs. Press Ctrl+C to stop viewing logs.
docker logs -f personal-website

if errorlevel 1 (
  echo Log streaming stopped.
)

echo.
echo To stop the site container, run:
echo docker stop personal-website
pause
endlocal
