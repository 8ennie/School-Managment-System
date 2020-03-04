import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LessonTimeService {
    constructor(private http: HttpClient) { }

    private url: string = environment.apiUrl + 'lessonTimes';

    getAllLessonTimes() {
        return this.http.get(this.url + '?size=50');
    }
}
