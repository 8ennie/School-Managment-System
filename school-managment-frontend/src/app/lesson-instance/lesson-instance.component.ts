import { Component, OnInit, Input } from '@angular/core';
import { LessonInstance } from './lesson-instance.model';
import { LessonInstanceService } from './lesson-instancnce.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-lesson-instance',
  templateUrl: './lesson-instance.component.html',
  styleUrls: ['./lesson-instance.component.css']
})
export class LessonInstanceComponent implements OnInit {


  @Input() config: { day: string, hour: number, class: string, teacher: string };

  lessonInstance: LessonInstance = new LessonInstance();

  constructor(private lessonInstanceService: LessonInstanceService) { }

  lessonInstanceForm = new FormGroup({
    teacher: new FormControl('', [Validators.required]),
    info: new FormControl()
  });

  ngOnInit(): void {
    this.lessonInstanceService.lessonInstances.forEach(l => {
      if (l.lessonTime.hour === this.config.hour) {
        this.lessonInstance = l;
      }
    });
    this.lessonInstanceService.lessonsInstancesChanged.subscribe(data => {
      data.forEach(l => {
        if (l.lessonTime.hour === this.config.hour) {
          this.lessonInstance = l;
        }
      });
    });
  }

  onSubmit(){
    this.lessonInstance.info = this.lessonInstanceForm.value.info;
  }

}
