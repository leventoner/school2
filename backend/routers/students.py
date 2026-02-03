from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import database, models, schemas, auth

router = APIRouter(prefix="/api/students", tags=["students"])

@router.get("/", response_model=List[schemas.Student])
def get_all_students(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    students = db.query(models.Student).all()
    # Manual conversion for courses map
    result = []
    for s in students:
        s_data = {
            "id": s.id,
            "firstName": s.firstName,
            "lastName": s.lastName,
            "schoolNumber": s.schoolNumber,
            "birthDate": s.birthDate,
            "studentClass": s.studentClass,
            "courses": {c.course: c.grade for c in s.courses}
        }
        result.append(s_data)
    return result

@router.get("/{id}", response_model=schemas.Student)
def get_student(id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    student = db.query(models.Student).filter(models.Student.id == id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "id": student.id,
        "firstName": student.firstName,
        "lastName": student.lastName,
        "schoolNumber": student.schoolNumber,
        "birthDate": student.birthDate,
        "studentClass": student.studentClass,
        "courses": {c.course: c.grade for c in student.courses}
    }

@router.post("/", response_model=schemas.Student, status_code=201)
def create_student(student_in: schemas.StudentCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    new_student = models.Student(
        firstName=student_in.firstName,
        lastName=student_in.lastName,
        schoolNumber=student_in.schoolNumber,
        birthDate=student_in.birthDate,
        studentClass=student_in.studentClass
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    
    for course, grade in student_in.courses.items():
        sc = models.StudentCourse(student_id=new_student.id, course=course, grade=grade)
        db.add(sc)
    
    db.commit()
    db.refresh(new_student)
    
    return {
        "id": new_student.id,
        "firstName": new_student.firstName,
        "lastName": new_student.lastName,
        "schoolNumber": new_student.schoolNumber,
        "birthDate": new_student.birthDate,
        "studentClass": new_student.studentClass,
        "courses": {c.course: c.grade for c in new_student.courses}
    }

@router.put("/{id}", response_model=schemas.Student)
def update_student(id: int, student_in: schemas.StudentUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    student = db.query(models.Student).filter(models.Student.id == id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    student.firstName = student_in.firstName
    student.lastName = student_in.lastName
    student.schoolNumber = student_in.schoolNumber
    student.birthDate = student_in.birthDate
    student.studentClass = student_in.studentClass
    
    # Update courses: remove old ones and add new ones
    db.query(models.StudentCourse).filter(models.StudentCourse.student_id == id).delete()
    for course, grade in student_in.courses.items():
        sc = models.StudentCourse(student_id=id, course=course, grade=grade)
        db.add(sc)
    
    db.commit()
    db.refresh(student)
    
    return {
        "id": student.id,
        "firstName": student.firstName,
        "lastName": student.lastName,
        "schoolNumber": student.schoolNumber,
        "birthDate": student.birthDate,
        "studentClass": student.studentClass,
        "courses": {c.course: c.grade for c in student.courses}
    }

@router.delete("/{id}", status_code=204)
def delete_student(id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    student = db.query(models.Student).filter(models.Student.id == id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    db.delete(student)
    db.commit()
    return None
