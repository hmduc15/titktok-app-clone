import React, { memo, useEffect } from 'react'
import VideoContainer from "@/components/Video/VideoContainer";
import Provider from '@/store/Provider';
import Modal from '@/components/Modal/Modal';
function FollowPage() {
    return (
        <div style={{ height: 'auto' }}>
            <VideoContainer props={{ title: 'following' }} />
        </div>

    )
}

export default memo(FollowPage);