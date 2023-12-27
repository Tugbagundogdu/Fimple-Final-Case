import { createContext, useContext, useState } from "react";

const ApplicationResultContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApplicationResult = () =>{
    return useContext(ApplicationResultContext);
}

// eslint-disable-next-line react/prop-types
const ApplicationResultProvider = ({children}) =>{

    const [result, setResult] = useState([]);

    
    const updateResult = (newResult) =>{
        setResult((prevResult) => [...prevResult, newResult]);
    }


    
    return (
        <ApplicationResultContext.Provider value={{result, updateResult, setResult}}>
            {children}
        </ApplicationResultContext.Provider>
    )
}

export default ApplicationResultProvider;