import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { LessonInstanceService } from '../lesson-instancnce.service';
import { LeaveDayService } from 'src/app/leave-days/leave-day.service';
import { LeaveDay } from 'src/app/leave-days/leave-day.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson-instance-list',
  templateUrl: './lesson-instance-list.component.html',
  styleUrls: ['./lesson-instance-list.component.css'],
  providers:[LessonInstanceService]
})
export class LessonInstanceListComponent implements OnInit, OnDestroy {

  @Input() changeDateHeader: boolean = true;

  @Input() date: Date = new Date();

  @Input() person: {id:number};

  @Input() subLessonList: boolean = false;

  ngOnDestroy(): void {
    if(this.newLeaveDaySubscription){
      this.newLeaveDaySubscription.unsubscribe();
    }
  }

  absent = false;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  houres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  leaveDays: LeaveDay[] = [];
  newLeaveDaySubscription: Subscription;

  constructor(
    private lessonnInstanceService: LessonInstanceService,
    private leaveDayService: LeaveDayService
  ) { }

  ngOnInit(): void {
    if (this.date.getDay() === 0) {
      this.updateDate(1);
    } else if (this.date.getDay() === 6) {
      this.updateDate(2);
    }
    if (this.changeDateHeader) {
      this.leaveDayService.getLeaveDaysForPerson(this.person.id).subscribe((leaveDays: { _embedded }) => {
        this.leaveDays = leaveDays._embedded.leaveDays;
        this.updateLessons();
      });
      // this.newLeaveDaySubscription = this.leaveDayService.newLeaveDay.subscribe(leaveDay => {
      //   console.log(leaveDay);
      //   if(leaveDay){
  
      //   }
      // });  
    }
   
  }

  updateLessons() {
    if (this.leaveDays.map(ld => new Date(ld.date).toDateString()).includes(this.date.toDateString()) || this.subLessonList) {
      this.absent = true;
      this.lessonnInstanceService.isSubDay = true;
    } else {
      this.absent = false;
      this.lessonnInstanceService.isSubDay = false;
    }
    if (this.person.id) {
      this.lessonnInstanceService.getLessonInstancesForTeacherAndDate(this.person.id, this.date);
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