"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDatabase = void 0;
const sqlite3 = require('sqlite3').verbose();
class AppDatabase {
    constructor() {
        this.READ_ONLY_MODE = sqlite3.OPEN_READONLY;
        this.READ_WRITE_MODE = sqlite3.OPEN_READWRITE;
        this.DB_URL = './database.sqlite';
    }
    connectToDataBaseReadOnly() {
        return new Promise((resolve, reject) => {
            try {
                const db = new sqlite3.Database(this.DB_URL, this.READ_ONLY_MODE, (err) => reject(err));
                resolve(db);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    connectToDataBaseReadAndWrite() {
        return new Promise((resolve, reject) => {
            try {
                const db = new sqlite3.Database(this.DB_URL, this.READ_WRITE_MODE, (err) => reject(err));
                resolve(db);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.AppDatabase = AppDatabase;
