/**
 * Created by shijian on 17/03/2017.
 */
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'my-login',
    template: `
        <div class="container">
            <h3>Login</h3>
            <form [formGroup]="loginForm" class="form-group" (ngSubmit)="onLogin(loginForm)">
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
                <div style="margin-top: 10px;" class="pull-right">
                <button 
                    [disabled]="loginForm.invalid"
                    type="submit"
                    class="btn btn-primary">{{button}}</button>
                </div>
            </form>
        </div>
    `
})

export class LoginComponent implements OnInit{

    private button = "login";

    constructor(
        private _formbuilder: FormBuilder,
        private _authService: AuthService) {}

    ngOnInit() {
    }

    private loginForm = this._formbuilder.group({
        username: ["", Validators.required],
        password: ["", Validators.required]
    });

    private onLogin(form : FormGroup) : void {
        this._authService.login(form.value.username, form.value.password);
    }
}