const jwt = require("jsonwebtoken")
const { JWT_SECRET_ADMIN } = require("../config")

function adminMiddleware(req, res, next) {
    const token = req.headers.token 
    const decodeData = jwt.verify(token, JWT_SECRET_ADMIN)

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
    adminMiddleware : adminMiddleware
}