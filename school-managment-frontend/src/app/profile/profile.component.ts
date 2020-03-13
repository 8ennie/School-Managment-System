import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lessons/lesson.model';
import { LessonInstanceService } from '../lesson-instance/lesson-instancnce.service';
import { AuthService } from '../auth/auth.service';
import { LeaveDayService } from '../leave-days/leave-day.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  date: Date;
  lessons: Lesson[] = [];
  teacehrId;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  houres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private lessonnInstanceService: LessonInstanceService,
    private authService: AuthService,
    private leaveDayService: LeaveDayService
    ) {

  }

  ngOnInit() {
    this.date = new Date();
    this.teacehrId = this.authService.getUser()?.person?.id;
    this.updateLessons();
    this.fetchLeaveDays();
  }

  fetchLeaveDays(){
    this.leaveDayService.getLeaveDaysForTeacher(this.teacehrId);
  }

  updateLessons() {
    if (this.teacehrId) {
      this.lessonnInstanceService.getLessonInstancesForTeacherAndDate(this.teacehrId, this.date);
    }
  }

  plusDay() {
    const newDate = new Date(this.date.getTime());
    if (this.date.getDay() === 5) {
      newDate.setDate(newDate.getDate() + 3);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    this.date = newDate;
    this.updateLessons();
  }

  minusDay() {
    const newDate = new Date(this.date.getTime());
    if (this.date.getDay() === 1) {
      newDate.setDate(newDate.getDate() - 3);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    this.date = newDate;
    this.updateLessons();
  }
  dateChange(event) {
    this.updateLessons();
  }
}
