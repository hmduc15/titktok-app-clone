import { set, useForm } from "react-hook-form";
import classNames from "classnames/bind";
import { useState, useContext, memo } from "react";

import styles from "./Form.module.scss";
import { useRef } from "react";
import { ViewIcon, EyeIcon } from "@/components/Icon/Icon";
import { getUserService } from "@/utils/request";
import Context from "@/store/Context";
import { action } from "@/store";

const cx = classNames.bind(styles);

function FormSignUp({ children }) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const btnRef = useRef();
    const [isError, setError] = useState(false);
    const [user, setUser] = useState(null);
    const [state, dispatch] = useContext(Context)
    const onSubmit = ({ email, password, type }) => {
        const resgister = async ({ email, password, type }) => {
            try {
                const user = await getUserService.post("auth/register", { email, password, type })
                user && localStorage.setItem("user", JSON.stringify(user));
                dispatch(action.setUser(user.data))
                setUser(user);
                return user;
            } catch (err) {
                if (err.response.status === 409) {
                    setError(true);
                }
            }
        }
        resgister({ email, password, type });
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
                            {isError && <p className={cx("text-err")}>This email is already registered</p>}
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
                                    })}
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password && <p role="alert" className={cx("text-err")}>{errors.password?.message}</p>}
                            <div className={cx("btn-icon")} onClick={handleViewPassword}>
                                {!isView ? <ViewIcon /> : <EyeIcon />}
                            </div>
                        </div>
                        <input
                            value="email"
                            type="hidden"
                            name="type"
                            id="type"
                            {...register("type")}
                        />
                        <input ref={btnRef} type="submit" disabled className={cx("btn-submit")} value={children} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default memo(FormSignUp);