import { useState } from "react";
import { CloseIcon, EditIcon } from "@/components/Icon/Icon";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";

import styles from './FormUser.module.scss';
import Image from "@/components/Image";
import src from '@/assets/images/avatar_user.png';
import { userService } from "./Services/updateProfile";

const cx = classNames.bind(styles);

function FormEditProfile() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [file, setFile] = useState("");

    const handleChangeFile = (e) => {
        setFile(e.target.file[0]);
    }
    const handleUpdateProfile = async (data) => {
        try {
            const res = await userService.update(data);
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    const onSubmit = (data) => {
        const dataRequest = { ...data, avatar: file };

        const form = new FormData();
        for (const key in dataRequest) {
            form.append(key, dataRequest[key]);
        }
    }



    return (
        <div className={cx("modal-container")}>
            <div className={cx("modal-mask")}>
                <div className={cx("container")}>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className={cx("form-header")}>
                            <h2 className={cx("title")}>Edit profile</h2>
                            <div className={cx("icon")}>
                                <CloseIcon />
                            </div>
                        </div>
                        <div className={cx("form-body")}>
                            <div className={cx("form-item")} style={{ borderTop: 'none' }}>
                                <p className={cx("form-item_title")}>Profile photo</p>
                                <label htmlFor="avatar">
                                    <div className={cx("edit-profile_avatar")}>
                                        <div className={cx("avatar")}>
                                            <Image src={src} />
                                        </div>
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
                                        {...register("first_name")}
                                        name="first_name"
                                        placeholder="First name"
                                        type="text"
                                        className={cx("form-input")} />
                                </div>
                            </div>
                            <div className={cx("form-item")}>
                                <p className={cx("form-item_title")}>Last name</p>
                                <div className={cx("form-content")}>
                                    <input
                                        {...register("last_name")}
                                        name="last_name"
                                        placeholder="Last name"
                                        type="text"
                                        className={cx("form-input")} />
                                </div>
                            </div>
                            <div className={cx("form-item")}>
                                <p className={cx("form-item_title")}>Bio</p>
                                <div className={cx("form-content")}>
                                    <textarea
                                        {...register("bio")}
                                        name="bio"
                                        placeholder="Bio"
                                        maxLength={80}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className={cx("form-bottom")}>
                            <div className={cx("form-btn")}>
                                <button className={cx("btn-cancel")}>Cancel</button>
                                <button className={cx("btn-save")} type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormEditProfile;