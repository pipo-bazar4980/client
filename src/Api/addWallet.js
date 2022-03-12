import axios from "axios";
import {API} from '../utils/config';

export const addWallet = (token,data) => {
    return axios.post(`${API}admin/addwallet`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const findAllWallet = (token) => {
    return axios.get(`${API}admin/addwallet/`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const updateAddWallet = (token,id,data) => {
    return axios.put(`${API}admin/addwallet/${id}`,data,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${token}`
        }
    })
}

export const findOneWallet = (token,id) => {
    return axios.get(`${API}admin/addwallet/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}



export const findTransactionById = (token,id) => {
    return axios.get(`${API}admin/addwallet/transaction/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const getTransactions = (token,id) => {
    return axios.get(`${API}admin/addwallet/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}



export const filterTransaction = (filters = {}) => {
    const data = {
        filters: { ...filters }
    }
    //console.log(newFilters)
    return axios.post(`${API}admin/addwallet/filter/product`,data,{
        headers:{
            "Content-Type":"application/json",
        }
    })
}


export const editBalance = (token,id,amount) => {
    const data={
        amount:amount
    }
    return axios.put(`${API}admin/addwallet/editAmount/${id}`,data,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}
