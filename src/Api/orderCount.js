import axios from "axios";
import {API} from '../utils/config';

export const oneDayOrder = () => {
    return axios.get(`${API}dashboard/order/query/oneday`)
}


export const totalRevenue = () => {
    return axios.get(`${API}dashboard/order/query/revenue/count`)
}

export const adminOrderQuery = () => {
    return axios.get(`${API}dashboard/order/query/admin_order/query`)
}