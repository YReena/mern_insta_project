const mongoose = require("mongoose");

const postSchema =  mongoose.Schema({
    title:String,
    message : String,
    creator:String,
    name:String,
    tags:[String],
    selectedFile:String,
    likeCount:String,
    likes :{
        type : [String],
        default : []
    },
    createdAt:{
        type: Date,
        default : new Date()
    },

});

const PostMessage = mongoose.model('PostMessage', postSchema);

module.exports.PostMessage = PostMessage;