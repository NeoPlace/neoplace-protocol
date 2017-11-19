//Used for setting
import {ConstantVariable} from './constant-variable';
//Used for Theming
import {AppState} from './global.setting';
//MODULE
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
//DIRECTIVES
import {InvokeDirective} from '../components/invoke-directive/invokeDirective';


export const MODULES = [
    BrowserModule,
    HttpModule
];

export const PROVIDERS = [
];

export const NATIVES = [

];

export const COMPONENTS = [
];

export const DIRECTIVES = [
    InvokeDirective
];

export const PIPES = [

];
