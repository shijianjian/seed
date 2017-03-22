/**
 * Created by shijian on 17/03/2017.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';

@NgModule({
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
    providers: [
        AuthService
    ],
    imports: [
        BrowserModule
    ]
})
export class AuthModule {

}