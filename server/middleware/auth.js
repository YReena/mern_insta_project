const jwt = require("jsonwebtoken");

const auth = async(req,res,next)=>{
    try{
        console.log("reena");
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length<500;

        let  decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token,'MYNAMEISREENAYADAVANDIAMWORKINGASSOFTWAREENGINNER');
            req.userId = decodedData?.id;

        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;

        }
        next();
    }
    catch(error){
    console.log(error);
}

}
module.exports.auth = auth;