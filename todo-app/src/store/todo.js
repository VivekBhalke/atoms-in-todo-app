import {atom} from "recoil"

export const todoObject = atom({
    key : 'todoObject',
    default:[{
        title : null,
        description : null,
    }]
});