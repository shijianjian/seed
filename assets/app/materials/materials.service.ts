import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs';

@Injectable()
export class MaterialService{

    // private baseUrl = "https://jian-shi-spring-music.run.aws-usw02-pr.ice.predix.io";
    private baseUrl = "http://localhost:8080";

    constructor(private _http: Http){ 
        this.getColumns();
    }

    private _data = [];
    private _columns = [];
    private _search = [];
    private _dataView = [];

    data = new BehaviorSubject<Array<Object>>(this._data);
    columns = new BehaviorSubject<Array<Object>>(this._columns);
    search = new BehaviorSubject<Array<Object>>(this._search);
    dataView = new BehaviorSubject<Array<Object>>(this._dataView);

    getAllData(){
        return this._http.get(this.baseUrl + '/albums')
                .map(res => res.json());
    }

    clearSearchData() {
        this._search = [];
        this.search.next(this._search);
    }

    getDataByName(name){
        this.clearSearchData();
        this._http.get(this.baseUrl + '/albums?query=' + name )
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
        this._http.get(this.baseUrl + '/albums/columns')
                    .map(res => res.json())
                    .distinctUntilChanged()
                    .subscribe(data => {
                        this._columns = data;
                        this.updateDataView();
                        this.columns.next(this._columns);
                    });
        
    }

    updateDataView() {
        // TODO: grab this from the server backend.
        this.columns.subscribe(res => {
            for(let item in res) {
                this._dataView.push({"key": item , "value": true});
            }
            this.dataView.next(this._dataView);
        });
    }

    createMaterial(material){
        this._http.post(this.baseUrl + "/albums/album", material)
                    .map(res =>  res.json())
                    .subscribe(data => {
                        this.addData(data);
                        this.data.next(this._data);
                    });
    }

    updateMaterial(material) {
        this._http.put(this.baseUrl + "/albums/album", material)
                    .map(res => res.json())
                    .subscribe(data => {
                        this.updateData(data);
                    });
    }

    deleteMaterial(id) {
        this._http.delete(this.baseUrl + "/albums/album/"+id)
                    .subscribe( confirmation => 
                        console.log(confirmation)
                    );
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
            console.log(obj)
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