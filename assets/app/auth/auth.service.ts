import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams, Headers } from '@angular/http';
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

  constructor(private _http: Http, private _router: Router) { }

  checkCurrentToken() : boolean {
    // TODO: Check token expired or not.
    return true;
  }

  clearCookies() : void {
    Cookie.delete('token');
    Cookie.delete('connect.sid');
  }

  setToken() : void {
    if(Cookie.get('token')) {
      localStorage.setItem('token', Cookie.get('token'));
    }
  }

  logout() : void {
    this.clearCookies();
    this._user = new User( "", "", "", "", "", "", "" );
    this.user.next(this._user);
    window.location.href = this.app_url + '/logout';
    localStorage.removeItem('token');
  }

  loggedIn() : boolean {
    if(localStorage.getItem("token") && this.checkCurrentToken()) {
      return true;
    }
    return false;
  }

  getAuthHeader() : Headers {
    if(this.loggedIn() && this.checkCurrentToken()) {
      let headers = new Headers();
          headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
      return headers;
    }
    // TODO : Err handling future
    // throw new ReferenceError("Couldn't find your token or token expired, please log in.");
  }

  authParamUrl() : string {
    if(this.loggedIn() && this.checkCurrentToken()) {
      let param = "?access_token=" + localStorage.getItem('token');
      return param;
    }
  }

  getUserInfo() : void {
    let headers = this.getAuthHeader();
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

  checkToken() : Observable<boolean> {
    let valid : boolean = false;
    let base64Credentials = btoa(`${this.client_id}:${this.client_secret}`);
    this.setToken();
    let headers = new Headers();
        headers.append('Content-type', 'application/x-www-form-encoded');
        headers.append('Authorization', 'Basic '+ base64Credentials);
    let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('token', localStorage.getItem('token'));
    let body = urlSearchParams.toString();
    return this._http.post(this.auth_url + '/check_token?token='+ localStorage.getItem('token'), {}, { headers: headers })
              .map(res =>{
                  console.log(res);
                  if(res.status == 200) {
                      valid = true;
                      return valid;
                  } else {
                      return valid;
                  }
              })
  
  }
}
