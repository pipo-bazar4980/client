import axios from "axios";
import { API } from '../utils/config';

export const activeUser = (token,id) => {
    console.log("id",id)
    return axios.put(`${API}admin/active/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


export const removeActiveUser = (token,id) => {
    return axios.put(`${API}admin/active/remove/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}