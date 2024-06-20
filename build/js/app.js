"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppDatabase_1 = require("./db/AppDatabase");
const QUERY_CREATE_USERS_TABLE = `
    CREATE TABLE IF NOT EXISTS 
        users (
            user_id INTEGER PRIMARY KEY,
            user_street VARCHAR(200) NOT NULL,
            user_address_number INTEGER NOT NULL,
            user_email VARCHAR(100) NOT NULL,
            user_type CHARACTER(1) NOT NULL,
            user_name VARCHAR(300) NOT NULL,
            zip_code CHARACTER(8) NOT NULL,
            address_complement VARCHAR(200),
            inserted_at TEXT NOT NULL
        )
`;
const QUERY_CREATE_CLINICS_TABLE = `
    CREATE TABLE IF NOT EXISTS 
        clinics (
            clinic_id INTEGER PRIMARY KEY,
            max_payment_fee FLOAT,
            tax_rate FLOAT,
            number_of_daily_work_hours INTEGER NOT NULL,
            clinic_name VARCHAR (255) NOT NULL,
            number_of_chairs INTEGER NO NULL,
            number_of_work_months FLOAT NOT NULL,
            expected_vacancy FLOAT,
            time_cost FLOAT,
            user_id INTEGER,
            iserted_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        )
`;
const QUERY_CREATE_RECURRENT_EXPENSES_TABLE = `
    CREATE TABLE IF NOT EXISTS 
        clinic_current_expenses (
            expense_id INTEGER PRIMARY KEY,
            expense VARCHAR(200) NOT NULL,
            clinic_id INTEGER NOT NULL,
            expense_value FLOAT NOT NULL,
            expense_frequency CHARACTER(1) NOT NULL,
            inserted_at TEXT NOT NULL,
            FOREIGN KEY(clinic_id) REFERENCES clinics(clinic_id)
        )
`;
const QUERY_CREATE_PROCEDURES_LIST_TABLE = `
    CREATE TABLE IF NOT EXISTS 
        procedures_list (
            list_id INTEGER PRIMARY KEY,
            list_name VARCHAR(200) NOT NULL,
            clinic_id INTEGER NOT NULL,
            inserted_at TEXT NOT NULL,
            FOREIGN KEY(clinic_id) REFERENCES clinics(clinic_id)
        )
`;
const QUERY_CREATE_PROCEDURES_TABLE = `
    CREATE TABLE IF NOT EXISTS 
        procedures (
            procedure_id INTEGER PRIMARY KEY,
            
            investment_fee FLOAT,
            procedure_tax FLOAT,
            minimum_price FLOAT,
            professional_cost FLOAT,
            profit_margin FLOAT,
            precedure_max_payment_rate FLOAT,
            precedure_max_payment_cost FLOAT,
            procedure_time FLOAT,
            procedure_time_cost FLOAT,
            list_id INTEGER,
            procedure_name VARCHAR(200) NOT NULL,
            final_price FLOAT,
            materials_cost,

            inserted_at TEXT NOT NULL,
            FOREIGN KEY(list_id) REFERENCES procedures_list(list_id)
        )
`;
const QUERY_CREATE_MATERIALS_TABLE = `
    CREATE TABLE IF NOT EXISTS 
        materials (
            material_id INTEGER PRIMARY KEY,
            unit VARCHAR(10) NOT NULL,
            purchase_quantity FLOAT NOT NULL,
            purchase_cost float NOT NULL,
            clinic_id INTEGER,
            inserted_at TEXT NOT NULL,
            FOREIGN KEY(clinic_id) REFERENCES clinics(clinic_id)
        )
`;
const QUERY_CREATE_PROCEDURE_MATERIALS_TABLE = `
    CREATE TABLE IF NOT EXISTS 
        procedure_materials (
            procedure_id INTEGER NOT NULL,
            material_id INTEGER NOT NULL,
            unit VARCHAR(10) NOT NULL,
            procedure_quantity FLOAT,
            inserted_at TEXT NOT NULL,     
            FOREIGN KEY(material_id) REFERENCES materials(material_id),
            FOREIGN KEY(procedure_id) REFERENCES procedures(procedure_id)
        )
`;
const queriesExecutionOrder = [
    QUERY_CREATE_USERS_TABLE,
    QUERY_CREATE_CLINICS_TABLE,
    QUERY_CREATE_PROCEDURES_TABLE,
    QUERY_CREATE_PROCEDURES_LIST_TABLE,
    QUERY_CREATE_MATERIALS_TABLE,
    QUERY_CREATE_RECURRENT_EXPENSES_TABLE,
    QUERY_CREATE_PROCEDURE_MATERIALS_TABLE,
];
const tables = [
    'users',
    'clinics',
    'procedures_list',
    'materials',
    'clinic_current_expenses',
    'procedure_materials',
    'procedures',
];
const databaseURL = "./build/js/db/database.sqlite";
const appDatabase = new AppDatabase_1.AppDatabase(databaseURL);
function runQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield appDatabase.connectToDataBaseReadAndWrite();
        return new Promise((resolve, reject) => {
            db.run(query, err => {
                if (err) {
                    reject(err);
                }
                else {
                    db.close();
                    resolve(`EXECUTED QUERY ${query}`);
                }
            });
        });
    });
}
function delete_tables() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let table of tables) {
            yield runQuery(`DROP TABLE IF EXISTS ${table}`);
        }
    });
}
function create_tables() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let query of queriesExecutionOrder) {
            yield runQuery(query);
        }
    });
}
function deleteAndRecreateTables() {
    return __awaiter(this, void 0, void 0, function* () {
        yield delete_tables();
        yield create_tables();
    });
}
function truncateTables() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let table of tables) {
            yield runQuery(`DELETE FROM  ${table} `);
            console.log(table);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("EXECUTOU");
        runQuery("DROP TABLE test_table");
    });
}
main();
