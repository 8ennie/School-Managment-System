import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TeacherService } from './teacher.service';


@Injectable({ providedIn: 'root' })
export class TeacherResolverService implements Resolve<any> {
  constructor(
    private teacherService: TeacherService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const teachers = this.teacherService.teacherChanged.value;
    if (teachers.length === 0) {
      this.teacherService.getTeachers().subscribe(teacher => {
        return teacher._embedded.teachers;
      });
    } else {
      return teachers;
    }
  }
}
