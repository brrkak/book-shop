const jwt = require('jsonwebtoken')
const conn = require('../mariadb')
const {StatusCodes} = require('http-status-codes')
const ensureAuth = require('../authorization/auth')

const addToCart = (req,res)=>{ // 장바구니 담기
    let authorization = ensureAuth(req,res)
    if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": "로그인 세션 만료!"
        })
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다"
        })
    }else{
        let {book_id, quantity} = req.body
        let values = [book_id, quantity, authorization.id]
        let sql = 'INSERT INTO cartitems (book_id, quantity, user_id) VALUES (?,?,?)'  
    
        conn.query(sql,values,(err,results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end()
            }
            if(results.affectedRows == 1){
               return res.status(StatusCodes.OK).json(results)
            }else{
               return res.status(StatusCodes.NOT_FOUND).end()
            }
        })
    }



}


const getCartItems = (req,res)=>{ // 장바구니 조회 / 선택된 장바구니 아이템 목록 조회
    let authorization = ensureAuth(req,res)
    if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": "로그인 세션 만료!"
        })
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다"
        })
    }else{
        let {selected} = req.body
        let sql = `SELECT cartitems.id, book_id, quantity, books.title, summary, price 
        FROM cartitems LEFT JOIN books ON cartitems.book_id = books.id
        WHERE user_id = ?`
        let values = [authorization.id]

        if(selected){
            sql += ` AND cartItems.id IN (?)`
            values.push(selected)
        }
        

        conn.query(sql,values,(err,results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end()
            }
            if(results.length){
                return res.status(StatusCodes.OK).json(results)
            }
        })
    }   
}

    



const removeCartItem = (req,res)=>{
    let authorization = ensureAuth(req,res)

    if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": "로그인 세션 만료!"
        })
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다"
        })
    }else{
        let cartItemId = req.params.id
        let sql = `DELETE FROM cartitems 
                    WHERE cartitems.id = ?`  
        conn.query(sql,cartItemId,(err,results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end()
            }
            if(results.affectedRows == 1){
            return res.status(StatusCodes.OK).json(results)
            }else{
            return res.status(StatusCodes.NOT_FOUND).end()
            }
        })
}}


module.exports = {addToCart, getCartItems, removeCartItem}