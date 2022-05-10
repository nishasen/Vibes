export const Reducer = (videoState, videoAction) => {
    switch(videoAction.type) {
        case 'CATEGORY_NAME' : return {...videoState, categoryFilter: videoAction.payload};
        case 'SET_LIKE': 
        case 'POST_LIKE': 
        case 'DELETE_LIKE': 
            return {...videoState, liked: videoAction.payload.likes};
        case 'SET_WATCH_LATER': 
        case 'POST_WATCH_LATER': 
        case 'DELETE_WATCH_LATER': 
            return {...videoState, watchLater: videoAction.payload.watchlater};
        case 'SET_HISTORY': 
        case 'POST_HISTORY': 
        case 'DELETE_HISTORY': 
            return {...videoState, history: videoAction.payload.history};
        case 'SET_PLAYLISTS': 
        case 'POST_PLAYLISTS': 
        case 'DELETE_PLAYLISTS': 
            return {...videoState, playlists: videoAction.payload.playlists};
        case 'POST_VIDEO_TO_PLAYLIST': 
        case 'DELETE_PLAYLIST_VIDEO': 
            return {...videoState, playlists: videoState.playlists?.map(item => item._id===videoAction.payload.playlist._id ? 
            videoAction.payload.playlist : item)};
            
        default: return videoState;
    }
}   