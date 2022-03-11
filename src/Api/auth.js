import axios from "axios";
import {API} from '../utils/config';

export const login = (user) => {
    console.log(user)
    return axios.post(`${API}admin/login`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

const googleLogin = async (code) => {
    return axios.post(`${API}auth/google`, code, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // console.log(code)
    // return fetch('/api/auth/google', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ code }),
    // }).then((res) => {
    //     if (res.ok) {
    //         return res.json();
    //     } else {
    //         return Promise.reject(res);
    //     }
    // });
};

export { googleLogin };

export const registration = (user) => { 
    return axios.post(`${API}admin/register`, user, { 
        headers: { 
            'Content-Type': 'application/json'
        }
    })
};

export const forgotPassword = (user) => {
    return axios.post(`${API}admin/forgotPassword`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const resetPassword = (user) => {
    const token = user.token
    console.log(user.token)
    return axios.put(`${API}admin/resetPassword/${token}`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}