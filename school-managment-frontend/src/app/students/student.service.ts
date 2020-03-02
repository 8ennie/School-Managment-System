import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StudentService {

  studentList: Student[] = [];
  studentChanged = new Subject<Student[]>();

  constructor(
    private http: HttpClient
  ) { }

  getStudents(): Student[] {
    return this.studentList.slice();
  }

  setStudents(students: Student[]) {
    this.studentList = students;
    this.sendUpdate();
  }

  getStudent(id: number) {
    return this.http.get<Student>(environment.apiUrl + 'students/' + id + '?projection=studentProjection');
  }

  addStudent(student: Student) {
    this.studentList.push(student);
    this.sendUpdate();
  }

  saveStudent(student: Student) {
    return this.http.post<Student>(environment.apiUrl + 'students', student);
  }

  sendUpdate() {
    this.studentChanged.next(this.studentList.slice());
  }

  fetchStudents() {
    return this.http.get<any>(environment.apiUrl + 'students').
      pipe(map(responseStudents => {
        const students: Student[] = responseStudents._embedded.students;
        const studentList: Student[] = [];
        students.map((student: Student) => {
          Object.assign(new Student(), student);
          studentList.push(student);
        });
        return studentList;
      })).subscribe(students => {
        this.studentList = students;
        this.sendUpdate();
      });
  }

  editStudent(id: number, student: Student) {
    return this.http.patch(environment.apiUrl + 'students/' + id, student);
  }

  changeStudent(student: Student) {
    for (let _i = 0; _i < this.studentList.length; _i++) {
      if (this.studentList[_i]._links.self.href === student._links.self.href) {
        this.studentList[_i] = student;
        this.sendUpdate();
        break;
      }
    }
  }

  deleteStudent(id: number) {
    return this.http.delete(environment.apiUrl + 'students/' + id).pipe(tap(() => {
      this.removeStudent(id);
    }));
  }

  removeStudent(id: number) {
    for (let _i = 0; _i < this.studentList.length; _i++) {
      if (this.studentList[_i].id === Number(id)) {
        console.log('Delete');
        this.studentList.splice(_i, 1);
        this.sendUpdate();
        break;
      }
    }
  }
}
