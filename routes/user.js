const { Router } = require("express")
const { UserModel } = require("../db")
const { z } = require("zod")
const bcrypt = require("bcrypt")

const userRouter = Router();
const saltRounds = 5

// let errorThrown = false;
userRouter.post("/signup", async (req, res) => {

    
    // Input / ZOD validation
    const requireBody = z.object({
        email : z.string().max(100).min(3).email(),
        password : z.string().max(50).min(6),
        firstName : z.string(),
        lastName : z.string()
    })
    
    const parsedDataWithSuccess = requireBody.safeParse(req.body)
    if(!parsedDataWithSuccess.success){
        res.json({
            message : "Incorrect Format",
            error : parsedDataWithSuccess.error,
        })
        return
    }
    const { email, password, firstName, lastName } = req.body

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    try {
        await UserModel.create({
            email : email,
            password : hashedPassword,
            firstName : firstName,
            lastName : lastName
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            message : " sign up failed "
        })
        return       
    }
    // after hashing the password and then storing it to the database
    res.json({
        message : " You are signed up ",

    });   
});

userRouter.post("/login", (req, res) => {


})

userRouter.get("/purchases", (req, res) => {

})

module.exports = {
    userRouter : userRouter
}