const express = require('express')
const router = express.Router()
router.use(express.json());
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

router.get('/', (req,res)=>{
    res.status(200).json({message : "HelloWorld"})
})


router.post('/join',(req,res) => {
    let {email,password} = req.body

    res.status(201).json({
        email : `${email}`,
        password : `${password}`
    })
})

router.post('/login',(req,res) => {
    let {email,password} = req.body
    let loginUser = []
    res.status(200).json({
        email : `${email}`,
        password : `${password}`
    })
})

router.route('/reset') 
.post((req,res) => {
    let {email} = req.body

    res.status(200).json({
        email : `${email}`
    })
})
.put((req,res) => {
    let {password} = req.body

    res.status(200).json({
        password : `${password}`
    })
})


module.exports = router