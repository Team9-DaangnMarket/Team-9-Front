import axios from "axios";

export const axiosInstance = axios.create({
  baseURL : "http://3.34.183.214/",
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  }
});
