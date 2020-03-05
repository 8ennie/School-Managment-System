import { Injectable } from '@angular/core';
import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';
import { Subject } from 'rxjs';
import { LessonTimeService } from 'src/app/_services/lesson-time.service';


@Injectable({ providedIn: 'root' })
export class LessonGridService {

    private listLessons: Lesson[] = [];

    lessonsChanged = new Subject<Lesson[]>();

    saveLessons = new Subject<boolean>();

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
        }, (error) => {
            console.log('No Lessons for Class Found');
            this.listLessons = [];
            this.lessonsChanged.next(this.listLessons.slice());
        });
    }

    saveLesson(lesson: Lesson, config) {
        const promise = new Promise<Lesson>((resolve, reject) => {
            lesson.lessonTime = this.lessonTime.filter(l =>
                l.hour === config.hour && l.dayOfWeek.toLowerCase() === config.day.toLowerCase()
            )[0];
            lesson.grade = config.class;
            if (lesson.id) {
                this.lessonService.updateLesson(lesson).subscribe(() => {
                    setTimeout(() => {
                        this.lessonService.getLessonWithUrl(lesson._links.self.href).subscribe((le: Lesson) => {
                            resolve(le);
                        });
                    },
                        100);

                });
            } else {
                this.lessonService.saveLesson(lesson).subscribe();
                resolve(null);
            }
        });
        return promise;
    }

    removeLesson(lesson: Lesson) {
        this.lessonService.removeLesson(lesson).subscribe();
    }
}
