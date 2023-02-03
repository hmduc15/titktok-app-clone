import React, { memo, useEffect } from 'react'
import VideoContainer from "@/components/Video/VideoContainer";
import Provider from '@/store/Provider';
function Home() {
    return (

        <div style={{ height: 'auto' }}>
            <VideoContainer />
        </div>

    )
}

export default memo(Home);