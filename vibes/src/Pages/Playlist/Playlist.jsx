import React from 'react';
import '../Styles.css';
import { CreatePlaylist, HeaderText, MainComponent,PlaylistCardMapping } from '../../Components';
import { BsPlusLg } from 'react-icons/bs';
import { useVideo } from '../../Contexts';

const Playlist = () => {
  const { openPlaylistDialog, videoState } = useVideo();
  const { playlists } = videoState;
  return (
    <div>
        <MainComponent />
        <div className="headers dis-flex">
          <HeaderText text={`Playlist - ${playlists?.length ? playlists?.length : 0}`} />
          <div className="playlist-button" onClick={()=>openPlaylistDialog(true)}><BsPlusLg size={25} /></div>
        </div>
        <PlaylistCardMapping />
        <CreatePlaylist onPlaylist={true}/>
    </div>
  )
}

export { Playlist };