import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, OnInit, Input, OnDestroy } from '@angular/core';
import { InsertDirective } from 'src/app/_directives/insert-point.directive';
import { LessonGridComponent } from 'src/app/lessons/lesson-grid/lesson-grid.component';
import { MenuItem } from 'primeng/api';
import { LessonGridService } from '../lesson-grid/lesson-grid.service';
import { Subscription } from 'rxjs';
import { Lesson } from '../lesson.model';

@Component({
    selector: 'app-drop-box',
    templateUrl: './drop-box.component.html',
})
export class DropBoxComponent implements OnInit, OnDestroy {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private lessonGridService: LessonGridService
    ) { }

    @Input() config: { day: string, hour: number, class: string };

    @ViewChild(InsertDirective, { static: true }) inCom: InsertDirective;
    private hide = false;

    items: MenuItem[];
    private vrc: ViewContainerRef;
    private lessonSub = new Subscription();

    ngOnInit() {
        this.items = [
            {
                label: 'Remove',
                icon: 'pi pi-fw pi-chevron-right',
                command: (event) => { this.removeLesson(); }
            }
        ];
        this.lessonSub = this.lessonGridService.lessonsChanged.subscribe(lessons => {
            let present = false;
            lessons.forEach(l => {
                if (l.lessonTime.hour === this.config.hour && l.lessonTime.dayOfWeek.toLowerCase() === this.config.day.toLowerCase()) {
                    this.addLesson(l);
                    present = true;
                }
            });
            if (!present) {
                this.removeLesson();
            }
        });
    }

    onDrop(event) {
        const data = event.data;
        data.id = null;
        this.addLesson(data);
    }

    addLesson(data?: Lesson) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LessonGridComponent);
        this.vrc = this.inCom.viewContainerRef;
        this.vrc.clear();
        const componentRef = this.vrc.createComponent(componentFactory);
        this.hide = true;
        if (data) {
            (componentRef.instance as LessonGridComponent).lesson = data;
        }
        (componentRef.instance as LessonGridComponent).config = this.config;
    }

    removeLesson() {
        if (this.vrc) {
            this.vrc.remove(0);
            this.vrc = null;
            this.hide = false;
        }

    }

    ngOnDestroy() {
        this.lessonSub.unsubscribe();
    }
}
