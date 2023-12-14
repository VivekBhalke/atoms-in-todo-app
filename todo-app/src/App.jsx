import { useState , useEffect} from 'react'
import { Button, Card, TextField, Typography } from '@mui/material';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Singup from './components/Singup';
import Appbar from './components/Appbar';
import GetTodos from './components/GetTodos';
import Login from './components/Login';
import {RecoilRoot , atom , useRecoilState , useSetRecoilState,useRecoilValue} from "recoil";
import { userState } from './store/user';
var i = 0;
function App() {
  return (
    <RecoilRoot>
      <div>
        <Router>
        <Appbar></Appbar>
        <InitUser></InitUser>
          <Routes>
            <Route path={"/singup"} element={<Singup/>}></Route>
            <Route path={"/todos"} element={<GetTodos/>}></Route>
            <Route path={"/login"} element={<Login/>}></Route>
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
   )
  }
  function InitUser(){
    const setUserstate = useSetRecoilState(userState);
    useEffect(()=>{
      try{
        fetch("localhost:3000/user/me" , {
          method: GET,
          headers:{
            "Content-type" : "application/json",
            "token" : localStorage.getItem("token")
          }
        }).then((response)=>{
          response.json().then((data)=>{
            if(data.username)
            {
              const object = {userId : data.id , useremail : data.username , password : data.password}
              setUserstate(object);
            }
            else{
              const object = {userId :"" , useremail : "",password : ""}
              setUserstate(object);
            }
          })
        })
      }catch(e){
        // object = {userId :null , useremail : null,password : null}
        const object = {userId :"" , useremail : "",password : ""}
        setUserstate(object);
      }
    },[])
    return <div></div>
  }
export default App
