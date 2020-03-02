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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'students/new', component: EditStudentComponent, canActivate: [AuthGuard] },
  { path: 'students/:id', component: EditStudentComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard], resolve: [StudentsResolverService] },
  { path: 'teachers/:id', component: EditTeacherComponent, canActivate: [AuthGuard] },
  { path: 'teachers/new', component: EditTeacherComponent, canActivate: [AuthGuard] },
  { path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard], resolve: [TeacherResolverService] },
  { path: 'classes', component: ClassesComponent, canActivate: [AuthGuard] },
  { path: 'lessons', component: LessonsComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
