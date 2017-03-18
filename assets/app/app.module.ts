import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialsModule } from './materials/materials.module';
import { NavModule } from './nav/nav.module';

import { AppComponent } from "./app.component";
import { routing } from './app.routes';

import { AuthModule } from "./auth/auth.module";
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
        AuthModule,
        MaterialsModule
    ],
    providers: [CanActivateViaOAuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {

}