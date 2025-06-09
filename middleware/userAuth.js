const jwt = require("jsonwebtoken")
const { JWT_SECRET_USER } = require("../config")

function userMiddleware(req, res, next) {
    const token = req.headers.token 
    const decodeData = jwt.verify(token, JWT_SECRET_USER)

    if(decodeData){
        req.userId = decodeData.id
        next()
    }else{
        res.status(403).json({
            message : " Token Error ",
        })
    }
    
}

module.exports = {
    userMiddleware : userMiddleware
}