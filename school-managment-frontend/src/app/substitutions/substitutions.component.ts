import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeaveDay } from '../leave-days/leave-day.model';
import { LeaveDayService } from '../leave-days/leave-day.service';
import { Teacher } from '../teachers/teacher.model';
import { TeacherService } from '../teachers/teacher.service';
import { RestResponse } from '../shared/restResponse';

@Component({
  selector: 'app-substitutions',
  templateUrl: './substitutions.component.html',
  styleUrls: ['./substitutions.component.css']
})
export class SubstitutionsComponent implements OnInit {
  date: Date = new Date();

  leaveDays: LeaveDay[] = [];
  displayDialog: boolean;
  leaveDay: LeaveDay = new LeaveDay();
  newleaveDay: boolean;

  leaveDayTypes: { label: string, value: string }[] = [];
  allTeachers: Teacher[] = [];

  subTeachers: Teacher[] = [];

  houres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private leaveDaysService: LeaveDayService,
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
    this.date = new Date();
    if (this.date.getDay() === 0) {
      const newDate = new Date(this.date.getTime());
      newDate.setDate(newDate.getDate() + 1);
      this.date = newDate;
    } else if (this.date.getDay() === 6) {
      const newDate = new Date(this.date.getTime());
      newDate.setDate(newDate.getDate() + 2);
      this.date = newDate;
    }

    this.getLeaveDays();
    this.leaveDaysService.getLeaveDayTypes().subscribe((ldt: RestResponse) => {
      ldt._embedded.leaveTypes.forEach(t => {
        this.leaveDayTypes.push({ label: t, value: t });
      });
      this.leaveDay.type = this.leaveDayTypes[0].value;
    });
    this.teacherService.getTeachers().subscribe((teachers: RestResponse) => {
      this.allTeachers = teachers._embedded.teachers;
      this.subTeachers = this.allTeachers.filter(t => t.substituteTeacher);
      this.subTeachers.forEach(t => t.present = t.daysWorking.includes(this.date.toLocaleDateString('en', { weekday: 'long' }).toUpperCase()));
    });
  }

  dateChange(event) {
    this.getLeaveDays();
    this.subTeachers.forEach(t => t.present = t.daysWorking.includes(this.date.toLocaleDateString('en', { weekday: 'long' }).toUpperCase()));
  }

  getLeaveDays() {
    this.leaveDays = [];
    this.leaveDaysService.getLeaveDaysForDate(this.date).subscribe((leaveDays: { _embedded }) => {
      this.leaveDays = leaveDays._embedded.leaveDays;
    });
  }

  private getLeaveDay(href: string) {
    this.leaveDaysService.getLeaveDayByUrl(href).subscribe((leaveDay: LeaveDay) => {
      this.leaveDays = this.leaveDays.filter(obj => obj._links.self.href !== leaveDay._links.self.href);
      this.leaveDay = leaveDay;
      const leaveDays = [...this.leaveDays];
      if (this.leaveDay) {
        leaveDays.push(this.leaveDay);
      } else {
        this.leaveDays.filter(obj => obj._links.self.href !== leaveDay._links.self.href)[0] = this.leaveDay;
      }
      this.leaveDays = leaveDays;
      this.leaveDay = null;
      this.displayDialog = false;
    });
  }

  showDialogToAdd() {
    this.newleaveDay = true;
    this.newleaveDay = true;
    this.leaveDay = new LeaveDay();
    this.leaveDay.type = this.leaveDayTypes[0].value;
    this.leaveDay.date = this.date;
    this.displayDialog = true;
  }

  save() {
    if (!this.leaveDay.person) {
      return;
    }
    const personUrl = this.leaveDay.person?._links?.self?.href;
    this.leaveDay.person = personUrl;
    if (this.leaveDay._links) {
      this.leaveDaysService.updateLeaveDay(this.leaveDay).subscribe(() => {
        this.getLeaveDay(this.leaveDay._links.self.href);
      });
    } else {
      this.leaveDaysService.saveLeaveDay(this.leaveDay).subscribe((leaveDay: LeaveDay) => {
        this.getLeaveDay(leaveDay._links.self.href);
      });
    }
  }

  delete() {
    this.leaveDaysService.deleteLeaveDay(this.leaveDay._links.self.href).subscribe(() => {
      this.leaveDays = this.leaveDays.filter(obj => obj._links.self.href !== this.leaveDay._links.self.href);
      this.leaveDay = null;
      this.displayDialog = false;
      this.newleaveDay = false;
    });
  }

  onRowSelect(event) {
    this.newleaveDay = false;
    this.leaveDay = this.cloneLeaveDay(event.data);
    this.leaveDay.date = new Date(this.leaveDay.date);
    this.displayDialog = true;
  }

  cloneLeaveDay(l) {
    const leaveDay: LeaveDay = new LeaveDay();
    for (let prop in l) {
      leaveDay[prop] = l[prop];
    }
    return leaveDay;
  }


}
