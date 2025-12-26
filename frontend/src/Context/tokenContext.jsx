import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export let tokenContext = createContext();
export default function TokenContextProvider(props) {
  let [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    if (!savedToken) return;
    try {
      const decoded = jwtDecode(savedToken);
      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        localStorage.removeItem("userToken");
        setToken(null);
      } else {
        setToken(savedToken);
      }
    } catch (error) {
      console.error("Failed to decode token", error);
      localStorage.removeItem("userToken");
      setToken(null);
    }
  }, []);
  const login = (newToken) => {
    localStorage.setItem("userToken", newToken);
    setToken(newToken);
  };
  const logout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
  };
  return (
    <tokenContext.Provider value={{ token, setToken, login, logout }}>
      {props.children}
    </tokenContext.Provider>
  );
}
