import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from './teacher.model';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TeacherService {

    url:string = environment.apiUrl + 'teachers';

    teacherChanged = new BehaviorSubject<Teacher[]>([]);

    constructor(private http: HttpClient) { }

    saveTeacher(teacher: Teacher) {
        if (teacher.subjects.length === 0) {
            teacher.subjects = null;
        }
        return this.http.post<Teacher>(this.url, teacher).pipe(tap((teacher:Teacher) => {
            const teacherList = this.teacherChanged.value;
            teacherList.push(teacher);
            this.sendUpdate(teacherList);
        }));
    }

    getTeachers(){
        return this.http.get<any>(environment.apiUrl + 'teachers').pipe(tap(data => {
            this.sendUpdate(data._embedded.teachers);
        }));
    }

    getTeacher(id: number) {
        return this.http.get<Teacher>(environment.apiUrl + 'teachers/' + id + '?projection=teacherProjection');
    }

    sendUpdate(teachers:Teacher[]) {
        teachers.forEach(t => t.fullName = t.firstName + ' ' + t.lastName);
        this.teacherChanged.next(teachers);       
    }

    editTeacher(id: number, teacher: Teacher) {
        return this.http.patch(environment.apiUrl + 'teachers/' + id, teacher);
    }

    changeTeacher(teacher: Teacher) {
        const teacherList = this.teacherChanged.value;
        for (let _i = 0; _i < teacherList.length; _i++) {
            if (teacherList[_i]._links.self.href === teacher._links.self.href) {
                teacherList[_i] = teacher;
                this.sendUpdate(teacherList);
                break;
            }
        }
    }

    deleteTeacher(id: number) {
        return this.http.delete(environment.apiUrl + 'teachers/' + id).pipe(tap(() => {
            let teacherList = this.teacherChanged.value;
            teacherList = teacherList.filter(obj => obj.id !== id);
            this.sendUpdate(teacherList);
        }));
    }

    getAvailableTeachers(date:Date){

    }

}
