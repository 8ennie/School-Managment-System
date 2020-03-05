import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.model';
import { Subscription } from 'rxjs';
import { LessonGridService } from './lesson-grid/lesson-grid.service';
import { map, take } from 'rxjs/operators';
import { ClassService } from '../classes/class.service';
import { TeacherService } from '../teachers/teacher.service';
import { Teacher } from '../teachers/teacher.model';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  houres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  allGrades = [];
  allTeachers = [];
  class;
  teacher;

  constructor(private lessonService: LessonService,
    private lessonGridService: LessonGridService,
    private classService: ClassService,
    private teacherService: TeacherService

  ) { }

  ngOnInit() {
    this.classService.getAllClasses().pipe(
      map(data => data._embedded.grades)).
      subscribe(classes => {
        this.allGrades = classes.map(classValue => classValue = { label: classValue.name, value: classValue._links.self.href });
      });
    this.allTeachers = this.teacherService.getTeachers();
    if (this.allTeachers.length < 1) {
      this.teacherService.teacherChanged.pipe(take(1)).subscribe((data: []) => {
        this.allTeachers = data;
        this.setAllTeacher();
      });
    } else {
      this.setAllTeacher();
    }

  }
  setAllTeacher() {
    this.allTeachers = this.allTeachers.map(t => t = { label: t.fullName, value: t._links.self.href });
  }

  onGradeChange(event) {
    this.lessonGridService.featchLessonsForGrade(event.value);
    this.teacher = null;
  }

  onTeacherChange(event) {
    this.lessonGridService.featchLessonsForTeacher(event.value);
    this.class = null;
  }

}
