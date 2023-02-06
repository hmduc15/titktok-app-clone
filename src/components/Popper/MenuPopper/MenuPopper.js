import React from 'react'
import classNames from "classnames/bind";
import { useState, useRef } from "react";

import styles from '../Popper.module.scss';
import Header from "./Header";
import MenuItems from './MenuItems'
import Tippy from "@tippyjs/react";
import { auth } from "@/services/firebase";
import { roundArrow } from 'tippy.js';
import 'tippy.js/dist/svg-arrow.css';
import { ArrowIcon } from '@/components/Icon/Icon';
import { memo } from 'react';

const cx = classNames.bind(styles);


function MenuPopper({ children, items, MainMenu, SubMenu }) {
    const [menu, setMenu] = useState([{ data: items }])
    const current = menu[menu.length - 1]
    const divRef = useRef();

    const render = () => {
        return (

            <div ref={divRef} className={cx('menu-body')}>
                {
                    current.data.map((item, index) => {
                        const isSubmenu = !!item.submenu;
                        const isBtnLogout = !!item.role;
                        return <MenuItems key={index} data={item}
                            onClick={
                                () => {
                                    if (isSubmenu) {
                                        divRef.current.classList.add(cx("scroll"))
                                        setMenu(prev => [...prev, item.submenu]);
                                    }
                                    if (isBtnLogout) {
                                        auth.signOut();
                                        window.location.reload();
                                        localStorage.removeItem("currentUser");
                                    }
                                }
                            }
                        />
                    })
                }
            </div>

        )
    }

    return (
        <Tippy

            interactive
            offset={[20, 16]}
            trigger="mouseenter"
            arrow
            // arrowType="sharp"
            // arrowTransform="scale(0.7)"
            animation={false}
            delay={[0, 500]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx("wrapper")} tabIndex="-1" {...attrs} >
                    <ArrowIcon className={cx("arrow-icon")} />
                    {menu.length > 1 && <Header title="Language" onBack={() => {
                        divRef.current.classList.remove(cx("scroll"))
                        setMenu([{ data: items }])
                    }} />}
                    {render()}
                </div>
            )
            }
            onHide={() => setMenu(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy>

    );
}

export default memo(MenuPopper);