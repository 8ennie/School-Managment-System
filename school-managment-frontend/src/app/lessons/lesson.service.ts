import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lesson } from './lesson.model';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LessonService {

    private url: string = environment.apiUrl + 'lessons';
    lessonsChanged = new Subject<Lesson[]>();

    lessonList: Lesson[] = [];

    constructor(private http: HttpClient) { }

    fetchAllLessons() {
        return this.http.get(this.url + '?projection=lessonProjection').pipe(tap((lessons: any) => {
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
        return this.http.get(this.url + '/search/findByGrade?name=' + grade + '&&projection=lessonProjection');
    }

    saveLesson(lesson:Lesson){
        let newLesson:Lesson = new Lesson;
        newLesson.grade = lesson.grade;
        newLesson.teacher = lesson.teacher._links.self.href;
        newLesson.subject = lesson.subject._links.self.href;
        newLesson.lessonTime = lesson.lessonTime._links.self.href;


        return this.http.post(this.url,lesson);
    }
}
