const express = require('express')
const router = express.Router()
router.use(express.json());
const conn = require('../mariadb')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const {StatusCodes} = require('http-status-codes')

// 도서 전체 조회
router.get('/',((req,res)=>{
    let sql = 'SELECT * FROM books'
    conn.query(sql,(err,results) => {
        res.status(StatusCodes.OK).json(results)
    })
    
})) 

// 개별 도서 조회
router.get('/:bookId',((req,res)=>{
    let {bookId} = req.params
    bookId = parseInt(bookId)
    let sql = 'SELECT * FROM books WHERE id = ?'
    conn.query(sql,bookId,(err,results) => {
       res.status(StatusCodes.OK).json(results)
    })
    
}))

// 카테고리별 도서 조회
router.get('/category/:categoryId',((req,res)=>{
    let {categoryId} = req.params
    categoryId = parseInt(categoryId)
    let sql = 'SELECT * FROM books WHERE category_id = ?'    
    conn.query(sql,categoryId,(err,results) => {
        res.status(StatusCodes.OK).json(results)
    })
}))



module.exports = router