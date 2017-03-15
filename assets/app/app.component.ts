import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styles:[`
        my-sidebar, my-materials {
            display: block;
        }
    `]
})

export class AppComponent {
    appName = "Spring Music";

    constructor(private _authService: AuthService) {}

    onLogin() {
        
    }
}