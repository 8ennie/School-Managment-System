import { Injectable } from '@angular/core';
import { LessonInstance } from './lesson-instance.model';
import { HttpClient } from '@angular/common/http';
import { LessonService } from '../lessons/lesson.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LessonInstanceService {

    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    private url: string = environment.apiUrl + 'lessonInstances';
    lessonsInstancesChanged = new Subject<LessonInstance[]>();
    lessonInstances: LessonInstance[] = [];
    date: Date;
    constructor(
        private http: HttpClient,
        private lessonService: LessonService
    ) {

    }
    private getLessons(teacherUrl, day) {
        const promise = new Promise<LessonInstance[]>((resolve) => {
            this.lessonService.getLessonsForTeacherAndDay(teacherUrl, day.toUpperCase()).subscribe((data: { _embedded }) =>
                resolve(data._embedded.lessons),
                () => resolve([]));
        });
        return promise;
    }

    private getLessonInstances(teacherUrl, date) {
        const promise = new Promise<LessonInstance[]>((resolve) => {
            this.http.get(this.url + '/search/findByDateAndTeacher' +
                '?date=' + date.getDate().toString() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear().toString() +
                '&&teacher=' + teacherUrl +
                '&&projection=lessonInstanceProjection').subscribe((data: { _embedded }) => {
                    resolve(data._embedded.lessonInstances)
                }
                    ,
                    () => resolve([]));
        });

        return promise;
    }

    saveLessonInnstance(lessonInstance: LessonInstance) {
        return this.http.post(this.url, lessonInstance);
    }

    getLessonInstancesForTeacherAndDate(teacherId: number, date: Date) {
        this.date = date;
        const promise = new Promise<LessonInstance[]>((resolve) => {
            const teacherUrl = environment.apiUrl + '/teachers/' + teacherId;

            Promise.all([this.getLessonInstances(teacherUrl, date), this.getLessons(teacherUrl, this.days[date.getDay()])]).then(r => {
                const lessonInstances: LessonInstance[] = r[0];
                const lessons = r[1];
                if (lessons) {
                    lessons.forEach(lesson => {
                        if (!lessonInstances.some(lI => lI.lessonTime.hour === lesson.lessonTime.hour)) {
                            lessonInstances.push(lesson);
                        }
                    });
                }
                this.lessonInstances = lessonInstances;
                this.lessonsInstancesChanged.next(lessonInstances);
                resolve(lessonInstances);
            });
        });
        return promise;
    }


}
