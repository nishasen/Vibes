import React from 'react';
import { HorizontalCard, Spinner } from '..';
import { useTheme, useVideo } from '../../Contexts';
import style from './VideoHorListing.module.css';
import Likes from '../../Assets/Likes.svg'
import WatchLater from '../../Assets/WatchLater.svg';
import PlaylistListing from '../../Assets/PlaylistListing.svg';
import History from '../../Assets/History.svg';
import { Link } from 'react-router-dom';

const VideoHorListing = ({showLiked, showPlaylist, showWatchLater, showHistory, playlistVideo, playlistLoading}) => {
  const { videoState, likedLoading, watchLaterLoading, historyLoading } = useVideo();
  const { liked, watchLater, history } = videoState;
  const { themeState } = useTheme();
  const { mode } = themeState;
  const empty_text = mode==='light' ? style.empty_text_light : style.empty_text_dark;
  return (
    <div className={`dis-flex ${style.video_listing}`}>
        {showLiked && 
        <>
          {likedLoading ? 
          <Spinner /> 
          : 
          <>
          {liked?.length ? 
            liked?.map((video, index) => <HorizontalCard key={video._id} video={video} index={index+1} likedCard={true} />)
            :
            <div className={style.empty_container}>
              <img src={Likes} alt="No likes" className={style.empty_image}/> 
              <h4 className={empty_text}>Explore and add videos to likes</h4>
              <Link to="/explore">Let's vibe</Link>
            </div>
          }
          </>}
        </>  
        }
        {showWatchLater &&
        <>
          {watchLaterLoading ? 
          <Spinner /> 
          : 
          <>
          {watchLater?.length ?
            watchLater?.map((video, index) => <HorizontalCard key={video._id} video={video} index={index+1} watchLaterCard={true}/>)
            :
            <div className={style.empty_container}>
              <img src={WatchLater} alt="No watch later" className={style.empty_image}/> 
              <h4 className={empty_text}>Explore and add videos to watch later</h4>
              <Link to="/explore">Let's vibe</Link>
            </div>
          }
          </>}
        </>
        }
        {showHistory && 
        <>
          {historyLoading ? 
          <Spinner /> 
          : 
          <>
          {history?.length ?
            history?.map((video, index) => <HorizontalCard key={video._id} video={video} index={index+1} historyCard={true}/>)
            :
            <div className={style.empty_container}>
              <img src={History} alt="No history" className={style.empty_image}/> 
              <h4 className={empty_text}>Watch videos to add videos in history</h4>
              <Link to="/explore">Let's vibe</Link>
            </div>
          }
          </>}
        </>  
        }
        {showPlaylist &&
        <>
          {playlistLoading ? 
          <Spinner /> 
          : 
          <>
          {playlistVideo?.videos?.length ?
            playlistVideo?.videos?.map((video, index) => <HorizontalCard key={video._id} video={video} index={index+1} playlistCard={true}/>)
            :
            <div  className={style.empty_container}>
              <img src={PlaylistListing} alt="playlist" className={style.empty_image}/> 
              <h4 className={empty_text}>Explore and add videos to {playlistVideo?.title}</h4>
              <Link to="/explore">Let's vibe</Link>
            </div>
          }
          </>}
        </>
        }
       
    </div>
  )
}

export { VideoHorListing };