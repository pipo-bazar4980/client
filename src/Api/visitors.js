import axios from "axios";
import {API} from '../utils/config';

export const getVisitorsPerDay = () => {
    return axios.get(
        `${API}count`
    );
};

export const increaseVisitors = () => {
    return axios.put(
        `${API}count`
    );
};