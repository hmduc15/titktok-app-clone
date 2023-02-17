import { useLocation, useParams } from "react-router-dom";

import VideoView from "@/components/Video/VideoView/VideoView";
import { useEffect, useState } from "react";
import { getUserService } from "@/utils/request";

function VideoDetail() {
    const location = useLocation();
    const params = useParams();
    const [dataVid, setVideo] = useState({});
    const id = params.idVideo

    const video = async (id) => {
        try {
            const res = await getUserService.get(`videos/${id}`);

        }
        catch (err) {
            console.log(err);
        }
    }
    video(id)
    return (
        <VideoView data={location.state?.dataVid} />
    );
}

export default VideoDetail;