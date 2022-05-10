import React from 'react';
import { Link } from 'react-router-dom';
import { useVideo } from '../../Contexts';
import style from './PlaylistCard.module.css';

const PlaylistCard = ({playlist}) => {
  return (
    <Link to={`/playlist/${playlist._id}`} className="btn-link">  
      <div className={`centered ${style.playlist_card}`}>
        {playlist.title}
      </div>
    </Link>
  )
}

export { PlaylistCard };