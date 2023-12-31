import { createContext, useContext, useState } from "react";

const ApplicationResultContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApplicationResult = () =>{
    return useContext(ApplicationResultContext);
}

// eslint-disable-next-line react/prop-types
const ApplicationResultProvider = ({children}) =>{

    const [results, setResults] = useState([]);

    
    const updateResult = (applicationId, newResult) => {
        setResults((prevResults) => ({
          ...prevResults,
          [applicationId]: [...(prevResults[applicationId] || []), newResult],
        }));
      };

    
    return (
        <ApplicationResultContext.Provider value={{results, updateResult, setResults}}>
            {children}
        </ApplicationResultContext.Provider>
    )
}

export default ApplicationResultProvider;