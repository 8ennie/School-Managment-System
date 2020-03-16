import { Component, OnInit, Input } from '@angular/core';
import { SubLesson } from 'src/app/lesson-instance/sub-lesson-instance.model';
import { SubLessonService } from 'src/app/lesson-instance/sub-lesson-instance.service';
import { LeaveDay } from 'src/app/leave-days/leave-day.model';

@Component({
  selector: 'app-substitution-plan-list',
  templateUrl: './substitution-plan-list.component.html',
  styleUrls: ['./substitution-plan-list.component.css']
})
export class SubstitutionPlanListComponent implements OnInit {

  @Input() leaveDay: LeaveDay;



  subLessons: SubLesson[];

  constructor(
    private subLessonService: SubLessonService,
  ) { }

  ngOnInit(): void {
    this.getsubLessons();
  }

  getsubLessons() {

  }

}
