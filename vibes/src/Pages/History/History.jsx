import React from 'react';
import '../Styles.css';
import { useVideo } from '../../Contexts';
import { HeaderText, MainComponent, VideoHorListing, CreatePlaylist } from '../../Components';

const History = () => {
  const { videoState } = useVideo();
  const { history } = videoState;
  return (
    <div>
        <div className="headers dis-flex">
          <HeaderText text={`History - ${history?.length ? history?.length : 0}`} />
        </div>
        <VideoHorListing showHistory={true}/>
        <CreatePlaylist onPlaylist={false}/>
    </div>
  )
}

export { History };