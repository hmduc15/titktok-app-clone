import React from "react";
import classNames from "classnames/bind";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./VideoView.module.scss";
import Image from "@/components/Image";
import Button from "@/components/Button/Button";
import { MusicIcon } from "@/components/Icon/Icon";

const cx = classNames.bind(styles);

function VideoPage() {
    const vidRef = useRef();
    const { state } = useLocation();
    const { data } = state;

    return (
        <div className={cx("container")}>
            <div className={cx("video-container")}>
                <div className={cx("blur-background")} style={{ backgroundImage: `"${data.thumb_url}"` }} ></div>
                <div className={cx("video-wrapper")}>
                    <div className={cx("video-player_container")}>
                        <video
                            muted
                            autoPlay={"autoplay"}
                            preload="none   "
                            loop
                            playsInline
                            className={cx("video")}
                            ref={vidRef}
                        >
                            <source type="video/mp4" src={data.file_url} />
                        </video>
                    </div>
                </div>
            </div>
            <div className={cx("content-container")}>
                <div className={cx("author-infor")}>
                    <div className={cx("author-avatar")}>
                        <Image src={data.user.avatar} />
                    </div>
                    <div className={cx("author-text")}>
                        <Link>
                            <span className={cx("author-id")}>{data.user.nickname}</span>
                            <br />
                            <span className={cx("author-name")}>
                                {data.user.last_name}
                                <span style={{ margin: "0px 4px" }}> · </span>
                                <span>2002-12-15</span>
                            </span>
                        </Link>
                    </div>
                    <div className={cx("btnFollow")}>
                        <Button outline small>Follow</Button>
                    </div>
                </div>
                <div className={cx("main-content")}>
                    <div className={cx("video-desc")}>
                        {data.description}
                    </div>
                    <h4 className={cx("music")}>
                        <MusicIcon />
                        {data.music}
                    </h4>
                </div>
            </div>
        </div>
    );
}

export default VideoPage;