import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
    <footer class="bg-gray-50 border-t border-gray-100 py-10 mt-20">
      <div class="container mx-auto px-6 text-center">
        <p class="text-gray-400 text-sm font-medium">&copy; 2026 Student Management System. All rights reserved.</p>
        <div class="mt-4 flex justify-center space-x-6">
          <a href="#" class="text-gray-400 hover:text-indigo-600 transition">Privacy Policy</a>
          <a href="#" class="text-gray-400 hover:text-indigo-600 transition">Terms of Service</a>
          <a href="#" class="text-gray-400 hover:text-indigo-600 transition">Contact</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent { }
