import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from './teacher.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TeacherService {

    teacherList: Teacher[] = [];
    teacherChanged = new Subject<Teacher[]>();

    constructor(private http: HttpClient) { }

    saveTeacher(teacher: Teacher) {
        if (teacher.subjects.length === 0) {
            teacher.subjects = null;
        }
        return this.http.post<Teacher>(environment.apiUrl + 'teachers', teacher);
    }

    fetchTeacher() {
        this.http.get<any>(environment.apiUrl + 'teachers').pipe(map(data => data._embedded.teachers)).subscribe((teachers: Teacher[]) => {
            this.teacherList = teachers;
            teachers.forEach(t => t.fullName = t.firstName + ' ' + t.lastName);
            this.sendUpdate();
        });
    }

    getTeacher(id: number) {
        return this.http.get<Teacher>(environment.apiUrl + 'teachers/' + id + '?projection=teacherProjection');
    }

    sendUpdate() {
        this.teacherChanged.next(this.teacherList.slice());
    }

    editTeacher(id: number, teacher: Teacher) {
        return this.http.patch(environment.apiUrl + 'teachers/' + id, teacher);
    }

    getTeachers() {
        if (this.teacherList.length < 1) {
            this.fetchTeacher();
        }
        return this.teacherList.slice();
    }

    addTeacher(teacher: Teacher) {
        this.teacherList.push(teacher);
        this.sendUpdate();
    }

    changeTeacher(teacher: Teacher) {
        for (let _i = 0; _i < this.teacherList.length; _i++) {
            if (this.teacherList[_i]._links.self.href === teacher._links.self.href) {
                this.teacherList[_i] = teacher;
                this.sendUpdate();
                break;
            }
        }
    }

    deleteTeacher(id: number) {
        return this.http.delete(environment.apiUrl + 'teachers/' + id).pipe(tap(() => {
            this.removeTeacher(id);
        }));
    }

    removeTeacher(id: number) {
        for (let _i = 0; _i < this.teacherList.length; _i++) {
            if (this.teacherList[_i].id === Number(id)) {
                this.teacherList.splice(_i, 1);
                this.sendUpdate();
                break;
            }
        }
    }
}
