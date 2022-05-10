export const Reducer = (themeState, themeAction) => {
    localStorage.setItem("mode", themeAction.type);
    return {...themeState, mode: themeAction.type}
}