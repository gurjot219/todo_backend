const { runQuery } = require('./dbHandler')
const md5 = require('md5')


const register = async(username,password) => {
    try{
        if(username === ""){
            return {status : false, error: "username cannot be empty"}
        }
        if(password === ""){
            return {status : false, error: "password cannot be empty"}
        }
        const query = "insert into users (`username`,`password`) values (?,?);"
        const response = await runQuery(query,[username, md5(password)], 0)
        return {status : true}
    }catch(e){
        return {status : false, error : e.message}
    }
    

}
const login = async (username, password)=>{
    try {
        const query = "select user_id from users where username=? and password=?;"
        const response = await runQuery(query,[username, md5(password)], 1)
        console.log(username,password,md5(password))
        console.log(response)
        if(response.length == 1){
            console.log('login successful')
            return {status : true, user_id : response[0]["user_id"]}
        }
        else{
            return {status : false, error: "Username/password is wrong"}
        }
    } catch (error) {
        return {status : false, error : error.message}
    }
}

const sessionChecker = (req, res, next) => {    
    console.log(`Session Checker: ${req.session.id}`.green);
    console.log(req.session);
    if (req.session.profile) {
        console.log(`Found User Session`.green);
        next();
    } else {
        console.log(`No User Session Found`.red);
        res.redirect('/login');
    }
};

module.exports = { sessionChecker, login, register }