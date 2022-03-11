import axios from "axios";
import {API} from '../utils/config';
import jwt_decode from "jwt-decode";

export const getAllUser = (token) => {
    return axios.get(`${API}admin/user/all_user`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


export const getOneUser = (id) => {
    return axios.get(`${API}admin/user/find/${id}`,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}

export const deleteUser = (token,id) => {
    return axios.delete(`${API}admin/user/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const updateUserRole = (token,role) => {
    return axios.put(`${API}admin/user/roleUpdate/${role._id}`, role, {
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const updateUserActiveStatus = (activeStatus) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    const user = jwt_decode(token)
    const id = user.id;
    const data={
        activeStatus:activeStatus
    }
    
    return axios.put(`${API}admin/user/activeStatusUpdate/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const addProduct = (token,productIds) => {
    const productList={
        productList:productIds
    }
    return axios.put(`${API}admin/user/add/product`, productList, {
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


export const deleteProduct = (productId) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`${API}admin/user/delete/product/${productId}`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


export const deleteAllProduct = () => {
    console.log("id")
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(`${API}admin/user/delete/product/all/admin`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


export const getJwt = () => {
    return axios.get(`${API}admin/user/get/jwt`)
}

export const removeJwt = () => {
    return axios.get(`${API}admin/user/remove/jwt`)
}


export const findUserByPhoneNumber = (number) => {
    return axios.get(`${API}admin/user/find/number/${number}`,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}

export const otpSend = (id,code) => {
    const data={
        otp:code
    }
    return axios.put(`${API}admin/user/otp/${id}`,data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}

export const updateUser = (id,pass) => {
    const data={
        password:pass
    }
    return axios.put(`${API}admin/user/update/password/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
        }

    })
};

export const updateUserPassword = (id, pass) => {
    console.log(id)
    const data={
        password:pass
    }
    return axios.put(`${API}admin/user/edit/password/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
        }

    })
}
