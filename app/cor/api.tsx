import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.2.101:3000' // Replace with your API base URL
});

export default api;