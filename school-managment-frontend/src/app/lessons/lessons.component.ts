import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.model';
import { Subscription } from 'rxjs';
import { LessonGridService } from './lesson-grid/lesson-grid.service';
import { map } from 'rxjs/operators';
import { ClassService } from '../classes/class.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit, OnDestroy {

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  houres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  lessons: Lesson[] = [];
  subscription: Subscription;

  allGrades = [];
  class;

  constructor(private lessonService: LessonService,
    private lessonGridService: LessonGridService,
    private classService: ClassService,
    
  ) { }

  ngOnInit() {
    this.classService.getAllClasses().pipe(
      map(data => data._embedded.grades)).
      subscribe(classes => {
        this.allGrades = classes.map(classValue => classValue = { label: classValue.name, value: classValue._links.self.href });
      });
    this.subscription = this.lessonService.lessonsChanged
      .subscribe(
        (lessons: Lesson[]) => {
          this.lessons = lessons;
        }
      );
    this.lessons = this.lessonService.getLessons();

   
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onGradeChange(event) {
    this.lessonGridService.featchLessons(event.value);
  }

}
