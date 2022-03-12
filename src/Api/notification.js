import axios from "axios";
import {API} from '../utils/config';


export const createNotifications = (token,id,notification) => {
    const value={
        notifications:notification
    }
    return axios.post(`${API}notification/${id}`,value,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const getNotifications = (token,id) => {
    return axios.get(`${API}notification/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const editNotifications = (token,id) => {
    return axios.put(`${API}notification/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}