import React from 'react';
import { CreatePlaylist, HeaderText, MainComponent, VideoHorListing } from '../../Components';
import { useVideo } from '../../Contexts';
import '../Styles.css';

const Liked = () => {
  const { videoState } = useVideo();
  const { liked } = videoState;
  return (
    <div>
        <MainComponent />
        <div className="headers dis-flex"><HeaderText text={`Liked - ${liked?.length ? liked?.length : 0}`} /></div>
        <VideoHorListing showLiked={true}/>
        <CreatePlaylist onPlaylist={false}/>
    </div>
  )
}

export { Liked };