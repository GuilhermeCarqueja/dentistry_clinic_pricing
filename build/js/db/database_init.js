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
const AppDatabase_js_1 = require("./AppDatabase.js");
const appDatabase = new AppDatabase_js_1.AppDatabase();
const QUERY_CREATE_USERS_TABLE = `
    CREATE TABLE IF NOT EXISTS 
    users (
        user_id INT PRIMARY KEY,
        user_street VARCHAR(200) NOT NULL,
        user_address_numer INTEGER NOT NULL,
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
        clinic_id INT PRIMARY KEY,
        max_payment_fee FLOAT NOT NULL,
        tax_rate FLOAT NOT NULL,
        number_of_daily_work_hours INT NOT NULL,
        clinic_name VARCHAR (255) NOT NULL,
        number_of_chairs INT NO NULL,
        number_of_work_months FLOAT NOT NULL,
        user_id INT,
        iserted_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
`;
const QUERY_CREATE_PROCEDURES_LIST_TABLE = `
    CREATE TABLE IF NOT EXISTS 
    procedures_list (
        list_id INT PRIMARY KEY,
        list_name VARCHAR(200) NOT NULL,
        clinic_id INT,
        inserted_at TEXT NOT NULL,
        FOREIGN KEY(clinic_id) REFERENCES clinics(clinic_id)
    )
`;
const QUERY_CREATE_RECURRENT_EXPENSES_TABLE = `
    CREATE TABLE IF NOT EXISTS 
    clinic_current_expenses (
        expense_id INT PRIMARY KEY,
        expense VARCHAR(200) NOT NULL,
        clinic_id INT,
        expense_value DOUBLE NOT NULL,
        expense_frequency CHARACTER(1) NOT NULL,
        inserted_at TEXT NOT NULL,
        FOREIGN KEY(clinic_id) REFERENCES clinics(clinic_id)
    )
`;
const QUERY_CREATE_MATERIALS_TABLE = `
    CREATE TABLE IF NOT EXISTS 
    materials (
        material_id INT PRIMARY KEY,
        unit VARCHAR(10) NOT NULL,
        purchase_quantity FLOAT NOT NULL,
        purchase_cost float NOT NULL,
        clinic_id INT,
        inserted_at TEXT NOT NULL,
        FOREIGN KEY(clinic_id) REFERENCES clinics(clinic_id)
    )
`;
const QUERY_CREATE_PROCEDURES_TABLE = `
    CREATE TABLE IF NOT EXISTS 
    procedures (
        procedure_id INT PRIMARY KEY,
        investment_fee FLOAT NOT NULL,
        procedute_tax FLOAT NOT NULL,
        minimum_price FLOAT NOT NULL,
        professional_cost FLOAT NOT NULL,
        profit_margin FLOAT NOT NULL,
        precedure_max_payment_fee FLOAT NOT NULL,
        procedure_time FLOAT NOT NULL,
        procedure_time_cost FLOAT NO NULL,
        list_id INT,
        procedure_name VARCHAR(200) NOT NULL,
        final_price FLOAT NOT NULL,
        materials_cost NOT NULL,
        inserted_at TEXT NOT NULL,
        FOREIGN KEY(list_id) REFERENCES procedures_list(list_id)
    )
`;
const QUERY_CREATE_PROCEDURE_MATERIALS_TABLE = `
    CREATE TABLE IF NOT EXISTS 
    procedure_materials (
        procedure_id INT,
        material_id INT,
        unit VARCHAR(10) NOT NULL,
        inserted_at TEXT NOT NULL,     
        FOREIGN KEY(material_id) REFERENCES materials(material_id),
        FOREIGN KEY(procedure_id) REFERENCES procedures(procedure_id)
        )
    `;
const queriesExecutionOrder = [
    QUERY_CREATE_USERS_TABLE,
    QUERY_CREATE_CLINICS_TABLE,
    QUERY_CREATE_PROCEDURES_LIST_TABLE,
    QUERY_CREATE_MATERIALS_TABLE,
    QUERY_CREATE_RECURRENT_EXPENSES_TABLE,
    QUERY_CREATE_PROCEDURE_MATERIALS_TABLE,
    QUERY_CREATE_PROCEDURES_TABLE
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield delete_tables();
        yield create_tables();
    });
}
main();
