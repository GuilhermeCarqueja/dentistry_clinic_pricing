import { Database, sqlite3 } from "sqlite3";

const sqlite3 = require('sqlite3').verbose();

export class AppDatabase {

    constructor(db_url) {
        this.READ_ONLY_MODE = sqlite3.OPEN_READONLY;
        this.READ_WRITE_MODE = sqlite3.OPEN_READWRITE;
        this.OPEN_CREATE = sqlite3.OPEN_CREATE;
        this.DB_URL = db_url;
    }

     connectToDataBaseReadOnly() {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.DB_URL, this.READ_ONLY_MODE | this.OPEN_CREATE, (err) => {
                if (err) {
                    console.error("Error connecting to database (read-only):", err.message);
                    reject(err); // Reject the promise with the error
                } else {
                    resolve(db); // Resolve the promise with the database object
                }
            });
        });
    }

     connectToDataBaseReadAndWrite() {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.DB_URL, this.READ_WRITE_MODE | this.OPEN_CREATE, (err) => {
                if (err) {
                    console.error("Error connecting to database (read-write):", err.message);
                    reject(err); // Reject the promise with the error
                } else {
                    resolve(db); // Resolve the promise with the database object
                }
            });
        });
    }
}
