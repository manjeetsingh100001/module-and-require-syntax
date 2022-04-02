const express = require("express");

const userController = require("./controller/user.controller")

const productController = require("./controller/product.controller")

const { body } = require('express-validator');

const {register,login} = require("./controller/authcontroller")

const app = express();

app.use(express.json());


app.use("/users", userController)

app.post("/register", register)

app.post("/login", login)

body("email").isEmail().withMessage("Email is not valid"),

body("password").not().isEmpty().withMessage("password required"),register;

app.use("/products", productController)



