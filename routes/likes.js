const express = require('express')
const router = express.Router()
const {StatusCodes} = require('http-status-codes')
const conn = require('../mariadb')
router.use(express.json());

// 좋아요 추가
router.route('/:bookId')
.post(((req,res)=>{
    let {bookId} = req.params
    bookId = parseInt(bookId)
    
    conn.query()
    res.status(StatusCodes.OK).json({message : '좋아요 추가 완료'})
}))
.delete(((req,res)=>{ // 좋아요 삭제
    let {bookId} = req.params
    bookId = parseInt(bookId)

    res.status(StatusCodes.OK).json({message : '좋아요 삭제 완료'})
}))


module.exports = router