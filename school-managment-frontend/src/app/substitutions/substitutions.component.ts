import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeaveDay } from '../leave-days/leave-day.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { LeaveDayService } from '../leave-days/leave-day.service';
import { Teacher } from '../teachers/teacher.model';
import { TeacherService } from '../teachers/teacher.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-substitutions',
  templateUrl: './substitutions.component.html',
  styleUrls: ['./substitutions.component.css']
})
export class SubstitutionsComponent implements OnInit, OnDestroy {


  date: Date = new Date;

  leaveDays:LeaveDay[] = [];
  displayDialog: boolean;
  leaveDay: LeaveDay = new LeaveDay();
  newleaveDay: boolean;

  leaveDayTypes: { label: string, value: string }[] = [];
  allTeachers: Teacher[] = [];

  allTeachersSubscription: Subscription;

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
    

    // this.leaveDaysService.getLeaveDays().subscribe((leaveDays: { _embedded }) => {
    //   this.leaveDays = leaveDays._embedded.leaveDays;
    // });

    this.getLeaveDays();
    this.leaveDaysService.getLeaveDayTypes().subscribe((ldt: { _embedded }) => {
      ldt._embedded.leaveTypes.forEach(t => {
        this.leaveDayTypes.push({ label: t, value: t });
      });
      this.leaveDay.type = this.leaveDayTypes[0].value;
    });

    this.allTeachersSubscription = this.teacherService.teacherChanged.subscribe((teachers: Teacher[]) => {
      this.allTeachers = teachers;
    });
    this.teacherService.getTeachers().subscribe();
  }

  dateChange(event) {
    this.getLeaveDays();
  }

  getLeaveDays() {
    this.leaveDaysService.getLeaveDaysForDate(this.date).subscribe((leaveDays :{_embedded}) => {
      console.log(leaveDays);
      this.leaveDays = leaveDays._embedded.leaveDays;
    });
  }

  private getLeaveDay(href: string) {
    this.leaveDaysService.getLeaveDayByUrl(href).subscribe((leaveDay: LeaveDay) => {
      console.log(leaveDay);
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
    const leaveDay: LeaveDay = {};
    for (let prop in l) {
      leaveDay[prop] = l[prop];
    }
    return leaveDay;
  }

  ngOnDestroy(): void {
    this.allTeachersSubscription.unsubscribe();
  }

}
