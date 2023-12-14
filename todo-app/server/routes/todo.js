const jwt = require("jsonwebtoken");
const SECRET = "hi";
const express = require("express");
const router = express.Router();
Todo = [];
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

router.get("/todos" , authenticateJwt ,  (req, res)=>{
    const id = req.userId ;
    var newTodo = [];
    for(var i = 0 ; i<Todo.length;i++)
    {
        if ( Todo[i].userId == id)
        {
            newTodo.push(Todo[i]);
        }
    }
    if(newTodo == [])
    {
        return res.status(404).json({msg : "no todos"});
    }
    return res.json({msg:"These are your todos" , newTodo});

} );
var Id = 0;
router.post("/addTodo", authenticateJwt ,  (req, res)=>{
    const userId = req.userId;
    const {title , description } = req.body;
    Id++;
    Todo.push({userId : userId , title : title , description : description , Id : Id});
    return res.status(200).json({msg : "todo addedd succesffuly"});

    
});


module.exports = router;
