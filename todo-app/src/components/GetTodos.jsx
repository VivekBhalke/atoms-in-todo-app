import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, TextField, Typography } from '@mui/material';
import {RecoilRoot , atom , useRecoilState , useSetRecoilState,useRecoilValue} from "recoil";
import { todoObject } from "../store/todo";
function GetTodos(){
    const navigate = useNavigate();
    // const [todos , setTodos] = useState([]);
    // const [title , setTitle] = useState("");
    // const [description , setDescription] = useState("");
    const todos = useRecoilValue(todoObject);
    //object is an array of {title ,description , id , userId}
    const setTodos = useSetRecoilState(todoObject);
    // const title = object.title;
    // const description = object.description;
    // const userId = object.userId;
    // const id = object.id;
    var object = {
        title : "",
        description : ""
    };
    useEffect(()=>{
        fetch("http://localhost:3000/todos/todos",{
            method:"GET",
            headers:{
                "Content-type" : "application/json",
                "token" : localStorage.getItem("token")
            }
        } ).then((response)=>{
            if(response.status == 404)
            {
                //wrong token was sent
                //the person is logged out
                //he must return to singup page
                console.log("404 not found")
                navigate("/");
            }
            else if (response.status==403)
            {
                console.log("response status 403 in /todos")
                // setTodos([]);
            }
            else if(response.status==200)
            {
                console.log("response status 200 in todos")
                //token is correct 
                //we set the todos array.
                response.json().then((data)=>{
                    console.log(data.newTodo);
                    //data.newTodo is an array of newTodos . 
                    //[{title , description , userid , id}]
                    //and we need to set it to our atom variable
                    // setTodos(data.newTodo);
                    // setTodos(newTodo)
                    // object = data.newTodo;
                    var newTodo = data.newTodo;
                    var tobeset = [];
                    for(var i = 0 ; i<newTodo.length ;i++)
                    {
                        var d = {title : newTodo[i].title ,
                            description : newTodo[i].description};
                        tobeset.push(d);
                    }
                    setTodos(tobeset);

                }) 
            }
        })
    },[navigate]);
    return (
        <table>
            <tr>
                <td>
                    <div>
                        {todos.map((val)=>{
                        return <div style={{display:"flex"}}> 
                            <h3>{val.title}</h3>
                            <h5 style={{padding:20}}>{val.description}</h5>
                            </div>
                        })}
                        {/* {title}{description}<br/> */}
                    </div>
                </td>
                <td>
                    <div>
                    <TextField id="standard-basic" label="Title" variant="standard" onChange={(e)=>{
                        object.title = e.target.value;
                    }} /><br /><br />
                    <TextField id="standard-basic" label="Description" variant="standard" onChange={(e)=>{
                        object.description = e.target.value;
                    }} /><br /><br />
                    <Button variant="contained" onClick={()=>{
                        fetch("http://localhost:3000/todos/addTodo" , {
                            method : "POST",
                            headers:{
                                "Content-type" : "application/json",
                                "token" : localStorage.getItem("token")
                            },
                            body:JSON.stringify({
                                title:object.title,
                                description:object.description
                            })
                        }).then((response)=>{
                            response.json().then((data)=>{
                                console.log("data received from backend")
                                console.log(data);
                                // window.location.reload();
                                var newTodo = [];
                                for(var i = 0 ;i<todos.length;i++)
                                {
                                    newTodo.push(todos[i]);
                                }
                                newTodo.push(object);
                                setTodos(newTodo);
                            })
                        })


                    }}>Add Todo</Button>
                    </div>
                </td>
            </tr>
        </table>
    )
}
export default GetTodos;