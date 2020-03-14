import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SubLesson } from '../sub-lesson-instance.model';


@Component({
  selector: 'app-lesson-instance-details-dialog',
  templateUrl: './lesson-instance-details-dialog.component.html',
  styleUrls: ['./lesson-instance-details-dialog.component.css']
})
export class LessonInstanceDetailsDialogComponent {

  lessonInstance: SubLesson = new SubLesson();

  isSubLesson: boolean = false;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.lessonInstance = config.data.lessonInstance;
    this.isSubLesson = config.data.isSubLesson;
  }

  close() {
    this.ref.close();
  }

  onSubmit() {
    this.ref.close(this.lessonInstance);
  }

}
