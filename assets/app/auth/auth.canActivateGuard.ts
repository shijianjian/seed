import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { AuthService } from './auth.service';

@Injectable()
export class CanActivateViaOAuthGuard implements CanActivate {

  constructor(
    private _router : Router,
    private _authService : AuthService
  ) { }

  
  canActivate() {
    let valid: boolean;
    this._authService.checkToken()
      .subscribe(v => {
        let tokenCookie = Cookie.get('token'); 
        if(tokenCookie != null) {
          localStorage.setItem('token', tokenCookie);
        }
        valid = v;
      });

      if(valid == false) {
        this._router.navigateByUrl('/login');
      } else {
        valid = true;
        this._authService.getUserInfo();
      }
    return valid;
  }

}