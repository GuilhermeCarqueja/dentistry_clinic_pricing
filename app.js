const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(
    './db/database.sqlite',
    err => {
        if (err){
            console.log(err)
        }
        console.log("Connected to the database")
    }
)

// db.run("CREATE TABLE IF NOT EXISTS test_table(id INT, name VARCHAR(14))")

// db.run("INSERT INTO test_table VALUES(1,'teste') ")


function run_query(sql,params=[]) {
    
    pr = new Promise(
        (resolve,reject)=>{
            const query_results = [];

            db.all(sql, params, (err, rows)=>{
                rows.forEach(row=>{query_results.push(row)})
                resolve(query_results);
            });

        }
    )

    return pr

}


async function testa(){
    resultado = await run_query("SELECT * FROM test_table")

    console.log(resultado)
}

testa()






