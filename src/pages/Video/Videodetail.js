import { useLocation } from "react-router-dom";

import VideoView from "@/components/Video/VideoView/VideoView";


function VideoDetail() {
    const location = useLocation();
    console.log(location.state?.data);
    return (
        <VideoView data={location.state?.data} />
    );
}

export default VideoDetail;