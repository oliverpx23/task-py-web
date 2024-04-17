import axios from 'axios';


const taskpyApi = axios.create({
  baseURL: import.meta.env.VITE_ANALYTICS_KEY ?? 'https://taskpy-api.up.railway.app'
});



export {
    taskpyApi
}
