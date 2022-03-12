import axios from "axios";
import {API} from "../utils/config";

export const addPopUpBanner = (token, addProduct) => {

    // const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`${API}popUpBanner`, addProduct, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const findPopUpBanner = () => {
    return axios.get(`${API}popUpBanner/61c83cf928ad9739ae64d42d`)
}

export const updatePopBanner = (id, updateProductss) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`${API}popUpBanner/61c83cf928ad9739ae64d42d`, updateProductss, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
