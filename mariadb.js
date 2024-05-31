// Get the client
  const mariadb = require('mysql2/promise');
  // Create the connection to database
      
 const connection= async()=>{
  const conn = await mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bookshop',
    dateStrings : true,
  })

 }
  
module.exports = connection