async function getData(){
    
    const res = await fetch("/clinics")

    const {userClinics, userId} =  await res.json()

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
    `
    //define data
    const tabledata = userClinics;

    //Build Tabulator
    const table = new Tabulator("#example-table", {
        height:"311px",
        layout:"fitDataTable",
        reactiveData:true, //turn on data reactivity
        data:userClinics, //load data into table
        columns:[
            {title:"max_payment_fee", field:"max_payment_fee", editor:"number", formatter:"precision"},
            {title:"tax_rate", field:"tax_rate", editor:"input"},
            {title:"number_of_daily_work_hours", field:"number_of_daily_work_hours", editor:"input"},
            {title:"clinic_name", field:"clinic_name", editor:"input"},
        ],
    });

    table.on("dataChanged", function(data){
        //data - the updated table data
        document.getElementById("show_data").innerHTML = JSON.stringify(userClinics)
    });

    // //define data
    // var tabledata = [
    //     {id:1, name:"Oli Bob", progress:12, gender:"male", rating:1, col:"red"},
    //     {id:2, name:"Mary May", progress:1, gender:"female", rating:2, col:"blue" },
    //     {id:3, name:"Christine Lobowski", progress:42, gender:"female", rating:0, col:"green" },
    //     {id:4, name:"Brendon Philips", progress:100, gender:"male", rating:1, col:"orange" },
    //     {id:5, name:"Margret Marmajuke", progress:16, gender:"female", rating:5, col:"yellow"},
    // ];

    // //Build Tabulator
    // var table = new Tabulator("#example-table", {
    //     height:"311px",
    //     layout:"fitColumns",
    //     reactiveData:true, //turn on data reactivity
    //     data:tabledata, //load data into table
    //     columns:[
    //         {title:"Name", field:"name", sorter:"string", width:200, editor:"input"},
    //         {title:"Progress", field:"progress", sorter:"number", formatter:"progress"},
    //         {title:"Gender", field:"gender", sorter:"string"},
    //         {title:"Rating", field:"rating", formatter:"star", hozAlign:"center", width:100},
    //         {title:"Favourite Color", field:"col", sorter:"string"},
    //     ],
    // });

    //add row to bottom of table on button click
    document.getElementById("reactivity-add").addEventListener("click", function(){
        tabledata.push({});
        document.getElementById("show_data").innerHTML = JSON.stringify(userClinics)
    });

    //remove bottom row from table on button click
    document.getElementById("reactivity-delete").addEventListener("click", function(){
        tabledata.pop();
        document.getElementById("show_data").innerHTML = JSON.stringify(userClinics)
    });

    //update name on first row in table on button click
    // document.getElementById("reactivity-update").addEventListener("click", function(){
    //     tabledata[0].name = "IVE BEEN UPDATED";
    // });

    document.getElementById("show_data_button").addEventListener("click", ()=>{
        console.log(userClinics, Object.keys(userClinics).length)
    })

}

getData()