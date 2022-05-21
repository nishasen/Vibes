import React, { useState, useEffect } from 'react';
import { Button, Toast } from '..';
import { useAuth, useVideo } from '../../Contexts';
import style from './CreatePlaylist.module.css';
import { MdPlaylistAddCheck, MdPlaylistAdd } from 'react-icons/md';
import { useDeleteAxios, usePostAxios, usePostPlaylistAxios } from '../../APICalls';

const CreatePlaylist = ({onPlaylist}) => {
  const { playlistDialog, openPlaylistDialog, videoDispatch, videoState, video } = useVideo();
  const { playlists } = videoState;
  const { userLogin } = useAuth();
  const [newPlaylist, setNewPlaylist] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const playlist = {title: newPlaylist, description: "New playlist"};
    usePostPlaylistAxios('playlists', playlist, videoDispatch, "POST_PLAYLISTS");
    Toast("Created new playlist", "success");
    setNewPlaylist('');
  };

  return (
    <>
    {playlistDialog &&
    <div className={`centered ${style.outer_modal}`}>
      <div className={`dis-flex ${style.modal}`}>
        {!onPlaylist && 
        <>
          <div className={style.modal_title}>Save to...</div>
          <div className={style.modal_playlists}>
            {playlists?.map((playlist, index) =>
            <div 
              className={`dis-flex ${style.new_playlist}`} 
              key={index} 
              onClick={()=>{
                  if(playlist.videos.find(item=>item._id===video._id)) {
                    useDeleteAxios(`playlists/${playlist._id}`, video._id, videoDispatch, "DELETE_PLAYLIST_VIDEO")
                    Toast("Video removed from playlist", "success")
                  } else {
                    usePostAxios(`playlists/${playlist._id}`, video, videoDispatch, "POST_VIDEO_TO_PLAYLIST")
                    Toast("Video added to playlist", "success")
                  }}}>
              {
              playlist.videos.find(item=>item._id===video._id) ? 
                <MdPlaylistAddCheck size={24} /> 
                : 
                <MdPlaylistAdd size={24} />
              }
              {playlist.title}
            </div>)}
          </div>
        </>}
        <form className={`dis-flex ${style.playlist_form}`} onSubmit={(e)=>handleSubmit(e)}>
          <input 
            type="text" 
            name="playlist" 
            value={newPlaylist} 
            onChange={(e)=>setNewPlaylist(e.target.value)} 
            className={style.modal_input} required/>
          <div className={`dis-flex ${style.create_button}`}>
            <Button text="Create" contained={true} type="submit"/>
            <Button text="Close" onClick={()=>{
                                    setNewPlaylist('')
                                    openPlaylistDialog(false)}} type="button"/>
          </div>
        </form>
      </div>
    </div> 
    }
    </>
  );
}

export { CreatePlaylist };