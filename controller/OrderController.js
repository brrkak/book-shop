const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
// const connection = require('../mariadb')
const {StatusCodes} = require('http-status-codes')
const mariadb = require('mysql2/promise');


const addOrder = (async(req,res)=>{ // 주문 등록
    const conn =  await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'bookshop',
        dateStrings : true,
      })
    let {items, delivery, totalQuantity, firstBookTitle, totalPrice , user_id} = req.body
    let delivery_id;
    let order_id;
    let orderItems;

        let sql = 'INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)';
        let values = [delivery.address, delivery.receiver, delivery.contact];
        let [results] = await conn.execute(sql,values)
        delivery_id = results.insertId;
        console.log(delivery_id);
        console.log('delivery',results);       

        sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
         values = [firstBookTitle, totalQuantity, totalPrice ,user_id, delivery_id];
      
         [results] = await conn.execute(sql,values)
        console.log('orders',results);
        order_id = results.insertId;

        sql = 'SELECT book_id, quantity FROM cartItems WHERE book_id IN (?)';
        [orderItems, fields] = await conn.query(sql, [items]);

        sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
        values= [];
        orderItems.forEach(item => values.push([order_id, item.book_id, item.quantity]))
        results = await conn.query(sql,[values])
        
        let deleteResult = await deleteCartItems(conn,items);
        return res.status(StatusCodes.OK).json(deleteResult)
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

        let sql =  `SELECT orders.id, created_at,address, receiver, contact, 
                    book_title, total_quantity, total_price
                    FROM orders
                    LEFT JOIN delivery 
                    ON orders.delivery_id = delivery.id`
                    
        let [result,fields] =await conn.query(sql)
            return res.status(StatusCodes.OK).json(result);
})
const orderDetail = (async(req,res)=>{ //주문 상세 상품 조회
    const conn =  await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'bookshop',
        dateStrings : true,
      })
    let {order_id} = req.params
    let sql = `SELECT books.id, books.title , author, price, quantity
                FROM orderedbook
                LEFT JOIN books
                ON orderedbook.book_id = books.id
                WHERE order_id = ?`
    let [result,fields] =await conn.query(sql,order_id)
    return res.status(StatusCodes.OK).json(result);
})


module.exports = {addOrder, getOrder, orderDetail}