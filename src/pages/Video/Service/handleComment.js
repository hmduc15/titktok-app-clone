import { getUserService } from "@/utils/request";

export const getComments = async (id) => {
    const res = await getUserService.get(`videos/${id}/comments`);
    return res.data;
}
export const postComment = async (value, id) => {
    const res = await getUserService.post(`videos/${id}/comments`, { comment: value });
    return res.data;
}


export * as handleComment from "@/pages/Video/Service/handleComment"