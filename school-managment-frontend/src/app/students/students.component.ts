import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from './student.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ClassService } from '../classes/class.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, OnDestroy {

  @ViewChild('dv') dataView: DataView;

  students: Student[];
  grades = [];
  subscription: Subscription;
  allowEdit = false;
  constructor(
    private studentService: StudentService,
    private router: Router,
    private gradeService: ClassService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.allowEdit = this.authService.hasRole('ROLE_ADMIN');
    this.subscription = this.studentService.studentChanged
      .subscribe(
        (students: Student[]) => {
          this.students = students;
        }
      );
    this.students = this.studentService.studentList;
    this.gradeService.getAllClasses().subscribe(grades => {
      this.grades = grades._embedded.grades;
    });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  studnetDetails(studnet) {
    const studentId = studnet._links.self.href.split('/');
    this.router.navigate(['/students', studentId.slice(-1)[0]]);
  }

  filter(event, dt) {
    dt.filter(event.value.map(grade => grade.name), 'grade.name', 'in');
  }

}
