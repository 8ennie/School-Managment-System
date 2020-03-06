import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from '../lesson.model';
import { LessonGridService } from '../lesson-grid/lesson-grid.service';
import { Teacher } from 'src/app/teachers/teacher.model';

@Component({
  selector: 'app-lessons-details',
  templateUrl: './lessons-details.component.html',
  styleUrls: ['./lessons-details.component.css']
})
export class LessonsDetailsComponent implements OnInit {

  constructor(private lessonGridService: LessonGridService) { }

  @Input() model: string;

  lessons: Lesson[] = [];

  allSubjects: { name: string, amount: number, teacher: Teacher }[] = [];

  allClasses: { name: string, amount: number }[] = [];

  ngOnInit(): void {
    console.log(this.model);
    
    this.lessons = this.lessonGridService.getListLesson();
    this.calculateStates();
    this.lessonGridService.lessonsChanged.subscribe(l => {
      this.lessons = l;
      this.calculateStates();
    });
  }

  calculateStates() {
    this.allSubjects = [];
    this.allClasses = [];
    this.lessons.forEach(l => {
      const sub = this.allSubjects.filter(s => s.name === l.subject.name);
      if (sub.length > 0) {
        sub[0].amount++;
      } else {
        this.allSubjects.push({ name: l.subject.name, amount: 1, teacher: l.teacher });
      }
      const clas = this.allClasses.filter(c => c.name === l.grade.name);
      if (clas.length > 0) {
        clas[0].amount++;
      } else {
        this.allClasses.push({ name: l.grade.name, amount: 1 });
      }
    });
  }

}
