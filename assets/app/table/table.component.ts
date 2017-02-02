import { Component, OnInit } from '@angular/core';

import { TableService } from './table.service';


@Component({
    selector: 'my-table',
    templateUrl: './table.component.html',
    providers: [TableService]
})
export class TableComponent {
    users = [];
    loading = true;
    message = true;
    
    constructor(private _tableService: TableService){
    }

    ngOnInit(){
        this.loadUsers();
    }

    loadUsers(){
        this._tableService.getUsers()
            .subscribe(users => this.users = users);
    }

    userFilter(username) {
        this.loading = true;
        this._tableService.getUsersByName(username)
            .subscribe(
                users => {
                        if(Object.keys(users).length !== 0){
                            this.users = users;
                        } else {
                            this.message = false;
                            this.loadUsers();
                        }
                },
                () => this.loadUsers(),
                () => {this.loading = false}
            );
    }

}