import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubjectService {

    constructor(private http: HttpClient) { }


    getAllSubjects() {
        return this.http.get<RestResponse>(environment.apiUrl + 'subjects');
    }
}

interface RestResponse {
    _embedded;
}
