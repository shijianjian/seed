/**
 * Created by shijian on 09/03/2017.
 */
import { Component } from '@angular/core';

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

export class ToolBoxComponent {

    index;

    onSearch() : void {
        this.index = 'search';
    }

    onUpload() : void {
        this.index = 'upload';
    }

    onAdding() : void {
        this.index = 'adding';
    }
}