const express = require('express')
const router = express.Router()
router.use(express.json());
const {addToCart, getCartItems, removeCartItem, userAddCartItems} = require('../controller/CartController')
const {body,param} = require('express-validator')
const validate = require('./valdate/validate')
router.route('/')
.post(addToCart)
.get(getCartItems)
router.delete('/:id', removeCartItem)



module.exports = router