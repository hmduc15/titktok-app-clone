import { forwardRef, useEffect, useState } from "react";
import avatar_error from "@/assets/images/avatar_user.png"
import React from "react";

const Image = forwardRef(({ src, ...props }, ref) => {
    const [fallback, setFallback] = useState();
    const handleError = () => {
        setFallback(avatar_error);
    }
    const [url, setUrl] = useState(src);
    useEffect(() => {
        setUrl(src)
    }, [src])

    return <img ref={ref} {...props} src={fallback || url} onError={handleError} alt="" />
})

export default Image; 