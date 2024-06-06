const express = require('express')
const router = express.Router()
router.use(express.json());
const {addLike, removeLike} = require('../controller/likeController')


router.route('/:id')
.post(addLike) // 좋아요 추가
.delete(removeLike) // 좋아요 삭제


module.exports = router