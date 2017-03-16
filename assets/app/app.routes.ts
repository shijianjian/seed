import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialsComponent } from './materials/materials.component';
import { LoginComponent } from './error/login.component';

import { CanActivateViaOAuthGuard } from './auth/auth.canActivateGuard';

export const appRoutes: Routes = [
    { path: '', component: MaterialsComponent , canActivate : [CanActivateViaOAuthGuard] },
    { path: 'user', component: LoginComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);