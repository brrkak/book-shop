const conn = require('../mariadb')
const {StatusCodes} = require('http-status-codes')



const allBooks = (req,res)=>{
    let {category_id, recentbooks, limit, currentPage} = req.query
    // limit : 페이지 당 도서 수  ex. 3
    // currentPage : 현재 몇 페이지 ex. 1,2,3 ...
    // offset :                        0,3,6 ...    
    //                                 limit(currnetPage-1) 
    let offset = limit * (currentPage -1)
    let sql ='SELECT *, (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes FROM books '  
    let values = [];
    if(category_id && recentbooks){
        sql += `WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW()`
        console.log(sql);
        values=[category_id, recentbooks];
    }
    else if(category_id){
        sql += 'WHERE category_id = ?';
        values = [category_id]
    }else if (recentbooks){
        sql += 'WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW()'
    }
    sql += `LIMIT ?,?`
    values.push(offset,parseInt(limit))
  
    conn.query(sql,values,(err,results) => {

            if(err){
             console.log(err);
                res.status(StatusCodes.BAD_REQUEST).end()
            }
            if(results){
                return res.status(StatusCodes.OK).json(results)
            }else{
                return res.status(StatusCodes.NOT_FOUND).end()
            }
        })     
    }


const bookDetail = (req,res)=>{
    let {bookId} = req.params
    let {user_id} = req.body
    let values = [user_id,bookId, bookId]
    let sql = `SELECT *,
    (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes,
    (SELECT EXISTS (SELECT * FROM likes WHERE user_id =? AND liked_book_id =?)) 
    AS liked FROM books
    LEFT JOIN category ON books.category_id = category.category_id
    WHERE books.id = ?;`
    conn.query(sql,values,(err,results) => {
        if(err) return res.status(StatusCodes.BAD_REQUEST).end()
        if(results[0]){
            return res.status(StatusCodes.OK).json(results[0])
        }else{
            return res.status(StatusCodes.NOT_FOUND).end()
        }
    })
    
}



module.exports = {bookDetail,allBooks}