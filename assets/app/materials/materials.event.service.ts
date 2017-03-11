/**
 * Created by shijian on 11/03/2017.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class MaterialsEventService {

    private _data = [];
    private _index : String = "";

    data = new BehaviorSubject<Array<Object>>(this._data);
    sidebarIndex = new BehaviorSubject<String>(this._index);

    updateData(data: Array<Object>) {
        this._data = data;
        this.data.next(this._data);
    }

    updateSidebarIndex(index: String) {
        this._index = index;
        this.sidebarIndex.next(this._index);
    }
}