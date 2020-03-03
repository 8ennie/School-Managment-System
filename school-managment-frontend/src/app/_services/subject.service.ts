import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubjectService {

    constructor(private http: HttpClient) { }

    subjectList = [];

    subjectSub = new Subject();

    getAllSubjects() {
        return this.http.get<RestResponse>(environment.apiUrl + 'subjects').pipe(tap(subjects => {
            this.subjectList = subjects._embedded.subjects;
            this.update();
        }));
    }

    getSubjects() {
        if (this.subjectList.length < 1) {
            this.getAllSubjects().subscribe();
        }
        return this.subjectList.slice();
    }

    update() {
        this.subjectSub.next(this.getSubjects());
    }
}

interface RestResponse {
    _embedded;
}
