import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
    <div class="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">Login</h2>
      
      <div *ngIf="errorMessage" class="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
        {{ errorMessage }}
      </div>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input formControlName="username" type="text" id="username" 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Enter your username">
        </div>
        
        <div class="mb-8">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input formControlName="password" type="password" id="password" 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Enter your password">
        </div>
        
        <button [disabled]="loading" type="submit" 
          class="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition disabled:bg-indigo-400">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
      
      <p class="mt-6 text-center text-gray-600">
        Don't have an account? <a routerLink="/register" class="text-indigo-600 font-bold hover:underline">Register</a>
      </p>
    </div>
  `
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    onSubmit(): void {
        if (this.loginForm.invalid) return;

        this.loading = true;
        this.errorMessage = '';
        const { username, password } = this.loginForm.value;

        this.authService.login(username, password).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.errorMessage = err.error?.detail || err.error?.message || 'Invalid username or password';
                this.loading = false;
            }
        });
    }
}
