import React from 'react'
import classNames from 'classnames/bind';
import { useForm } from "react-hook-form";

import styles from "./Upload.module.scss";
import Image from '@/components/Image';
import src from '@/assets/images/logo-upload.svg'
import { UploadIcon } from '@/components/Icon/Icon';

const cx = classNames.bind(styles);


function UploadPage() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    return (
        <div>
            <form className={cx("form-upload")}>
                <div className={cx("form-header")}>
                    <h2 className={cx("form-title")}>Upload video</h2>
                    <p className={cx("form-subtitle")}>Post a video to your account </p>
                </div>
                <div className={cx("form-body")}>
                    <div className={cx("upload-container")}>
                        <input type="file" id='upload_file' accept="video/*" className={cx("upload-input")} />
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
                                    <button className={cx("file-btn")}>
                                        <span>Select file</span>
                                    </button>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className={cx("upload-content")}>
                        <div className={cx("upload-form_item")}>
                            <div className={cx("upload-form_title")}>
                                <span className={cx("text-title")}>Caption</span>
                                <span className={cx("text-count")}>0 / 150</span>
                            </div>
                            <div className={cx("upload-form_content")}>
                                <textarea maxLength={150} name="description"></textarea>
                            </div>
                        </div>
                        <div className={cx("upload-form_item")}>
                            <div className={cx("upload-form_title")}>
                                <span className={cx("text-title")}>Cover</span>
                            </div>
                            <div className={cx("upload-form_content")}>
                                <input type="number" name="thumbnail_time" placeholder='Thumbnail capture position, units of seconds (Ex: 2)' defaultValue={1} className={cx("form-input")} />
                            </div>
                        </div>
                        <div className={cx("upload-form_item")}>
                            <div className={cx("upload-form_title")}>
                                <span className={cx("text-title")}>Music</span>
                            </div>
                            <div className={cx("upload-form_content")}>
                                <input type="text" name="music" placeholder='Your music' className={cx("form-input")} />
                            </div>
                        </div>
                        <div className={cx("upload-form_item")}>
                            <div className={cx("upload-form_title")}>
                                <span className={cx("text-title")}>Who can watch this video</span>
                            </div>
                            <div className={cx("upload-form_content")}>
                                <select className={cx("form-select")}>
                                    <option defaultValue="public">Public</option>
                                    <option defaultValue="friends">Friends</option>
                                    <option defaultValue="private">Private</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx("upload-form_item")}>
                            <div className={cx("upload-form_title")}>
                                <span className={cx("text-title")}>Allow users to</span>
                            </div>
                            <div className={cx("upload-form_content")}>
                                <div className={cx("form-checkbox")}>
                                    <input type="checkbox" name="allows" defaultValue="comment" defaultChecked />
                                    <label>Comment</label>
                                </div>
                                <div className={cx("form-checkbox")}>
                                    <input type="checkbox" name="allows" defaultValue="duet" defaultChecked />
                                    <label >Duet</label>
                                </div>
                                <div className={cx("form-checkbox")}>
                                    <input type="checkbox" name="allows" defaultValue="switch" defaultChecked />
                                    <label >Switch</label>
                                </div>
                            </div>
                        </div>
                        <div className={cx("form-btn_container")}>
                            <button className={cx("btn-form")}>
                                <span>Discard</span>
                            </button>
                            <button className={cx("btn-form")} disabled={true}>
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