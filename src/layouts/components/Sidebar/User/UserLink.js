import React from 'react'
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import Tippy from "@tippyjs/react/headless";


import styles from "./User.module.scss";
import { Link } from "react-router-dom";
import Profile from "./Profile/ProfileTippy";
import { createContext } from "react";
import Image from '@/components/Image';


const cx = classNames.bind(styles);

function UserLink({ data, title }) {
    const UserContext = createContext();
    var fullName = data.first_name + data.last_name;
    return (
        <div>
            {title === "Suggested accounts" ? (
                <Tippy
                    interactive
                    placement="bottom-start"
                    animation={false}
                    offset={[-13, 0]}
                    delay={[1000, 100]}
                    render={(attrs) => (
                        <Profile data={data} attrs={attrs} />
                    )
                    }
                >
                    <div className={cx("user-link_container")}>
                        <Link to={`/@${data.nickname}`} >
                            <div className={cx("user-avatar")}>
                                <span shape="circle" className={cx("span-avatar")} >
                                    <Image src={data.avatar} ></Image>
                                </span>
                            </div>
                        </Link>
                        <Link to={`/@${data.nickname}`} className={cx("user-content_link")}>
                            <div className={cx("user-title_wrapper")}>
                                <h4 className={cx("user-title_name")}>{fullName}</h4>
                            </div>
                            <p className={cx("user-desc")}>{data.nickname}</p>
                        </Link>
                    </div>
                </Tippy>
            ) : (
                <div className={cx("user-link_container")}>
                    <Link to={`/@${data.nickname}`}>
                        <div className={cx("user-avatar")}>
                            <span shape="circle" className={cx("span-avatar")} >
                                <Image alt="avatar" src={data.avatar} />
                            </span>
                        </div>
                    </Link>
                    <Link to={`/@${data.nickname}`} className={cx("user-content_link")}>
                        <div className={cx("user-title_wrapper")}>
                            <h4 className={cx("user-title_name")}>{fullName}</h4>
                        </div>
                        <p className={cx("user-desc")}>{data.nickname}</p>
                    </Link>
                </div>
            )}
        </div>
    );
}
UserLink.propTypes = {
    data: PropTypes.object.isRequired,
}

export default UserLink;