import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

import { getUserService } from "@/utils/request";
import Image from "@/components/Image";
import Button from "@/components/Button/Button";
import VideoUser from "./VideoUser/VideoUser";
import { SkeletonUser } from "@/components/Skeleton/skeleton";

const cx = classNames.bind(styles)
function ProfilePage() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [lineTab, setLineTab] = useState(false);
    const params = useParams();
    const id = params.nickname;

    const handleSetTab = (e) => {
        if (e.target.innerHTML === "Likes") {
            setLineTab(true)
        } else {
            setLineTab(false);
        }
    }
    const handleMouseEnter = (e) => {
        if (e.target.innerHTML === "Likes") {
            setLineTab(true)
        } else {
            setLineTab(false);
        }
    }

    useLayoutEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            const result = await getUserService.user(id);
            setLoading(false);
            setUser(result);
        }
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return (
        <>
            {loading ?
                <SkeletonUser /> :
                (<div className={cx("profile-container")}>
                    <div className={cx("profile-content")}>
                        <div className={cx("profile-infor")}>
                            <div className={cx("profile-avatar")}>
                                <Image src={user.avatar} alt={user.avatar} />
                            </div>
                            <div className={cx("profile-text")}>
                                <h2 className={cx("profile-title")}>
                                    {user.nickname}
                                </h2>
                                <h1 className={cx("profile-subtitle")}>{user.nickname}</h1>
                                <div className={cx("profile-btn")}>
                                    <Button followFill>Follow</Button>
                                </div>
                            </div>
                        </div>
                        <h2 className={cx("profile-count_infos")}>
                            <div className={cx("count")}>
                                <strong className={cx("infos-number")}>{user.followings_count}</strong>
                                <span className={cx("infos-text")}>Following</span>
                            </div>
                            <div className={cx("count")}>
                                <strong className={cx("infos-number")}>{user.folowers_count}</strong>
                                <span className={cx("infos-text")}>Followers</span>
                            </div>
                            <div className={cx("count")}>
                                <strong className={cx("infos-number")}>{user.likse_count}</strong>
                                <span className={cx("infos-text")}>Likes</span>
                            </div>
                        </h2>
                        <h2 className={cx("profile-bio")}>
                            {user.bio}
                        </h2>
                    </div>
                    <div className={cx("profile-main_video")}>
                        <div className={cx("tab-feed_video")}>
                            <p className={cx("video-tab")} onMouseEnter={e => handleMouseEnter(e)} onClick={e => handleSetTab(e)}>
                                Video
                            </p>
                            <p className={cx("likes-tab")} onMouseEnter={e => handleMouseEnter(e)} onClick={e => handleSetTab(e)} >
                                Likes
                            </p>
                            <div style={lineTab ? { transform: "translateX(230px)" } : { transform: "translateX(0)" }} className={cx("bottom-line")}></div>
                        </div>
                        <div className={cx("video-wrapper")}>
                            <VideoUser data={user.videos} />
                        </div>
                    </div>
                </div>)}
        </>
    );
}

export default ProfilePage;