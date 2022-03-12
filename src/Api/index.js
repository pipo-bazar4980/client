import axios from "axios";
import {API} from '../utils/config';

export const getProducts = () => {
    return axios.get(
        `${API}admin/product/`
    );
};

export const logOut = () => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.get(
        `${API}admin/logout`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
};