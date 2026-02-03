import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/models';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <header class="bg-indigo-600 text-white shadow-lg">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <a routerLink="/" class="text-2xl font-bold tracking-tight">Student Management</a>
        <nav>
          <ul class="flex space-x-6 items-center">
            <li><a routerLink="/students" class="hover:text-indigo-200 transition">Students</a></li>
            <li *ngIf="showAdminBoard"><a routerLink="/add" class="hover:text-indigo-200 transition">Add Student</a></li>
            
            <li *ngIf="!currentUser" class="ml-4 flex space-x-4">
              <a routerLink="/login" class="px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Login</a>
              <a routerLink="/register" class="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition">Register</a>
            </li>
            
            <li *ngIf="currentUser" class="ml-4 flex items-center space-x-4">
              <span class="text-sm font-medium border-l border-indigo-500 pl-4">{{ currentUser.username }}</span>
              <button (click)="logout()" class="px-4 py-2 rounded-lg bg-indigo-800 hover:bg-indigo-900 transition">Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
    currentUser: User | null = null;
    showAdminBoard = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            this.showAdminBoard = user?.roles.includes('ROLE_ADMIN') || user?.roles.includes('ROLE_MODERATOR') || false;
        });
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
