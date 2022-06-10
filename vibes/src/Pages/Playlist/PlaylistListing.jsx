import React, { useState, useEffect } from 'react';
import '../Styles.css';
import { HeaderText, MainComponent, Toast, VideoHorListing } from '../../Components';
import { BsFillTrashFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router';
import { useGetPlaylistAxios, useDeleteAxios } from '../../APICalls';
import { useVideo } from '../../Contexts';

const PlaylistListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { videoDispatch, videoState } = useVideo();
  const { playlists } = videoState;
  const [playlistVideo, setPlaylistVideo] = useState({});
  const { response, loading: playlistLoading } = useGetPlaylistAxios(`/api/user/playlists/${id}`, playlists)
  useEffect(()=>{
    setPlaylistVideo(response.playlist || {});
  }, [response])
  return (
    <div>
        <div className="headers dis-flex ">
          <HeaderText text={playlistVideo?.title ? playlistVideo?.title + " - " + (playlistVideo?.videos?.length ? playlistVideo?.videos?.length : 0) : "Playlist"} />
          <div className="playlist-delete"><BsFillTrashFill size={25} onClick={()=>{
            useDeleteAxios(`playlists`, id, videoDispatch, "DELETE_PLAYLISTS", navigate)
            Toast("Playlist removed successfully", "success")}}/></div>
        </div>
        <VideoHorListing showPlaylist={true} playlistVideo={playlistVideo} playlistLoading={playlistLoading}/>
    </div>
  )
}

export { PlaylistListing };