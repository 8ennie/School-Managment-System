import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LeaveDay } from './leave-day.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class LeaveDayService {

    url: string = environment.apiUrl + 'leaveDays/';

    leaveDaysForTeacherChange: BehaviorSubject<LeaveDay[]> = new BehaviorSubject([]);

    constructor(
        private http: HttpClient
    ) { }

    getLeaveDaysForTeacher(teacherId: number) {
        const teacherUrl = environment.apiUrl + 'persons/' + teacherId;
        return this.http.get(this.url + 'search/findByPerson?person=' + teacherUrl).pipe(tap((leaveDays: { _embedded }) => {
            this.leaveDaysForTeacherChange.next(leaveDays._embedded.leaveDays);
        }));
    }

    isSubDay(date: Date) {
        return this.leaveDaysForTeacherChange.value.map(ldft => ldft.date).includes(date);
    }

    saveLeaveDay(leaveDay) {
        return this.http.post(this.url, leaveDay).pipe(tap((leaveDay:LeaveDay) => {
            const leaveDays:LeaveDay[] = this.leaveDaysForTeacherChange.value;
            leaveDays.push(leaveDay);
            this.leaveDaysForTeacherChange.next(leaveDays);
        }));
    }

    getLeaveDayTypes() {
        return this.http.get(this.url + 'types');
    }

    deleteLeaveDay(leaveDayUrl: string) {
        return this.http.delete(leaveDayUrl).pipe(tap(() => {
            let leaveDays:LeaveDay[] = this.leaveDaysForTeacherChange.value;
            leaveDays = leaveDays.filter(obj => obj._links.self.href !== leaveDayUrl);
            this.leaveDaysForTeacherChange.next(leaveDays);
        }));;
    }

    updateLeaveDay(leaveDay: LeaveDay) {
        return this.http.patch(leaveDay._links.self.href, leaveDay);
    }

    getLeaveDayByUrl(leaveDayUrl: string) {
        return this.http.get(leaveDayUrl);
    }
}
