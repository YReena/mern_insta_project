const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/user");

dotenv.config();


const app = express();

app.use(bodyParse.json({extented: true}));
app.use(bodyParse.urlencoded({extended:true}));
require('./db/conn');
app.use(cors());
app.use('/user', userRouter);
app.use('/posts', postRouter);




const PORT = process.env.PORT || 9000;

app.listen(PORT,(req, res)=>{
    console.log("server is running at port")
})