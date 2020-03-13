import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LeaveDay } from './leave-day.model';


@Injectable({ providedIn: 'root' })
export class LeaveDayService {

    url: string = environment.apiUrl + 'leaveDays/';

    constructor(
        private http: HttpClient
    ) { }

    getLeaveDaysForTeacher(teacherId: number) {
        const teacherUrl = environment.apiUrl + 'persons/' + teacherId;
        return this.http.get(this.url + 'search/findByPerson?person=' + teacherUrl);
    }

    saveLeaveDay(leaveDay) {
        return this.http.post(this.url, leaveDay);
    }

    getLeaveDayTypes() {
        return this.http.get(this.url + 'types');
    }

    deleteLeaveDay(leaveDayUrl: string) {
        return this.http.delete(leaveDayUrl);
    }

    updateLeaveDay(leaveDay: LeaveDay) {
        return this.http.patch(leaveDay._links.self.href, leaveDay);
    }

    getLeaveDayByUrl(leaveDayUrl: string) {
        return this.http.get(leaveDayUrl);
    }
}
