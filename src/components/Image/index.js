import { forwardRef, useState } from "react";
import avata_error from "@/assets/images/avata_error.png"

const Image = forwardRef(({ src, ...props }, ref) => {
    const [fallback, setFallback] = useState();
    const handleError = () => {
        setFallback(avata_error);
    }

    return <img ref={ref} {...props} src={fallback || src} onError={handleError} alt="" />
})

export default Image; 