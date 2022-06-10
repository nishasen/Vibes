import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useGetAxios, useAxios, useGetAllPlaylistAxios } from "../../APICalls";
import { Reducer } from "./Reducer";
import { Compose, filterByCategory, filterBySearch } from './Utils';

const VideoContext = createContext();
const useVideo = () => useContext(VideoContext);

const VideoProvider = ({children}) => {
    const [playlistDialog, openPlaylistDialog] = useState(false);
    const [videos, setVideos] = useState([]);
    const [video, setVideo] = useState({});
    const [videoState, videoDispatch] = useReducer(Reducer, {
        liked: [],
        watchLater: [],
        history: [],
        playlists: [],
        categoryFilter: "All",
        debounceText: "",
    })
    const { response: videoResponse, loading: videoLoading } = useAxios('/api/videos');
    useEffect(()=>{
        setVideos(videoResponse.videos || [])
    }, [videoResponse])

    const { response: likedResponse, loading: likedLoading } = useGetAxios('/api/user/likes')
    useEffect(()=>{
        videoDispatch({type: 'SET_LIKE', payload: likedResponse.likes || []})
    }, [likedResponse])
    
    const { response: watchLaterResponse, loading: watchLaterLoading } = useGetAxios('/api/user/watchlater')
    useEffect(()=>{
        videoDispatch({type: 'SET_WATCH_LATER', payload: watchLaterResponse.watchlater || []})
    }, [watchLaterResponse])

    const { response: historyResponse, loading: historyLoading } = useGetAxios('/api/user/history')
    useEffect(()=>{
        videoDispatch({type: 'SET_HISTORY', payload: historyResponse.history || []})
    }, [historyResponse])

    const { response: playlistResponse, loading: playlistLoading } = useGetAllPlaylistAxios('/api/user/playlists', videoState.playlists)

    useEffect(()=>{
        videoDispatch({type: 'SET_PLAYLIST', payload: playlistResponse.playlists || []})
    }, [playlistResponse])
   
    const filteredVideos = Compose(videoState, filterByCategory, filterBySearch)(videos)

    return (
        <VideoContext.Provider value={{Videos: filteredVideos, videoLoading,
                                    playlistDialog, openPlaylistDialog, 
                                    videoState, videoDispatch,
                                    video, setVideo, likedLoading, 
                                    playlistLoading, watchLaterLoading, 
                                    historyLoading}}>
            {children}
        </VideoContext.Provider>
    );
}

export { useVideo, VideoProvider };