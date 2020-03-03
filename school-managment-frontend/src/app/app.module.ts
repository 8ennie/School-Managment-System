import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {DragDropModule} from '@angular/cdk/drag-drop';

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
import { LessonGridComponent } from './lessons/lesson-grid/lesson-grid.component';
import { DraggableDirective } from './shared/drap-drop/draggable.directive';
import { DropTargetDirective } from './shared/drap-drop/drop-target.directive';
import { InsertDirective } from './_directives/insert-point.directive';
import { DropBoxComponent } from './lessons/drop-box/drop-box.component';



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
    LessonGridComponent,
    DraggableDirective,
    DropTargetDirective,
    InsertDirective,
    DropBoxComponent
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
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {

}
