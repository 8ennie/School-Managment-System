import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class ClassService {

    constructor(private http: HttpClient) { }

    getAllClasses() {
        return this.http.get<RestResponse>('http://localhost:8080/api/grades');
    }

}

interface RestResponse {
    _embedded;
}

