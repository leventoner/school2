from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models, seed
from database import engine
from routers import auth, students

# Create tables
models.Base.metadata.create_all(bind=engine)
# Seed data
seed.seed()

app = FastAPI(title="Student Management System")

# CORS configuration to match typical frontend needs
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(students.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Student Management API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8083)
