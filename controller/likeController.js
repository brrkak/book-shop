const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const addLike = (req,res)=>{
    let {liked_book_id} = req.params
    liked_book_id = parseInt(liked_book_id)
    let {user_id} = req.body

    let sql = 'INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)';
    let values = [user_id, liked_book_id]
    conn.query(sql,values,(err,results) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end()
        }

        res.status(StatusCodes.OK).json(results)
    })    
}

const removeLike = (req,res)=>{ // 좋아요 삭제
    let {liked_book_id} = req.params
    liked_book_id = parseInt(liked_book_id)
    let {user_id} = req.body
    let values = [user_id,liked_book_id]
    let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`
    conn.query(sql,values,(err,results) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end()
        }

        res.status(StatusCodes.OK).json(results)
    })      

}


module.exports = {addLike, removeLike};