import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class AuthService {

  private auth_url = process.env.uaaUrl;
  private client_id = "foo";
  private client_secret = "foo";
  
  constructor(private _http: Http, private _router: Router) { }

  login(username: string, password: string) : void {
    let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('username', username);
      urlSearchParams.append('password', password);
      urlSearchParams.append('client_id', this.client_id);
      urlSearchParams.append('client_secret', this.client_secret);
      urlSearchParams.append('response_type', 'token');
      urlSearchParams.append('grant_type', 'password');
    let body = urlSearchParams.toString()
    this._http.post(this.auth_url+"/oauth/token", body, {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                  console.log(data);
                  localStorage.setItem('token', data.access_token);
                  this._router.navigateByUrl("/");
                });
  }

  logout() : void {
    localStorage.removeItem('token');
  }

  loggedIn() : boolean{
    if(localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  getAuthHeader() : Headers {
    if(this.loggedIn()) {
      let headers = new Headers();
          headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
      return headers;
    }
    throw new ReferenceError("Couldn't find your token, please log in.");
  }

}
