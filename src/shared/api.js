import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://15.164.171.227/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.common[
    "authorization"
  ] = `BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2Mzk4MzQzMzMsImlzcyI6InNwYXJ0YSIsIlVTRVJfTkFNRSI6ImtlaTEyMyJ9.Hk6Il0Tg8FEQ44bib-kXp4pEjLmIzgas9ccWBUr3jYE`;
  return config;
});
