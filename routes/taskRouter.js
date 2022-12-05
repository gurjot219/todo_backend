const express = require('express')
const { runQuery } = require('../dbHandler')
var currentUser = 1;
const taskRouter = express.Router()


taskRouter.get('/get',async (req,res)=>{
    try{
        const itemId = req.query.id
        const userId = req.query.user_id
        //console.log(itemId)
        if(itemId !== undefined){
            let query = "SELECT * FROM tasks WHERE task_id = ? and task_creator = ?;"
            let args = [itemId, userId]
            let response = await runQuery(query,args,1)
            res.json({
                status : true,
                data : response
            })

        }else{
            let query = "SELECT * FROM tasks where task_creator = ?;";
            let response = await runQuery(query,[userId],1)
            res.json({
                status : true,
                data : response
            })
        }
    }catch(e){
        res.json({
            status : false,
            error : e.message
        })
    }
})

taskRouter.post('/create',async (req,res)=>{
    try{
        let task = req.body.task
        let user_id = req.query.user_id
        //console.log(task)
        let query = " INSERT INTO `task_db`.`tasks` (`task_title`, `task_description`, `task_start_date`, `task_status`, `task_priority`, `task_creator`) VALUES (?,?,?,?,?,?);"
        let args = Object.values(task).map(v => {
            if(v == undefined || v == null) 
                return null
            else
                return v
        })
        args.push(user_id)
        await runQuery(query,args, 0)
        res.json({
            status : true,
        })
    }catch(e){
        console.log(e)
        res.json({
            status : false,
            error : e.message
        })
    }
})

taskRouter.post('/update',async (req,res)=>{
    console.log('here')
    try{
        const itemId = req.query.id
        const task = req.body.task
        if(itemId){
            let update_query = Object.keys(task).map(v => `${v}="${task[v]}"`).join(", ")
            console.log(update_query)
            let query = "Update tasks set "+update_query+" where `task_id` = ? and `task_creator` = ?;"
            let args = [itemId,req.query.user_id]
            await runQuery(query,args, 0)
            res.json({
                status : true,
            })
        }else{
            res.json({
                status : false,
                error : "update request must be accompanied with an id"
            })
        }
    }catch(e){
        res.json({
            status : false,
            error : e.message
        })
    }
})

taskRouter.delete('/delete',async (req,res)=>{
    try{
        const itemId = req.query.id
        if(itemId){
            let query = "delete FROM tasks WHERE task_id = ?;"
            let args = [itemId]
            await runQuery(query,args, 0)
            res.json({
                status : true,
            })
        }else{
            res.json({
                status : false,
                error : "delete request must be accompanied with an id"
            })
        }
    }catch(e){
        res.json({
            status : false,
            error : e.message
        })
    }
})
module.exports = { taskRouter }