import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})



export const get = async (path, options) => {
    const response = await request.get(path, options);
    return response.data;
}

export const getListVideo = async (type, page) => {
    const res = await request.get(`videos?type=${type}&page=${page}`);
    return res.data;
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
    return response.data;
};

request.interceptors.request.use(function (config) {
    const token = "Bearer" + JSON.parse(localStorage.getItem("user"))?.meta.token;
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
})


export * as getUserService from "@/utils/request"