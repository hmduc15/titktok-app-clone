import { getUserService } from "@/utils/request";

export const follow = async (id) => {
    try {
        const res = await getUserService.post(`users/${id}/follow`, id)
        return res.data
    } catch (err) {
        console.log(err);
    }
}
export const unfollow = async (id) => {
    try {
        const res = await getUserService.post(`users/${id}/unfollow`, id)
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export * as followService from "@/components/Video/services/postFollow"