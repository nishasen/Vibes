import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import style from './VideoPlayer.module.css';
import { FaShareSquare } from 'react-icons/fa';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { MdPlaylistAdd, MdWatchLater, MdOutlineWatchLater, MdSettingsInputSvideo } from 'react-icons/md';
import { Button, Toast, VideoCard, Spinner } from '..';
import { useVideo, useTheme, useAuth } from '../../Contexts';
import ReactAudioPlayer from 'react-audio-player';
import Nature_Sound from '../../Assets/Sounds/Nature_Sound.wav';
import Rain_Sound from '../../Assets/Sounds/Rain_Sound.wav';
import Wind_Sound from '../../Assets/Sounds/Wind_Sound.wav';
import { usePostAxios, useDeleteAxios } from '../../APICalls';

const VideoPlayer = ({singleVideo, id, loading}) => { 
    const { Videos, videoDispatch, videoState, setVideo } = useVideo();  
    const { liked, watchLater, history } = videoState;
    const { userLogin } = useAuth();
    const categoryVideos = Videos.filter(video => video._id!==id)
    const { _id, title, description, channelTitle, videoId } = singleVideo;  
    const { themeState } = useTheme();
    const { mode } = themeState;
    const { openPlaylistDialog } = useVideo();
    const [audio, setAudio] = useState('');
    const videoText = mode==='light' ? style.text_light : style.text_dark;
  return (
    <div className={`dis-flex ${style.video_player}`} key={_id}>
        {loading ? <Spinner /> : 
        <div className={`dis-flex ${style.video_details}`}>
            <div className={`${videoText} ${style.video_title}`}>{title}</div>
            <div className={` ${style.video_channel}`}>{channelTitle}</div>
            <ReactPlayer controls 
                        style={{boxShadow: '0 0 12px var(--primary)'}} 
                        width='100%' 
                        onStart={()=>!history?.find(item=>item._id===_id) && usePostAxios('history', singleVideo, videoDispatch, "POST_HISTORY")}
                        url={`https://www.youtube.com/watch?v=${videoId}`} />
            <div className={`dis-flex ${style.video_actions}`}>
                <div className={style.card_icons}>
                    {liked?.find(item=> item._id===singleVideo._id) ? 
                        <AiFillLike size={25} onClick={()=>{
                            if(userLogin) {
                                useDeleteAxios('likes', _id, videoDispatch, "DELETE_LIKE")
                                Toast("Video removed from liked", "success")
                            } else {
                                Toast("Login to remove video from liked", "warning")
                            }
                            }}/> 
                        : 
                        <AiOutlineLike size={25} onClick={()=>{
                            if(userLogin) {
                                usePostAxios('likes', singleVideo, videoDispatch, "POST_LIKE")
                                Toast("Video added to liked", "success")
                            } else {
                                Toast("Login to add video to liked", "warning")
                            }
                            }}/>}
                </div>
                <div className={style.card_icons}>
                    <MdPlaylistAdd size={25} onClick={()=>{
                        if(userLogin) {
                            setVideo(singleVideo)
                            openPlaylistDialog(true)
                        } else {
                            Toast("Login to add video to playlist", "warning");
                        }
                        }}/>
                </div>
                <div className={style.card_icons}>
                    {watchLater?.find(item=> item._id===singleVideo._id) ? 
                        <MdWatchLater size={25} onClick={()=>{
                            if(userLogin) {
                                useDeleteAxios('watchlater', _id, videoDispatch, "DELETE_WATCH_LATER")
                                Toast("Video removed from watch later", "success")
                            } else {
                                Toast("Login to remove video from watch later", "warning")
                            }
                            }}/> 
                        : 
                        <MdOutlineWatchLater size={25} onClick={()=>{
                            if(userLogin) {
                                usePostAxios('watchlater', singleVideo, videoDispatch, "POST_WATCH_LATER")
                                Toast("Video added to watch later", "success")
                            } else {
                                Toast("Login to add video to watch later", "warning")
                            }
                            }}/>}
                </div>
            </div>
            <div className={`dis-flex ${style.audio_container}`}>
                <span className={`${videoText} ${style.desc_title}`}>Set your vibe : </span>
                <div className={`dis-flex ${style.set_vibes}`}>
                    <div className={`dis-flex ${style.radio_inputs}`}>
                        <input type="radio" name="vibes" id="rain" value="rain" checked={audio===Rain_Sound} onChange={()=>setAudio(Rain_Sound)}/>
                        <label className={videoText} htmlFor="rain">Rain</label>
                    </div>
                    <div className={`dis-flex ${style.radio_inputs}`}>
                        <input type="radio" name="vibes" id="wind" value="wind" checked={audio===Wind_Sound} onChange={()=>setAudio(Wind_Sound)}/>
                        <label className={videoText} htmlFor="wind">Wind</label>
                    </div>
                    <div className={`dis-flex ${style.radio_inputs}`}>
                        <input type="radio" name="vibes" id="nature" value="nature" checked={audio===Nature_Sound} onChange={()=>setAudio(Nature_Sound)}/>
                        <label className={videoText} htmlFor="nature">Nature</label>
                    </div>
                    <Button text="Stop" contained={true} onClick={()=>setAudio('')}/>
                </div>
            </div>
            <ReactAudioPlayer
                src={audio}
                autoPlay
                volume={0.7}
                loop={true}
                />
            <div className={`${videoText} ${style.video_desc}`}> 
                <span className={style.desc_title}>Description :</span>{description}
            </div>
        </div>}
        <div className={style.more_videos}>
            <div className={`${videoText} ${style.video_title}`}>Watch more</div>
            <div className={`dis-flex ${style.more_videos}`}>{categoryVideos.map(video=> <VideoCard video={video} key={video._id} onClick={()=>usePostAxios('history', video, videoDispatch, 'POST_HISTORY')}/>)}</div>
        </div>
    </div>
  )
}

export { VideoPlayer };