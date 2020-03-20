import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LeaveDay } from './leave-day.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class LeaveDayService {

    url: string = environment.apiUrl + 'leaveDays/';

    newLeaveDay: Subject<LeaveDay> = new Subject();

    constructor(
        private http: HttpClient
    ) { }

    getLeaveDaysForPerson(personId: number) {
        const personUrl = environment.apiUrl + 'persons/' + personId;
        return this.http.get(this.url + 'search/findByPerson?person=' + personUrl);
    }

    saveLeaveDay(leaveDay) {
        return this.http.post(this.url, leaveDay).pipe(tap((leaveDay: LeaveDay) => {
         this.newLeaveDay.next(leaveDay);
        }));
    }

    getLeaveDayTypes() {
        return this.http.get(this.url + 'types');
    }

    deleteLeaveDay(leaveDayUrl: string) {
        return this.http.delete(leaveDayUrl).pipe(tap(()=> {
            const delLeaveDay = new LeaveDay();
            delLeaveDay.resourceUrl = leaveDayUrl;
            this.newLeaveDay.next(delLeaveDay);
        }));
    }

    updateLeaveDay(leaveDay: LeaveDay) {
        return this.http.patch(leaveDay._links.self.href, leaveDay);
    }

    getLeaveDayByUrl(leaveDayUrl: string) {
        return this.http.get(leaveDayUrl + '?projection=leaveDayProjection');
    }

    getLeaveDays() {
        return this.http.get(this.url);
    }

    getLeaveDaysForDate(date: Date) {
        return this.http.get(
            this.url
            + 'search/findByDate'
            + '?date=' + date.getFullYear().toString() + '-' + (date.getMonth() + 1) + '-' + date.getDate().toString()
        );
    }
}
