const express = require('express')
const router = express.Router()
router.use(express.json());
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

router.route('/')
.post(((req,res)=>{ // 주문 등록
    let {bookId, count} = req.body
    res.status(200).json({message : "HelloWorld"})

})) 
.get(((req,res)=>{ // 주문내역 조회
    res.status(200).json({message : "HelloWorld"})
}))

router.get('/:order_id',((req,res)=>{ //주문 상세 상품 조회
    res.status(200).json({message : "HelloWorld"})
}))



module.exports = router