from sqlalchemy import Column, Integer, String, ForeignKey, Table, Enum, Text
from sqlalchemy.orm import relationship
from database import Base
import enum

# Association table for User-Role (ManyToMany)
user_roles = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("role_id", Integer, ForeignKey("roles.id")),
)

class ERole(str, enum.Enum):
    ROLE_USER = "ROLE_USER"
    ROLE_ADMIN = "ROLE_ADMIN"
    ROLE_MODERATOR = "ROLE_MODERATOR"

class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(20))

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(20), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    password = Column(String(120))
    roles = relationship("Role", secondary=user_roles)

class StudentClass(str, enum.Enum):
    C1A = "1A"
    C1B = "1B"
    C2A = "2A"
    C2B = "2B"
    C3A = "3A"
    C3B = "3B"
    C4A = "4A"
    C4B = "4B"

class Course(str, enum.Enum):
    COMPUTER_SCIENCE = "COMPUTER_SCIENCE"
    PROGRAMMING = "PROGRAMMING"
    DATA_SCIENCE = "DATA_SCIENCE"
    ARTIFICIAL_INTELLIGENCE = "ARTIFICIAL_INTELLIGENCE"
    CYBER_SECURITY = "CYBER_SECURITY"
    WEB_DEVELOPMENT = "WEB_DEVELOPMENT"
    MOBILE_DEVELOPMENT = "MOBILE_DEVELOPMENT"
    SOFTWARE_ENGINEERING = "SOFTWARE_ENGINEERING"
    NETWORKING = "NETWORKING"
    CLOUD_COMPUTING = "CLOUD_COMPUTING"

class Grade(str, enum.Enum):
    A = "A"
    B = "B"
    C = "C"
    D = "D"
    E = "E"

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String(255))
    lastName = Column(String(255))
    schoolNumber = Column(String(50))
    birthDate = Column(String(50))
    studentClass = Column(String(50))
    
    courses = relationship("StudentCourse", back_populates="student", cascade="all, delete-orphan")

class StudentCourse(Base):
    __tablename__ = "student_courses"
    student_id = Column(Integer, ForeignKey("students.id"), primary_key=True)
    course = Column(String(50), primary_key=True)
    grade = Column(String(50))
    
    student = relationship("Student", back_populates="courses")

