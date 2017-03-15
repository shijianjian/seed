import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialsModule } from './materials/materials.module';
import { NavModule } from './nav/nav.module';
import { ErrorModule } from './error/error.module';

import { AppComponent } from "./app.component";
import { routing } from './app.routes';

import { AuthService } from "./auth/auth.service";
import { CanActivateViaOAuthGuard  } from "./auth/auth.canActivateGuard";

import "./config";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        routing,
        BrowserModule,
        NavModule,
        ErrorModule,
        MaterialsModule
    ],
    providers: [AuthService, CanActivateViaOAuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {

}