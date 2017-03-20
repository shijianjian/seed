import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { MaterialsComponent } from './materials/materials.component';

import { CanActivateViaOAuthGuard } from './auth/auth.canActivateGuard';

export const appRoutes: Routes = [
    { path: '', redirectTo: "/material", pathMatch: 'full'},
    // { path: 'material', loadChildren: './materials/materials.module#MaterialsModule' ,canActivate : [CanActivateViaOAuthGuard] },
    { path: 'material', component: MaterialsComponent,canActivate : [CanActivateViaOAuthGuard] },
    // {
    //     path: 'material', loadChildren: () => new Promise(resolve => {
    //     (require as any).ensure([], require => {
    //         resolve(require('./materials/materials.module').MaterialsModule);
    //     })
    // })
    // },
    { path: 'login', component: LoginComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);