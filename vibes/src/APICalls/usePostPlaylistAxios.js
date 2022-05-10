import axios from "axios";

export const usePostPlaylistAxios = async(apiURL, playlist, dispatch, type) => {
    try{ 
        const config = {
            headers: {
                authorization: localStorage.getItem("userToken"),
            }
        };
        
        const response = await axios.post(`/api/user/${apiURL}`, { playlist }, config);
        
        dispatch({ type: type, payload: response.data });
    } catch(error) {
        console.error(error)
    }
}