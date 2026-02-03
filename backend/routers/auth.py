from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import database, models, schemas, auth

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/signin", response_model=schemas.Token)
def login(login_request: schemas.LoginRequest, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.username == login_request.username).first()
    if not user or not auth.verify_password(login_request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth.create_access_token(data={"sub": user.username})
    
    roles = [role.name for role in user.roles]
    
    return {
        "token": access_token,
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "roles": roles
    }

@router.post("/signup")
def register(signup_request: schemas.UserCreate, db: Session = Depends(database.get_db)):
    if db.query(models.User).filter(models.User.username == signup_request.username).first():
        raise HTTPException(status_code=400, detail="Error: Username is already taken!")
    
    if db.query(models.User).filter(models.User.email == signup_request.email).first():
        raise HTTPException(status_code=400, detail="Error: Email is already in use!")
    
    hashed_password = auth.get_password_hash(signup_request.password)
    new_user = models.User(
        username=signup_request.username,
        email=signup_request.email,
        password=hashed_password
    )
    
    # Simple role assignment logic matching Java
    roles = []
    if not signup_request.role:
        user_role = db.query(models.Role).filter(models.Role.name == models.ERole.ROLE_USER).first()
        if user_role:
            roles.append(user_role)
    else:
        for r in signup_request.role:
            r_lower = r.lower()
            if r_lower == "admin":
                role = db.query(models.Role).filter(models.Role.name == models.ERole.ROLE_ADMIN).first()
            elif r_lower == "mod":
                role = db.query(models.Role).filter(models.Role.name == models.ERole.ROLE_MODERATOR).first()
            else:
                role = db.query(models.Role).filter(models.Role.name == models.ERole.ROLE_USER).first()
            if role:
                roles.append(role)
    
    new_user.roles = roles
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User registered successfully!"}
