const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


const ensureAuth = (req,res) =>{
    try{
        let receivedJWT =  req.headers['authorization']
        if(receivedJWT){
            console.log(receivedJWT);
        let decodedJWT = jwt.verify(receivedJWT, process.env.PRIVATE_KEY);
        return decodedJWT;
       }else{
        throw new ReferenceError('jwt must be provided')
       }
    }catch(err){
        console.log(err);

        return err
    }
}

module.exports = ensureAuth