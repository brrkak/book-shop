const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const conn = require('../mariadb')
const {StatusCodes} = require('http-status-codes')

const addToCart = (req,res)=>{ // 장바구니 담기
    let {book_id, quantity, user_id} = req.body
    let values = [book_id, quantity, user_id]
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


const getCartItems = (req,res)=>{ // 장바구니 조회 / 선택된 장바구니 아이템 목록 조회
    let {user_id, selected} = req.body
    
    let sql =`SELECT cartitems.id, book_id, quantity, books.title, summary, price 
        FROM cartitems LEFT JOIN books ON cartitems.book_id = books.id
        WHERE user_id = ?
        AND cartItems.id IN (?)`

    let values = [user_id, selected]

        conn.query(sql,values,(err,results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end()
            }
            if(results.length){
               return res.status(StatusCodes.OK).json(results)
            }else{
               return res.status(StatusCodes.NOT_FOUND).end()
            }
        })
    
}


const removeCartItem = (req,res)=>{
    let {book_id} = req.params
    let sql = `DELETE FROM cartitems 
                WHERE cartitems.id = ?`  

    conn.query(sql,book_id,(err,results) => {
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

module.exports = {addToCart, getCartItems, removeCartItem}