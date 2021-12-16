import axios from 'axios'

import { getCookie } from './Cookie'

export const axiosInstance = axios.create({
  baseURL: 'http://15.164.171.227/',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
})

axiosInstance.interceptors.request.use((config) => {
  config.headers.common['authorization'] = getCookie('token')
  return config
})

