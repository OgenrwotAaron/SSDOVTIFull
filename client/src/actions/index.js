//import axios from 'axios';

export const saveUser = user =>{
    return {
        type:'SAVE_USER',
        payload:user
    }
}

export const logOut = () =>{
    return {
        type:'LOGOUT',
    }
}