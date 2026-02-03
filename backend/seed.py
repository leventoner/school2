from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, auth

def seed():
    db = SessionLocal()
    
    # Seed Roles
    for erole in models.ERole:
        role_name = erole.value
        role = db.query(models.Role).filter(models.Role.name == role_name).first()
        if not role:
            print(f"Adding role: {role_name}")
            db.add(models.Role(name=role_name))
    
    db.commit()
    
    # Seed Root User
    if not db.query(models.User).filter(models.User.username == "root").first():
        print("Creating root user...")
        hashed_password = auth.get_password_hash("root")
        user = models.User(
            username="root",
            email="root@example.com",
            password=hashed_password
        )
        admin_role = db.query(models.Role).filter(models.Role.name == models.ERole.ROLE_ADMIN.value).first()
        if admin_role:
            user.roles = [admin_role]
        db.add(user)
        db.commit()
        print("Root user created.")
    
    db.close()

if __name__ == "__main__":
    # Create tables first
    models.Base.metadata.create_all(bind=engine)
    seed()
    print("Seeding completed.")
