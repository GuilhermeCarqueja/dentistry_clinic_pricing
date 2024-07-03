import path from "path";
import { AppDatabase } from "./utils/AppDatabase.js"
import {main} from "./utils/database_init.js"
import express, { Request, Response, Express } from "express";

// main()

const app:Express = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))


const root_folder_path: string = path.dirname(__dirname)

app.get("/", (req:Request, res:Response) => {

    console.log(path.dirname(__dirname))
    res.sendFile(path.join(root_folder_path, "src/views/register.html"))
})

app.post("/user/create", async (req:Request, res:Response)=>{
    console.log(req.body)
})


app.listen(5000)