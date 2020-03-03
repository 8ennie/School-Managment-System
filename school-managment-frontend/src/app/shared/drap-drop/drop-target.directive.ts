import { Directive, Output, HostListener, EventEmitter, HostBinding, Input } from '@angular/core';
import { DragService } from './drag.service';

@Directive({
    selector: '[appDropTarget]'
})
export class DropTargetDirective {

    private options: DropTargetOptions = {};
    @Input()
    set appDropTarget(options: DropTargetOptions) {
        if (options) {
            this.options = options;
        }
    }
    @Output() myDrop = new EventEmitter();

    constructor(private dragService: DragService) { }

    @HostListener('dragenter', ['$event'])
    @HostListener('dragover', ['$event'])
    onDragOver(event) {
        const { zone = 'zone' } = this.options;
        if (this.dragService.accepts(zone)) {
            event.preventDefault();
        }
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        const transData = JSON.parse(event.dataTransfer.getData('Text'));
        this.myDrop.next({ data: transData, dropEvent: event });
    }
}

export interface DropTargetOptions {
    zone?: string;
}
