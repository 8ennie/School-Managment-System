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
        console.log(this.lessonList);

        this.lessonsChanged.next(this.lessonList.slice());
    }
}
