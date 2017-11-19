import {SharedModule} from './shared.module';
import {enableProdMode, ErrorHandler, NgModule} from '@angular/core'; //enableProdMode : make development faster
import {MyApp} from './app.component';

import {MODULES, NATIVES, PROVIDERS} from './app.imports';

// this is the magic wand
enableProdMode();

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    MODULES,
    SharedModule
  ],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PROVIDERS,
    NATIVES,
  ]
})
export class AppModule {}

