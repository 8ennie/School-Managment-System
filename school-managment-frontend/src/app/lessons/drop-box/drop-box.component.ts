import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { InsertDirective } from 'src/app/_directives/insert-point.directive';
import { LessonGridComponent } from 'src/app/lessons/lesson-grid/lesson-grid.component';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-drop-box',
    templateUrl: './drop-box.component.html',
})
export class DropBoxComponent implements OnInit{
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }
    @ViewChild(InsertDirective, { static: true }) inCom: InsertDirective;
    private hide = false;

    items: MenuItem[];
    private vrc:ViewContainerRef

    ngOnInit(){
        this.items = [
            {
                label: 'Remove',
                icon: 'pi pi-fw pi-chevron-right',
                command: (event) => {this.removeLesson()}
            }
        ];
    }

    onDrop(event) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LessonGridComponent);
        this.vrc = this.inCom.viewContainerRef;
        this.vrc.clear();
        const componentRef = this.vrc.createComponent(componentFactory);
        (componentRef.instance as LessonGridComponent).lesson = event.data;
        this.hide = true;
    }

    addLesson() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LessonGridComponent);
        this.vrc = this.inCom.viewContainerRef;
        this.vrc.clear();
        this.vrc.createComponent(componentFactory);
        this.hide = true;
    }

    removeLesson(){
        this.vrc.remove(0);
        this.hide = false;
    }
 
}
