const conn = require('../mariadb')
const {StatusCodes} = require('http-status-codes')
const ensureAuth = require('../authorization/auth')
const jwt = require('jsonwebtoken')

const allBooks = (req,res)=>{
    let allBooksRes={

    }
    let {category_id, recentbooks, limit, currentPage} = req.query
    // limit : 페이지 당 도서 수  ex. 3
    // currentPage : 현재 몇 페이지 ex. 1,2,3 ...
    // offset :                        0,3,6 ...    
    //                                 limit(currnetPage-1) 
    let offset = limit * (currentPage -1)
    let sql =`SELECT SQL_CALC_FOUND_ROWS *, 
    (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes FROM books `  
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
    sql += ' LIMIT ? OFFSET ?';
    values.push(parseInt(limit),offset);
    conn.query(sql,values,(err,results) =>{
        if(err){
            console.log(err);
        }
        console.log(results);
        if(results){
            allBooksRes.books = results
        }else{
            return res.status(StatusCodes.NOT_FOUND).end()
        }
    })

    sql = `SELECT found_rows()`;
    conn.query(sql,(err,results) => {
        if(err){
            console.log(err);
            res.status(StatusCodes.BAD_REQUEST).end()
        }
        let pagination = {};
        pagination.currentPage = parseInt(currentPage);
        pagination.totalCount = results[0]['found_rows()'];

        allBooksRes.pagination = pagination
        return res.status(StatusCodes.OK).json(allBooksRes)
        
    })          
    }


const bookDetail = (req,res)=>{
    // 로그인 상태가 아니면 => liked 빼고 보내줌.
    // 로그인 상태이면  => liked 넣고 보내줌.
    let authorization = ensureAuth(req,res)
    
    if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": "로그인 세션 만료!"
        })
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다"
        })
    }else if(authorization instanceof ReferenceError) {
        let {bookId} = req.params
        let values = [bookId]
        let sql = `SELECT *,
                    (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes
                    FROM books
                    LEFT JOIN category 
                    ON books.category_id = category.category_id
                    WHERE books.id = ?`

        conn.query(sql,values,(err,results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end()
            }if(results[0]){
                return res.status(StatusCodes.OK).json(results[0])
            }else{
                return res.status(StatusCodes.NOT_FOUND).end()
            }
        })
    }else{
        let {bookId} = req.params
        let values = [bookId, bookId]
        let sql = `SELECT *,
        (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes,
        (SELECT EXISTS (SELECT * FROM likes WHERE user_id =? AND liked_book_id =?)) `
    
        if(authorization){
            sql +=  ` AS liked FROM books
            LEFT JOIN category ON books.category_id = category.category_id
            WHERE books.id = ?`;
            values.unshift(authorization.id)
        }
        conn.query(sql,values,(err,results) => {
            if(err) return res.status(StatusCodes.BAD_REQUEST).end()
            if(results[0]){
                return res.status(StatusCodes.OK).json(results[0])
            }else{
                return res.status(StatusCodes.NOT_FOUND).end()
            }
        })
    }
}



module.exports = {bookDetail,allBooks}