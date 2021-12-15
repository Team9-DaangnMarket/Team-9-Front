import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://15.164.171.227/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.common['authorization'] = `BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2Mzk3OTUyMTQsImlzcyI6InNwYXJ0YSIsIlVTRVJfTkFNRSI6ImFzZDEyMzQifQ.xcV0KT5X1SqrT67MGpmyMIfUcGTu_o6KbrVL4OedSTk`
  return config
})
