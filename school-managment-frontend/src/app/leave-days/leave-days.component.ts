import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { LeaveDayService } from './leave-day.service';
import { LeaveDay } from './leave-day.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leave-days',
  templateUrl: './leave-days.component.html',
  styleUrls: ['./leave-days.component.css']
})
export class LeaveDaysComponent implements OnInit {

  leaveDays = [];

  displayDialog: boolean;

  leaveDay: LeaveDay = new LeaveDay();

  selectedleaveDay;

  newleaveDay: boolean;

  cols: any[];

  leaveDayTypes: { label: string, value: string }[] = [];

  constructor(private authService: AuthService, private leaveDaysService: LeaveDayService) { }

  ngOnInit(): void {
    const person = this.authService.getUser().person;
    this.leaveDaysService.getLeaveDaysForTeacher(person?.id).subscribe((leaveDays: { _embedded }) => {
      this.leaveDays = leaveDays._embedded.leaveDays;
    });

    this.leaveDaysService.getLeaveDayTypes().subscribe((ldt: { _embedded }) => {
      ldt._embedded.leaveTypes.forEach(t => {
        this.leaveDayTypes.push({ label: t, value: t });
      });
      this.leaveDay.type = this.leaveDayTypes[0].value;
    });

    this.cols = [
      { field: 'date', header: 'date' },
      { field: 'type', header: 'type' },
      { field: 'description', header: 'description' },
    ];
  }

  showDialogToAdd() {
    this.newleaveDay = true;
    this.newleaveDay = true;
    this.leaveDay = new LeaveDay();
    this.leaveDay.type = this.leaveDayTypes[0].value;
    this.leaveDay.date = new Date();
    this.displayDialog = true;
  }

  save() {
    if (this.leaveDay._links) {
      this.leaveDaysService.updateLeaveDay(this.leaveDay).subscribe(() => {
        this.getLeaveDay(this.leaveDay._links.self.href);
      });
    } else {
      const person = this.authService.getUser().person;
      this.leaveDay.person = environment.apiUrl + 'teachers/' + person?.id;
      this.leaveDaysService.saveLeaveDay(this.leaveDay).subscribe((leaveDay: LeaveDay) => {
       this.getLeaveDay(leaveDay._links.self.href);
      });
    }
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

}
