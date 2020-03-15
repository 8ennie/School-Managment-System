import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { AuthGuard } from './auth/auth.guard';
import { EditStudentComponent } from './students/edit-student/edit-student.component';
import { StudentsResolverService } from './students/students-resolver.serivice';
import { EditTeacherComponent } from './teachers/edit-teacher/edit-teacher.component';
import { TeacherResolverService } from './teachers/teacher-resolver.service';
import { ClassesComponent } from './classes/classes.component';
import { LessonsComponent } from './lessons/lessons.component';
import { Role } from './auth/role.model';
import { SubstitutionsComponent } from './substitutions/substitutions.component';
import { ProfileComponent } from './profile/profile.component';
import { SubstitutionsPlanComponent } from './substitutions-plan/substitutions-plan.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'students/new', component: EditStudentComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN] } },
  { path: 'students/:id', component: EditStudentComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN, Role.ROLE_TEACHER] } },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN, Role.ROLE_TEACHER] }, resolve: [StudentsResolverService] },
  { path: 'teachers/new', component: EditTeacherComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN] } },
  { path: 'teachers/:id', component: EditTeacherComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN, Role.ROLE_TEACHER] } },
  { path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard], resolve: [TeacherResolverService], data: { roles: [Role.ROLE_ADMIN, Role.ROLE_TEACHER] } },
  { path: 'classes', component: ClassesComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN, Role.ROLE_TEACHER] } },
  { path: 'lessons', component: LessonsComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN, Role.ROLE_TEACHER] } },
  { path: 'substitutions/plan', component: SubstitutionsPlanComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN] } },
  { path: 'substitutions', component: SubstitutionsComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN] } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN, Role.ROLE_TEACHER] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
