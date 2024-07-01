import { Database, sqlite3 } from "sqlite3";

const sqlite3:sqlite3 = require('sqlite3').verbose()

export class AppDatabase {

    protected readonly READ_ONLY_MODE:number;
    protected readonly READ_WRITE_MODE:number;
    protected DB_URL:string

    constructor(db_url:string){
        this.READ_ONLY_MODE =  sqlite3.OPEN_READONLY;
        this.READ_WRITE_MODE = sqlite3.OPEN_READWRITE;
        this.DB_URL = db_url;
    }

    public connectToDataBaseReadOnly(): Promise<Database>{
        return new Promise((resolve,reject)=>{
            try {
                const db:Database = new sqlite3.Database(this.DB_URL, this.READ_ONLY_MODE, (err:Error|null):void=>reject(err));
                console.log("connected")
                resolve(db)
            } catch (error) {
                reject(error)
            }
        })
    }

    public connectToDataBaseReadAndWrite(): Promise<Database>{
        return new Promise((resolve,reject)=>{
            try {
                const db:Database = new sqlite3.Database(this.DB_URL, this.READ_WRITE_MODE ,(err:Error|null)=>reject(err));
                resolve(db)
            } catch (error) {
                reject(error)
            }
        })
    }
}
