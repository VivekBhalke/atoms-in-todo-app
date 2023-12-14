import { useEffect , useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Button, Card, TextField, Typography } from '@mui/material';
import { userState } from "../store/user";
import {RecoilRoot , atom , useRecoilState , useSetRecoilState,useRecoilValue} from "recoil";
function Appbar(){
   
    var navigate = useNavigate();
    // const [username , setUsername] = useState(null);
    // const [password , setPassword] = useState(null);
    const setUsername = useSetRecoilState(userState)
    const user = useRecoilValue(userState);
    // const username = object.username;
    
    // useEffect(()=>{
    //     fetch("http://localhost:3000/user/me",{
    //         method:"GET",
    //         headers:{
    //             "Content-type": "application/json",
    //             "token" : localStorage.getItem("token")
    //         }


    //     }).then((response)=>{
    //         response.json().then((data)=>{
    //             if(data.username)
    //             {
    //                 setUsername(data.username) ;
    //                 setPassword(data.password);
    //             }
    //             else{
    //                 setUsername(null);
    //                 setPassword(null);
    //             }
    //         })
    //     })
    // },[])
    // console.log(username);
    if(!user.useremail)//username is null
    {
        return (
            <div style={{display:"flex" , justifyContent:"space-around"}}>
                <Typography variant="h6" component="h6" style={{padding:10}}>
                    Todo App
                </Typography>  
                <div>
                <Button variant="contained" style={{padding:10 }}
                onClick={()=>{
                    navigate("/singup");
                }}>Singup</Button>
                <Button variant="contained" style={{padding:10}}
                onClick={()=>{
                    navigate("/login");
                }}>Login</Button>
                {/* {username} */}
                </div>
            </div>
        )
    }else{
        navigate("/todos");
        return(
            <div style={{display:"flex" , justifyContent:"spaced-around"}}>
                <Typography variant="h6" component="h6" style={{padding:10}}>
                    Todo App
                </Typography>  
                <div>
                    <Button variant="contained" 
                    onClick={()=>{
                        localStorage.setItem("token",null);
                        // navigate("/");
                        const object = {userId :"" , useremail : "",password : ""}
                        setUsername(object);
                        window.location.reload();
                    
                    }}>Logout</Button>
                </div>
                {/* {username} */}
            </div>
        )
        
    }
    
}
export default Appbar;