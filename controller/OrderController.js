const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
// const conn = require('../mariadb')
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
    let sql = 'INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)'
    let delivery_id;
    let order_id;

    let values = [delivery.address, delivery.receiver, delivery.contact]
    let [results, fields] = await conn.query(sql,values)
    delivery_id = results.insertId
    await conn.end()


    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`
    values = [firstBookTitle, totalQuantity, totalPrice ,user_id , delivery_id]
       
    [results, fields] = await conn.execute(sql,values)
    order_id = results.insertId
    await conn.end()



    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`
    values= [];
    items.forEach((item)=> {
            values.push([order_id, item.book_id, item.quantity])
        }
    )
    [results, fields] = await conn.execute(sql,[values])
    order_id = results.insertId
    await conn.end()
})



    const getOrder = ((req,res)=>{ // 주문내역 조회
    conn.query(sql, (err,results) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        return  res.status(StatusCodes.OK).json(results)
    })
})
const orderDetail = ((req,res)=>{ //주문 상세 상품 조회
    conn.query(sql, (err,results) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        return res.status(StatusCodes.OK).json(results)
    })
})


module.exports = {addOrder, getOrder, orderDetail}