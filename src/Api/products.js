import axios from "axios";
import { API } from '../utils/config';


export const addProductss = (addProduct) => {

    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`${API}admin/product`, addProduct, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const addItems = (id, addProduct) => {

    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`${API}admin/product/topUp/${id}`, addProduct, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const itemDelete = ( id, id2) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.delete(
        `${API}admin/product/topUp/${id}/${id2}`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
};
export const updateItem = (id, updateProductss) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`${API}admin/product/topUp/update/${id}`, updateProductss, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};
export const getOneProduct = (id) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.get(`${API}admin/product/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getAllProducts = () => {
    return axios.get(
        `${API}admin/product/`
    );
};

export const updateProductss = (id, updateProductss) => {
    console.log("updateProductss",updateProductss)
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`${API}admin/product/update/${id}`, updateProductss, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const updateImage = (id, updateProductss) => {
    console.log("updateProductss",updateProductss)
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.put(`${API}admin/product/update/image/${id}`, updateProductss, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const deleteOneProducts = (token, id) => {
    return axios.delete(
        `${API}admin/product/delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    );
};



export const filterAdminProduct = (id) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.get(
        `${API}admin/product/filter/admin/product/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

export const filterProductByDate = (search) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.post(`${API}admin/product/filter/date/`, search, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};




