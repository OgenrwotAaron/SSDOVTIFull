//import axios from 'axios';

import Axios from "axios"

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

const AsyncReloadUser = user =>{
    return {
        type:'RELOAD_USER',
        payload:user
    }
}

export const reloadUser = (role,user_name) =>{
    return dispatch =>{
        Axios.get(`/api/v1/users?user_name=${user_name}&role=${role}`)
        .then(res=>{
            dispatch(AsyncReloadUser(res.data))
        })
    }
}