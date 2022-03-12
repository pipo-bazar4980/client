import axios from "axios";
import { API } from '../utils/config';

export const sendMessageAPI = (sendMessage) => {
    console.log(sendMessage)
    return axios.post(`${API}sendMessage`,sendMessage,{
        headers:{
            "Content-Type":"application/json",
        }
    })
}