const express = require("express");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const app = express();
app.use(express.json());
const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/expressValidate");
};
// userSchema -->
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pincode: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "others"] },
});

const User = mongoose.model("user", userSchema);

app.post(
  "/users",
  body("firstName").not().isEmpty().withMessage("firstName is required"),
  body("lastName").not().isEmpty().withMessage("Lastname is required"),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("pincode")
    .not()
    .isEmpty()
    .withMessage("Pincode is required")
    .custom((value) => {
      const pin = /^[1-9][0-9]{5}$/;
      if (!value.match(pin)) {
        throw new Error("pincode invalid");
      }
      return true;
    }),
  body("age")
    .not()
    .isEmpty()
    .withMessage("Age is required")
    .isNumeric()
    .custom((value) => {
      if (value < 1 || value > 100) {
        throw new Error("Age must be in between 1 and 100");
      }
      return true;
    }),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(500).send({ error: error.array() });
      }
      const user = await User.create(req.body);
      return res.status(201).send({ user: user });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
);

app.listen(5000, async () => {
  try {
    await connect();
  } catch (error) {
    console.log(error);
  }
  console.log("listening on port 5000");
});
