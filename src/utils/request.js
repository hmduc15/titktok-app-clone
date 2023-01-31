import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
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
export * as getUserService from "@/utils/request"