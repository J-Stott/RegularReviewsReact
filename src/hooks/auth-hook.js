import { useState, useEffect, useCallback } from "react";


export const useAuth = () => {
  const [expiration, setExpiration] = useState(null);
  const [userData, setUserData] = useState(null);
  
  const [logoutTimeout, setLogoutTimeout] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const login = useCallback((loginData, expirationDate) => {
    const expirationTime = new Date(expirationDate);
    setExpiration(expirationTime);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userData: loginData,
        expires: expirationTime.toISOString(),
      })
    );

    setUserData(loginData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userData");
    setUserData(null);
    setExpiration(null);
  }, []);

  const updateUserData = useCallback((updatedUserData) => {
    setUserData((prevData) => {
      const newData = {
        ...prevData
      };

      for(let key in updatedUserData) {
        newData[key] = updatedUserData[key];
      }

      localStorage.setItem(
        "userData",
        JSON.stringify({
          userData: newData,
          expires: new Date(expiration).toISOString(),
        })
      );

      return newData;
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //auto login if we have userData in localstorage
  useEffect(() => {
    const data = localStorage.getItem("userData");
    if(data){
      const localUserData = JSON.parse(data);

      if (localUserData && new Date(localUserData.expires) > new Date()) {
        login(localUserData.userData, localUserData.expires);
      } else {
        logout();
      }
    }


    setCheckingAuth(false);
  }, [login, logout]);

  useEffect(() => {
    if (expiration) {
      const time = expiration.getTime() - new Date().getTime();
      clearTimeout(logoutTimeout);
      setLogoutTimeout(setTimeout(logout, time));
    } else {
      clearTimeout(logoutTimeout);
    }
  }, [logout]); // eslint-disable-line react-hooks/exhaustive-deps

  return {checkingAuth, userData, login, logout, updateUserData};
};
