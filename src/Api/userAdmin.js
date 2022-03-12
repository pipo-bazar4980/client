import axios from "axios";
import jwt_decode from "jwt-decode";
import {API} from '../utils/config';

export const adminProfile = () => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    const user = jwt_decode(token)
    const userId = user.id;
    return axios.get(`${API}admin/user/find/${userId}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }

    })
};

export const adminProfileUpdate = (token,id,data) => {
    return axios.put(`${API}admin/user/update/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }

    })
};export const updateVerifyPhoneNumber = (token,id,data) => {
    return axios.put(`${API}admin/user/updateVerify/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }

    })
};


export const passwordUpdate = (token,id,data) => {
    console.log(id,data)
    return axios.put(`${API}admin/user/updatePassword/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }

    })
};

export const passwordEdit = (token,id,data) => {
    console.log(id,data)
    return axios.put(`${API}admin/user/update/password/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }

    })
};
