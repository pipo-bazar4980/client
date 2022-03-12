import axios from "axios";
import {API} from '../utils/config';

export const createWallet = (token,id) => {
    const data={
        userId:id
    }
    return axios.post(`${API}admin/wallet`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const updateUserWallet = (token,id,walletId) => {
    const data={
        wallet:walletId
    }
    return axios.put(`${API}admin/user/walletUpdate/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const editBalance = (token,id,amount) => {
    const data={
        amount:amount
    }
    return axios.put(`${API}admin/wallet/updateUserAmount/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


export const getAllWallet = (token) => {
    return axios.get(`${API}admin/wallet`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const getWalletById = (token,id) => {
    return axios.get(`${API}admin/wallet/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const updateWallet = (token,id,amount,spent) => {
    const data={
        amount,
        spent
    }
    console.log('hcjkj',data, id)
    return axios.put(`${API}admin/wallet/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


export const addSpentAmount = (token,id,amount,orderId) => {
    const data={
        amount,
        orderId
    }
    console.log(data)
    return axios.put(`${API}admin/wallet/addSpentAmount/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


export const removeSpentAmount = (token,id,amount,orderId) => {
    const data={
        amount,
        orderId
    }
    console.log(data)
    return axios.put(`${API}admin/wallet/removeSpentAmount/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const deleteWallet = (token,id) => {
    return axios.delete(`${API}admin/wallet/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}
