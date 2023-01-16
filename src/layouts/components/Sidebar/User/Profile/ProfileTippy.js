import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Button from "@/components/Button/Button";

import styles from "./Profile.module.scss";
import Image from "@/components/Image";

const cx = classNames.bind(styles);

function Profile({ data, attrs }) {
    var fullName = data.first_name + data.last_name;
    return (
        <div className={cx("profile-container")} tabIndex="-1" {...attrs} >
            <div className={cx("profile-header")}>
                <Link to={`@/${data.nickname}`}>
                    <span className={cx("profile-avatar")}>
                        <Image alt="avatar" src={data.avatar} />
                    </span>
                </Link>
                <Button followFill>Follow</Button>
            </div>
            <a href="/@duc" className={cx("profile-content_link")}>
                <div className={cx("profile-title_wrapper")}>
                    <h4 className={cx("profile-title_name")}>{fullName}</h4>
                </div>
                <p className={cx("profile-desc")}>{data.nickname}</p>
            </a>
            <p className={cx("profile-stat")}>
                <span className={cx("profile-stat_text")}>{data.followers_count}</span>
                <span className={cx("profile-stat_desc")}>Followers</span>
                <span className={cx("profile-stat_text")}>{data.likes_count}</span>
                <span className={cx("profile-stat_desc")}>Likes</span>
            </p>
        </div>
    );
}

export default Profile;