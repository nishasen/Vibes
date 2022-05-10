import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../../APICalls";

const CategoryContext = createContext();
const useCategory = () => useContext(CategoryContext);
const CategoryProvider = ({children}) => {
    const { response } = useAxios("/api/categories");
    const [categories, setCategories] = useState([])
    useEffect(() => {
        setCategories(response.categories || [])
    }, [response])

    return (
        <CategoryContext.Provider value={{categories}}>
            {children}
        </CategoryContext.Provider>

    );
}

export { useCategory, CategoryProvider };
