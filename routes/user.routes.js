const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");


const userRouter = express();

userRouter.post("/register",(req,res)=>{
    const {username,email,password} = req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(400).send(err.message)
            }
            else{
                const user = new UserModel({
                    username,
                    email,
                    password:hash
                })
                await user.save();
                res.status(200).send({"msg":"New user has beeb registerd ","new_user":user});
            }
        })
        
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const authToken =jwt.sign({username:user.username,userId:user._id},"authToken");
                    res.status(200).send({"msg":"user has been login successful!","authToken":authToken}) 
                }
                else{
                    res.status(400).send({"err":err.message});
                }
            })
        }
        
    } catch (error) {
        res.status(400).send(error);
        
    }
})

module.exports={userRouter}