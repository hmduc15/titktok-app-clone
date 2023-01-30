import React from "react";
import classNames from "classnames/bind";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./VideoView.module.scss";
import Image from "@/components/Image";
import Button from "@/components/Button/Button";
import { CommentIcon, EmbedIcon, FacebookIcon, HeartIcon, MessageShareIcon, MusicIcon, ShareIcon, TwitterIcon, WhatsappIcon } from "@/components/Icon/Icon";

const cx = classNames.bind(styles);

function VideoPage() {
    const vidRef = useRef();
    const { state } = useLocation();
    const { data } = state;

    return (
        <div className={cx("container")}>
            <div className={cx("video-container")}>
                <div className={cx("blur-background")} style={{ backgroundImage: `url(${data.thumb_url})` }} ></div>
                <div className={cx("video-wrapper")}>
                    <div className={cx("video-player_container")}>
                        <video
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
                    <div className={cx("video-control")}></div>
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
                    <div className={cx("container-action")}>
                        <div className={cx("button-action")}>
                            <Button btnAction>
                                <span className={cx("span-icon")}>
                                    <HeartIcon />
                                </span>
                                <strong className={cx("strong-text")}>{data.likes_count}</strong>
                            </Button>
                            <Button btnAction>
                                <span className={cx("span-icon")}>
                                    <CommentIcon />
                                </span>
                                <strong className={cx("strong-text")}>{data.comments_count}</strong>
                            </Button>
                        </div>
                        <div className={cx("browse-share")}>
                            <div className={cx("share-link")}>
                                <EmbedIcon />
                            </div>
                            <div className={cx("share-link")}>
                                <MessageShareIcon />
                            </div>
                            <div className={cx("share-link")}>
                                <FacebookIcon />
                            </div>
                            <div className={cx("share-link")}>
                                <WhatsappIcon />
                            </div>
                            <div className={cx("share-link")}>
                                <TwitterIcon />
                            </div>
                            <div className={cx("share-link")}>
                                <ShareIcon />
                            </div>
                        </div>
                    </div>
                    <div className={cx("coppy-link_container")}>
                        <p className={cx("coppy-link_text")}>
                            https://www.tiktok.com/@khuaaoxanhaodo/video/7193690592747081002?is_from_webapp=1&sender_device=pc&web_id=7193623647734908417
                        </p>
                        <butto className={cx("btn_coppy")}>Copy link</butto>
                    </div>
                </div>
                <div className={cx("comments_list")}>
                    <p className={cx("empty-comments")}>Be the first comment</p>
                </div>
                <div className={cx("comments_container")}>
                    <div className={cx("comments_input-area")}>
                        <input className={cx("comments_text")} placeholder="Add comment..." />

                    </div>
                    <p role="button" className={cx("btn_post")}>Post</p>
                </div>
            </div>
        </div>
    );
}

export default VideoPage;