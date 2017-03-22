import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { User } from '../model/User';

@Component({
    selector: "my-nav",
    templateUrl: "./nav.component.html"
})

export class NavComponent implements OnInit {

    @Input() appName= "";

    user;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ){ 
        this._authService.getUserInfo();
    }

    ngOnInit() {
        this.user = this._authService.user;
    }

    loggedIn() : boolean {
        return this._authService.loggedIn();
    }

    private onLogin() {
        this._router.navigateByUrl('/login');
    }

    private onLogout() {
        this._authService.logout();
    }

}