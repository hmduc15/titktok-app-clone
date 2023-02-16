import { getUserService } from "@/utils/request";

export const like = async (id) => {
    try {
        const res = await getUserService.post(`videos/${id}/like`, id);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const unlike = async (id) => {
    try {
        const res = await getUserService.post(`videos/${id}/unlike`, id);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export * as likeService from "@/components/Video/services/postLikeVideo";