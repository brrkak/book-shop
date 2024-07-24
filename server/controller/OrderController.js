const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
// const connection = require('../mariadb')
const {StatusCodes} = require('http-status-codes')
const mariadb = require('mysql2/promise');
const ensuerAuth = require('../authorization/auth')


const addOrder = (async(req,res)=>{ // 주문 등록
    const conn =  await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'bookshop',
        dateStrings : true,
      })
      let authorization = ensuerAuth(req)
      if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": "로그인 세션 만료!"
        })
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다"
        })
    }else{
      
      let {items, delivery, totalQuantity, firstBookTitle, totalPrice} = req.body
      let delivery_id;
      let order_id;
      let orderItems;
  
      let sql = 'INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)';
      let values = [delivery.address, delivery.receiver, delivery.contact];
      let [results] = await conn.execute(sql,values)
      delivery_id = results.insertId;
  
      sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
      values = [firstBookTitle, totalQuantity, totalPrice ,authorization.id, delivery_id];
      [results] = await conn.execute(sql,values)
      order_id = results.insertId;
  
      sql = 'SELECT book_id, quantity FROM cartItems WHERE book_id IN (?)';
      [orderItems, fields] = await conn.query(sql, [items]);
  
      sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
      values= [];
      orderItems.forEach(item => values.push([order_id, item.book_id, item.quantity]))
      results = await conn.query(sql,[values])
      
      let deleteResult = await deleteCartItems(conn,items);
      return res.status(StatusCodes.OK).json(deleteResult)
    }

})

const deleteCartItems = async(conn, items) => {

  let sql = 'DELETE FROM cartItems WHERE id IN (?);'

  let [result,fields] =await conn.query(sql,[items])
  return result;
}



const getOrder = (async(req,res)=>{ // 주문내역 조회
    const conn =  await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'bookshop',
        dateStrings : true,
      })
      let authorization = ensuerAuth(req)
      if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": "로그인 세션 만료!"
        })
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다"
        })
    }else{
      let sql =  `SELECT orders.id, created_at,address, receiver, contact, 
      book_title, total_quantity, total_price
      FROM orders
      LEFT JOIN delivery 
      ON orders.delivery_id = delivery.id`
      
      let [result,fields] =await conn.query(sql)
      return res.status(StatusCodes.OK).json(result);
    }
})
const orderDetail = (async(req,res)=>{ //주문 상세 상품 조회
    const conn =  await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'bookshop',
        dateStrings : true,
      })
      let authorization = ensuerAuth(req)
      if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": "로그인 세션 만료!"
        })
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다"
        })
    }else{
    let {order_id} = req.params
    let sql = `SELECT books.id, books.title , author, price, quantity
                FROM orderedbook
                LEFT JOIN books
                ON orderedbook.book_id = books.id
                WHERE order_id = ?`
    let [result,fields] =await conn.query(sql,order_id)
    return res.status(StatusCodes.OK).json(result);
    }
})


module.exports = {addOrder, getOrder, orderDetail}