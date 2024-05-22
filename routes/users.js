const express = require('express')
const router = express.Router()
router.use(express.json());

const {join,login,passwordResetReq,passwordReset} = require('../controller/UserController')

router.post('/join',join)
router.post('/login',login)
router.route('/reset') 
.post(passwordResetReq)
.put(passwordReset)


module.exports = router