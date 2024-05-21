const express = require('express')
const router = express.Router()
router.use(express.json());
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


router.route('/')
.post(((req,res)=>{ // 장바구니 담기
    let {bookId, count} = req.body
    res.status(200).json({message : "HelloWorld"})

})) 
.get(((req,res)=>{ // 장바구니 조회
    res.status(200).json({message : "HelloWorld"})
}))

// 장바구니에서 선택한 주문 예상 상품 목록 조회 
// router.get('/',((req,res)=>{
//     res.status(200).json({message : "HelloWorld"})

// }))

// 장바구니 삭제
router.delete('/:book_id',((req,res)=>{
    res.status(200).json({message : "HelloWorld"})

}))



module.exports = router