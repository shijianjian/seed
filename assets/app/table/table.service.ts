import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs';

@Injectable()
export class TableService{
    private baseUrl = "http://localhost:8080";

    constructor(private _http: Http){
        
    }

    getUsers(){
        return this._http.get(this.baseUrl + '/api/employees')
                .map(res => res.json());
    }

    getUsersByName(name){
        return this._http.get(this.baseUrl + '/api/employee?query=' + name )
                        .map(res => res.json());
    }
}