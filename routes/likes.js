const express = require('express')
const router = express.Router()
router.use(express.json());

// 좋아요 추가
router.post('/',((req,res)=>{
    res.status(200).json({message : "HelloWorld"})

}))

// 좋아요 삭제
router.delete('/:book_id',((req,res)=>{
    res.status(200).json({message : "HelloWorld"})
}))


module.exports = router