import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit, OnDestroy {

  teachers: Teacher[] = [];
  subscription: Subscription;
  allowEdit = false;

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.allowEdit = this.authService.hasRole('ROLE_ADMIN');
    this.subscription = this.teacherService.teacherChanged
      .subscribe((teachers: Teacher[]) => {
        this.teachers = teachers;
      });
  }

  teacherDetails(teacher) {
    const studentId = teacher._links.self.href.split('/');
    this.router.navigate(['/teachers', studentId.slice(-1)[0]]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
