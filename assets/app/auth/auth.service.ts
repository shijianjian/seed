import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../model/User';

@Injectable()
export class AuthService {

  private auth_url = process.env.uaaUrl;
  private client_id = "foo";
  private client_secret = "foo";
  private _user : User;

  user = new BehaviorSubject<User>(this._user);

  constructor(private _http: Http, private _router: Router) { }

  login(username: string, password: string) : void {
    let headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('username', username);
      urlSearchParams.append('password', password);
      urlSearchParams.append('client_id', this.client_id);
      urlSearchParams.append('client_secret', this.client_secret);
      urlSearchParams.append('response_type', 'token');
      urlSearchParams.append('grant_type', 'password');
    let body = urlSearchParams.toString()
    this._http.post(this.auth_url + "/oauth/token", body, {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                  console.log(data);
                  localStorage.setItem('token', data.access_token);
                  //get user info after obtained the token
                  this.getUserInfo();
                  this._router.navigateByUrl("/");
                });
  }

  checkCurrentToken() : boolean {
    // TODO: Check token expired or not.
    return true;
  }

  logout() : void {
    localStorage.removeItem('token');
    this._user = new User( "", "", "", "", "", "", "" );
    this.user.next(this._user);
    this._router.navigateByUrl("/login");
  }

  loggedIn() : boolean{
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
      console.log("Couldn't find your token or token expired, please log in.");
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
        .map(res => res.json())
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
            this.logout();
            console.log('Can\'t find user, Please log in again.');
        });
  }

}
