import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit, OnDestroy {

  teachers: Teacher[] = [];
  subscription: Subscription;
  constructor(private teacherService: TeacherService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.teacherService.teacherChanged
      .subscribe(
        (teachers: Teacher[]) => {
          this.teachers = teachers;
        }
      );
    this.teachers = this.teacherService.teacherList;
  }

  teacherDetails(teacher) {
    const studentId = teacher._links.self.href.split('/');
    this.router.navigate(['/teachers', studentId.slice(-1)[0]]);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
