import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LessonInstance } from './lesson-instance.model';
import { LessonInstanceService } from './lesson-instancnce.service';


import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog/';
import { Subscription } from 'rxjs';
import { SubLessonService } from './sub-lesson-instance.service';
import { SubLesson } from './sub-lesson-instance.model';
import { LessonInstanceDetailsDialogComponent } from './lesson-instance-details-dialog/lesson-instance-details-dialog.component';
import { LeaveDay } from '../leave-days/leave-day.model';


@Component({
  selector: 'app-lesson-instance',
  templateUrl: './lesson-instance.component.html',
  styleUrls: ['./lesson-instance.component.css'],
  providers: [DialogService]
})
export class LessonInstanceComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.lessonInstanceSubscription.unsubscribe();
  }


  @Input() config: { date: Date, hour: number, class: string, person: {}, leaveDay };

  lessonInstance: SubLesson;
  lessonInstanceSubscription: Subscription;
  isSubLesson: boolean = false;

  constructor(
    private lessonInstanceService: LessonInstanceService,
    private subLessonService: SubLessonService,
    public dialogService: DialogService,
  ) { }


  ngOnInit(): void {
    this.lessonInstanceSubscription = this.lessonInstanceService.lessonsInstancesChanged.subscribe((data: SubLesson[]) => {
      this.isSubLesson = this.lessonInstanceService.isSubDay;
      this.lessonInstance = null;
      data.forEach(l => {
        if (l.lessonTime.hour === this.config.hour) {
          if (l.task) {
            this.isSubLesson = true;
          } else {
            this.isSubLesson = this.lessonInstanceService.isSubDay;
          }
          this.lessonInstance = l;
        }
      });
    });

  }



  save() {
    const newLessonInstance: LessonInstance = new LessonInstance();
    newLessonInstance.info = this.lessonInstance.info;
    newLessonInstance.teacher = this.lessonInstance.teacher._links.self.href.replace('{?projection}', '');
    newLessonInstance.grade = this.lessonInstance.grade._links.self.href.replace('{?projection}', '');
    newLessonInstance.subject = this.lessonInstance.subject._links.self.href.replace('{?projection}', '');
    newLessonInstance.lessonTime = this.lessonInstance.lessonTime._links.self.href.replace('{?projection}', '');
    newLessonInstance.date = this.lessonInstanceService.date;
    if (this.isSubLesson) {
      const newSubLesson = newLessonInstance as SubLesson;
      newSubLesson.task = (this.lessonInstance as SubLesson).task;
      newSubLesson.leaveDay = this.config.leaveDay._links.self.href;
      newSubLesson.substituteTeacher = (this.lessonInstance as SubLesson).substituteTeacher ?
      (this.lessonInstance as SubLesson).substituteTeacher._links.self.href.replace('{?projection}', '')
        : null;
      newSubLesson.allowInndependantlyWork = (this.lessonInstance as SubLesson).allowInndependantlyWork;
      if (this.lessonInstance._links?.self?.href) {
        newLessonInstance.id = newLessonInstance.id;
        newLessonInstance._links = this.lessonInstance._links;
        this.subLessonService.updateSubLesson(newSubLesson).subscribe();
      } else {
        this.subLessonService.saveSubLesson(newSubLesson).subscribe((data: { _embedded, _links }) => {
          this.lessonInstance._links = data._links;
        });
      }
    } else {
      if (this.lessonInstance._links?.self?.href) {
        newLessonInstance.id = newLessonInstance.id;
        newLessonInstance._links = this.lessonInstance._links;
        this.lessonInstanceService.updateLessonInstance(newLessonInstance).subscribe();
      } else {
        this.lessonInstanceService.saveLessonInnstance(newLessonInstance).subscribe((data: { _embedded, _links }) => {
          this.lessonInstance._links = data._links;
        });
      }
    }
  }

  show() {
    const ddc: DynamicDialogConfig = new DynamicDialogConfig();
    ddc.data = {
      lessonInstance: this.lessonInstance,
      isSubLesson: this.isSubLesson
    };
    ddc.header = 'Date: ' + this.lessonInstanceService.date.toDateString() + ' | ' +
      'Hour:  ' + this.lessonInstance.lessonTime.hour;
    ddc.closable = false;
    ddc.width = '70%';
    const ref = this.dialogService.open(LessonInstanceDetailsDialogComponent, ddc);

    ref.onClose.subscribe((lessonInstance: SubLesson) => {
      if (lessonInstance) {
        this.lessonInstance = lessonInstance;
        this.save();
      }
    });
  }

}
