const express = require('express')
const router = express.Router()
const {body,param} = require('express-validator')
const validate = require('./valdate/validate')
router.use(express.json());

const {join,login,passwordResetReq,passwordReset} = require('../controller/UserController')




router.post('/join',[
    body('username').notEmpty().isString().withMessage('이름 형식 오류!'),
    body('email').notEmpty().isEmail().withMessage('이메일 형식 오류!'),
    body('password').notEmpty().withMessage('패스워드 형식 오류!'),
    validate
],join)
router.post('/login',login)
router.route('/reset') 
.post(passwordResetReq)
.put(passwordReset)


module.exports = router