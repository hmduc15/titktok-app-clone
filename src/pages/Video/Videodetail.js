import { useLocation, useParams } from "react-router-dom";

import VideoView from "@/components/Video/VideoView/VideoView";

function VideoDetail() {
    const location = useLocation();
    const params = useParams();
    console.log(params);
    return (
        <VideoView data={location.state?.dataVid} />
    );
}

export default VideoDetail;