import { Component } from '@angular/core';
import { MaterialService } from './common/materials.service';
import { ContentEnum, ContentEnumDecorator, ActionEnum, ActionEnumDecorator } from './common/enums'

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [ MaterialService ]
})

@ActionEnumDecorator
@ContentEnumDecorator
export class AppComponent {

    modalTitle = "Add new content";
    buttonName = "+";
    columns;
    data = [];

    actionEnum: any = ActionEnum;

    constructor(
        private _materialService: MaterialService
    ) {
        this.loadColumns();
    }

    deleteMessageHandler(e) {
        if(e.action == "delete") {
            if(this.checkDataExists(e.data.id)){
                var i = this.findDataIndex(e.data.id);
                this.data.splice(i,1);
            }
            if(e.deleteFromDB == true) {
                console.log("Delete from db");
            }
        }
    }

    updateDataHandler(e){
        if(e.needUpdateData == true) {
            this.loadColumns();
        }
        if(e.newData) {
            if(!this.checkDataExists(e.newData.id))
                this.data.push(e.newData);
        }
    }

    checkDataExists(id) {
        for(var i=0; i<this.data.length; i++){
            if(id == this.data[i].id){
                return true;
            }
        }
        return false;
    }

    findDataIndex(id) {
        for(var i=0; i<this.data.length; i++){
            if(id == this.data[i].id){
                return i;
            }
        }
    }

    loadColumns(){
        this._materialService.getColumns()
            .subscribe(data => {
                this.columns = data;
            });
    }

    loadData() {
        this._materialService.getUsers()
            .subscribe(data => {
                this.data = data;
            });
    }
}