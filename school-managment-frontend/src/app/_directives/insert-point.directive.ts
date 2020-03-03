import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInsert]',
})
export class InsertDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
