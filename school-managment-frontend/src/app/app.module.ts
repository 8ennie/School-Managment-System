import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { GridsterModule } from 'angular-gridster2';

import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { PrimeNGModule } from './primeNG.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { EditStudentComponent } from './students/edit-student/edit-student.component';
import { EditTeacherComponent } from './teachers/edit-teacher/edit-teacher.component';
import { authInterceptorProviders } from './_helper/auth.interceptor';
import { ClassesComponent } from './classes/classes.component';
import { LessonsComponent } from './lessons/lessons.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    HomeComponent,
    StudentsComponent,
    TeachersComponent,
    EditStudentComponent,
    ClassesComponent,
    EditTeacherComponent,
    LessonsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PrimeNGModule,
    DragDropModule,
    GridsterModule,
    MatIconModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {

}
