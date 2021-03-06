import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lesson } from './lesson.model';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RestResponse } from '../shared/restResponse';

@Injectable({ providedIn: 'root' })
export class LessonService {

    private url: string = environment.apiUrl + 'lessons';
    lessonsChanged = new Subject<Lesson[]>();

    lessonList: Lesson[] = [];

    constructor(private http: HttpClient) { }

    fetchAllLessons() {
        return this.http.get(this.url + '?projection=lessonProjection').pipe(tap((lessons: RestResponse) => {
            this.lessonList = lessons._embedded.lessons;
        }));
    }

    getLessons() {
        if (this.lessonList.length === 0) {
            this.fetchAllLessons().subscribe(() => this.sendUpdate());
        } else {
            return this.lessonList.slice();
        }
    }

    sendUpdate() {
        this.lessonsChanged.next(this.lessonList.slice());
    }

    getLessonsForGrade(grade) {
        return this.http.get(this.url + '/search/findByGrade?grade=' + grade + '&&projection=lessonProjection');
    }

    getLessonsForTeacher(teacher) {
        return this.http.get(this.url + '/search/findByTeacher?teacher=' + teacher + '&&projection=lessonProjection');
    }

    getLessonsForLessonTime(lessonTime) {
        return this.http.get(this.url + '/search/findByLessonTime?lessonTime=' + lessonTime + '&&projection=lessonProjection');
    }

    getLessonsForTeacherAndDay(teacher: string, day: string) {
        return this.http.get(this.url + '/search/findByLessonTimeDayOfWeekAndTeacher'
            + '?dayOfWeek=' + day
            + '&&teacher=' + teacher
            + '&&projection=lessonProjection');
    }

    saveLesson(lesson: Lesson) {
        const newLesson: Lesson = new Lesson();
        if (lesson.grade._links?.self?.href) {
            newLesson.grade = lesson.grade._links.self.href;
        } else {
            newLesson.grade = lesson.grade;
        }
        newLesson.teacher = lesson.teacher._links.self.href;
        newLesson.subject = lesson.subject._links.self.href;
        newLesson.lessonTime = lesson.lessonTime._links.self.href;
        return this.http.post(this.url, newLesson);
    }
    updateLesson(lesson: Lesson) {
        lesson.teacher = lesson.teacher._links.self.href;
        lesson.subject = lesson.subject._links.self.href;
        lesson.lessonTime = lesson.lessonTime._links.self.href;
        return this.http.patch(lesson._links.self.href, lesson);
    }
    getLessonWithUrl(url: string) {
        return this.http.get(url + '?projection=lessonProjection');
    }

    removeLesson(lesson: Lesson) {
        return this.http.delete(lesson._links.self.href);
    }
}
