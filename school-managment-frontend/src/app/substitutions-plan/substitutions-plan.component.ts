import { Component, OnInit } from '@angular/core';
import { LeaveDay } from '../leave-days/leave-day.model';
import { LeaveDayService } from '../leave-days/leave-day.service';

@Component({
  selector: 'app-substitutions-plan',
  templateUrl: './substitutions-plan.component.html',
  styleUrls: ['./substitutions-plan.component.css']
})
export class SubstitutionsPlanComponent implements OnInit {

  date: Date = new Date("2020-03-16");
  leaveDays:LeaveDay[] = [];
  houres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  responsiveOptions;

  constructor(
    private leaveDaysService:LeaveDayService
  ) { }

  ngOnInit(): void {
    this.getLeaveDays();
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  getLeaveDays() {
    this.leaveDaysService.getLeaveDaysForDate(this.date).subscribe((leaveDays :{_embedded}) => {
      console.log(leaveDays);
      this.leaveDays = leaveDays._embedded.leaveDays;
    });
  }

}
