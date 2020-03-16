import { Injectable } from '@angular/core';
import { LessonInstance } from './lesson-instance.model';
import { HttpClient } from '@angular/common/http';
import { LessonService } from '../lessons/lesson.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LeaveDay } from '../leave-days/leave-day.model';
import { SubLessonService } from './sub-lesson-instance.service';
import { SubLesson } from './sub-lesson-instance.model';
import { TeacherService } from '../teachers/teacher.service';
import { Teacher } from '../teachers/teacher.model';

@Injectable({ providedIn: 'root' })
export class LessonInstanceService {

    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    private url: string = environment.apiUrl + 'lessonInstances';
    lessonsInstancesChanged = new BehaviorSubject<LessonInstance[]>([]);

    date: Date;
    isSubDay: boolean = false;

    techerLeaveDays: LeaveDay[];

    allTeachers: Teacher[];

    constructor(
        private http: HttpClient,
        private lessonService: LessonService,
        private subLessonInstanceService: SubLessonService,
        private teacherService: TeacherService,
    ) { }
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
                '?date=' + date.getFullYear().toString() + '-' + (date.getMonth() + 1) + '-' + date.getDate().toString() +
                '&&teacher=' + teacherUrl +
                '&&projection=lessonInstanceProjection').subscribe(
                    (data: { _embedded }) => {
                        if (data._embedded.lessonInstances) {
                            resolve(data._embedded.lessonInstances)
                        } else {
                            resolve([]);
                        }
                    },
                    () => resolve([]));
        });

        return promise;
    }

    saveLessonInnstance(lessonInstance: LessonInstance) {
        return this.http.post(this.url, lessonInstance);
    }

    updateLessonInstance(lessonInstance: LessonInstance) {
        return this.http.patch(lessonInstance._links.self.href, lessonInstance);
    }
    getLessonInstance(url: string) {
        return this.http.get(url);
    }


    getLessonInstancesForTeacherAndDate(teacherId: number, date: Date) {
        this.date = date;
        const promise = new Promise<LessonInstance[]>((resolve) => {
            const teacherUrl = environment.apiUrl + 'teachers/' + teacherId;
            Promise.all([this.getLessonInstances(teacherUrl, date), this.getLessons(teacherUrl, this.days[date.getDay()])]).then(r => {
                const lessonInstances: LessonInstance[] = r[0];
                const lessons = r[1];
                this.subLessonInstanceService.getSubLessonsForTeacherAndDateAsPromise(teacherUrl, date).then(sli => {
                    const subLessonInstances = sli;
                    if (lessons) {
                        lessons.forEach(lesson => {
                            if (!subLessonInstances?.some(slI => slI.lessonTime.hour === lesson.lessonTime.hour)) {
                                if (!lessonInstances?.some(lI => lI.lessonTime.hour === lesson.lessonTime.hour)) {
                                    lesson.id = null;
                                    lesson._links.self = null;
                                    subLessonInstances.push(lesson as SubLesson);
                                } else {
                                    const lessonInstance: LessonInstance = lessonInstances.filter(lI => lI.lessonTime.hour === lesson.lessonTime.hour)[0] as SubLesson;
                                    lessonInstance.id = null;
                                    lessonInstance._links.self = null;
                                    subLessonInstances.push(lessonInstance as SubLesson);
                                }
                            }
                        });
                    }
                    this.lessonsInstancesChanged.next(subLessonInstances);
                    resolve(subLessonInstances);
                });
            });
        });
        return promise;
    }

    getAvailableTeachers() {
        const promise = new Promise<Teacher[]>((resolve) => {
            if (this.allTeachers) {
                resolve(this.allTeachers);
            } else {
                this.teacherService.getTeachers().subscribe((teachers: Teacher[]) => {
                    resolve(teachers);
                });
            }
        });
        return promise;
    }

}
