import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import config from "../util/config";

const OAuth2Redirect = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
        navigate("/signin");
        return;
    }

    localStorage.setItem("token", token);

    config
    .get("dashboard")
    .then((response) => {
        const user = response.data.user ?? response.data;
        if(setUser && user) {
            setUser(user);
        }
        navigate("/dashboard");
    })
    .catch(() => {
        localStorage.removeItem("token");
        navigate("/signin");
    });

  }, [navigate, setUser]);

  return (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h3>Redirecting...</h3>
  </div>
  );
};

export default OAuth2Redirect;
