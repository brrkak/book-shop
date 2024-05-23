const conn = require('../mariadb')
const {StatusCodes} = require('http-status-codes')

const allCategory = (req,res) => {
    let sql = 'SELECT * FROM category'  

    conn.query(sql,(err,results) => {
        if(err) return res.status(StatusCodes.BAD_REQUEST).end()
        
        if(results.length){
           return res.status(StatusCodes.OK).json(results)
        }else{
           return res.status(StatusCodes.NOT_FOUND).end()
        }
    })
}



module.exports = allCategory