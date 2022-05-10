import axios from "axios";

export const usePostAxios = async(apiURL, video, dispatch, type) => {
    try{ 
        const config = {
            headers: {
                authorization: localStorage.getItem("userToken"),
            }
        };
        
        const response = await axios.post(`/api/user/${apiURL}`, { video }, config);
        dispatch({ type: type, payload: response.data });
    } catch(error) {
        console.error(error)
    }
}