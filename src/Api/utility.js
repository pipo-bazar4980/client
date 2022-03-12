import axios from "axios";
import {API} from '../utils/config';

export const addBanners = (token,addBanner) => {
    return axios.post(`${API}admin/banner`, addBanner, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateBanner = (token,id,editBanner) => {
    console.log(id)
    return axios.put(`${API}admin/banner/${id}`, editBanner, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const findAllBanner = () => {
    return axios.get(`${API}admin/banner`)
}

export const deleteBanner = (token,id) => {
    return axios.delete(`${API}admin/banner/delete/${id}`,{
        headers: {
            'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        }
    })
}