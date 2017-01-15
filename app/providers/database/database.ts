import { Injectable } from '@angular/core';
var Sqlite = require("nativescript-sqlite");


@Injectable()
export class Database {
    private db: any;
    private isInstantiated: boolean;

    public constructor() {
     if(!this.isInstantiated) {
         (new Sqlite("my.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)").then(id => {
                this.db = db;
                this.isInstantiated = true;
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
           }, error => {
            console.log("OPEN DB ERROR", error);
           });
        }
    }

    public insert(data: any): Promise<any> {
    return this.db.
        execSQL("INSERT INTO people (firstname, lastname) VALUES (?, ?)", [data.firstname, data.lastname]);
    }


    //as we r just return the Promise above, data parsing is involved, so we create our own promise
    public fetch(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.db.all("SELECT * FROM people").then(rows => {
            let people = [];
            for(var row in rows) {
                people.push({
                    "id": rows[row][0],
                    "firstname": rows[row][1],
                    "lastname": rows[row][2]
                });
            }
            resolve(people);
        }, error => {
            reject(error);
        });
      });
    }
}