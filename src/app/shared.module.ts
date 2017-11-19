import {COMPONENTS, DIRECTIVES, PIPES} from './app.imports';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [
    PIPES,
    DIRECTIVES,
    COMPONENTS,
  ],
  imports: [
  ],
  exports: [
    PIPES,
    COMPONENTS,
  ]
})

export class SharedModule { }
