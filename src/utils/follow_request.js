import { followService } from "@/components/Video/services/postFollow";

const handleFollowUser = async (user) => {
    let newUser;
    if (user.is_followed && user) {
        newUser = await followService.unfollow(user.id);
    } else {
        newUser = await followService.follow(user.id);
    }
    return newUser && newUser.is_followed;
}

export default handleFollowUser;