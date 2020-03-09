import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lessons/lesson.model';
import { AuthService } from '../auth/auth.service';
import { LessonInstanceService } from '../lesson-instance/lesson-instancnce.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  date: Date;
  lessons: Lesson[] = [];

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  houres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(private lessonnInstanceService: LessonInstanceService, private authService: AuthService) {

  }

  ngOnInit() {
    this.date = new Date();
    const teacehrId = this.authService.getUser().person?.id;
    if (teacehrId) {
      this.lessonnInstanceService.getLessonInstancesForTeacherAndDate(teacehrId, this.date);
    }


  }

}
