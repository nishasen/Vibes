import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const [userLogin, setUserLogin] = useState(false);
    const [response, setResponse] = useState({});
    const [userToken, setUserToken] = useState(localStorage.getItem("userToken"))
    useEffect(() => {
        userToken!==null ? setUserLogin(true) : setUserLogin(false);
    }, [userToken])    
        
    const logoutHandler = (Toast) => {
        setUserLogin(false)
        localStorage.removeItem("userToken")
        Toast('Successfully logged out!', "success");
    }

    return (
        <AuthContext.Provider value={{userLogin, setUserLogin, 
                                    response, setResponse, 
                                    setUserToken,
                                    logoutHandler}}>
            {children}
        </AuthContext.Provider>
    );
}

export { useAuth, AuthProvider };