import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lesson } from 'src/app/lessons/lesson.model';
import { SubjectService } from 'src/app/_services/subject.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/teachers/teacher.service';
import { Teacher } from 'src/app/teachers/teacher.model';

@Component({
  selector: 'app-lesson-grid',
  templateUrl: './lesson-grid.component.html',
  styleUrls: ['./lesson-grid.component.css']
})
export class LessonGridComponent implements OnInit {

  @Input() lesson: Lesson;

  constructor(private subjectService: SubjectService, private teacherService: TeacherService) { }

  private allSubjects = [];

  private allTeachers: Teacher[] = [];
  private teacherOptions = [];

  lessonForm = new FormGroup({
    subject: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.allSubjects = this.subjectService.getSubjects();
    if (this.allSubjects.length < 1) {
      this.subjectService.subjectSub.pipe(take(1)).subscribe((data: []) => {
        this.allSubjects = data;
      });
    }
    this.allTeachers = this.teacherService.getTeachers();
    if (this.allTeachers.length < 1) {
      this.teacherService.teacherChanged.pipe(take(1)).subscribe((data: []) => {
        this.allTeachers = data;
        this.setTeacherValues();
      });
    } else {
      this.setTeacherValues();
    }
  }
  setTeacherValues() {
    this.allTeachers.forEach(t => this.teacherOptions.push({ value: t._links.self.href, label: t.firstName + ' ' + t.lastName }));
  }

  teacherChanged(event) {

  }

}
