import { Component, OnInit, Input } from '@angular/core';
import { LessonInstance } from './lesson-instance.model';
import { LessonInstanceService } from './lesson-instancnce.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LessonInstanceDetailsDialogComponent } from './lesson-instance-details-dialog/lesson-instance-details-dialog.component';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog/';


@Component({
  selector: 'app-lesson-instance',
  templateUrl: './lesson-instance.component.html',
  styleUrls: ['./lesson-instance.component.css'],
  providers: [DialogService]
})
export class LessonInstanceComponent implements OnInit {


  @Input() config: { date: string, hour: number, class: string, teacher: string };

  lessonInstance: LessonInstance = new LessonInstance();

  constructor(
    private lessonInstanceService: LessonInstanceService,
    public dialogService: DialogService) { }

  lessonInstanceForm = new FormGroup({
    teacher: new FormControl('', [Validators.required]),
    info: new FormControl()
  });

  ngOnInit(): void {
    this.lessonInstanceService.lessonInstances.forEach(l => {
      this.setLesson(l);
    });
    this.lessonInstanceService.lessonsInstancesChanged.subscribe(data => {
      this.lessonInstance = new LessonInstance();
      data.forEach(l => {
        this.setLesson(l);
      });
    });
  }

  setLesson(l) {
    if (l.lessonTime.hour === this.config.hour) {
      this.lessonInstance = l;
      if (l.info) {
        this.lessonInstanceForm.patchValue(l);
      }
    }
  }

  onSubmit() {
    const newLessonInstance: LessonInstance = new LessonInstance();
    this.lessonInstance.id = null;
    newLessonInstance.info = this.lessonInstanceForm.value.info;
    newLessonInstance.teacher = this.lessonInstance.teacher._links.self.href.replace('{?projection}', '');
    newLessonInstance.grade = this.lessonInstance.grade._links.self.href.replace('{?projection}', '');
    newLessonInstance.subject = this.lessonInstance.subject._links.self.href.replace('{?projection}', '');
    newLessonInstance.lessonTime = this.lessonInstance.lessonTime._links.self.href.replace('{?projection}', '');
    const date: Date = this.lessonInstanceService.date;
    newLessonInstance.date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    this.lessonInstanceService.saveLessonInnstance(newLessonInstance).subscribe(data => {
      console.log(data);
    });
  }

  show() {
    const ddc: DynamicDialogConfig = new DynamicDialogConfig();
    ddc.data = {
      lessonInstance: this.lessonInstance,
    };
    const date: Date = this.lessonInstanceService.date;
    const dateString = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    ddc.header = 'Date: ' + dateString + ' | ' +
      'Hour:  ' + this.lessonInstance.lessonTime.hour;
    ddc.closable = false;
    ddc.width = '70%';
    const ref = this.dialogService.open(LessonInstanceDetailsDialogComponent, ddc);

    ref.onClose.subscribe((lessonInstance: LessonInstance) => {
      if (lessonInstance) {
        this.lessonInstance = lessonInstance;
      }
    });
  }

}
