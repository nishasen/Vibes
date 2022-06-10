export const Compose = (state, ...functions) => (data) => functions.reduce((acc, cur)=>cur(state, acc), data)

export const filterByCategory = (state, data) => state.categoryFilter==="All" ? 
                                            data 
                                            : 
                                            data.filter(video => video.categoryName === state.categoryFilter);

export const filterBySearch = (state, data) => data.filter(video => video?.tags?.some(tag => tag.toLowerCase().includes(state.debounceText.toLowerCase())))