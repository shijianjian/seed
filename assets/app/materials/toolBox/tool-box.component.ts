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
        this.index = '';
    }

}