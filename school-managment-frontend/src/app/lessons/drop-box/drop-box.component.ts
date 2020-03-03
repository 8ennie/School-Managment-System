import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { InsertDirective } from 'src/app/_directives/insert-point.directive';
import { LessonGridComponent } from 'src/app/lessons/lesson-grid/lesson-grid.component';


@Component({
    selector: 'app-drop-box',
    templateUrl: './drop-box.component.html',
})
export class DropBoxComponent {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }
    @ViewChild(InsertDirective, { static: true }) inCom: InsertDirective;
    private hide = false;

    onDrop(event) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LessonGridComponent);
        const viewContainerRef = this.inCom.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (componentRef.instance as LessonGridComponent).lesson = event.data;
        this.hide = true;
    }

    addLesson() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LessonGridComponent);
        const viewContainerRef = this.inCom.viewContainerRef;
        viewContainerRef.clear();
        viewContainerRef.createComponent(componentFactory);
        this.hide = true;
    }
}
