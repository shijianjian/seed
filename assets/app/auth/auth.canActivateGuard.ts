import { Injectable } from '@angular/core';
import { CanActivate , Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs';
import 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class CanActivateViaOAuthGuard implements CanActivate {

  constructor(
    private _router : Router,
    private _authService : AuthService
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
    return this._authService.checkToken()
               .map(res =>{
                  let valid : boolean;
                  if(res.status == 200) {
                      valid = true;
                      this._authService.getUserInfo();
                  } else {
                      valid = false;
                      this._router.navigateByUrl('/login');
                  }
                  this._authService.valid.next(valid);
                  return valid;
              })
              .catch(error =>{
                  this._router.navigateByUrl('/login');
                  this._authService.valid.next(false);
                  return Observable.of(false);
              }).take(1);
  }

}