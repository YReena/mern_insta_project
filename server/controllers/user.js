const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { User} = require('../model/user');


 const  signin= async(req,res)=>{
    try{
        const {email, password} = req.body;
        const existUser = await User.findOne({email});
        if(!existUser){
            return res.status(404).json({message :"User doesn't exits"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentails"});
        }

        const token = jwt.sign({email:existUser.email, id: existUser._id},'MYNAMEISREENAYADAVANDIAMWORKINGASSOFTWAREENGINNER')
        res.status(200).json({result:existUser, token})
        
    }
    catch(error){
     res.send(500).json({"messsage":error.message});
    }
}
module.exports.signin= signin;

const signup = async(req,res)=>{
  
    const {email,password,confirmPassword, firstName, lastName} = req.body;

    try{
        console.log(req.body);
    const existUser = await User.findOne({email});
        if(existUser){
            return res.status(404).json({message :"User already exists"});
        }
     if(password !== confirmPassword){
        return res.status(401).json({message :"Password don't match"});
     }
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("11111111111111111111111111111");
    const result = await User.create({email, password:hashedPassword, name:`${firstName}${lastName}`})
    const token = jwt.sign({email:result.email, id: result._id},'MYNAMEISREENAYADAVANDIAMWORKINGASSOFTWAREENGINNER',{expiresIn:"1h"});
    console.log(token);
    res.status(200).json({result, token})
    }

   catch(error){
        res.send(500).json({"messsage":error.message});
    }
    
}
module.exports.signup= signup;