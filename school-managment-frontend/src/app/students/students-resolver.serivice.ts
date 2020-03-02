import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StudentService } from './student.service';

@Injectable({ providedIn: 'root' })
export class StudentsResolverService implements Resolve<any> {
  constructor(
    private studentService: StudentService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const students = this.studentService.getStudents();
    if (students.length === 0) {
      return this.studentService.fetchStudents();
    } else {
      return students;
    }
  }
}
