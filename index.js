require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

const app = express()

app.use(express.json())

// using Routing in express concept
app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/course", courseRouter)

async function main(){
    try {
        await mongoose.connect("process.env.MONGO_URI")
        app.listen(3000)
        console.log("Port listening")
        
    } catch (error) {
        console.log("Failed to connect to database",error);
    }
    
}

main()
