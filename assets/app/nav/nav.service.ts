import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs';

@Injectable()
export class NavService{

   private baseUrl = process.env.baseUrl;

    constructor(private _http: Http) {}

    uploadFile(file) {
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        this._http.post(this.baseUrl + "/uploadFile", formData)
                .subscribe(data => console.log(data));
    }

}
