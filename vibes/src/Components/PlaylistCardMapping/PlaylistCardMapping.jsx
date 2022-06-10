import React from 'react';
import { PlaylistCard, Spinner } from '..';
import style from './PlaylistCardMapping.module.css';
import { useVideo, useTheme } from '../../Contexts';
import { Link } from 'react-router-dom';
import Playlist from '../../Assets/Playlist.svg';

const PlaylistCardMapping = () => {
  const { videoState, playlistLoading } = useVideo();
  const { playlists } = videoState;
  const { themeState } = useTheme();
  const { mode } = themeState;
  const empty_text = mode==='light' ? style.empty_text_light : style.empty_text_dark;
  return (
    <div className={`dis-flex ${style.playlist_mapping}`}>
        {playlistLoading ? 
          <Spinner /> 
          : 
          <>
          {
            playlists?.length ?
            playlists?.map(playlist => <PlaylistCard playlist={playlist} key={playlist._id}/>)
            :
            <div className={style.empty_container}>
              <img src={Playlist} alt="No playlist" className={style.empty_image}/> 
              <h4 className={empty_text}>Explore and add videos to playlist</h4>
              <Link to="/explore">Let's vibe</Link>
            </div>
          }
          </>
        }
    </div>
  )
}

export { PlaylistCardMapping };