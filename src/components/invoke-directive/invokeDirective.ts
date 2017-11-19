import {Directive, EventEmitter, Output} from '@angular/core';

@Directive({ selector: '[invoke]'})
export class InvokeDirective {
  @Output() invoke = new EventEmitter();
  ngAfterContentInit() {
    this.invoke.emit(null);
  }
}
