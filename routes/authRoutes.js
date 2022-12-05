const express = require('express')
const { login, register } = require('../authHandler')
const authRouter = express.Router()


authRouter.post('/login',async (req,res) => {
    let {username, password} = req.body.creds
    const response = await login(username,password)
    res.json(response)
})

authRouter.post('/register',async (req,res)=>{
    let {username, password} = req.body.creds
    const response = await register(username,password)
    res.json(response)
})

module.exports = {authRouter}


