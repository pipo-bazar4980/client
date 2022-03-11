import axios from "axios";
import {API} from '../utils/config';

export const createNewPurchase = (token,data) => {
    return axios.post(`${API}admin/purchase/`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const getAllPurchaseById = (token,id) => {
    return axios.get(`${API}admin/purchase/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const getAllPurchase = (token) => {
    return axios.get(`${API}admin/purchase/`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


export const deletePurchase = (token,id) => {
    return axios.delete(`${API}admin/purchase/delete/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}