import React, { useState, useEffect } from 'react';
import { MainComponent, VideoPlayer, CreatePlaylist } from '../../Components';
import { useParams } from 'react-router';
import { useAxiosObj } from '../../APICalls';


const SingleVideo = () => {
  const {id} = useParams();
  const [singleVideo, setSingleVideo] = useState({});
  const { response, loading } = useAxiosObj(`/api/video/${id}`, id)

  useEffect(()=>setSingleVideo(response.video || {}), [response])
  
  return (
    <div>
        <VideoPlayer singleVideo={singleVideo} loading={loading} id={id}/>
        <CreatePlaylist onPlaylist={false}/>
    </div>
  )
}

export { SingleVideo };