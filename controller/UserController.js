
const conn = require('../mariadb')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const crypto = require('crypto') // crypto 모듈 : 암호화

const join = (req,res) => {
    let {username,email,password} = req.body
    let sql = "INSERT INTO users (username,email,password,salt) VALUES (?,?,?,?)"

    // 패스워드 암호화
    const salt = crypto.randomBytes(10).toString('base64')
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64')
    // 회원가입 시 비밀번호를 암호화해서 암호화된 비밀번호와 salt값을 저장
    
    let values = [username,email,hashPassword,salt]
    conn.query(sql,values,(err,results) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end()
        }else{
            res.status(StatusCodes.CREATED).json({
                email : `${email}`,
                password : `${password}`
            })
        }
    })
}

const login = (req,res) => {
    let {email,password} = req.body
    let sql = 'SELECT * FROM users WHERE email = ?'
    conn.query(sql,email,(err,results) => {
        if(err) return res.status(StatusCodes.BAD_REQUEST).end()
                
        let loginUser = results[0]
        // 로그인 시, 이메일&비밀번호(날 것) => salt값을 꺼내서 비밀번호 암호화 해보고 
        const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64')
        console.log(loginUser);
        // => 디비 비밀번호랑 비교


        if(loginUser && loginUser.password == hashPassword){
            const token = jwt.sign({
                id : loginUser.id,
                email:loginUser.email,
            }, process.env.PRIVATE_KEY, {
                expiresIn : '1m',
                issuer : 'janghoon'
            })
            res.cookie('token', token, {
                httpOnly : true
            })
            console.log(token);
            res.status(StatusCodes.OK).json({
                message : `${loginUser.username}님 로그인 되었습니다.`,
            })
        }else{
            res.status(StatusCodes.UNAUTHORIZED).json({ 
                message :`회원님의 비밀번호 또는 이메일을 다시 확인해주세요. `
            })
        }
    })
    

}

const passwordResetReq = (req,res) => {
    let {email} = req.body
    let sql = 'SELECT * FROM users WHERE email = ?'

    conn.query(sql,email,
        (err,results) =>{
        if(err){
          return res.status(StatusCodes.BAD_REQUEST).end()
        }
        const user = results[0]
        if(user){
            return res.status(StatusCodes.OK).json({
                email : email
            })
        }else{
            return res.status(StatusCodes.UNAUTHORIZED).end()
        }
    })
}

const passwordReset = (req,res) => {
    let {email,password} = req.body
    
    const salt = crypto.randomBytes(10).toString('base64')
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64')

    let sql = `UPDATE users SET password=?, salt=?
                WHERE email = ?`
    let values = [hashPassword,salt,email]
    conn.query(sql,values,
        (err,results) =>{
        if(err){
            console.log(err);
          return res.status(StatusCodes.BAD_REQUEST).end()
        }
        if(results.affectedRows==1){
            return res.status(StatusCodes.OK).json(results)
        }else{
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
    })  
}

module.exports = {join,login,passwordResetReq,passwordReset}