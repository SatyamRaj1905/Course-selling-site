const { Router } = require("express");
const { AdminModel } = require("../db");
const { z } = require("zod")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const adminRouter = Router();
const JWT_SECRET_ADMIN = "Adminisgreat"
const saltRounds = 5;

adminRouter.post("/signup", async (req, res) => {
    // Input / ZOD validation
    const requireBody = z.object({
        email: z.string().max(100).min(3).email(),
        password: z.string().max(50).min(6),
        firstName: z.string(),
        lastName: z.string(),
    });

    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        res.json({
            message: "Incorrect Format",
            error: parsedDataWithSuccess.error,
        });
        return;
    }
    const { email, password, firstName, lastName } = req.body;

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
        await AdminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: " sign up failed ",
        });
        return;
    }
    // after hashing the password and then storing it to the database
    res.json({
        message: " You are signed up ",
    });
});

adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // first check only email if exists in database
    const findAdmin = await AdminModel.findOne({
        email: email,
    });

    if (!findAdmin) {
        res.status(403).json({
            message: "Admin Not found with this mail",
        });
        return;
    }

    // Now checking password exists or not
    const passwordCheck = await bcrypt.compare(password, findAdmin.password);
    if (passwordCheck) {
        const token = jwt.sign(
            {
                id: findAdmin._id,
            },
            JWT_SECRET_ADMIN
        );

        res.status(200).send({
            token: token,
            message: " You are Logged in ",
        });
        return;
    } else {
        res.status(403).json({
            message: " Incorrect Credentials ",
        });
        return;
    }
});

adminRouter.post("/create", (req, res) => {

});

adminRouter.put("/course", (req, res) => {});

adminRouter.get("/course/bulk", (req, res) => {});

module.exports = {
    adminRouter: adminRouter,
};
