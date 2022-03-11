import axios from "axios";
import {API} from '../utils/config';


export const createNewOrder = (token,data) => {
    console.log("order",data)
    return axios.post(`${API}admin/order/`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


export const orderQueue = () => {
    return axios.get(`${API}admin/order/`)
}


export const getOrders = (token) => {
    return axios.get(`${API}admin/order/all`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


export const getOrdersByAdminId = (token,id) => {
    return axios.get(`${API}admin/order/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const getOrdersById = (token,id) => {
    return axios.get(`${API}admin/order/user/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const updateOrderStatus = (token,id,data) => {
    return axios.put(`${API}admin/order/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}