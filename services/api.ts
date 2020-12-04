import axios from "axios";
export const baseURL = 'http://192.168.100.20'

const api = axios.create({
  baseURL
})

export default api;