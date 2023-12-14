const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();


const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
app.use(cors());
app.use(express.json());

app.use("/user",userRoutes);
app.use("/todos" ,todoRoutes);

app.listen(3000, ()=>{
    console.log("server started on port 3000");
});

