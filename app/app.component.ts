import { Component, OnInit } from "@angular/core";
import {Database} from "./providers/database/database";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit{
    public people: Array<any>;

    public constructor(private database: Database){
        this.people = [];
    }

    ngOnInit(){   //loading data
        setTimeout(()=> {
            this.fetch();
        }, 500);
    }

    public insert() {
    this.database.insert({firstname: "Saideep", lastname: "Chhetri"}).then(result => {
        this.fetch();
      });
    }
 
    public fetch() {
        this.database.fetch().then(result => {
            this.people = result;
        });
    }
}
