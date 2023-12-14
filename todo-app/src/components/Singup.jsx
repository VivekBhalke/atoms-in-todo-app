import { useEffect , useState } from "react"
import { Button, Card, TextField, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { userState } from "../store/user";
import {RecoilRoot , atom , useRecoilState , useSetRecoilState,useRecoilValue} from "recoil";

function Singup()
{
    const navigate = useNavigate();
    const setUsername = useSetRecoilState(userState);
    const [useremail , setuseremail] = useState("");
    const [userpassword , setuserpassword]= useState("");
    const [userId , setuserId] = useState("");
    return (
        <div style={{display:"flex" , justifyContent:"center" , padding:"30"}}>
            {/* {object.useremail}{object.userpassword}
             */}
             {/* {useremail} {userpassword}{userId} */}
            <center style={{  justifyContent:"center" , width:"40%" , marginTop:100}}>
                <Card style={{padding:"20"}}>
                    <TextField id="standard-basic" label="Username" variant="standard" onChange={(e)=>{
                        setuseremail(e.target.value);
                    }} /><br /><br />

                    <TextField id="standard-basic" label="Password" variant="standard" style={{padding:"20"}}
                    onChange={(e)=>{
                       setuserpassword(e.target.value);
                    }}/><br /><br />

                    <Button variant="contained" style={{marginBottom:10}}
                    onClick={()=>{
                        // console.log("bhenchod clicked here")
                        
                        fetch("http://localhost:3000/user/singup",{
                            method:"POST",
                            body:JSON.stringify({
                                username : useremail,
                                password :   userpassword,                 
                            }),
                            headers:{
                                "Content-type":"application/json"
                            }
                        }).then((respond)=>{
                            respond.json().then((data)=>{
                                console.log(data.id);
                                // object.userId = data.id;
                                setuserId(data.id);
                                
                                localStorage.setItem("token", data.token);
                                
                            })
                        })
                        const object = {userId : userId , useremail : useremail, userpassword: userpassword};
                        
                        setUsername(object);
                        // navigate("/todos");
                    }}>Singup</Button>
                </Card>
            </center>
        </div>
    )
}

export default Singup;