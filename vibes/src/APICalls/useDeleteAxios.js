import axios from "axios";

export const useDeleteAxios = async(apiURL, id, dispatch, type, navigate) => {
    try{ 
        const config = {
            headers: {
                authorization: localStorage.getItem("userToken"),
            }
        };
        const response = await axios.delete(`/api/user/${apiURL}/${id}`, config);
        dispatch({ type: type, payload: response.data });
        if(type==='DELETE_PLAYLISTS') {
            navigate('/playlist')
        }
    } catch(error) {
        console.error(error)
    }
}