const express = require('express')
const cors = require('cors')
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const { sessionChecker } = require('./authHandler')
const { taskRouter } = require('./routes/taskRouter')
const { initDB } = require('./dbHandler')
const { authRouter } = require('./routes/authRoutes')

const app = express()
const PORT = 3001
app.use(cors())

// app.use(cookieParser())
// app.use(sessions({
//     secret : "TOP_SECRET_KEY",
//     saveUninitialized : true,
//     cookie: {maxAge : 3600*24*1000},
//     resave : false
// }))
app.use(express.json({
    extended : true
}));

app.use('/auth',authRouter)
app.use('/tasks',taskRouter);

app.get('/test',(req,res)=>{
    res.send("it works")
})
app.listen(PORT,async (req,res)=>{
   try{
        await initDB()
        console.log(`Server is running at port ${PORT}`)
   }catch(e){
        console.log(e)
   }
})