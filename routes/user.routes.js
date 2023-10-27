const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const { username, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res.status(200).send({ "error": "not able to generate hash", "error": err });
      } else {
        const user = new UserModel({
          username,
          email,
          pass: hash,
        });
        await user.save();
        res.status(200).send({ "msg": "The new user has been registerd", "new_user": req.body });
      }
    });
  } catch (error) {
    res.status(400).send({"error": error });
  }
});


userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, function (err, result) {
        if (result) {
          const token = jwt.sign({username:user.username,userId:user._id} , "masai")
          res.status(200).send({ "msg": "Login Sucessfull!" , "token": token});
        } else {
          res.status(200).send({"msg":"Wrong Credentials" });
        }
      });
    } else {
      res.status(200).send({ "msg": "User does not exist" });
    }
  } catch (error) {
    res.status(400).send({ "error": error });
  }
});




module.exports = { userRouter };
 