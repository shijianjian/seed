import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'my-login',
    template: `
        Welcome
    `
})

export class LoginComponent implements OnInit {

    constructor(
        public fb: FormBuilder, 
        private _authService: AuthService,
        private _activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this._activatedRoute.params.subscribe((params: Params) => {
            let code = params['code'];
            console.log(code);
        })
    }

    public loginForm = this.fb.group({
        username: ["", Validators.required],
        password: ["", Validators.required]
    });
  
    doLogin() {
        this._authService.login(this.loginForm.value.username, this.loginForm.value.password);
    }
}