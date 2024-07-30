import axios from "axios";
import { useUserStore } from "./store/user";

// const userStore = useUserStore();
const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    // config.headers.Authorization = `Bearer ${userStore.token}`;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default instance;
