import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://15.164.171.227/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});
