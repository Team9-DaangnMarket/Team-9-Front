import axios from "axios";

export const axiosInstance = axios.create({
  baseURL : "http://54.180.108.183/",
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  }
});
