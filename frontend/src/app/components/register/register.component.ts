import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
    <div class="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">Create Account</h2>
      
      <div *ngIf="errorMessage" class="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
        {{ errorMessage }}
      </div>
      <div *ngIf="successMessage" class="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm">
        {{ successMessage }}
      </div>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input formControlName="username" type="text" id="username" 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input formControlName="email" type="email" id="email" 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
        </div>
        
        <div class="mb-8">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input formControlName="password" type="password" id="password" 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
        </div>
        
        <button [disabled]="loading" type="submit" 
          class="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition disabled:bg-indigo-400">
          {{ loading ? 'Creating...' : 'Register' }}
        </button>
      </form>
      
      <p class="mt-6 text-center text-gray-600">
        Already have an account? <a routerLink="/login" class="text-indigo-600 font-bold hover:underline">Login</a>
      </p>
    </div>
  `
})
export class RegisterComponent {
    registerForm: FormGroup;
    loading = false;
    errorMessage = '';
    successMessage = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.maxLength(20)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120)]]
        });
    }

    onSubmit(): void {
        if (this.registerForm.invalid) return;

        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';
        const { username, email, password } = this.registerForm.value;

        this.authService.register(username, email, password).subscribe({
            next: (res) => {
                this.successMessage = res.message || 'Registration successful!';
                setTimeout(() => this.router.navigate(['/login']), 2000);
            },
            error: (err) => {
                this.errorMessage = err.error?.detail || err.error?.message || 'Registration failed';
                this.loading = false;
            }
        });
    }
}
