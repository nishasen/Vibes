import React, { useState } from 'react';
import style from './HorizontalCard.module.css';
import { useTheme, useVideo } from '../../Contexts';
import { HiDotsVertical } from 'react-icons/hi';
import { FaTrashAlt } from 'react-icons/fa';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { MdPlaylistAdd, MdWatchLater, MdOutlineWatchLater } from 'react-icons/md';
import { setDuration } from '../../Utils';
import { usePostAxios, useDeleteAxios } from '../../APICalls';
import { useParams } from 'react-router';
import { Toast } from '..';
import { Link } from 'react-router-dom';

const HorizontalCard = (props) => {
  const { id } = useParams();
  const { themeState } = useTheme();
  const { mode } = themeState;
  const { openPlaylistDialog, videoDispatch, videoState, setVideo } = useVideo();
  const [ showDropdown, setShowDropdown ] = useState(false);
  const cardDescText = mode==="light" ? style.card_light_text : style.card_dark_text; 
  const cardDropdown = mode==="light" ? style.card_light_dropdown : style.card_dark_dropdown; 
  const { likedCard, playlistCard, watchLaterCard, historyCard, index, video } = props;
  const { title, channelTitle, thumbnails, duration, _id, categoryName } = video;
  const { liked, watchLater } = videoState; 
  const time = setDuration(duration);
  return (
    <div className={`dis-flex ${style.horizontal_card}`}>
      <Link to={`/explore/${_id}`} className="dis-grid link">
        <div className={`dis-grid ${style.card_details}`} onClick={()=>{
            videoDispatch({type: "CATEGORY_NAME", payload: categoryName})
            usePostAxios('history', video, videoDispatch, 'POST_HISTORY')}}>
          <div className={`${cardDescText} ${style.card_index}`}>{index}</div>
          <img src={thumbnails?.medium?.url} alt="lofi" className={style.card_image}/>
          <div className={`dis-flex ${style.card_time}`}><p className={style.time}>{time}</p></div>
          <div className={style.card_desc}>
            <div className={`${cardDescText} ${style.card_title}`}>{title}</div>
            <div className={style.card_channel}>{channelTitle}</div>
          </div>
        </div>
      </Link>
      <div className={`${cardDropdown} ${style.card_more}`}><HiDotsVertical size={20} onClick={()=>setShowDropdown(!showDropdown)} /></div>
      {showDropdown && 
      <div className={`${cardDropdown} ${style.card_dropdown}`}>
        {likedCard && 
        <>
          <div className={style.card_icons}>
            <MdPlaylistAdd size={24} onClick={()=>{
              setVideo(video)
              openPlaylistDialog(true)}}/>
          </div>
          <div className={style.card_icons}>
            {watchLater?.find(item=>item._id===video._id) ? 
              <MdWatchLater size={24} onClick={()=>{
                useDeleteAxios('watchlater', _id, videoDispatch, 'DELETE_WATCH_LATER')
                Toast("Video removed from watch later", "success")}}/> 
              : 
              <MdOutlineWatchLater size={24} onClick={()=>{
                usePostAxios('watchlater', video, videoDispatch, 'POST_WATCH_LATER')
                Toast("Video added to watch later", "success")}}/>
            }
          </div>
          <div className={style.card_icons}>
            <FaTrashAlt size={24} onClick={()=>{
              useDeleteAxios('likes', _id, videoDispatch, 'DELETE_LIKE')
              Toast("Video removed from liked", "success")}}/>
          </div>
        </>}
        {playlistCard && 
        <>
          <div className={style.card_icons}>
            {liked?.find(item=>item._id===video._id) ? 
              <AiFillLike size={24} onClick={()=>{
                useDeleteAxios('likes', _id, videoDispatch, 'DELETE_LIKE')
                Toast("Video removed from liked", "success")
              }}/> 
              : 
              <AiOutlineLike size={24} onClick={()=>{
                usePostAxios('likes', video, videoDispatch, 'POST_LIKE')
                Toast("Video added to liked", "success")}}/>
            }
          </div>
          <div className={style.card_icons}>
            {watchLater?.find(item=>item._id===video._id) ? 
              <MdWatchLater size={24} onClick={()=>{
                useDeleteAxios('watchlater', _id, videoDispatch, 'DELETE_WATCH_LATER')
                Toast("Video removed from watch later", "success")}}/> 
              : 
              <MdOutlineWatchLater size={24} onClick={()=>{
                usePostAxios('watchlater', video, videoDispatch, 'POST_WATCH_LATER')
                Toast("Video added to watch later", "success")}}/>
            }
          </div>
          <div className={style.card_icons}>
            <FaTrashAlt size={24} size={24} onClick={()=>{
              useDeleteAxios(`playlists/${id}`, video._id, videoDispatch, "DELETE_PLAYLIST_VIDEO")
              Toast("Video removed from playlist", "success")}}/>
          </div>
        </>}
        {watchLaterCard && 
        <>
          <div className={style.card_icons}>
            {liked?.find(item=>item._id===video._id) ? 
              <AiFillLike size={24} onClick={()=>{
                useDeleteAxios('likes', _id, videoDispatch, 'DELETE_LIKE')
                Toast("Video removed from liked", "success")}}/> 
              : 
              <AiOutlineLike size={24} onClick={()=>{
                usePostAxios('likes', video, videoDispatch, 'POST_LIKE')
                Toast("Video added to liked", "success")}}/>
            }
          </div>
          <div className={style.card_icons}>
            <MdPlaylistAdd size={24} onClick={()=>{
              setVideo(video)
              openPlaylistDialog(true)}}/>
          </div>
          <div className={style.card_icons}>
            <FaTrashAlt size={24} onClick={()=>{
              useDeleteAxios('watchlater', _id, videoDispatch, 'DELETE_WATCH_LATER')
              Toast("Video removed from watch later", "success")}}/>
          </div>
        </>}
        {historyCard && 
        <>
          <div className={style.card_icons}>
            {liked?.find(item=>item._id===video._id) ? 
              <AiFillLike size={24} onClick={()=>{
                useDeleteAxios('likes', _id, videoDispatch, 'DELETE_LIKE')
                Toast("Video removed from liked", "success")
              }}/> 
              : 
              <AiOutlineLike size={24} onClick={()=>{
                usePostAxios('likes', video, videoDispatch, 'POST_LIKE')
                Toast("Video added to liked", "success")}}/>
            }
          </div>
          <div className={style.card_icons}>
            <MdPlaylistAdd size={24} onClick={()=>{
              setVideo(video)
              openPlaylistDialog(true)}}/>
          </div>
          <div className={style.card_icons}>
            {watchLater?.find(item=>item._id===video._id) ? 
              <MdWatchLater size={24} onClick={()=>{
                useDeleteAxios('watchlater', _id, videoDispatch, 'DELETE_WATCH_LATER')
                Toast("Video removed from watch later", "success")}}/> 
              : 
              <MdOutlineWatchLater size={24} onClick={()=>{
                usePostAxios('watchlater', video, videoDispatch, 'POST_WATCH_LATER')
                Toast("Video added to watch later", "success")}}/>
            }
          </div>
          <div className={style.card_icons}>
            <FaTrashAlt size={24} onClick={()=>{
              useDeleteAxios('history', _id, videoDispatch, 'DELETE_HISTORY')
              Toast("Video removed from history", "success")}}/>
          </div>
        </>}
      </div>}
    </div>
  )
}

export { HorizontalCard };