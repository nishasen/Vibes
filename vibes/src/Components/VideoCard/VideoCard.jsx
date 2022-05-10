import React, { useState } from 'react';
import { useAuth, useTheme, useVideo } from '../../Contexts';
import style from './VideoCard.module.css';
import { HiDotsVertical } from 'react-icons/hi';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { MdPlaylistAdd, MdWatchLater, MdOutlineWatchLater } from 'react-icons/md';
import { setDuration } from '../../Utils';
import { Toast } from '..';
import { Link } from 'react-router-dom';
import { usePostAxios, useDeleteAxios } from '../../APICalls';

const VideoCard = ({video}) => {
  const { userLogin } = useAuth();
  const { _id, thumbnails, duration, title, channelTitle, categoryName } = video;
  const { videoState, videoDispatch, setVideo } = useVideo();
  const { liked, watchLater } = videoState;
  const { themeState } = useTheme();
  const { mode } = themeState;
  const { openPlaylistDialog } = useVideo();
  const [ showDropdown, setShowDropdown ] = useState(false);
  const cardDescText = mode==="light" ? style.card_light_text : style.card_dark_text; 
  const cardDropdown = mode==="light" ? style.card_light_dropdown : style.card_dark_dropdown; 
  const time = setDuration(duration)

  return (
    <div className={`dis-grid ${style.video_card}`}>
        <Link to={`/explore/video/${_id}`} className="dis-grid link">
          <img src={thumbnails.medium.url} 
                alt="lofi" 
                className={style.card_image} 
                onClick={()=>{
                  videoDispatch({type: "CATEGORY_NAME", payload: categoryName})
                  usePostAxios('history', video, videoDispatch, 'POST_HISTORY')}}/>
          <div className={`dis-flex ${style.card_time}`} onClick={()=>{
            videoDispatch({type: "CATEGORY_NAME", payload: categoryName})
            usePostAxios('history', video, videoDispatch, 'POST_HISTORY')}}>
            <p className={style.time}>{time}</p>
          </div>
        </Link>
        <div className={style.card_desc}>
          <Link to={`/explore/video/${_id}`} className="dis-grid link">
            <div className={`${cardDescText} ${style.card_title}`} onClick={()=>{
              videoDispatch({type: "CATEGORY_NAME", payload: categoryName})
              usePostAxios('history', video, videoDispatch, 'POST_HISTORY')}}>
              {title}
            </div>
          </Link>
          <div className={`${cardDescText} ${style.card_more}`}>
            <HiDotsVertical size={19} onClick={()=>setShowDropdown(!showDropdown)}/>
          </div>
        </div>
        <Link to={`/explore/video/${_id}`} className="dis-grid link">
          <div className={style.card_channel} onClick={()=>{
            videoDispatch({type: "CATEGORY_NAME", payload: categoryName})
            usePostAxios('history', video, videoDispatch, 'POST_HISTORY')}}>
            {channelTitle}
          </div>
         </Link>  
        {showDropdown && <div className={`${cardDropdown} ${style.card_dropdown}`}>
          <div className={style.card_icons}>
            {liked?.find(item=>item._id===video._id) ? 
              <AiFillLike size={24} onClick={()=>{
                if(userLogin) {
                  useDeleteAxios('likes', _id, videoDispatch, 'DELETE_LIKE')
                  Toast("Video removed from liked", "success")
                } else {
                  Toast("Login to remove video from liked", "warning")
                }
                }}/> 
              : 
              <AiOutlineLike size={24} onClick={()=>{
                if(userLogin){
                  usePostAxios('likes', video, videoDispatch, 'POST_LIKE')
                  Toast("Video added to liked", "success")
                } else {
                  Toast("Login to add video to liked", "warning")
                }
                }}/>}
            </div>
          <div className={style.card_icons}>
            <MdPlaylistAdd size={24} onClick={()=>{
                setVideo(video)
                openPlaylistDialog(true)}}/>   
          </div>
          <div className={style.card_icons}>
            {watchLater?.find(item=>item._id===video._id) ? 
              <MdWatchLater size={24} onClick={()=>{
                if(userLogin) {
                  useDeleteAxios('watchlater', _id, videoDispatch, 'DELETE_WATCH_LATER')
                  Toast("Video removed from watch later", "success")
                } else {
                  Toast("Login to remove video from watch later", "warning")
                }
                }}/> 
              : 
              <MdOutlineWatchLater size={24} onClick={()=>{
                if(userLogin) {
                  usePostAxios('watchlater', video, videoDispatch, 'POST_WATCH_LATER')
                  Toast("Video added to watch later", "success")
                } else {
                  Toast("Login to add video to watch later", "warning")
                }
                }}/>}
          </div>
        </div>}
    </div>
  )
}

export { VideoCard };

//