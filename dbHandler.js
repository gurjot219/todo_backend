const mysql = require('mysql2/promise')

const HOST = "capstone-1.cchfuganoafs.us-east-1.rds.amazonaws.com"
const DB_NAME = "task_db"
const USER = "admin"
const PASSWORD = "Secret55"
let db = null;

const initDB = async ()=>{
    db = await mysql.createConnection({
        user : USER,
        host : HOST,
        database : DB_NAME,
        password : PASSWORD,
    })
    console.log("Database initialized successfully")
}
//mode 0 -> insert, update, delete || mode 1 -> select
const runQuery = async(queryString,args,mode)=>{
    try{
        var [rows,_] = [null,null]
        if(!args){
            [rows,_] = await db.execute(queryString)
        }
        else{
            [rows,_] = await db.execute(queryString,args)
        }
        if(mode == 1){
            return rows
        }
        else if(mode == 0)
            return true
        else 
            return false;
    }catch(e){
        throw e
    }
}

const getDB = ()=>{
    return db;
}

const convertToJSON = ([rows,field])=>{
    let result = []
    for(var i = 0; i < rows.length; i++){
        let temp = {}
        for(var j = 0; j < field.length; j++){
            temp[field[j]["name"]] = rows[i][j]
        }
        result.push(temp)
    }
    return result
}
module.exports = { initDB, runQuery, getDB }
