import { Injectable } from '@angular/core';
import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';
import { Subscription, Subject } from 'rxjs';
import { LessonTimeService } from 'src/app/_services/lesson-time.service';

@Injectable({ providedIn: 'root' })
export class LessonGridService {

    private listLessons: Lesson[] = [];

    lessonsChanged = new Subject<Lesson[]>();

    private lessonTime = [];
    constructor(private lessonService: LessonService,
        private lessonTimeService: LessonTimeService
    ) {
        this.lessonTimeService.getAllLessonTimes().subscribe((time: { _embedded }) => {
            this.lessonTime = time._embedded.lessonTimes;
        });
    }

    featchLessons(grade: string) {
        this.lessonService.getLessonsForGrade(grade).subscribe((data: { _embedded }) => {
            this.listLessons = data._embedded?.lessons;
            this.lessonsChanged.next(this.listLessons.slice());
            console.log(this.listLessons);
            
        }, (error) => {
            console.log('No Lessons for Class Found');
            this.listLessons = [];
            this.lessonsChanged.next(this.listLessons.slice());
        });
    }

    saveLesson(lesson: Lesson, config) {
        console.log(lesson);
        if (!lesson.id) {
            lesson.lessonTime = this.lessonTime.filter(l =>
                l.hour === config.hour && l.dayOfWeek.toLowerCase() === config.day.toLowerCase()
            )[0];
            lesson.grade = config.class;
            console.log(lesson);
            this.lessonService.saveLesson(lesson).subscribe();
        }
    }
}
