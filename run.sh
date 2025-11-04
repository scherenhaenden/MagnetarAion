#!/bin/bash

echo "Installing backend dependencies..."
pip install -r backend/requirements.txt

echo "Installing frontend dependencies..."
npm install --prefix frontend/magnetaraion-app

echo "Starting backend server..."
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 &

echo "Starting frontend server..."
npm start --prefix frontend/magnetaraion-app
