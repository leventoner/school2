import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/models';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-student-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div *ngIf="student" class="max-w-3xl mx-auto">
      <div class="mb-6 flex justify-between items-center">
        <a routerLink="/students" class="text-indigo-600 hover:text-indigo-900 font-bold flex items-center">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          Back to list
        </a>
      </div>

      <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div class="bg-indigo-600 p-8 text-white">
          <div class="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-1">{{ student.schoolNumber }}</div>
          <h2 class="text-4xl font-extrabold">{{ student.firstName }} {{ student.lastName }}</h2>
          <div class="mt-4 flex items-center">
            <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">Class {{ student.studentClass }}</span>
            <span class="ml-4 text-indigo-100 font-medium">Born: {{ student.birthDate }}</span>
          </div>
        </div>
        
        <div class="p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-6">Course Grades</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div *ngFor="let course of objectKeys(student.courses)" 
              class="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span class="font-bold text-gray-700 capitalize">{{ course.replace('_', ' ').toLowerCase() }}</span>
              <span class="text-2xl font-black text-indigo-600">{{ student.courses[course] }}</span>
            </div>
            <div *ngIf="objectKeys(student.courses).length === 0" class="col-span-2 text-center py-6 text-gray-500 italic">
              No courses registered for this student.
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StudentDetailComponent implements OnInit {
    student: Student | null = null;

    constructor(
        private route: ActivatedRoute,
        private studentService: StudentService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        this.studentService.get(id).subscribe(data => {
            this.student = data;
        });
    }

    objectKeys(obj: any): string[] {
        return Object.keys(obj);
    }
}
