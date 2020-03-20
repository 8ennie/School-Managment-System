import { Component, OnInit } from '@angular/core';
import { LeaveDay } from '../leave-days/leave-day.model';
import { LeaveDayService } from '../leave-days/leave-day.service';

@Component({
  selector: 'app-substitutions-plan',
  templateUrl: './substitutions-plan.component.html',
  styleUrls: ['./substitutions-plan.component.css']
})
export class SubstitutionsPlanComponent implements OnInit {

  date: Date = new Date();
  leaveDays: LeaveDay[];
  
  responsiveOptions;

  numVis = 1;

  constructor(
    private leaveDaysService: LeaveDayService,
  ) { }

  ngOnInit(): void {
    this.getLeaveDays();
    this.responsiveOptions = [
      {
        breakpoint: '500px;',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '500px;',
        numVisible: 2,
        numScroll: 1
      },
    ];
  }

  getLeaveDays() {
    this.leaveDaysService.getLeaveDaysForDate(this.date).subscribe((leaveDays: { _embedded }) => {
      this.leaveDays = leaveDays._embedded.leaveDays;
    });
  }

 
}
