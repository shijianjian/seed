/**
 * Created by shijian on 09/03/2017.
 */
import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';

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
    `],
    animations: [
        trigger('animatePanel', [
            state('active', style({
                opacity: '1',
                transform: 'translateX(0)',
            })),
            state('openPanel', style({
                opacity: '1',
                transform: 'translateX(0)',
                padding: '20px',
                'flex-grow': '1',
                'min-width': '440px',
                color: 'aliceblue'
            })),
            transition('void => active', [style({opacity: '0', transform:'translateX(-20%)'}),animate(200)]),
            transition('void => openPanel', [style({opacity: '0', transform:'translateX(-50%)', 'width': '0'}),animate(200)])
        ])
    ]
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

    onSearch() : void {

    }

    onUpload() : void {

    }

    onAdding() : void {

    }

    onConfig() : void {

    }

    // close the search sidebar
    onUseless(e) : void {
        if(e.clicked == true)
            this.index = '';
    }

}