# School2 (Python & Angular Student Management)

This project is a rewrite of the original Java/React Student Management System using **Python (FastAPI)** for the backend and **Angular 17** for the frontend.

## Project Structure
- `backend/`: Python FastAPI application
- `frontend/`: Angular application

## Running with Docker
You can run the entire stack using Docker Compose:
```bash
docker-compose up --build
```
- **Frontend**: http://localhost:3001
- **Backend (FastAPI)**: http://localhost:8084
- **Database (MySQL)**: localhost:3307

## Manual Setup (Development)

### Backend Setup (Python)
1. Go to the `backend` folder.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   python main.py
   ```
   The backend will run on `http://localhost:8084`.

### Frontend Setup (Angular)
1. Go to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:4200` (points to backend at `8084`).

## Features
- **Authentication**: JWT based login and registration.
- **Student Management**: Full CRUD operations for students.
- **Role Based Access**: Admins and Moderators can add/edit/delete students, while others can only view.
- **Modern UI**: Built with Tailwind CSS logic (via CDN in this setup for simplicity).

## Default Credentials
- **Username**: `root`
- **Password**: `root` (Admin access)
