const sqlite3 = require('sqlite3').verbose()


const db = new sqlite3.Database(
    './database.sqlite',
    (err) => {
        if (err){
            console.log(err)
        }
        console.log("Connected to the database")
    }
)

module.exports = db

// async function connectToDatabase(){
//  return new Promise((resolve,reject)=>{
//     const db = new sqlite3.Database(
//         './database.sqlite',
//         (err) => {
//             if (err){
//                 console.log(err)
//             }
//             console.log("Connected to the database")
//         }
//     )
//     resolve(db)

//  })
    
// }
// module.exports = connectToDatabase
