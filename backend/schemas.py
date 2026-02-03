from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict
from models import ERole, Course, Grade, StudentClass

class RoleBase(BaseModel):
    name: ERole

class Role(RoleBase):
    id: int
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: Optional[List[str]] = None

class User(UserBase):
    id: int
    roles: List[Role] = []
    class Config:
        orm_mode = True

class Token(BaseModel):
    token: str
    id: int
    username: str
    email: str
    roles: List[str]
    type: str = "Bearer"

class LoginRequest(BaseModel):
    username: str
    password: str

class MessageResponse(BaseModel):
    message: str

class StudentCourseBase(BaseModel):
    course: Course
    grade: Grade

class StudentBase(BaseModel):
    firstName: str
    lastName: str
    schoolNumber: str
    birthDate: str
    studentClass: str # Matching the value, e.g., "1A"

class StudentCreate(StudentBase):
    courses: Dict[Course, Grade] = {}

class StudentUpdate(StudentBase):
    courses: Dict[Course, Grade] = {}

class Student(StudentBase):
    id: int
    courses: Dict[Course, Grade] = {}
    
    class Config:
        orm_mode = True
        # Custom validator to convert list of StudentCourse to dict
        @classmethod
        def from_orm(cls, obj):
            if hasattr(obj, 'courses') and isinstance(obj.courses, list):
                # Convert list of models to dictionary
                course_dict = {c.course: c.grade for c in obj.courses}
                # Create a copy of the object attributes with the converted dict
                data = {col.name: getattr(obj, col.name) for col in obj.__table__.columns}
                data['courses'] = course_dict
                return cls(**data)
            return super().from_orm(obj)
