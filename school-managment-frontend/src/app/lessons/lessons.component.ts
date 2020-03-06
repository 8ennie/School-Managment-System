import { Component, OnInit} from '@angular/core';
import { LessonGridService } from './lesson-grid/lesson-grid.service';
import { map, take } from 'rxjs/operators';
import { ClassService } from '../classes/class.service';
import { TeacherService } from '../teachers/teacher.service';

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

  constructor(
    private lessonGridService: LessonGridService,
    private classService: ClassService,
    private teacherService: TeacherService

  ) { }

  ngOnInit() {
    this.classService.getAllClasses().pipe(
      map(data => data._embedded.grades)).
      subscribe(classes => {
        this.allGrades.push({ label: 'Elementary', items: [] = [] });
        this.allGrades.push({ label: 'Real', items: [] = [] });
        this.allGrades.push({ label: 'Middle', items: [] = [] });
        this.allGrades.push({ label: 'High', items: [] = [] });
        classes.forEach(classValue => {
          const classOption = { label: classValue.name, value: classValue._links.self.href };
          this.allGrades.filter(g => g.label.toUpperCase() === classValue.educationalStage)[0].items.push(classOption);
        });
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
