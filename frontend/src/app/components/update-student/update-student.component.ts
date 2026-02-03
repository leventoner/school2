import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Course, Grade, StudentClass } from '../../models/models';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-update-student',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
        <span class="w-10 h-10 bg-amber-500 text-white rounded-lg flex items-center justify-center mr-4 text-xl">✎</span>
        Update Student
      </h2>
      
      <form *ngIf="studentForm" [formGroup]="studentForm" (ngSubmit)="onSubmit()" class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
            <input formControlName="firstName" type="text" 
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition">
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
            <input formControlName="lastName" type="text" 
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition">
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">School Number</label>
            <input formControlName="schoolNumber" type="text" 
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition">
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Birth Date</label>
            <input formControlName="birthDate" type="date" 
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition">
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Class</label>
            <select formControlName="studentClass" 
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition">
              <option *ngFor="let sc of classes" [value]="sc">{{ sc }}</option>
            </select>
          </div>
        </div>

        <div class="border-t border-gray-100 pt-8 mt-8">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-900 underline decoration-amber-200">Course Grades</h3>
            <button type="button" (click)="addCourse()" class="text-sm bg-amber-50 text-amber-600 px-4 py-2 rounded-lg font-bold hover:bg-amber-100 transition">
              + Add Course
            </button>
          </div>
          
          <div formArrayName="courses" class="space-y-4">
            <div *ngFor="let c of coursesFormArray.controls; let i=index" [formGroupName]="i" class="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fadeIn">
              <div class="flex-grow">
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Course</label>
                <select formControlName="course" class="w-full bg-white border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-amber-500">
                  <option *ngFor="let course of courseList" [value]="course">{{ course }}</option>
                </select>
              </div>
              <div class="w-24">
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Grade</label>
                <select formControlName="grade" class="w-full bg-white border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-amber-500">
                  <option *ngFor="let grade of gradeList" [value]="grade">{{ grade }}</option>
                </select>
              </div>
              <button type="button" (click)="removeCourse(i)" class="mt-4 p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-12 flex space-x-4">
          <button type="submit" [disabled]="studentForm.invalid" 
            class="flex-grow py-4 bg-amber-500 text-white rounded-xl font-bold text-lg hover:bg-amber-600 shadow-lg shadow-amber-100 transition disabled:bg-gray-300">
            Update Student
          </button>
          <button type="button" routerLink="/students" 
            class="px-8 py-4 bg-white border-2 border-gray-200 text-gray-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `
})
export class UpdateStudentComponent implements OnInit {
    studentForm!: FormGroup;
    studentId!: number;
    classes = Object.values(StudentClass);
    courseList = Object.values(Course);
    gradeList = Object.values(Grade);

    constructor(
        private fb: FormBuilder,
        private studentService: StudentService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.studentId = this.route.snapshot.params['id'];
        this.studentForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            schoolNumber: ['', Validators.required],
            birthDate: ['', Validators.required],
            studentClass: ['', Validators.required],
            courses: this.fb.array([])
        });

        this.studentService.get(this.studentId).subscribe(data => {
            this.studentForm.patchValue({
                firstName: data.firstName,
                lastName: data.lastName,
                schoolNumber: data.schoolNumber,
                birthDate: data.birthDate,
                studentClass: data.studentClass
            });

            Object.entries(data.courses).forEach(([course, grade]) => {
                this.coursesFormArray.push(this.fb.group({
                    course: [course, Validators.required],
                    grade: [grade, Validators.required]
                }));
            });
        });
    }

    get coursesFormArray() {
        return this.studentForm.get('courses') as FormArray;
    }

    addCourse() {
        this.coursesFormArray.push(this.fb.group({
            course: [Course.COMPUTER_SCIENCE, Validators.required],
            grade: [Grade.A, Validators.required]
        }));
    }

    removeCourse(index: number) {
        this.coursesFormArray.removeAt(index);
    }

    onSubmit() {
        if (this.studentForm.invalid) return;

        const val = this.studentForm.value;
        const coursesDict: any = {};
        val.courses.forEach((c: any) => {
            coursesDict[c.course] = c.grade;
        });

        const studentData = {
            ...val,
            courses: coursesDict
        };

        this.studentService.update(this.studentId, studentData).subscribe(() => {
            this.router.navigate(['/students']);
        });
    }
}
