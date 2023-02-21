/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

import { getUserService } from "@/utils/request";
import Image from "@/components/Image";
import Button from "@/components/Button/Button";
import VideoUser from "./VideoUser/VideoUser";
import { SkeletonUser } from "@/components/Skeleton/skeleton";
import { EditIcon, CloseIcon } from "@/components/Icon/Icon";
import handleFollowUser from "@/utils/follow_request";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userService } from "./Services/updateProfile";

const cx = classNames.bind(styles)
function ProfilePage() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [lineTab, setLineTab] = useState(false);
    const [isMe, setIsMe] = useState(false);
    const params = useParams();
    const name = user.first_name + ' ' + user.last_name || user.nickname;

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
        if (id.slice(1, id.length) === JSON.parse(localStorage.getItem('user'))?.data.nickname) {
            setIsMe(true)
        } else {
            setIsMe(false);
        }
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    const handleFollow = async () => {
        const isFollowed = await handleFollowUser(user);
        setUser((user) => ({ ...user, is_followed: isFollowed }));
    }

    const [isOpen, setOpen] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [file, setFile] = useState("");
    const [filePreview, setFilePreview] = useState("");
    const [bio, setBio] = useState("");
    const btnSaveRef = useRef();
    const [firstName, setFirstName] = useState(JSON.parse(localStorage.getItem('user'))?.data.first_name);
    const [lastName, setLastName] = useState(JSON.parse(localStorage.getItem('user'))?.data.last_name);


    useEffect(() => {
        setFilePreview(filePreview)
    }, [filePreview])

    const handleOnChange = (e) => {
        if (e.length > 0) {
            btnSaveRef.current.disabled = false;
        }
    }

    const handleChangeFile = (e) => {
        const src = URL.createObjectURL(e.target.files[0]);
        btnSaveRef.current.disabled = false;
        setFilePreview(src)
        setFile(e.target.files[0]);
    }
    const handleUpdateProfile = async (data) => {
        try {
            const res = await userService.update(data);
            notify();
            setTimeout(() => {
                setOpen(false);
                window.location.reload(false);
            }, 3000)
        } catch (err) {
            console.log(err)
        }
    }
    const notify = () => {
        toast.success("Update profile success!");
    }


    const onSubmit = (data) => {
        const dataRequest = { ...data, avatar: file };
        const form = new FormData();
        for (const key in dataRequest) {
            form.append(key, dataRequest[key]);
        }
        handleUpdateProfile(form)
    }

    return (
        <>
            <ToastContainer
                className={cx("toast_message")}
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                pauseOnHover={false}
                closeOnClick
                rtl={false}
                theme="dark"
            />
            {isOpen && <div className={cx("modal-container")}>
                <div className={cx("modal-mask")}>
                    <div className={cx("container")}>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className={cx("form-header")}>
                                <h2 className={cx("title")}>Edit profile</h2>
                                <div className={cx("icon")} onClick={() => {
                                    setFile(null)
                                    setOpen(false);
                                }}>
                                    <CloseIcon />
                                </div>
                            </div>
                            <div className={cx("form-body")}>
                                <div className={cx("form-item")} style={{ borderTop: 'none' }}>
                                    <p className={cx("form-item_title")}>Profile photo</p>
                                    <label htmlFor="avatar">
                                        <div className={cx("edit-profile_avatar")}>
                                            {file ?
                                                <div className={cx("avatar")}>
                                                    <img src={filePreview} alt="avatar" />
                                                </div>
                                                :
                                                <div className={cx("avatar")}>
                                                    <Image src={user.avatar} alt={user.avatar} />
                                                </div>
                                            }
                                            <div className={cx("btn-edit")}>
                                                <div className={cx("btn-edit_icon")}>
                                                    <EditIcon />
                                                </div>
                                                <input
                                                    {...register("avatar")}
                                                    className={cx("form-input")}
                                                    name="avatar" id="avatar"
                                                    type="file" accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
                                                    onChange={handleChangeFile}
                                                />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className={cx("form-item")}>
                                    <p className={cx("form-item_title")}>First name</p>
                                    <div className={cx("form-content")}>
                                        <input
                                            value={firstName}
                                            {...register("first_name")}
                                            name="first_name"
                                            placeholder={JSON.parse(localStorage.getItem('user')).data.first_name}
                                            type="text"
                                            className={cx("form-input")}
                                            onChange={e => {
                                                handleOnChange(e.target.value);
                                                setFirstName(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={cx("form-item")}>
                                    <p className={cx("form-item_title")}>Last name</p>
                                    <div className={cx("form-content")}>
                                        <input
                                            value={lastName}
                                            {...register("last_name")}
                                            name="last_name"
                                            placeholder={JSON.parse(localStorage.getItem('user'))?.data.last_name}
                                            type="text"
                                            className={cx("form-input")}
                                            onChange={e => {
                                                handleOnChange(e.target.value);
                                                setLastName(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={cx("form-item")}>
                                    <p className={cx("form-item_title")}>Bio</p>
                                    <div className={cx("form-content")}>
                                        <textarea

                                            {...register("bio")}
                                            name="bio"
                                            placeholder={JSON.parse(localStorage.getItem('user'))?.data.bio}
                                            maxLength={80}
                                            value={bio}
                                            onChange={(e) => {
                                                setBio(e.target.value)
                                                handleOnChange(e.target.value)
                                            }}
                                        >
                                        </textarea>
                                        <p className={cx("text-count")}>{bio.length}/80</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("form-bottom")}>
                                <div className={cx("form-btn")}>
                                    <button className={cx("btn-cancel")}
                                        onClick={() => {
                                            setFile(null)
                                            setOpen(false);
                                        }}
                                    >Cancel
                                    </button>
                                    <button ref={btnSaveRef} disabled className={cx("btn-save")} type="submit">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
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
                                    {name}
                                </h2>
                                <h1 className={cx("profile-subtitle")}>{user.nickname}</h1>
                                {isMe ?
                                    <div className={cx("profile-btn")}>
                                        <Button btnEdit onClick={() => {
                                            setOpen(true)
                                        }} >
                                            <EditIcon />
                                            Edit Profile
                                        </Button>
                                    </div>

                                    :
                                    <div className={cx("profile-btn")} onClick={() => handleFollow(user)}>
                                        {user.is_followed ?
                                            <Button followFill followingFill >Following</Button>
                                            :
                                            <Button followFill>Follow</Button>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <h2 className={cx("profile-count_infos")}>
                            <div className={cx("count")}>
                                <strong className={cx("infos-number")}>{user.followings_count}</strong>
                                <span className={cx("infos-text")}>Following</span>
                            </div>
                            <div className={cx("count")}>
                                <strong className={cx("infos-number")}>{user.followers_count}</strong>
                                <span className={cx("infos-text")}>Followers</span>
                            </div>
                            <div className={cx("count")}>
                                <strong className={cx("infos-number")}>{user.likes_count}</strong>
                                <span className={cx("infos-text")}>Likes</span>
                            </div>
                        </h2>
                        <h2 className={cx("profile-bio")}>
                            {user.bio.length > 0 ? user.bio : <p>No bio yet.</p>}
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