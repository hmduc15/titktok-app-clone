import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})



export const get = async (path, options) => {
    const response = await request.get(path, options);
    return response.data;
}

export const user = async (nickname) => {
    try {
        const res = await request.get(`users/${nickname}`)
        return res.data.data;
    } catch (err) {
        console.log(err);
    }
}
export const post = async (url, data, options = {}) => {
    const response = await request.post(url, data, options);
    console.log(response.latency)
    return response.data;
};
request.interceptors.request.use(function (config) {
    const token = "Bearer" + JSON.parse(localStorage.getItem("user"))?.meta.token;
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
})
request.interceptors.request.use((request) => {
    request.ts = Date.now();
    return request;
});
request.interceptors.response.use((response) => {
    const timeInMs = `${Number(Date.now() - response.config.ts).toFixed()}ms`;
    response.latency = timeInMs;
    return response;
});

export * as getUserService from "@/utils/request"