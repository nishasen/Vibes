import React from 'react';
import { PlaylistCard } from '..';
import style from './PlaylistCardMapping.module.css';
import { useVideo } from '../../Contexts';

const PlaylistCardMapping = () => {
  const { videoState, playlistLoading } = useVideo();
  const { playlists } = videoState;
  return (
    <div className={`dis-flex ${style.playlist_mapping}`}>
        {playlistLoading ? <Spinner /> : playlists?.map(playlist => <PlaylistCard playlist={playlist}/>)}
    </div>
  )
}

export { PlaylistCardMapping };