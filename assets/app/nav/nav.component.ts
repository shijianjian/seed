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
    valid;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ){ 
        this._authService.checkToken();
    }

    ngOnInit() {
        this.user = this._authService.user;
        this.valid = this._authService.valid;
    }

    private onLogin() {
        this._router.navigateByUrl('/login');
    }

    private onLogout() {
        this._authService.logout();
    }

}