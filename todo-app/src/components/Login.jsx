import {RecoilRoot , atom , useRecoilState , useSetRecoilState,useRecoilValue} from "recoil";
import { useNavigate } from 'react-router-dom';
import { Button, Card, TextField, Typography } from '@mui/material';
import { userState } from "../store/user";
import { useEffect , useState } from "react";



function Login(){
    const user = useRecoilValue(userState);
    const setUser = useSetRecoilState(userState);
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const [id , setId] = useState("");
    return (
        <div style={{display:"flex" , justifyContent:"center" , padding:"30"}}>
            {/* {object.useremail}{object.userpassword}
             */}
             {/* {useremail} {userpassword}{userId} */}
            <center style={{  justifyContent:"center" , width:"40%" , marginTop:100}}>
                <Card style={{padding:"20"}}>
                    <TextField id="standard-basic" label="Username" variant="standard" onChange={(e)=>{
                        setUsername(e.target.value);
                    }} /><br /><br />

                    <TextField id="standard-basic" label="Password" variant="standard" style={{padding:"20"}}
                    onChange={(e)=>{
                       setPassword(e.target.value);
                    }}/><br /><br />

                    <Button variant="contained" style={{marginBottom:10}}
                    onClick={()=>{
                        // console.log("bhenchod clicked here")
                        
                        fetch("http://localhost:3000/user/login",{
                            method:"POST",
                            body:JSON.stringify({
                                username : username,
                                password : password,                 
                            }),
                            headers:{
                                "Content-type":"application/json"
                            }
                        }).then((respond)=>{
                            respond.json().then((data)=>{
                                console.log(data.id);
                                // object.userId = data.id;
                                setId(data.id);
                                
                                localStorage.setItem("token", data.token);
                                
                            })
                        })
                        const object = {userId : id , useremail : username, userpassword: password};
                        
                        setUser(object);
                        // navigate("/todos");
                    }}>Login</Button>
                </Card>
            </center>
        </div>
    )
}

export default Login;