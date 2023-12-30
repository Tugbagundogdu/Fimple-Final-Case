import { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({children}) => {
    const [isLogin , setIsLogin ] = useState(false);
    return(
        <AuthContext.Provider value={{isLogin , setIsLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;