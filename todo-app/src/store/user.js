import {atom} from "recoil"

export const userState = atom({
    key : 'userState' , 
    default : {
        userId : null,
        useremail : null,
        userpassword:null
    }
});