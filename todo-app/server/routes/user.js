const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticateJwt = async (req , res , next) =>{
    const token = req.headers.token;
    jwt.verify(token , SECRET , (err, user) =>{
        if(err)
        {
            return res.status(404).json({msg : "wrong token"});
        }
        req.userId = user;
        console.log(req.userId);
        console.log("right token");
        next();
        
        // req.status(200).json({msg : "right token"})
    })
}
User = [];
var id = 0;

const SECRET = "hi";
router.post("/singup" , async (req , res)=>{
    console.log("/singup route hit");
    const {username , password} = req.body;
    console.log("username is :",username);
    console.log("password is : ",password);
    for(var i = 0 ;i<User.length;i++)
    {
        console.log(User[i]);
        if(User[i].username == username && User[i].password == password)
        {
            return res.status(403).json({
                msg : "user already exists"
            })
        }

    }
    id++;
    User.push({id : id , username : username , password : password , done : false});
    console.log(User);
    const token = await jwt.sign(id , SECRET );
    return res.status(200).json({msg : "User created successfully" , token , id: id });
});

router.post("/login" , async (req , res)=>{
    const {username , password} = req.body;
    for(var i = 0 ;i<User.length;i++)
    {
        if(User[i].username == username && User[i].password == password)
        {
            const token = await jwt.sign(id , SECRET);

            res.status(200).json({
                msg : "user found" , token , id
            })
        }


    }
    // User.push({username , password});
    res.status(403).json({msg : "user not found"});
});
router.get("/me" ,authenticateJwt ,  async (req ,res)=>{
    const id = req.userId;
    for(var i = 0 ; i<User.length;i++)
    {
        if(User[i].id == id)
        {
            return res.status(200).json({username : User[i].username ,password:User[i].password , id : id});
        }
    }
    return res.status(411).json({msg : "user not logged in "});

});
module.exports = router;