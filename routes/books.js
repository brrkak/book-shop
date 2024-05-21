const express = require('express')
const router = express.Router()
router.use(express.json());
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// 도서 전체 조회
router.get('/',((req,res)=>{
    res.status(200).json({message : "도서 전체 조회"})

})) 

// 개별 도서 조회
router.get('/:book_id',((req,res)=>{
    res.status(200).json({message : "HelloWorld"})
}))

// 카테고리별 도서 조회
router.get('/:category_id',((req,res)=>{
    res.status(200).json({message : "HelloWorld"})

}))



module.exports = router