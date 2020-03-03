import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit, OnDestroy {

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  houres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  lessons: Lesson[] = [];
  subscription: Subscription;

  constructor(private lessonService: LessonService
    ) { }

  ngOnInit() {
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

}
