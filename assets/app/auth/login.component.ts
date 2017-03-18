/**
 * Created by shijian on 17/03/2017.
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'my-login',
    template: `
        <form [formGroup]="loginForm" class="form-group" (ngSubmit)="onLogin()">
            <label for="username">Username: </label>
                <input
                    id="username" 
                    name="username" 
                    type="text"
                    class="form-control"
                    formControlName="username">
            <label for="password">Password: </label>
                <input 
                    id="password" 
                    name="password" 
                    type="password"
                    class="form-control"
                    formControlName="password">
            <button 
                [disabled]="loginForm.invalid"
                type="submit"
                class="btn btn-primary">{{button}}</button>
        </form>
    `
})

export class LoginComponent implements OnInit{

    button = "login";

    constructor(
        public fb: FormBuilder,
        private _authService: AuthService) {}

    ngOnInit() {
    }

    public loginForm = this.fb.group({
        username: ["", Validators.required],
        password: ["", Validators.required]
    });

    onLogin() {
        this._authService.login(this.loginForm.value.username, this.loginForm.value.password);
    }
}