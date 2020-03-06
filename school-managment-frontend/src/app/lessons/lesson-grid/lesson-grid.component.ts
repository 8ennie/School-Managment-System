import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lesson } from 'src/app/lessons/lesson.model';
import { SubjectService } from 'src/app/_services/subject.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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

  @Output() lessonChange = new EventEmitter<Lesson>();

  editMode = false;

  constructor(private subjectService: SubjectService,
    private teacherService: TeacherService,
    private lessonGridService: LessonGridService,
    private classService: ClassService) { }

  private allSubjects = [];
  subjectOptions = [];

  private allTeachers: Teacher[] = [];
  teacherOptions: Teacher[] = [];

  allClasses = [];

  private lessonTimeLessons;

  lessonForm = new FormGroup({
    subject: new FormControl('', Validators.required),
    teacher: new FormControl('', [Validators.required]),
    grade: new FormControl('', Validators.required)
  });

  isTeacherAvalibale(value) {
    const promise = new Promise<boolean>((resolve) => {
      if (this.lessonTimeLessons) {
        this.lessonTimeLessons.forEach(l => {
          if (value === l.teacher._links.self.href.replace('{?projection}', '')) {
            if (this.lesson?._links?.self?.href === l._links.self.href) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        });
        resolve(true);
      } else {
        resolve(true);
      }
    });
    return promise;
  }

  ngOnInit(): void {
    if (!this.lesson) {
      this.editMode = true;
      this.lesson = new Lesson();
      if (this.config.class) {
        this.lesson.grade = this.config.class;
      }
      if (this.config.teacher) {
        this.lesson.teacher = new Teacher();
        this.lesson.teacher._links = {};
        this.lesson.teacher._links.self = {};
        this.lesson.teacher._links.self.href = this.config.teacher;
      }
    } else if (!this.lesson.id) {
      this.editMode = true;
    }
    this.lessonForm.reset(this.lesson);
    if (this.editMode) {
      this.initializeFilters();
    }
  }

  initializeFilters() {
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
    if (!this.lessonTimeLessons && this.config) {
      this.lessonGridService.featchLessonsForLessonTimeWC(this.config).then((lessons) => {
        this.lessonTimeLessons = lessons;
        this.setTeacherValues();
      });
    }
  }

  setSubjectObtions() {
    this.subjectOptions = [];
    const filter = this.lessonForm.value.teacher?._links?.self?.href?.replace('{?projection}', '');
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
    this.teacherOptions.forEach(t => {
      this.isTeacherAvalibale(t._links.self.href).then(b => {
        if (b) {
          t.optionLable = t.fullName + ' ✅';
        } else {
          t.optionLable = t.fullName + ' ❌';
        }
      });
    });
  }

  teacherChanged(event) {
    if (event.value) {
      this.isTeacherAvalibale(event.value._links.self.href).then(b => {
        if (b) {
          this.setSubjectObtions();
        } else {
          this.lessonForm.patchValue({ teacher: null });
          this.setSubjectObtions();
        }
      });
    } else {
      this.setSubjectObtions();
    }
  }

  subjectChange(event) {
    this.setTeacherValues();
  }

  onSubmit() {
    this.lesson.subject = this.lessonForm.value.subject;
    this.lesson.teacher = this.lessonForm.value.teacher;
    if (this.lessonForm.value.grade?._links?.self?.href) {
      this.lesson.grade = this.lessonForm.value.grade._links.self.href;
    }
    this.editMode = false;
    this.lessonGridService.saveLesson(this.lesson, this.config).then((l) => {
      if (l) {
        this.lesson = l;
        this.lessonChange.next(this.lesson);
      }
    });
  }

  onClick() {
    this.editMode = true;
    this.initializeFilters();
  }

}
