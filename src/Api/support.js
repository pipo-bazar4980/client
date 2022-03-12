import axios from "axios";

import { API } from "../utils/config";

export const createSupport = (token, id, data) => {
    console.log(token, id, data)
    return axios.post(`${API}support/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getSupportMessage = (token) => {
    return axios.get(`${API}support/`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}


export const markSupport = (id) => {
    return axios.put(`${API}support/${id}`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}