const express = require('express')
const router = express.Router()
router.use(express.json());
const {body,param} = require('express-validator')
const validate = require('./valdate/validate')

const {addOrder, getOrder, orderDetail} = require('../controller/OrderController')

router.route('/')
.post(addOrder) 
.get(getOrder)

router.get('/:order_id', orderDetail)



module.exports = router