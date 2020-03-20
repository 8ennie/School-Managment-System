import { Component, OnInit, Input } from '@angular/core';
import { SubLesson } from 'src/app/lesson-instance/sub-lesson-instance.model';
import { SubLessonService } from 'src/app/lesson-instance/sub-lesson-instance.service';
import { LeaveDay } from 'src/app/leave-days/leave-day.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-substitutions-plan-list',
  templateUrl: './substitutions-plan-list.component.html',
  styleUrls: ['./substitutions-plan-list.component.css']
})
export class SubstitutionPlanListComponent implements OnInit {

  @Input() leaveDay: LeaveDay;

  subLessons: SubLesson[];
  houres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private subLessonService: SubLessonService,
  ) { }

  ngOnInit(): void {
    this.getsubLessons();
  }

  getsubLessons() {
    const teacherUrl = environment.apiUrl + 'teachers/' + this.leaveDay.person.id;
    this.subLessonService.getSubLessonsForTeacherAndDate(teacherUrl, new Date(this.leaveDay.date)).subscribe((sl:{_embedded}) => {
      this.subLessons = sl._embedded.substituteLessons;
    });
  }

  getSubLesson(hour:number){
    return this.subLessons.filter(sl => sl.lessonTime.hour == hour)[0]
  }

}
