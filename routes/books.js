const express = require('express')
const router = express.Router()
router.use(express.json());

const {bookDetail,allBooks} = require('../controller/BookController')



// 도서 전체 & 카테고리 조회
router.get('/',allBooks) 

// 개별 도서 조회
router.get('/:bookId',bookDetail)




module.exports = router