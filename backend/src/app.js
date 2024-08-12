import path from "path";
import express from "express";
import session from "express-session";
import { fileURLToPath } from 'url';

import { AppDatabase } from "./utils/AppDatabase.js"
import {User} from "./models/User.js"
import {Clinic} from "./models/Clinic.js"
import {Procedure} from "./models/Procedure.js"

import sqlite3 from "sqlite3"
import { userInfo } from "os";
import { run } from "node:test";


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


const db_path = path.join(__dirname ,"..", "db", "database.sqlite")
const db = new sqlite3.Database(db_path, err => err? console.log("\nError when connecting to database") : console.log("\nConnected to Database"))

function run_query(db, sql, params) {
    return new Promise((resolve, reject) => {
        if (params) {
            db.run(sql,params, (err, result) => {
                err ? reject(err) : resolve(result)
            })
        }
        else {
            db.run(sql, (err, result) => {
                err ? reject(err) : resolve(result)
            })
        }
    })
}

function all_query(db, sql, params) {
    return new Promise((resolve, reject) => {
        if (params) {
            db.all(sql,params, (err, rows) => {
                err ? reject(err) : resolve(rows)
            })
        }
        else {
            db.run(sql, (err, rows) => {
                err ? reject(err) : resolve(rows)
            })
        }
    })
}

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret in production
    resave: false,
    saveUninitialized: true
  }));


const root_folder_path = path.dirname(__dirname)


app.post("/user/create", async (req, res)=>{
    // console.log(req.body)

    const dbPath = path.join("..", "db/database.sqlite")
    console.log(dbPath)
    const conn = new AppDatabase(dbPath)

    const current_date = new Date()
    const year = current_date.getFullYear();
    const month = String(current_date.getMonth() + 1).padStart(2, '0');
    const day = String(current_date.getDate()).padStart(2, '0');
    const hours = String(current_date.getHours()).padStart(2, '0');
    const minutes = String(current_date.getMinutes()).padStart(2, '0');
    const seconds = String(current_date.getSeconds()).padStart(2, '0');

    const current_date_string = `${year}-${month}-${day}`
    const current_datetime_string = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

    const query_params = [req.body.user_name, req.body.user_street, parseInt(req.body.user_address_number), req.body.zip_code,req.body.address_complement,req.body.user_email, req.body.user_type,req.body.user_code, current_datetime_string]
    
    const query_insert_user = `
        INSERT INTO 
            users (user_name, user_street, user_address_number, zip_code, address_complement, user_email, user_type, user_code, inserted_at) 
        VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ? )
    `
    try {
        // const db = await conn.connectToDataBaseReadAndWrite();
    
        db.run(query_insert_user, query_params, err => {
            if (err) {
                console.log(err)
                res.status(500)
                console.log("\nError during user insertion into database")
    
                // res.status(500).send("Error during user insertion into database")
            } else {
                // res.status(200).send('User successfully added to database.')
                res.status(200)
                console.log(('\nUser successfully added to database.'))
            }
        });
        
        db.close((closeErr) => {
            if (closeErr) {
                console.error("Error closing the database connection", closeErr);
            }
        });
        
    } catch (error) {
        console.error("Error connecting to the database", error);
        res.status(500).send("Error connecting to the database");
    }
        
})

app.post("/login", async (req, res) => {
    
    try {
        const {userEmail, userPassword} = req.body
        
        const userData = await all_query(db, "SELECT * FROM users WHERE user_email = ? LIMIT 1",[userEmail])
        
        const userObject = new User(userData[0])
        
        const userId = userData[0].user_id;

        req.session.userId = userId;
        req.session.user = userObject;

        // const userClinics = await all_query(db, "SELECT * FROM clinics WHERE user_id = ?",[userId])
        
        // console.log(UserInfo, userClinics)

        res.sendFile(path.join(__dirname,"views","home.html" ))
        
    } catch(error) {
        console.log("\n\n ERROR", error)
        res.end()
    }
    
})

app.get("/clinics", async (req, res) => {
    
    if(req.session.user.user_id) {
        const userClinics = await all_query(db, "SELECT * FROM clinics WHERE user_id = ?",[req.session.user.id])
        res.json({"userClinics":userClinics, "userId":req.session.user.user_id})
        
    }
    else {
        res.redirect("/")
    }
})



app.get("/", (req, res) => {

    console.log(path.dirname(__dirname))
    res.sendFile(path.join(root_folder_path, "src/views/register.html"))
})


const PORT = 5000
app.listen(PORT,()=>{
    console.log(`App rodando na porta http://localhost:${PORT}`)
})