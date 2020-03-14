import { Component, OnInit, OnDestroy } from '@angular/core';
import { LessonInstanceService } from '../lesson-instancnce.service';
import { AuthService } from 'src/app/auth/auth.service';
import { LeaveDayService } from 'src/app/leave-days/leave-day.service';
import { LeaveDay } from 'src/app/leave-days/leave-day.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson-instance-list',
  templateUrl: './lesson-instance-list.component.html',
  styleUrls: ['./lesson-instance-list.component.css']
})
export class LessonInstanceListComponent implements OnInit , OnDestroy{
  ngOnDestroy(): void {
    this.leaveDaySubscription.unsubscribe();
  }

  absent = false;
  date: Date;
  teacehrId: number;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  houres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  leaveDays:LeaveDay[] = [];

  leaveDaySubscription:Subscription;
  constructor(
    private lessonnInstanceService: LessonInstanceService,
    private authService: AuthService,
    private leaveDayService: LeaveDayService
  ) { }

  ngOnInit(): void {
    this.date = new Date();
    if (this.date.getDay() === 0) {
      this.updateDate(1);
    } else if (this.date.getDay() === 6) {
      this.updateDate(2);
    }
    this.teacehrId = this.authService.getUser()?.person?.id;
    this.updateLessons();
    this.leaveDaySubscription = this.leaveDayService.leaveDaysForTeacherChange.subscribe((leaveDays) => {
      this.leaveDays = leaveDays;
      this.updateLessons();
    });
  }

  updateLessons() {
    if (this.leaveDays.map(ld => new Date(ld.date).toDateString()).includes(this.date.toDateString())) {
      this.absent = true;
      this.lessonnInstanceService.isSubDay = true;
    } else {
      this.absent = false;
      this.lessonnInstanceService.isSubDay = false;
    }
    if (this.teacehrId) {
      this.lessonnInstanceService.getLessonInstancesForTeacherAndDate(this.teacehrId, this.date);
    }
  }

  updateDate(by: number) {
    const newDate = new Date(this.date.getTime());
    newDate.setDate(newDate.getDate() + by);
    this.date = newDate;
    this.updateLessons();
  }

  plusDay() {
    if (this.date.getDay() === 5) {
      this.updateDate(3);
    } else {
      this.updateDate(1);
    }
  }

  minusDay() {
    if (this.date.getDay() === 1) {
      this.updateDate(-3);
    } else {
      this.updateDate(-1);
    }
  }
  dateChange(event) {
    this.updateLessons();
  }

  isLeaveDay(date) {
    let isLeaveDay = false;
    this.leaveDays.forEach(lf => {
      let leaveDayDate = new Date(lf.date);
      if (date.year === leaveDayDate.getFullYear()) {
        if (date.month === leaveDayDate.getMonth()) {
          if (date.day === leaveDayDate.getDate()) {
            isLeaveDay = true;
          }
        }
      }
    });
    return isLeaveDay;
  }
}
