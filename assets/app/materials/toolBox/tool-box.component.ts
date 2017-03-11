/**
 * Created by shijian on 09/03/2017.
 */
import { Component, OnInit } from '@angular/core';

import { MaterialsEventService } from '../materials.event.service';

@Component({
    selector: 'my-tool-box',
    templateUrl: './tool-box.component.html',
    styles: [`
        .tool-box {
            border-bottom-right-radius: 20px;
            border-top-right-radius: 20px;
            width: 8%;
        }
    `]
})

export class ToolBoxComponent implements OnInit{

    index;

    constructor(private _materialEventService : MaterialsEventService) { }

    ngOnInit() {
        this._materialEventService.sidebarIndex.subscribe(index => this.index = index);
    }

    onClick(option) : void {
        this.index = option;
    }

    onUpload() : void {
        console.log('uploading')
    }

    onAdding() : void {
        console.log('uploading')
    }

    onConfig() : void {
        console.log('configuring')
    }


    // close the search sidebar
    onUseless(e) : void {
        if(e.clicked == true)
            this.index = '';
    }

}