import { Database, sqlite3 } from "sqlite3";

const sqlite3: sqlite3 = require('sqlite3').verbose();

export class AppDatabase {

    protected readonly READ_ONLY_MODE: number;
    protected readonly READ_WRITE_MODE: number;
    protected readonly OPEN_CREATE: number;
    protected DB_URL: string;

    constructor(db_url: string) {
        this.READ_ONLY_MODE = sqlite3.OPEN_READONLY;
        this.READ_WRITE_MODE = sqlite3.OPEN_READWRITE;
        this.OPEN_CREATE = sqlite3.OPEN_CREATE;
        this.DB_URL = db_url;
    }

    public connectToDataBaseReadOnly(): Promise<Database> {
        return new Promise((resolve, reject) => {
            const db: Database = new sqlite3.Database(this.DB_URL, this.READ_ONLY_MODE | this.OPEN_CREATE, (err: Error | null) => {
                if (err) {
                    console.error("Error connecting to database (read-only):", err.message);
                    reject(err); // Reject the promise with the error
                } else {
                    resolve(db); // Resolve the promise with the database object
                }
            });
        });
    }

    public connectToDataBaseReadAndWrite(): Promise<Database> {
        return new Promise((resolve, reject) => {
            const db: Database = new sqlite3.Database(this.DB_URL, this.READ_WRITE_MODE | this.OPEN_CREATE, (err: Error | null) => {
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
