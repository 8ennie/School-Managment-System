import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lesson } from 'src/app/lessons/lesson.model';
import { SubjectService } from 'src/app/_services/subject.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/teachers/teacher.service';
import { Teacher } from 'src/app/teachers/teacher.model';
import { LessonGridService } from './lesson-grid.service';

@Component({
  selector: 'app-lesson-grid',
  templateUrl: './lesson-grid.component.html',
  styleUrls: ['./lesson-grid.component.css']
})
export class LessonGridComponent implements OnInit {

  @Input() lesson: Lesson;

  @Input() config: { day: string, hour: number, class: string };

  editMode = false;

  constructor(private subjectService: SubjectService,
    private teacherService: TeacherService,
    private lessonGridService: LessonGridService) { }

  private allSubjects = [];
  private subjectOptions = [];

  private allTeachers: Teacher[] = [];
  private teacherOptions: Teacher[] = [];

  lessonForm = new FormGroup({
    subject: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    if (!this.lesson) {
      this.editMode = true;
    }
    this.lessonForm.reset(this.lesson);
    this.allSubjects = this.subjectService.getSubjects();
    if (this.allSubjects.length < 1) {
      this.subjectService.subjectSub.pipe(take(1)).subscribe((data: []) => {
        this.allSubjects = data;
        this.setSubjectObtions();
      });
    } else {
      this.setSubjectObtions();
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

  setSubjectObtions() {
    this.subjectOptions = [];
    const filter = this.lessonForm.value.teacher?._links?.self?.href;
    if (filter) {
      this.allTeachers.forEach(t => {
        if (t._links.self.href === filter) {
          this.allSubjects.forEach(s => {
            if (t.subjects.map(sub => sub = sub._links.self.href).includes(s._links.self.href)) {
              this.subjectOptions.push(s);
            }
          });
        }
      });
    } else {
      this.allSubjects.forEach(s => {
        this.subjectOptions.push(s);
      });
    }
    this.lessonForm.reset(this.lessonForm.value);
  }

  setTeacherValues() {
    this.teacherOptions = [];
    const filter = this.lessonForm.value.subject?._links.self.href;
    if (filter) {
      this.allTeachers.forEach(t => {
        if (t.subjects.map(s => s = s._links.self.href).includes(filter)) {
          this.teacherOptions.push(t);
        }
      });
    } else {
      this.allTeachers.forEach(t => {
        this.teacherOptions.push(t);
      });
    }
  }

  teacherChanged(event) {
    if (event.value) {
      this.setSubjectObtions();
    } else {
      this.setSubjectObtions();
    }

  }

  subjectChange(event) {
    if (event.value) {
      this.setTeacherValues();
    } else {
      this.setTeacherValues();
    }
  }

  onSubmit() {
    this.lesson = this.lessonForm.value;
    this.editMode = false;
    this.lessonGridService.saveLesson(this.lesson, this.config);
  }

  onClick() {
    this.editMode = true;
  }

}
