
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import "@lottiefiles/lottie-player";

import styles from "./VideoItem.module.scss";
import Image from "@/components/Image";
import Button from "@/components/Button/Button";
import { MusicIcon, MutedIcon, PauseIcon, PlayIcon, UnmutedIcon } from "@/components/Icon/Icon";
import ButtonAction from "./ActionUser/BtnAction";
import { Fragment } from "react";
import { memo } from "react";
import Provider from "@/store/Provider";
import Context from "@/store/Context";

const cx = classNames.bind(styles);

function VideoItem({ data }) {
    const vidRef = useRef(null);
    const volBarRef = useRef(null);
    const btnPlayRef = useRef(null);
    var progressVol = useRef();
    const [isPlay, setPlay] = useState(true);
    const handlePlay = () => {
        if (isPlay) {
            vidRef.current.pause();
            setPlay(false);
        } else {
            vidRef.current.play();
            setPlay(true);
        }
    }
    const [voice, setVoice] = useState(true);
    const [vol, setVol] = useState(0);
    const [widthBar, setWidthBar] = useState((vol * 64) / 100)
    const handleVoice = () => {
        setVoice(!voice);
        if (voice) {
            vidRef.current.muted = false;
            setVol(50);
            setWidthBar((50 * 64) / 100)
        } else {
            vidRef.current.muted = true;
            setVol(0);
            setWidthBar(12);

        }
    }
    const handleChangVol = (e) => {
        setVol(e);
        setWidthBar((e * 64) / 100);
        if (e > 0) {
            vidRef.current.muted = false;
            setVol(e);
            setWidthBar((e * 64) / 100);
        }

    }

    useEffect(() => {
        var volume = vol / 100;
        if (volume === 0) {
            setVoice(true);
        } else if (volume > 0) {
            setVoice(false);
        }
        vidRef.current.volume = volume;
    }, [vol])

    useEffect(() => {
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: [0.85, 0.75]
        };
        let handlePlayScrolling = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    vidRef.current.play();
                    setPlay(true)
                } else {
                    if (vidRef.current) {
                        vidRef.current.pause();
                        setPlay(false)
                    }
                }
            })
        }
        let observer = new IntersectionObserver(handlePlayScrolling, options);
        observer.observe(vidRef.current);
    }, []);
    const [isHeart, setHeart] = useState();
    const handleHeart = (e) => {
        setHeart(true);
    }
    const [state, dispatch] = useContext(Context);
    useEffect(() => {
        state.viewVideo.open ? vidRef.current.muted = true : vidRef.current.muted = false;
    }, [state.viewVideo.open]);


    return (

        <div className={cx("video-item_container")}>
            <Link to={`/@${data.user.nickname}`}>
                <div className={cx("avatar-author")}>
                    <Image src={data.user.avatar}></Image>
                </div>
            </Link>
            <div className={cx("video-item_content")}>
                <div className={cx("text-infor_container")}>
                    <div className={cx("author-container")}>
                        <div className={cx("author")} >
                            <Link to={`/@${data.user.nickname}`}>
                                <h3 className={cx("video_author")}>
                                    {data.user.first_name + data.user.last_name}
                                </h3>
                            </Link>
                            <Link to={`/@${data.user.nickname}`}>
                                <h4 className={cx("video_nickname")}>
                                    {data.user.nickname}
                                </h4>
                            </Link>
                        </div>
                        <Button className={cx("button")} follow small outline>Follow</Button>
                        <div className={cx("video-desc")}>
                            <span className={cx("video-desc_txt")}>
                                {data.description}
                            </span>
                        </div>
                        <h4 className={cx("video-music")}>
                            <a href="#">
                                <MusicIcon />
                                {data.music}
                            </a>
                        </h4>
                    </div>
                </div>

                <div className={cx("video-wrapper")}>
                    <div className={cx("video-card_container", {
                        "video-big": data.meta.video.resolution_x > 720,
                        "video-small": data.meta.video.resolution_x < 720 || data.meta.video.resolution_x === 720
                    })}
                    >
                        <div className={cx("video-player_container")}>
                            {isHeart ?
                                <div className={cx("heart")}>
                                    <lottie-player
                                        autoplay
                                        direction={2}
                                        keepLastFrame={true}
                                        mode="normal"
                                        src="https://assets3.lottiefiles.com/packages/lf20_gyuemtq3.json"

                                    >
                                    </lottie-player>
                                </div> : <Fragment />}
                            <video
                                muted
                                autoPlay={"autoplay"}
                                preload="none   "
                                loop
                                playsInline
                                className={cx("video")}
                                ref={vidRef}
                                onDoubleClick={e => handleHeart(e)}
                            >
                                <source type="video/mp4" src={data.file_url} />
                            </video>
                        </div>
                        <div className={cx("video-control")}>
                            <div className={cx("btn-play")}  >
                                <div ref={btnPlayRef} onClick={handlePlay}>
                                    {isPlay ? <PauseIcon /> : <PlayIcon />}
                                </div>
                            </div>
                            <div className={cx("btn-voice", {
                                "btn-voice-big": data.meta.video.resolution_x > 720,

                            })}  >
                                <div className={cx("volume-control")}>
                                    <div ref={progressVol} className={cx("volume-control_progress")}>
                                        <input onChange={e => handleChangVol(e.target.value)} className={cx("volume-control_input")} max={100} min={0} value={vol} type="range" role="slider" />
                                        <div style={{ width: `${widthBar - 12}px` }} ref={volBarRef} className={cx("volume-control_bar")}></div>
                                    </div>
                                </div>
                                <div onClick={handleVoice}> {voice ? <MutedIcon /> : <UnmutedIcon />}</div>
                            </div>
                            {/* <div className={cx("video-seek_container")}>
                                <div className={cx("seek-bar_container")}>
                                    <input className={cx("volume-control_input")} max={100} min={0} value={vol} type="range" role="slider" />
                                    <div style={{ width: "20%" }} ref={volBarRef} className={cx("volume-control_bar")}></div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className={cx("action-container")}>
                        <ButtonAction isHeart={isHeart} data={data} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default memo(VideoItem);