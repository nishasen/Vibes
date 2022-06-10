import React from 'react';
import '../Styles.css';
import { HeaderText, MainComponent, VideoHorListing, CreatePlaylist } from '../../Components';
import { useVideo } from '../../Contexts';

const WatchLater = () => {
  const { videoState } = useVideo();
  const { watchLater } = videoState;
  return (
    <div>
        <div className="headers dis-flex"><HeaderText text={`Watch later - ${watchLater?.length ? watchLater?.length : 0}`} /></div>
        <VideoHorListing showWatchLater={true}/>
        <CreatePlaylist onPlaylist={false}/>
    </div>
  )
}

export { WatchLater };