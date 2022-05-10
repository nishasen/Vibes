import React from 'react';
import { HorizontalCard, Spinner } from '..';
import { useVideo } from '../../Contexts';
import style from './VideoHorListing.module.css';


const VideoHorListing = ({showLiked, showPlaylist, showWatchLater, showHistory, playlistVideo, playlistLoading}) => {
  const { videoState, likedLoading, watchLaterLoading, historyLoading } = useVideo();
  const { liked, watchLater, history } = videoState;
  
  return (
    <div className={`dis-flex ${style.video_listing}`}>
        {likedLoading ? <Spinner /> : showLiked && liked?.map((video, index) => <HorizontalCard key={video._id} video={video} index={index+1} likedCard={true} />)}
        {watchLaterLoading ? <Spinner /> : showWatchLater && watchLater?.map((video, index) => <HorizontalCard key={video._id} video={video} index={index+1} watchLaterCard={true}/>)}
        {historyLoading ? <Spinner /> : showHistory && history?.map((video, index) => <HorizontalCard key={video._id} video={video} index={index+1} historyCard={true}/>)}
        {playlistLoading ? <Spinner /> : showPlaylist && playlistVideo?.videos?.map((video, index) => <HorizontalCard key={video._id} video={video} index={index+1} playlistCard={true}/>)}
       
    </div>
  )
}

export { VideoHorListing };