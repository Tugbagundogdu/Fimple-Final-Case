import {createContext, useContext, useState} from 'react';

const GenerateUniqueCode = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGenerateUniqueCode = () => useContext(GenerateUniqueCode);

// eslint-disable-next-line react/prop-types
const GenerateUniqueCodeProvider = ({children}) => {

    const [code, setCode] = useState('');

    
    const generateUniqueCode = () => {
        const code = Math.random().toString(36).substring(2, 11);
        return code;
    }

    return (
        <GenerateUniqueCode.Provider value={{code, setCode, generateUniqueCode}}>
            {children}
        </GenerateUniqueCode.Provider>
    )
}

export default GenerateUniqueCodeProvider;
