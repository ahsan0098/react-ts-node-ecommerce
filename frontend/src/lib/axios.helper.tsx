/*===========*****===========imports===========*****===========*/
import axios from "axios";
import { API_URL } from "../constants/paths";
/*===========*****===========imports===========*****===========*/


/*===========*****===========exporting axios instance===========*****===========*/
export const AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});