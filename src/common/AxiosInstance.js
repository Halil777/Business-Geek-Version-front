import axios from "axios";
import url from './Config'



export const BASE_URL = url+"/public"
const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
const AxiosInstanceFormData = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data'
  }
})
export { AxiosInstance };
export { AxiosInstanceFormData };
