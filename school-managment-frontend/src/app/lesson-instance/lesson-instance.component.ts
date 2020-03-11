import { Component, OnInit, Input } from '@angular/core';
import { LessonInstance } from './lesson-instance.model';
import { LessonInstanceService } from './lesson-instancnce.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LessonInstanceDetailsDialogComponent } from './lesson-instance-details-dialog/lesson-instance-details-dialog.component';


@Component({
  selector: 'app-lesson-instance',
  templateUrl: './lesson-instance.component.html',
  styleUrls: ['./lesson-instance.component.css']
})
export class LessonInstanceComponent implements OnInit {


  @Input() config: { date: string, hour: number, class: string, teacher: string };

  lessonInstance: LessonInstance = new LessonInstance();

  constructor(
    private lessonInstanceService: LessonInstanceService,
    public dialog: MatDialog) { }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(LessonInstanceDetailsDialogComponent, {
      width: '250px',
      data: LessonInstance
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.lessonInstance = result;
    });
  }

}
