import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.scss";
import { useRef } from "react";
import { ViewIcon, EyeIcon } from "@/components/Icon/Icon";
import { getUserService } from "@/utils/request";
import Context from "@/store/Context";
import { action } from "@/store";
import Loading from "@/components/Loading/Loading";


const cx = classNames.bind(styles);

function FormLogIn({ children }) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [state, dispatch] = useContext(Context)
    const btnRef = useRef();
    const [user, setUser] = useState(null);
    const [isError, setError] = useState(false);
    const onSubmit = ({ email, password }) => {
        const login = async ({ email, password }) => {
            try {
                const user = await getUserService.post("auth/login", { email, password })
                user && localStorage.setItem("user", JSON.stringify(user));
                dispatch(action.setUser(user.data))
                setUser(user)
                return user;
            } catch (err) {
                if (err.response.status === 401) {
                    setError(true)
                }
            }

        }
        login({ email, password });
        dispatch(action.Show(true));
    }

    const handleInputChange = (value) => {
        if (value.length > 0) {
            btnRef.current.disabled = false;
        } else {
            btnRef.current.disabled = true;
            setError(false)
        }
    }
    const [isView, setView] = useState(false);
    const handleViewPassword = () => {
        setView(!isView);
    }

    return (
        <>
            <div className={cx("login-home")}>
                <h2 className={cx("title")}>{children}</h2>
                <div className={cx("form-wrapper")}>
                    <div className={cx("text")}>
                        Email
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={cx("input")}>
                            <input className={cx("field-email")}
                                style={{ backgroundColor: isError && 'rgb(255, 59, 92, 0.2)' }}
                                onInput={e => handleInputChange(e.target.value)}
                                {...register("email", { required: true, pattern: /[^\s@]+@[^\s@]+\.[^\s@]+/gi })}
                                placeholder="Email"
                                type="email"
                                aria-invalid={errors.mail ? "true" : "false"}
                            />
                        </div>
                        <div className={cx("input")}>
                            <input className={cx("field-password")}
                                onInput={e => handleInputChange(e.target.value)}
                                placeholder="Password"
                                type={!isView ? "password" : "text"}
                                {...register("password",
                                    {
                                        required: true,
                                        minLength: { value: 6, message: "This input must exceed 6 characters" }
                                    })
                                }
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password && <p role="alert" className={cx("text-err")} >{errors.password?.message}</p>}
                            <div className={cx("btn-icon")} onClick={handleViewPassword}>
                                {!isView ? <ViewIcon /> : <EyeIcon />}
                            </div>
                        </div>
                        {isError && <p style={{ transform: "translateY(-100%)" }} className={cx("text-err")}>Wrong email or password</p>}
                        <input ref={btnRef} type="submit" disabled className={cx("btn-submit")} value={children} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default FormLogIn;