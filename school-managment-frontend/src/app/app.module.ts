import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { httpErrorInterceptorProviders } from './_helper/http-error.interceptor';
import { LessonsDetailsComponent } from './lessons/lessons-details/lessons-details.component';
import { LessonInstanceComponent } from './lesson-instance/lesson-instance.component';
import { LessonInstanceDetailsDialogComponent } from './lesson-instance/lesson-instance-details-dialog/lesson-instance-details-dialog.component';
import { SubstitutionsComponent } from './substitutions/substitutions.component';
import { LeaveDaysComponent } from './leave-days/leave-days.component';
import { ProfileComponent } from './profile/profile.component';
import { LessonInstanceListComponent } from './lesson-instance/lesson-instance-list/lesson-instance-list.component';
import { SubstitutionsPlanComponent } from './substitutions-plan/substitutions-plan.component';



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
    DropBoxComponent,
    LessonsDetailsComponent,
    LessonInstanceComponent,
    LessonInstanceDetailsDialogComponent,
    SubstitutionsComponent,
    LeaveDaysComponent,
    ProfileComponent,
    LessonInstanceListComponent,
    SubstitutionsPlanComponent,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatDialogModule,
  ],
  entryComponents: [
    LessonInstanceDetailsDialogComponent
  ],
  providers: [
    authInterceptorProviders,
    httpErrorInterceptorProviders,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('de');
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/translations/', '.json');
}


