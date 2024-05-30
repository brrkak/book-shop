const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const conn = require('../mariadb')
const {StatusCodes} = require('http-status-codes')


const addOrder = ((req,res)=>{ // 주문 등록
    let {items, delivery, totalQuantity, firstBookTitle, totalPrice , user_id} = req.body
    let sql = 'INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)'
   let delivery_id = 5;
    let order_id= 2
    let values = [delivery.address, delivery.receiver, delivery.contact]
    // conn.query(sql,values,(err,results) => {
    //     if(err){
    //         console.log(err);
    //         return res.status(StatusCodes.BAD_REQUEST).end()
    //     }
    //     delivery_id = results.insertId 
    //     return res.status(StatusCodes.OK).json(results)
    // }) 


    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
            VALUES (?, ?, ?, ?, ?)`
    values = [firstBookTitle, totalQuantity, totalPrice ,user_id , delivery_id]
    //     conn.query(sql,values,(err,results) => {
    //     if(err){
    //         console.log(err);
    //         return res.status(StatusCodes.BAD_REQUEST).end()
    //     }
    //     order_id = results.insertId 
    //     console.log(order_id);
    //     return res.status(StatusCodes.OK).json(results)
    // })
    
    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`
    values= [];
    items.forEach((item)=> {
            values.push([order_id, item.book_id, item.quantity])
            console.log(values);
        }
    )

    conn.query(sql,[values],(err,results) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        order_id = results.insertId 
        console.log(order_id);
        return res.status(StatusCodes.OK).json(results)
    })
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