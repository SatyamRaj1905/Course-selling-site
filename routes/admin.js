const { Router } = require("express")
const { AdminModel } = require("../db")
const bcrypt = require("bcrypt")

const adminRouter = Router()
const saltRound = 5

adminRouter.post("/signup", (req, res) => {
    const username = req.body.username
    const password = req.body.password


    
})

adminRouter.post("/login", (req, res) => {

})

adminRouter.post("/create", (req, res) => {
    
})

adminRouter.put("/course", (req, res) => {

})

adminRouter.get("/course/bulk", (req, res) => {

})

module.exports = {
    adminRouter : adminRouter
}