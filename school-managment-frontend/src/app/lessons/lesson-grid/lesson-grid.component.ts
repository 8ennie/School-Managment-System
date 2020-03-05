import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lesson } from 'src/app/lessons/lesson.model';
import { SubjectService } from 'src/app/_services/subject.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/teachers/teacher.service';
import { Teacher } from 'src/app/teachers/teacher.model';
import { LessonGridService } from './lesson-grid.service';
import { ClassService } from 'src/app/classes/class.service';

@Component({
  selector: 'app-lesson-grid',
  templateUrl: './lesson-grid.component.html',
  styleUrls: ['./lesson-grid.component.css']
})
export class LessonGridComponent implements OnInit {

  @Input() lesson: Lesson;

  @Input() config: { day: string, hour: number, class: string, teacher: string };

  editMode = false;

  constructor(private subjectService: SubjectService,
    private teacherService: TeacherService,
    private lessonGridService: LessonGridService,
    private classService: ClassService) { }

  private allSubjects = [];
  private subjectOptions = [];

  private allTeachers: Teacher[] = [];
  private teacherOptions: Teacher[] = [];

  private allClasses = [];

  lessonForm = new FormGroup({
    subject: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    if (!this.lesson) {
      this.editMode = true;
      this.lesson = new Lesson();
      this.lesson.grade = this.config.class;
      //this.lesson.teacher = this.config.teacher;
    } else if (!this.lesson.id) {
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
        this.setSubjectObtions();
      });
    } else {
      this.setTeacherValues();
      this.setSubjectObtions();
    }

    this.classService.getAllClasses().pipe(take(1)).subscribe(data => {
      this.allClasses = data._embedded.grades;
    });


  }

  setSubjectObtions() {
    this.subjectOptions = [];
    const filter = this.lessonForm.value.teacher?._links?.self?.href.replace('{?projection}', '');
    if (filter) {
      this.allTeachers.forEach(t => {
        if (t._links.self.href === filter) {
          this.allSubjects.forEach(s => {
            if (t.subjects.map(sub => sub = sub._links.self.href.replace('{?projection}', '')).includes(s._links.self.href)) {
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
    const filter = this.lessonForm.value.subject?._links.self.href.replace('{?projection}', '');
    if (filter) {
      this.allTeachers.forEach(t => {
        if (t.subjects.map(s => s = s._links.self.href.replace('{?projection}', '')).includes(filter)) {
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
    this.setSubjectObtions();
  }

  subjectChange(event) {
    this.setTeacherValues();
  }

  onSubmit() {
    this.lesson.subject = this.lessonForm.value.subject;
    this.lesson.teacher = this.lessonForm.value.teacher;
    this.editMode = false;
    this.lessonGridService.saveLesson(this.lesson, this.config).then((l) => {
      if (l) {
        this.lesson = l;
      }
    });
  }

  onClick() {
    this.editMode = true;
  }

}
