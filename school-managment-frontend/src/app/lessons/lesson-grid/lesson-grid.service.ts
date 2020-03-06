import { Injectable, Output, EventEmitter } from '@angular/core';
import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';
import { Subject } from 'rxjs';
import { LessonTimeService } from 'src/app/_services/lesson-time.service';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class LessonGridService {

    private listLessons: Lesson[] = [];

    getListLesson(){
        return this.listLessons.slice();
    }

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

    featchLessonsForGrade(grade: string) {
        this.lessonService.getLessonsForGrade(grade).subscribe((data: { _embedded }) => {
            this.listLessons = data._embedded?.lessons;
            this.lessonsChanged.next(this.listLessons.slice());
        }, (error) => {
            console.log('No Lessons for Class Found');
            this.listLessons = [];
            this.lessonsChanged.next(this.listLessons.slice());
        });
    }

    featchLessonsForTeacher(teacher: string) {
        this.lessonService.getLessonsForTeacher(teacher).subscribe((data: { _embedded }) => {
            this.listLessons = data._embedded?.lessons;
            this.lessonsChanged.next(this.listLessons.slice());
        }, (error) => {
            console.log('No Lessons for Teacher Found');
            this.listLessons = [];
            this.lessonsChanged.next(this.listLessons.slice());
        });
    }

    featchLessonsForLessonTime(lessonTime: string) {
        return this.lessonService.getLessonsForLessonTime(lessonTime);
    }

    saveLesson(lesson: Lesson, config) {
        const promise = new Promise<Lesson>((resolve) => {
            lesson.lessonTime = this.lessonTime.filter(l =>
                l.hour === config.hour && l.dayOfWeek.toLowerCase() === config.day.toLowerCase()
            )[0];
            if (config.class) {
                lesson.grade = config.class;
            } else if (config.teacher) {
                lesson.teacher._links.self.href = config.teacher;
            }
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
                this.lessonService.saveLesson(lesson).subscribe((data: { _links }) => {
                    this.lessonService.getLessonWithUrl(data._links.self.href).subscribe((le: Lesson) => {
                        resolve(le);
                    });
                });
            }
        });
        return promise;
    }

    removeLesson(lesson: Lesson) {
        this.lessonService.removeLesson(lesson).subscribe();
    }

    featchLessonsForLessonTimeWC(config: { day: string, hour: number }) {
        const promise = new Promise<Lesson[]>((resolve) => {
            const lessonTime = this.lessonTime.filter(l =>
                l.hour === config.hour && l.dayOfWeek.toLowerCase() === config.day.toLowerCase()
            )[0];
            this.featchLessonsForLessonTime(lessonTime._links.self.href)
                .pipe(map((data: { _embedded }) => data._embedded.lessons))
                .subscribe(
                    (data: Lesson[]) =>
                        resolve(data),
                    (error) => {
                        resolve(null);
                    });
        });
        return promise;
    }
}
