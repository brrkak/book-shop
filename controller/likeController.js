const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken')
const ensureAuth = require('../authorization/auth')

const addLike = (req,res)=>{
    let authorization = ensureAuth(req);
    if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": "로그인 세션 만료!"
        })
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다"
        })
    }else{ 
    let book_id = req.params.id
    
    let sql = 'INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)';
    let values = [authorization.id, book_id]
    conn.query(sql,values,(err,results) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end()
        }

        res.status(StatusCodes.OK).json(results)
    })
}
}
const removeLike = (req,res)=>{
    let authorization = ensureAuth(req);
    if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": "로그인 세션 만료!"
        })
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다"
        })
    }else{
        let book_id = req.params.id
        let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`
        let values = [authorization.id, book_id]
        conn.query(sql,values,(err,results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end()
            }
    
            res.status(StatusCodes.OK).json(results)
        })    
    }
}




module.exports = {addLike, removeLike};