import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs';

@Injectable()
export class MaterialService{

    private baseUrl = "http://localhost:8080";

    constructor(private _http: Http){ 
        this.getColumns();
    }

    private _data = [];
    private _columns = [];
    private _search = [];

    data = new BehaviorSubject<Array<Object>>(this._data);
    columns = new BehaviorSubject<Array<Object>>(this._columns);
    search = new BehaviorSubject<Array<Object>>(this._search);

    getAllData(){
        return this._http.get(this.baseUrl + '/api/employees')
                .map(res => res.json());
    }

    clearSearchData() {
        this._search = [];
        this.search.next(this._search);
    }

    getDataByName(name){
        this.clearSearchData();
        this._http.get(this.baseUrl + '/api/employee?query=' + name )
                    .map(res => res.json())
                    .distinctUntilChanged()
                    .subscribe(data => {
                        if(name == "" || name === null || typeof name === 'undefined') {
                            this._search = [];
                        } else {
                            this._search = data;
                        }
                        this.search.next(this._search);
                    });
    }

    getColumns() {
        this._http.get(this.baseUrl + '/api/columns')
                    .map(res => res.json())
                    .distinctUntilChanged()
                    .subscribe(data => {
                        this._columns = data;
                        this.columns.next(this._columns);
                    });
    }

    createMaterial(material){
        // TODO: not working, maybe since spring boot
        this._http.post(this.baseUrl + "/api/employee/add", material)
                    .map(res =>  res.json())
                    .subscribe(data => {
                        for(var i = 0; i<data.length; i++){
                            this._data.push(data[i]);
                        }
                        this.data.next(this._data);
                    });
    }

    updateMaterial(material) {
        // TODO
        this._http.put(this.baseUrl + "/api/employee/update", material)
                    .map(res => res.json())
                    .subscribe(data => {
                        for(var i = 0; i<data.length; i++){
                            this.updateData(data[0]);
                        }
                    });
    }

    deleteMaterial(id) {
        // TODO
        this._http.delete(this.baseUrl + "/api/employee/delete", id)
                    .map(res => res.json)
                    .subscribe( confirmation => console.log(confirmation));
    }


    addData(obj) {
        if(!this.checkDataExists(obj.id)) {
            this._data.push(obj);
            this.data.next(this._data);
        } else {
            console.log('Data exists, can not add.');
        }
    }

    deleteData(obj) {
        if(this.checkDataExists(obj.id)) {
            var i = this.findDataIndex(obj.id);
            this._data.splice(i,1);
        }
        this.data.next(this._data);
    }

    private updateData(obj) {
        if(this.checkDataExists(obj.id)) {
            this._data.splice(this.findDataIndex(obj.id), 1);
            this._data.push(obj);
            this.data.next(this._data);
        }
    }

    private checkDataExists(id) {
        for(var i=0; i<this._data.length; i++){
            if(id == this._data[i].id){
                return true;
            }
        }
        return false;
    }

    private findDataIndex(id) {
        for(var i=0; i<this._data.length; i++){
            if(id == this._data[i].id){
                return i;
            }
        }
    }
}