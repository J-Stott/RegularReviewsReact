import React, { useEffect, useContext } from "react";
import {useHistory} from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";


const LogoutPage = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch("/api/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "credentials": 'same-origin'
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        auth.logout();
      } catch (err) {
        console.log(err.message);
      }
    };

    logout();
    history.push("/");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div></div>;
};

export default LogoutPage;
