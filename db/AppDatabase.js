const sqlite3 = require('sqlite3').verbose()

class AppDatabase {

    constructor(){
        this._READ_ONLY_MODE = sqlite3.OPEN_READONLY,
        this._READ_WRITE_MODE = sqlite3.OPEN_READWRITE,
        this._DB_URL = './database.sqlite'
    }

    connectToDataBaseReadOnly(){
        return new Promise((resolve,reject)=>{
            try {
                const db = new sqlite3.Database(this._DB_URL,this._READ_ONLY_MODE ,err=>reject(err));
                resolve(db)
            } catch (error) {
                reject(error)
            }
        })
    }

    connectToDataBaseReadAndWrite(){
        return new Promise((resolve,reject)=>{
            try {
                const db = new sqlite3.Database(this._DB_URL,this._READ_WRITE_MODE ,err=>reject(err));
                resolve(db)
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = AppDatabase