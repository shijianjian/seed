import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams, Headers } from '@angular/http';


@Injectable()
export class AuthService {

  private auth_url = "https://2f2bd91e-3b1b-4e16-9838-7f697b13c47e.predix-uaa.run.aws-usw02-pr.ice.predix.io";
  private client_id = "foo";
  private client_secret = "foo";
  
  constructor(private _http: Http, private _router: Router) { }

  login(username: string, password: string) {
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

  logout() {
    localStorage.removeItem('token');
  }

  loggedIn() {

  }

}
