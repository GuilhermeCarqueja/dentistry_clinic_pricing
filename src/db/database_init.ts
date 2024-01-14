import { Database, sqlite3 } from "sqlite3"
import { AppDatabase } from "./AppDatabase.js"

/* 
According to the SQLite documentation:

The AUTOINCREMENT keyword imposes extra CPU, memory, disk space, and disk I/O overhead and should be avoided if not strictly needed. It is usually not needed.

In SQLite, a column with type INTEGER PRIMARY KEY is an alias for the ROWID (except in WITHOUT ROWID tables) which is always a 64-bit signed integer.

On an INSERT, if the ROWID or INTEGER PRIMARY KEY column is not explicitly given a value, then it will be filled automatically with an unused integer, usually one more than the largest ROWID currently in use. This is true regardless of whether or not the AUTOINCREMENT keyword is used. 
*/
const appDatabase = new AppDatabase();

const QUERY_CREATE_USERS_TABLE: string = `
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
`

const QUERY_CREATE_CLINICS_TABLE: string = `
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
`

const QUERY_CREATE_RECURRENT_EXPENSES_TABLE: string = `
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
    `
const QUERY_CREATE_PROCEDURES_LIST_TABLE: string = `
CREATE TABLE IF NOT EXISTS 
procedures_list (
    list_id INT PRIMARY KEY,
    list_name VARCHAR(200) NOT NULL,
    clinic_id INT,
    inserted_at TEXT NOT NULL,
    FOREIGN KEY(clinic_id) REFERENCES clinics(clinic_id)
    )
    `
        
const QUERY_CREATE_PROCEDURES_TABLE: string = `
CREATE TABLE IF NOT EXISTS 
procedures (
    procedure_id INT PRIMARY KEY,
    investment_fee FLOAT NOT NULL,
    procedure_tax FLOAT NOT NULL,
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
    `

const QUERY_CREATE_MATERIALS_TABLE: string = `
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
`

const QUERY_CREATE_PROCEDURE_MATERIALS_TABLE: string = `
CREATE TABLE IF NOT EXISTS 
procedure_materials (
    procedure_id INT,
    material_id INT,
    unit VARCHAR(10) NOT NULL,
    inserted_at TEXT NOT NULL,     
    FOREIGN KEY(material_id) REFERENCES materials(material_id),
    FOREIGN KEY(procedure_id) REFERENCES procedures(procedure_id)
    )
`

const queriesExecutionOrder: Array<string> = [
    QUERY_CREATE_USERS_TABLE,
    QUERY_CREATE_CLINICS_TABLE,
    QUERY_CREATE_PROCEDURES_TABLE,
    QUERY_CREATE_PROCEDURES_LIST_TABLE,
    QUERY_CREATE_MATERIALS_TABLE,
    QUERY_CREATE_RECURRENT_EXPENSES_TABLE,
    QUERY_CREATE_PROCEDURE_MATERIALS_TABLE,
]

const tables: Array<string> = [
    'users',
    'clinics',
    'procedures_list',
    'materials',
    'clinic_current_expenses',
    'procedure_materials',
    'procedures',
]
            
async function runQuery(query: string): Promise<string>{
    const db = await appDatabase.connectToDataBaseReadAndWrite();
    return new Promise((resolve,reject)=>{
        db.run(query,err=>{
            if (err){
                reject(err)
                }
            else {
                db.close()
                resolve(`EXECUTED QUERY ${query}`)
            }
        })
    })
}

async function delete_tables(): Promise<void>{
    
    for(let table of tables) {
        await runQuery(`DROP TABLE IF EXISTS ${table}`)
    }
    
}

async function create_tables(): Promise<void>{
    for(let query of queriesExecutionOrder){
        await runQuery(query);
    }
}

async function main(): Promise<void>{
    await delete_tables();
    await create_tables();
    
}


main()
