import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LessonInstance } from '../lesson-instance.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-lesson-instance-details-dialog',
  templateUrl: './lesson-instance-details-dialog.component.html',
  styleUrls: ['./lesson-instance-details-dialog.component.css']
})
export class LessonInstanceDetailsDialogComponent {

  lessonInstance: LessonInstance = new LessonInstance();

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.lessonInstance = config.data.lessonInstance;
  }

  close() {
    this.ref.close(this.lessonInstance);
  }

  onSubmit(lessonInstanceForm: NgForm) {
    this.ref.close(this.lessonInstance);
  }

}
