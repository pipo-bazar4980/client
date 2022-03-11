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
    return axios.get(`${API}popUpBanner/61deb99e0255c919c3eab429`)
}

export const updatePopBanner = (updateProductss) => {
    console.log(updateProductss)
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`${API}popUpBanner/61deb99e0255c919c3eab429`, updateProductss, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
