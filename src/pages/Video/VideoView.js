/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, memo } from "react";
import classNames from "classnames/bind";
import { useRef, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Fragment } from "react";


import styles from "./VideoView.module.scss";
import Image from "@/components/Image";
import Button from "@/components/Button/Button";
import { ArrowIcon, CloseIcon, CommentIcon, EmbedIcon, FacebookIcon, HeartIcon, MessageShareIcon, MusicIcon, PlayIcon, ShareIcon, TwitterIcon, WhatsappIcon } from "@/components/Icon/Icon";
import Context from "@/store/Context";
import { action } from "@/store";
import { handleComment } from "./Service/handleComment";
import CommentItem from "@/components/Comment/CommentItem/CommentItem";
import { SkeletonUser } from "@/components/Skeleton/skeleton";

const cx = classNames.bind(styles);

function VideoPage({ data }) {
    const vidView = useRef();
    const refBar = useRef();
    const [widthBar, setWidthBar] = useState(0);
    const [value, setValue] = useState(0);
    const [isPlay, setPlay] = useState(true);
    const [secondPlay, setSecondPlay] = useState('00');
    const [state, dispatch] = useContext(Context);
    const [comment, setComment] = useState('');
    const [listComments, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const inputRef = useRef();

    const handleChangeBar = (e) => {
        setWidthBar(e.target.value);
        setValue(e.target.value)
        const manualChange = Number(e.target.value);
        vidView.current.currentTime = (vidView.current.duration / 100) * manualChange;
    }
    const handleOnTimeUpdate = () => {
        setWidthBar((vidView.current.currentTime / vidView.current.duration) * 100);
        setValue((vidView.current.currentTime / vidView.current.duration) * 100);
        setSecondPlay(`0${parseInt(vidView.current.currentTime)}`);
    }
    const handleClick = () => {
        setPlay(!isPlay);
    }
    document.onkeydown = (e) => {
        if (e.keyCode === 27) {
            dispatch(action.closeModal(state.modal.data, false));
        }
    }
    localStorage.setItem('videoId', state.viewVideo.data.id);
    useEffect(() => {
        isPlay ? vidView.current.play() : vidView.current.pause();

    }, [isPlay])
    useEffect(() => {
        const commentList = async (data) => {
            try {
                const res = await handleComment.getComments(data.id);
                setLoading(false);
                setList(res);
            } catch (err) { console.log(err) }
        }
        commentList(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.id]);


    const handleOnChange = (value) => {
        setComment(value)
    }

    useEffect(() => {
        setComment(comment)
    }, [comment])

    const postComment = async () => {
        try {
            const res = await handleComment.postComment(comment, data.id);
            setComment('');
            setList(listComments => [...listComments, res])
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className={cx("container")}>
            <div className={cx("video-container")}>
                <div className={cx("blur-background")} style={{ backgroundImage: `url(${state.viewVideo.data.thumb_url})` }} ></div>
                <div className={cx("video-wrapper")}>
                    <Link to="/">
                        <Button className={cx("btnClose")} btnCircle
                            onClick={() => {
                                dispatch(action.closeModal(state.viewVideo.data, false));
                            }}
                        >
                            <CloseIcon />
                        </Button>
                        <div className={cx("tool-tip")}>
                            <div className={cx("guide")}>
                                <p>Press ESC to close</p>
                            </div>
                            <ArrowIcon className={cx("arrow")} />
                        </div>
                    </Link>

                    <div className={cx("video-player_container")}>
                        <video
                            autoPlay={"autoplay"}
                            preload="none   "
                            loop
                            playsInline
                            className={cx("video")}
                            onTimeUpdate={handleOnTimeUpdate}
                            onClick={handleClick}
                            ref={vidView}
                        >
                            <source type="video/mp4" src={state.viewVideo.data.file_url} />
                        </video>
                        {!isPlay ? <div className={cx("icon")}>
                            <PlayIcon />
                        </div> : <Fragment />}
                        <div className={cx("video-control")}>
                            <div className={cx("seek")}>
                                <input onChange={e => handleChangeBar(e)} type="range" className={cx("seek-control")} value={value} role="slider" max={100} min={0} />
                                <div style={{ width: `${widthBar}%` }} ref={refBar} className={cx("seek-bar")}></div>
                            </div>
                            <div className={cx("video-time")}>
                                <span>00:{secondPlay}/0{state.viewVideo.data.meta.playtime_string}</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className={cx("content-container")} >
                <div className={cx("author-infor")}>
                    <div className={cx("author-avatar")}>
                        <Image src={state.viewVideo.data.user.avatar} />
                    </div>
                    <div className={cx("author-text")}>
                        <Link>
                            <span className={cx("author-id")}>{state.viewVideo.data.user.nickname}</span>
                            <br />
                            <span className={cx("author-name")}>
                                {state.viewVideo.data.user.last_name}
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
                        {state.viewVideo.data.description}
                    </div>
                    <h4 className={cx("music")}>
                        <MusicIcon />
                        {state.viewVideo.data.music}
                    </h4>
                    <div className={cx("container-action")}>
                        <div className={cx("button-action")}>
                            <Button btnAction>
                                <span className={cx("span-icon")}>
                                    <HeartIcon />
                                </span>
                                <strong className={cx("strong-text")}>{state.viewVideo.data.likes_count}</strong>
                            </Button>
                            <Button btnAction>
                                <span className={cx("span-icon")}>
                                    <CommentIcon />
                                </span>
                                <strong className={cx("strong-text")}>{state.viewVideo.data.comments_count}</strong>
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
                            {window.location.href}
                        </p>
                        <button className={cx("btn_coppy")}>Copy link</button>
                    </div>
                </div>
                <div className={cx("comments_list")}>
                    <>
                        {isLoading ? <SkeletonUser /> : listComments.map((list, index) => (
                            <CommentItem key={index} comment={list} />
                        ))}
                        {listComments.length === 0 && !isLoading && <p className={cx("empty-comments")}>Be the first comment</p>}
                    </>
                </div>
                <div className={cx("comments_container")}>
                    <div className={cx("comments_input-area")}>
                        <input ref={inputRef} value={comment} onChange={e => handleOnChange(e.target.value)} className={cx("comments_text")} placeholder="Add comment..." />
                    </div>
                    <p role="button" style={{ color: comment.length > 0 ? 'rgb(255, 59, 92)' : 'rgba(255, 255, 255, 0.34)' }} onClick={postComment} className={cx("btn_post")}>Post</p>
                </div>
            </div>
        </div>
    );
}

export default memo(VideoPage);