import { likeService } from "@/components/Video/services/postLikeVideo";

const handleLikeVideo = async (video) => {
    let newVideo;
    if (video.is_liked) {
        newVideo = await likeService.unlike(video.id);
    } else {
        newVideo = await likeService.like(video.id);
    }
    return newVideo;
}

export default handleLikeVideo;