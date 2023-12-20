const AppDatabase = require("./AppDatabase");


const _db = new AppDatabase();
async function connect(){
    const db = await _db.connectToDataBaseReadOnly()
}

connect()