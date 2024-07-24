const express = require('express')
const router = express.Router()
router.use(express.json());
const allCategory = require('../controller/CategoryController')
const {body,param} = require('express-validator')
const validate = require('./valdate/validate')

// 카테고리 전체조회
router.get('/', allCategory) 





module.exports = router