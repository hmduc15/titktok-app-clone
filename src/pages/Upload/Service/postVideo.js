import { getUserService } from "@/utils/request";

export const postVideo = async (formData) => {
    await getUserService.post("videos", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

}

export * as videoService from "@/pages/Upload/Service/postVideo";