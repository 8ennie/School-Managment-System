import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LessonInstance } from '../lesson-instance.model';

@Component({
  selector: 'app-lesson-instance-details-dialog',
  templateUrl: './lesson-instance-details-dialog.component.html',
  styleUrls: ['./lesson-instance-details-dialog.component.css']
})
export class LessonInstanceDetailsDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<LessonInstanceDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public lessonInnstance: LessonInstance) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
