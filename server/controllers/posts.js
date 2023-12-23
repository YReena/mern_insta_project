const mongoose = require('mongoose');
const { PostMessage } = require('../model/postMessage');


const getpost= async(req,res)=>{
    try{
        const postMessages =  await PostMessage.find();
        console.log(postMessages);
        res.status(200).json(postMessages);
    }
    catch(error){
     //res.send(404).json({"messsage":error.message});
    }
}
module.exports.getpost=getpost;

const createpost = async(req,res)=>{
  
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt:new Date().toISOString()});
    try{
    await newPost.save();
    console.log(newPost);
    res.status(201).json(newPost);

    }catch(error){
    res.status(201).json(newPost);
     
    }
    
}
module.exports.createpost= createpost;

const updatePost = async(req,res)=>{
    const {id:_id} = req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('no post with that id');

    const updatePost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
    res.status(201).json(updatePost);
}
module.exports.updatePost= updatePost;

const deletePost = async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send('no post with that id');
    }

    const del = await PostMessage.deleteOne({_id:id});
    res.status(201).json({message :" post deleted successfully"});
}
module.exports.deletePost= deletePost;

const LikePost = async(req,res)=>{
    if(!req.userId)
    return res.json({messgae:"Unauthenicated"});
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send('no post with that id');
    }

    const post = await PostMessage.findById(id);
    console.log(post.likes);

    
    const index = post.likes.findIndex((id)=>id === String(req.userId));
    if(index === -1){
        post.likes.push(req.userId);
    }
    else{
        post.likes = post.likes.filter((id)=>id !== String(req.userId));
    }
    const updatePost = await PostMessage.findByIdAndUpdate(id,post,{new:true});
    console.log(updatePost);
    res.status(201).json(updatePost);
}
module.exports.LikePost= LikePost;