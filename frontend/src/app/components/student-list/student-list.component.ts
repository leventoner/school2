import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';
import { Student } from '../../models/models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-student-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-8 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 class="text-3xl font-extrabold text-gray-900">Students</h2>
          <p class="text-gray-500 mt-1">Manage all enrolled students</p>
        </div>
        <a *ngIf="canEdit" routerLink="/add" class="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">
          Add Student
        </a>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
            <tr>
              <th class="px-8 py-4">ID</th>
              <th class="px-8 py-4">Name</th>
              <th class="px-8 py-4">School Number</th>
              <th class="px-8 py-4">Class</th>
              <th class="px-8 py-4">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr *ngFor="let student of students" class="hover:bg-gray-50 transition">
              <td class="px-8 py-5 text-gray-500 font-medium">{{ student.id }}</td>
              <td class="px-8 py-5">
                <div class="font-bold text-gray-900">{{ student.firstName }} {{ student.lastName }}</div>
                <div class="text-xs text-gray-400 mt-0.5">{{ student.birthDate }}</div>
              </td>
              <td class="px-8 py-5 text-gray-600">{{ student.schoolNumber }}</td>
              <td class="px-8 py-5">
                <span class="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">{{ student.studentClass }}</span>
              </td>
              <td class="px-8 py-5">
                <div class="flex space-x-3">
                  <a [routerLink]="['/student', student.id]" class="text-indigo-600 hover:text-indigo-900 font-bold">Details</a>
                  <ng-container *ngIf="canEdit">
                    <a [routerLink]="['/update', student.id]" class="text-amber-600 hover:text-amber-900 font-bold">Edit</a>
                    <button (click)="deleteStudent(student.id!)" class="text-red-600 hover:text-red-900 font-bold">Delete</button>
                  </ng-container>
                </div>
              </td>
            </tr>
            <tr *ngIf="students.length === 0">
              <td colspan="5" class="px-8 py-10 text-center text-gray-500">No students found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class StudentListComponent implements OnInit {
    students: Student[] = [];
    canEdit = false;

    constructor(
        private studentService: StudentService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        const user = this.authService.currentUserValue;
        this.canEdit = user?.roles.includes('ROLE_ADMIN') || user?.roles.includes('ROLE_MODERATOR') || false;
        this.loadStudents();
    }

    loadStudents(): void {
        this.studentService.getAll().subscribe(data => {
            this.students = data;
        });
    }

    deleteStudent(id: number): void {
        if (confirm('Are you sure you want to delete this student?')) {
            this.studentService.delete(id).subscribe(() => {
                this.loadStudents();
            });
        }
    }
}
