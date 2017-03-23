import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams, Headers, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs';
import 'rxjs';

import { User } from '../model/User';

@Injectable()
export class AuthService {

  private auth_url = process.env.uaaUrl;
  private app_url = process.env.appUrl;
  private client_id = process.env.client_id;
  private client_secret = process.env.client_secret;
  private _user : User;

  user = new BehaviorSubject<User>(this._user);
  valid = new BehaviorSubject<boolean>(false);

  constructor(private _http: Http, private _router: Router) {
    this.checkToken();
  }

  clearCookiesAndStorage() : void {
    localStorage.removeItem('token');
    Cookie.delete('token');
    Cookie.delete('connect.sid');
  }

  isLoggedIn() : BehaviorSubject<boolean> {
    this.checkToken();
    return this.valid;
  }

  login() : void {
    window.location.href = this.app_url + '/signin';
  }

  logout() : void {
    this.clearCookiesAndStorage();
    this._user = new User( "", "", "", "", "", "", "" );
    this.user.next(this._user);
    window.location.href = this.app_url + '/logout';
    this.valid.next(false);
  }

  authParamUrl() : string {
    if(this.valid.getValue()) {
      let param = "?access_token=" + localStorage.getItem('token');
      return param;
    }
  }

  getUserInfo() : void {
    let headers = new Headers();
          headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
    this._http.get(this.auth_url + "/userinfo", { headers: headers })
        .map(res => res.json(), err => {})
        .subscribe(data => {
          let user = new User(
              data.email,
              data.family_name,
              data.given_name,
              data.name,
              data.phone_number,
              data.user_id,
              data.user_name
          );
          this._user = user;
          this.user.next(this._user);
        },
        err => {
          this._user = new User( "", "", "", "", "", "", "" );
        });
  }

  checkToken() : Observable<Response> {
    if(Cookie.get('token')) {
      localStorage.setItem('token', Cookie.get('token'));
    }
    let base64Credentials = btoa(`${this.client_id}:${this.client_secret}`);
    let headers = new Headers();
        headers.append('Content-type', 'application/x-www-form-encoded');
        headers.append('Authorization', 'Basic '+ base64Credentials);
    return this._http.post(this.auth_url + '/check_token?token='+ localStorage.getItem('token'), {}, { headers: headers })
  }

}
