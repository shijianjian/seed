import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialsComponent } from './materials.component';

const routes: Routes = [
    { path: '', component: MaterialsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);