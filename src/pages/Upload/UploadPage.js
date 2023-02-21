/* eslint-disable jsx-a11y/no-redundant-roles */
// eslint-disable-next-line jsx-a11y/aria-role
import React, { useState, useRef } from 'react'
import classNames from 'classnames/bind';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import styles from "./Upload.module.scss";
import { videoService } from './Service/postVideo';
import { UploadIcon } from '@/components/Icon/Icon';
import phone from "@/assets/images/phone.png";

const cx = classNames.bind(styles);


function UploadPage() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [file, setFile] = useState("");
    const [filePreview, setFilePreview] = useState("");
    const [caption, setCaption] = useState("");
    const [notice, setNotice] = useState(false);
    const navigate = useNavigate();

    const handleFile = (e) => {
        const src = URL.createObjectURL(e.target.files[0]);
        setFilePreview(src)
        setFile(e.target.files[0]);
    }

    const handleUploadVideo = async (data) => {
        try {
            await videoService.postVideo(data);
            setNotice(true)
        }
        catch (error) {
            console.log(error)
        }
    }


    const onSubmit = (data) => {
        const dataRequest = { ...data, upload_file: file }

        const formData = new FormData();

        for (const key in dataRequest) {
            if (key === "allows") {
                if (dataRequest[key])
                    dataRequest.allows.forEach(function (value) {
                        formData.append("allows[]", value);
                    });
            } else {
                formData.append(key, dataRequest[key]);
            }
        }
        handleUploadVideo(formData);
    }


    return (
        <div>
            <form className={cx("form-upload")} onSubmit={handleSubmit(onSubmit)} >
                <div className={cx("form-header")}>
                    <h2 className={cx("form-title")}>Upload video</h2>
                    <p className={cx("form-subtitle")}>Post a video to your account </p>
                </div>
                <div className={cx("form-body")}>
                    <div className={cx("upload-container")}>
                        <>
                            <input
                                type="file"
                                id='upload_file'
                                name='upload_file'
                                accept="video/*"
                                required
                                className={cx("upload-input")}
                                onChange={handleFile}
                            />
                            {!file ?
                                <label htmlFor="upload_file" >
                                    <div className={cx("upload-card")}>
                                        <UploadIcon />
                                        <div className={cx("text-main")}>
                                            <span>Select video to upload</span>
                                        </div>
                                        <div className={cx("text-sub")}>
                                            <span>Or drag and drop file</span>
                                        </div>
                                        <div className={cx("text-video")}>
                                            <div className={cx("text-sub_video")}>
                                                <span>MP4 or WebM</span>
                                            </div>
                                            <div className={cx("text-sub_video")}>
                                                <span>720x1280 resolution or higher</span>
                                            </div>
                                            <div className={cx("text-sub_video")}>
                                                <span>Up to 30 minutes</span>
                                            </div>
                                            <div className={cx("text-sub_video")}>
                                                <span>Less than 2 GB</span>
                                            </div>
                                        </div>
                                        <div className={cx("file-select-btn")}>
                                            <div role="button" className={cx("file-btn")}>
                                                <span>Select file</span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                :
                                <div className={cx("video-preview")}>
                                    <div className={cx("phone-frame")}
                                        style={{ backgroundImage: `url(${phone})` }}
                                    ></div>
                                    <video
                                        autoPlay={"autoplay"}
                                        loop
                                        playsInline
                                        className={cx("video")}
                                    >
                                        <source type="video/mp4" src={filePreview} />
                                    </video>
                                </div>
                            }


                        </>
                    </div>
                    <div className={cx("upload-content")}>
                        <div className={cx("upload-form_item")}>
                            <div className={cx("upload-form_title")}>
                                <span className={cx("text-title")}>Caption</span>
                                <span className={cx("text-count")}>{caption.length} / 150</span>
                            </div>
                            <div className={cx("upload-form_content")}>
                                <textarea {...register("description")} name="description"
                                    id="description" maxLength={150}
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className={cx("upload-form_item")}>
                            <div className={cx("upload-form_title")}>
                                <span className={cx("text-title")}>Cover</span>
                            </div>
                            <div className={cx("upload-form_content")}>
                                <input type="number"
                                    name="thumbnail_time"
                                    placeholder='Thumbnail capture position, units of seconds (Ex: 2)'
                                    value={1}
                                    id="thumbnail_time"
                                    className={cx("form-input")}
                                    {...register("thumbnail_time")}

                                />
                            </div>
                        </div>
                        <div className={cx("upload-form_item")}>
                            <div className={cx("upload-form_title")}>
                                <span className={cx("text-title")}>Music</span>
                            </div>
                            <div className={cx("upload-form_content")}>
                                <input {...register("music")} type="text" name="music"
                                    id="music" placeholder='Your music' className={cx("form-input")} />
                            </div>
                        </div>
                        <div className={cx("upload-form_item")}>
                            <div className={cx("upload-form_title")}>
                                <span className={cx("text-title")}>Who can watch this video</span>
                            </div>
                            <div className={cx("upload-form_content")}>
                                <select name="viewable"
                                    id="viewable" className={cx("form-select")}
                                    {...register("viewable")}
                                >
                                    <option value="public">Public</option>
                                    <option value="friends">Friends</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx("upload-form_item")}>
                            <div className={cx("upload-form_title")}>
                                <span className={cx("text-title")}>Allow users to</span>
                            </div>
                            <div className={cx("upload-form_content")}>
                                <div className={cx("form-checkbox")}>
                                    <input type="checkbox" id='allows' name="allows" {...register("allows")} value="comment" defaultChecked />
                                    <label htmlFor=''>Comment</label>
                                </div>
                                <div className={cx("form-checkbox")}>
                                    <input type="checkbox" id='allows' name="allows" {...register("allows")} value="duet" defaultChecked />
                                    <label htmlFor='' >Duet</label>
                                </div>
                                <div className={cx("form-checkbox")}>
                                    <input type="checkbox" id='allows' name="allows" {...register("allows")} value="stitch" defaultChecked />
                                    <label htmlFor='' >stitch</label>
                                </div>
                            </div>
                        </div>
                        <div className={cx("form-btn_container")}>
                            <button type="button" className={cx("btn-form")}>
                                <span>Discard</span>
                            </button>
                            <button type="submit"
                                className={cx("btn-form")}
                                style={{ backgroundColor: file ? 'rgba(254, 44, 85, 1)' : 'rgba(235, 235, 235, 1)', color: file ? 'rgba(255,255,255,1' : 'rgba(22,24,35,0.34)' }}
                                disabled={!file || false} >
                                <span>Post</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UploadPage;