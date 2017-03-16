import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'my-login',
    template: `
        <form role="form" [formGroup]="loginForm" (ngSubmit)="doLogin()">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" formControlName="username" class="form-control" name="username" placeholder="Username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" formControlName="password" class="form-control" name="password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary btn-block">Submit</button>
        </form>
    `
})

export class LoginComponent {

    constructor(public fb: FormBuilder, private _authService : AuthService) {}

    public loginForm = this.fb.group({
        username: ["", Validators.required],
        password: ["", Validators.required]
    });
  
    doLogin() {
        this._authService.login(this.loginForm.value.username, this.loginForm.value.password);
    }
}