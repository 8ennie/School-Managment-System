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
      return this.teacherService.getTeachers().subscribe();
    } else {
      return teachers;
    }
  }
}
