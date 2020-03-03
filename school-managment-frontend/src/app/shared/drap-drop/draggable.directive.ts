import { Directive, Output, HostListener, EventEmitter, HostBinding, Input } from '@angular/core';
import { DragService } from './drag.service';

@Directive({
    selector: '[appDraggable]'
})
export class DraggableDirective {

    private options: DraggableOptions = {};

    @Input()
    set appDraggable(options: DraggableOptions) {
        if (options) {
            this.options = options;
        }
    }

    constructor(private dragService: DragService) { }

    @HostBinding('draggable')
    get draggable() {
        return true;
    }

    @HostListener('dragstart', ['$event'])
    onDragStart(event) {
        const { zone = 'zone', data = {} } = this.options;
        this.dragService.startDrag(zone);
        event.dataTransfer.setData('Text', JSON.stringify(data));
    }
}

export interface DraggableOptions {
    zone?: string;
    data?: any;
}
