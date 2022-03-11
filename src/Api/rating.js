import axios from "axios";
import {API} from "../utils/config";

export const addRatings = (token, id, ratings) => {

    return axios.post(`${API}rating/${id}`, ratings, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};
export const addAdminRatings = (token, id, ratings) => {

    return axios.post(`${API}adminRating/${id}`, ratings, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getOneRating = (token, sid, id,) => {
    return axios.get(`${API}rating/find/?userId=${id}&productId=${sid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getOneAdminRating = (token, sid, id,) => {
    return axios.get(`${API}rating/find/?userId=${id}&productId=${sid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getAllRating = (sid) => {
    return axios.get(
        `${API}rating/?productId=${sid}`
    );
};


export const updateRating = (token, id, updateProductss) => {
    console.log(id)
    return axios.put(`${API}rating/update/${id}`, updateProductss, {

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const updateAdminRating = (token, id, updateProductss) => {
    console.log(id)
    return axios.put(`${API}rating/update/${id}`, updateProductss, {

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};


