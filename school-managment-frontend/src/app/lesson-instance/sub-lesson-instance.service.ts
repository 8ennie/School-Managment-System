import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SubLesson } from './sub-lesson-instance.model';

@Injectable({ providedIn: 'root' })
export class SubLessonService {

    url = environment.apiUrl + 'substituteLessons';

    constructor(
        private http: HttpClient,
    ) { }


    getSubLessonsForTeacherAndDate(teacherUrl: string, date: Date) {
        return this.http.get(this.url + '/search/findByDateAndTeacher' +
            '?date=' + date.getFullYear().toString() + '-' + (date.getMonth() + 1) + '-' + date.getDate().toString() +
            '&&teacher=' + teacherUrl +
            '&&projection=substituteLessonProjection');
    }

    getSubLessonsForTeacherAndDateAsPromise(teacherUrl: string, date: Date) {
        const promise = new Promise<SubLesson[]>((resolve) => {
            this.getSubLessonsForTeacherAndDate(teacherUrl, date).subscribe(
                (data: { _embedded }) => {
                    resolve(data._embedded.substituteLessons)
                },
                () => resolve([]));
        });
        return promise;
    }

    saveSubLesson(subLesson: SubLesson){
        return this.http.post(this.url, subLesson);
    }

    updateSubLesson(subLesson: SubLesson){
        return this.http.patch(subLesson._links.self.href, subLesson);
    }

}