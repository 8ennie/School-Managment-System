import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SubLesson } from '../sub-lesson-instance.model';
import { Teacher } from 'src/app/teachers/teacher.model';
import { LessonInstanceService } from '../lesson-instancnce.service';
import { AuthService } from 'src/app/auth/auth.service';
import { LessonService } from 'src/app/lessons/lesson.service';
import { Lesson } from 'src/app/lessons/lesson.model';


@Component({
  selector: 'app-lesson-instance-details-dialog',
  templateUrl: './lesson-instance-details-dialog.component.html',
  styleUrls: ['./lesson-instance-details-dialog.component.css']
})
export class LessonInstanceDetailsDialogComponent implements OnInit, OnDestroy {

  teacherList: Teacher[] = [];

  teacherOptions: Teacher[] = [];

  lessonInstance: SubLesson;

  isSubLesson: boolean = false;

  isAdmin: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public lessonInstanceService: LessonInstanceService,
    public authService: AuthService,
    public lessonService: LessonService
  ) {
    this.isAdmin = this.authService.hasRole('ROLE_ADMIN');
    this.lessonInstance = config.data.lessonInstance;
    if (this.lessonInstance.substituteTeacher) {
      const teacher = this.lessonInstance.substituteTeacher;
      this.lessonInstance.substituteTeacher.fullName = teacher.firstName + ' ' + teacher.lastName;
    }
    this.isSubLesson = config.data.isSubLesson;
  }

  ngOnInit(): void {
    this.lessonInstanceService.getAllTeachers().then((teachers: any) => {
      this.teacherList = teachers._embedded.teachers;
      this.filterTeachers();
    });
  }

  filterTeachers() {
    let tempTeacherList: Teacher[];
    tempTeacherList = this.teacherList.filter(t => t.daysWorking.includes(this.lessonInstance.lessonTime.dayOfWeek));
    this.lessonService.getLessonsForLessonTime(this.lessonInstance.lessonTime._links.self.href.replace('{?projection}', '')).subscribe((lessons: { _embedded }) => {
      const lessonTeachers = lessons._embedded.lessons.map(l => l.teacher._links.self.href.replace('{?projection}', ''));
      tempTeacherList = tempTeacherList.filter(t => !lessonTeachers.includes(t._links.self.href));
      this.teacherOptions = tempTeacherList;
    });
  }

  close() {
    this.ref.close();
  }

  onSubmit() {
    this.ref.close(this.lessonInstance);
  }

  ngOnDestroy(): void {

  }
}
