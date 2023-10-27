const express = require("express");
const { PostModel } =  require("../model/post.model");
const { auth } =  require("../middleware/auth.middleware");

const postRouter = express.Router();

postRouter.use(auth)


postRouter.post("/create", (req, res) => {
  try {
    const newPost = new PostModel(req.body);
    newPost.save();
    res.status(200).send({ "msg": "Post added" });
  } catch (error) {
    res.status(400).send({ "error": error });
  }
});


postRouter.get("/", async(req, res) => {
  try {
    const data = await PostModel.find({username:req.body.username});
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({"error":err})
    
  }
 
});


postRouter.patch("/update/:id", async (req, res) => {
    let { id } = req.params;
    const post=await PostModel.findOne({_id:id})
    try {
      if(req.body.id==post.id){
        await PostModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send({"msg":`the product with id:${id} has been updated`})
      }else{
        res.status(200).send({"msg":"You are not authorised!"})
      }
        
    } catch (err) {
        res.status(400).send({ "error": err})
    }
})


postRouter.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  const post=await PostModel.findOne({_id:id})
  try {
    if(req.body.id==post.id){
      await PostModel.findByIdAndDelete({ _id: id });
      res.status(200).send({"msg":`the product with id:${id} has been deleted`})
    }else{
      res.status(200).send({"msg":"You are not authorised!"})
    }
      
  } catch (err) {
      res.status(400).send({ "error": err})
  }
})

module.exports = { postRouter };
