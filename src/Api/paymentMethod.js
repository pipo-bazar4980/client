import axios from "axios";
import { API } from '../utils/config';

export const addPaymentMethod = (token, addBanner) => {
    return axios.post(`${API}paymentMethod`, addBanner, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const findAllPaymentMethod = () => {
    return axios.get(`${API}paymentMethod`)
}

export const deletePaymentMethod = (token, id) => {
    return axios.delete(`${API}paymentMethod/delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}


export const editPaymentMethod = (token, id, formData) => {
    return axios.put(`${API}paymentMethod/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
