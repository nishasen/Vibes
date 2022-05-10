import React from 'react';
import { Spinner, VideoCard } from '..';
import { useVideo } from '../../Contexts';
import './ExploreMapping.css';

const ExploreMapping = () => {
  const { Videos, videoLoading } = useVideo();
  return (
    <div className="videos-mapping">
        {videoLoading ? <Spinner /> : Videos.map(video => <VideoCard video={video} key={video._id}/>)}
    </div>
  )
}

export { ExploreMapping };