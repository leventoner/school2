import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterModule],
    template: `
    <div class="max-w-4xl mx-auto py-12 px-4">
      <div class="text-center">
        <h1 class="text-5xl font-extrabold text-gray-900 mb-6">Welcome to Student Manager</h1>
        <p class="text-xl text-gray-600 mb-10">Efficiently manage student records, grades, and information in one place.</p>
        <div class="flex justify-center space-x-4">
          <a routerLink="/students" class="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition transform hover:-translate-y-1 shadow-md">View Students</a>
          <a routerLink="/register" class="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition transform hover:-translate-y-1 shadow-sm">Join Now</a>
        </div>
      </div>
      
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Manage Students</h3>
          <p class="text-gray-600">Complete student registration, tracking, and management system.</p>
        </div>
        <div class="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Track Grades</h3>
          <p class="text-gray-600">Monitor academic performance with simple grading visualizations.</p>
        </div>
        <div class="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Secure Access</h3>
          <p class="text-gray-600">Role-based authentication ensures data security and integrity.</p>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent { }
