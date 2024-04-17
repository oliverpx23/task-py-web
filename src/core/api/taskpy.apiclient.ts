import axios from 'axios';


const taskpyApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://taskpy-api.up.railway.app'
});


export {
    taskpyApi
}
