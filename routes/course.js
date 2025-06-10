const { Router } = require("express")
const { CourseModel } = require("../db")
const { PurchaseModel } = require("../db")
const { userMiddleware } = require("../middleware/userAuth")

const courseRouter = Router()

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    const userId = req.userId  // as ye to tmko middlware se mil rha h na to body me kyu daloge VERY VERY IMPORTANT POINT
    const courseId = req.body.courseId

    // use the check here that did user has already bought the course if yes then why it is again buying
    // simply saying that whether they have paid for the course previously
    await PurchaseModel.create({
        userId : userId,
        courseId : courseId
    })

    res.json({
        message : "You have successfully bought this course",
        courseId : courseId
    })

})

courseRouter.get("/preview", async (req, res) => {
    const courses = await CourseModel.find({})

    res.json({
        courses
    })
    return 
})

module.exports = {
    courseRouter : courseRouter
}

