import { createContext, useContext, useReducer } from "react";
import { Reducer } from './Reducer';

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({children}) => {
    const [themeState, themeDispatch] = useReducer(Reducer, {mode: localStorage.getItem("mode") || "light"})
    return (
        <ThemeContext.Provider value={{themeState, themeDispatch}}>
            {children}
        </ThemeContext.Provider>
    );
}

export { useTheme, ThemeProvider };