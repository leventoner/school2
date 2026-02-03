import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './helpers/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'students', component: StudentListComponent, canActivate: [AuthGuard] },
    { path: 'student/:id', component: StudentDetailComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add', component: AddStudentComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_MODERATOR'] } },
    { path: 'update/:id', component: UpdateStudentComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_MODERATOR'] } },
    { path: '**', redirectTo: '' }
];
