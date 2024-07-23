import path from "path";
import { AppDatabase } from "./utils/AppDatabase.js"
import express from "express";
import { fileURLToPath } from 'url';
// const express = require("express")
// const path = require("path")

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))


const root_folder_path = path.dirname(__dirname)


app.post("/user/create", async (req, res)=>{
    // console.log(req.body)
    const conn = new AppDatabase(path.join(root_folder_path, "db/database.sqlite"))

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
        const db = await conn.connectToDataBaseReadAndWrite();
    
        db.run(query_insert_user, query_params, err => {
            if (err) {
                console.log(err)
                res.status(500).send("Error during user insertion into database")
            } else {
                res.status(200).send('User successfully added to database.')
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

app.get("/", (req, res) => {

    console.log(path.dirname(__dirname))
    res.sendFile(path.join(root_folder_path, "src/views/register.html"))
})

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`App rodando na porta http://localhost:${PORT}`)
})