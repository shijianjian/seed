import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs';

@Injectable()
export class TableService{
    private baseUrl = "http://jsonplaceholder.typicode.com";

    constructor(private _http: Http){
        
    }

    getUsers(){
        return this._http.get(this.baseUrl + '/users')
                .map(res => res.json());
    }

    getUsersByName(name){
        return this._http.get(this.baseUrl + '/users?name=' + name )
                        .map(res => res.json());
    }
}