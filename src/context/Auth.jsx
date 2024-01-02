// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true" // Local Storage'dan okuma
  );

  useEffect(() => {
    const storedIsLogin = localStorage.getItem("isLogin") === "true";
    if (storedIsLogin) {
      setIsLogin(true);
    }
  }, []); // Sadece bir kere çalışacak

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
