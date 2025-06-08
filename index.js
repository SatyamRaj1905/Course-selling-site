const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

const app = express()
const JWT_SECRET = "satyamisgreat"

app.use(express.json())


// using Routing in express concept
app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/course", courseRouter)

async function main(){
    try {
        await mongoose.connect("mongodb+srv://ToxicSR383:Nahipata4@cluster0.f3fwmne.mongodb.net/backend-demo")
        app.listen(3000)
        console.log("Port listening")
        
    } catch (error) {
        console.log("Failed to connect to database",error);
    }
    
}

main()
