import React, { useCallback, useContext, useLayoutEffect } from 'react'
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faCoins, faEllipsisVertical, faLanguage, faMoon, faQuestionCircle, faRightFromBracket, faUser, faVideo, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Avatar from 'react-avatar';


import styles from './Header.module.scss';
import Button from '@/components/Button/Button';
import MenuPopper from '@/components/Popper/MenuPopper/MenuPopper';
import Image from '@/components/Image';
import { InboxIcon, MessagesIcon } from '@/components/Icon/Icon';
import SearhWrapp from '@/components/Search/Search';
import Notification from '@/components/Notice/Notification';
import { memo } from 'react';
import logoLight from '@/assets/images/logo-light.svg';
import Context from '@/store/Context';
import { action } from '@/store';



const cx = classNames.bind(styles);

function Header({ props }) {
    const dataMenu = [
        {
            title: 'English',
            icon: <FontAwesomeIcon icon={faLanguage} />,
            submenu:
            {
                title: 'Language',
                data: [
                    {
                        title: 'English',
                    }, {
                        title: 'VietNamese'
                    }, {
                        title: 'Korean'
                    }, {
                        title: 'Chinese'
                    }, {
                        title: 'Laos'
                    }, {
                        title: 'Spanish'
                    }, {
                        title: 'ThaiLan'
                    }, {
                        title: 'Singapore'
                    }, {
                        title: 'Taiwan'
                    }, {
                        title: 'Japanese'
                    }, {
                        title: 'HongKong'
                    }, {
                        title: 'Russian'
                    }
                ]
            }
        },
        { title: 'Feedback and help', icon: <FontAwesomeIcon icon={faCircleQuestion} /> },
        { title: 'Keyboards and shortcuts', icon: <FontAwesomeIcon icon={faKeyboard} /> },
        { title: 'Dark Mode', icon: <FontAwesomeIcon icon={faMoon} />, classBtn: 'switchBg' }
    ]
    const dataMenuUser = [
        { title: 'View profile', icon: <FontAwesomeIcon icon={faUser} /> },
        { title: 'Get coins', icon: <FontAwesomeIcon icon={faCoins} /> },
        { title: 'LIVE studio', icon: <FontAwesomeIcon icon={faVideo} /> },
        {
            title: 'English', icon: <FontAwesomeIcon icon={faLanguage} />,

            submenu:
            {
                title: 'Language',
                data: [
                    {
                        title: 'English',
                    }, {
                        title: 'VietNamese'
                    }, {
                        title: 'Korean'
                    }, {
                        title: 'Chinaese'
                    }, {
                        title: 'Laos'
                    }, {
                        title: 'Spanish'
                    }, {
                        title: 'ThaiLan'
                    }, {
                        title: 'Singapore'
                    }, {
                        title: 'Taiwan'
                    }, {
                        title: 'Japanese'
                    }, {
                        title: 'HongKong'
                    }, {
                        title: 'Rusian'
                    }
                ]
            }

        },
        { title: 'Feedbacks and help', icon: <FontAwesomeIcon icon={faQuestionCircle} />, },
        { title: 'Keyboars and shortcuts', icon: <FontAwesomeIcon icon={faKeyboard} />, },
        { title: 'Dark mode', icon: <FontAwesomeIcon icon={faMoon} />, classBtn: 'switchBg' },
        { title: 'Logout', icon: <FontAwesomeIcon icon={faRightFromBracket} />, role: 'logout' },
    ]
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [isNotice, setNotice] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).data : null;
    useEffect(() => {
        const updateUser = () => {
            setUser(currentUser)
        }
        updateUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [state, dispatch] = useContext(Context);



    return (
        <header className={cx("wrapper")} style={{ zIndex: 1 }}>
            {isNotice && <Notification>Login Success</Notification>}
            <div className={cx("wrapper-main_fullspace", {
                "wrapper-main": props !== "fullspace"
            })}>
                <div className={cx("logo")}>
                    {state.isDarkMode ? <Link to="/" className={cx("logo-link")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 118 30" width="118" height="42" alt="TikTok"><path fill="#25F4EE" d="M9.875 11.842v-1.119A8.836 8.836 0 008.7 10.64c-4.797-.006-8.7 3.9-8.7 8.707a8.706 8.706 0 003.718 7.135A8.675 8.675 0 011.38 20.55c0-4.737 3.794-8.598 8.495-8.707z"></path><path fill="#25F4EE" d="M10.087 24.526c2.14 0 3.89-1.707 3.966-3.83l.007-18.968h3.462a6.78 6.78 0 01-.109-1.202h-4.727l-.006 18.968a3.978 3.978 0 01-3.967 3.83 3.93 3.93 0 01-1.846-.46 3.949 3.949 0 003.22 1.662zM23.992 8.166V7.111a6.506 6.506 0 01-3.584-1.067 6.572 6.572 0 003.584 2.122z"></path><path fill="#FE2C55" d="M20.41 6.044a6.54 6.54 0 01-1.617-4.316h-1.265a6.557 6.557 0 002.881 4.316zM8.707 15.365a3.98 3.98 0 00-3.974 3.976c0 1.528.87 2.858 2.134 3.523a3.937 3.937 0 01-.754-2.321 3.98 3.98 0 013.973-3.976c.41 0 .805.07 1.176.185v-4.833a8.852 8.852 0 00-1.176-.083c-.07 0-.134.006-.204.006v3.708a3.999 3.999 0 00-1.175-.185z"></path><path fill="#FE2C55" d="M23.992 8.166v3.676a11.25 11.25 0 01-6.579-2.116v9.621c0 4.802-3.903 8.714-8.706 8.714a8.669 8.669 0 01-4.99-1.579 8.69 8.69 0 006.37 2.781c4.796 0 8.706-3.906 8.706-8.714v-9.621a11.25 11.25 0 006.579 2.116v-4.73c-.479 0-.939-.052-1.38-.148z"></path><path fill="white" d="M17.413 19.348V9.726a11.25 11.25 0 006.58 2.116V8.166a6.572 6.572 0 01-3.584-2.122 6.611 6.611 0 01-2.887-4.316h-3.463l-.006 18.968a3.978 3.978 0 01-3.967 3.83 3.99 3.99 0 01-3.225-1.656 3.991 3.991 0 01-2.134-3.523A3.98 3.98 0 018.7 15.372c.409 0 .805.07 1.176.185v-3.708c-4.702.103-8.496 3.964-8.496 8.701 0 2.29.888 4.373 2.338 5.933a8.669 8.669 0 004.989 1.58c4.797 0 8.706-3.913 8.706-8.715zM30.048 8.179h14.775l-1.355 4.232h-3.832v15.644h-4.778V12.41l-4.804.006-.006-4.238zM69.032 8.179h15.12l-1.354 4.232h-4.172v15.644h-4.784V12.41l-4.803.006-.007-4.238zM45.73 14.502h4.733v13.553h-4.708l-.026-13.553zM52.347 8.128h4.733v9.257l4.689-4.61h5.647l-5.934 5.76 6.643 9.52h-5.213l-4.433-6.598-1.405 1.362v5.236h-4.733V8.128h.006zM102.49 8.128h4.734v9.257l4.688-4.61h5.647l-5.934 5.76 6.643 9.52h-5.206l-4.433-6.598-1.405 1.362v5.236h-4.734V8.128zM48.093 12.954a2.384 2.384 0 10-.002-4.771 2.384 2.384 0 00.002 4.771z"></path><path fill="#25F4EE" d="M83.544 19.942a8.112 8.112 0 017.474-8.087 8.748 8.748 0 00-.709-.026c-4.478 0-8.106 3.631-8.106 8.113 0 4.482 3.628 8.113 8.106 8.113.21 0 .498-.013.71-.026-4.178-.326-7.475-3.823-7.475-8.087z"></path><path fill="#FE2C55" d="M92.858 11.83c-.217 0-.505.012-.715.025a8.111 8.111 0 017.467 8.087 8.111 8.111 0 01-7.467 8.087c.21.02.498.026.715.026 4.478 0 8.106-3.631 8.106-8.113 0-4.482-3.628-8.113-8.106-8.113z"></path><path fill="white" d="M91.58 23.887a3.94 3.94 0 01-3.94-3.945 3.94 3.94 0 117.882 0c0 2.18-1.77 3.945-3.941 3.945zm0-12.058c-4.477 0-8.105 3.631-8.105 8.113 0 4.482 3.628 8.113 8.106 8.113 4.477 0 8.106-3.631 8.106-8.113 0-4.482-3.629-8.113-8.106-8.113z"></path></svg>
                    </Link> : <img src={logoLight} alt="" />}
                </div>
                <div className={cx("wrapper-input")}>
                    <SearhWrapp />
                </div>
                <div className={cx("wrapper-user")}>
                    <div className={cx("upload-icon_container")}>
                        <Button to="/upload" upload>
                            <svg className={cx("icon_upload")} width="1em" data-e2e="" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8 2.5C7.58579 2.5 7.25 2.83579 7.25 3.25V7.25H3.25C2.83579 7.25 2.5 7.58579 2.5 8C2.5 8.41421 2.83579 8.75 3.25 8.75H7.25V12.75C7.25 13.1642 7.58579 13.5 8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75V8.75H12.75C13.1642 8.75 13.5 8.41421 13.5 8C13.5 7.58579 13.1642 7.25 12.75 7.25H8.75V3.25C8.75 2.83579 8.41421 2.5 8 2.5Z"></path></svg>
                            <span className={cx("upload-txt")}>
                                Upload
                            </span>
                        </Button>
                    </div>

                    {!user ? (
                        <div className={cx("action")}>
                            <div className={cx("login-container")}>
                                <Button login onClick={() => {
                                    dispatch(action.openLogin(true))
                                    document.querySelector("body").classList.add(cx("hidden"))
                                }} >
                                    <span className={cx("upload-txt")}>
                                        Login
                                    </span>
                                </Button>
                            </div>
                            <div className={cx("more-icon_wrap")}>
                                <MenuPopper items={dataMenu}>
                                    <button className={cx("btn-more")}>
                                        <FontAwesomeIcon className={cx("more-icon")} icon={faEllipsisVertical} />
                                    </button>
                                </MenuPopper>
                            </div>
                        </div>
                    ) : (
                        <div className={cx("user-action")}>
                            <Tippy
                                content="Messages"
                                placement="bottom"
                            >
                                <div className={cx("messages-icon_container")}>

                                    <span>
                                        <MessagesIcon className="icon-message" />
                                    </span>

                                </div>
                            </Tippy>
                            <Tippy
                                content="Inbox"
                                placement="bottom"

                            >
                                <div className={cx("inbox-icon_container")}>
                                    <a href="/">
                                        <span>
                                            <InboxIcon className="icon-inbox" width="3.2rem" height="3.2rem" />
                                        </span>
                                    </a>
                                </div>
                            </Tippy>
                            <div className={cx("profile")}>
                                <MenuPopper items={dataMenuUser}>
                                        <Image src={user.avatar} alt="avatar" className={cx("profile-avatar")} />
                                       
                                </MenuPopper>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default memo(Header);