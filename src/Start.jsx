// Entry point for a secure user/owner/admin link
// Checks the token, starts a server-side session, and redirects to the appropriate page
import "purecss/build/pure.css";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import globalData from "./GlobalData";

function Start() {
  let params = useParams();
  let token = params["token"];
  const [tokenData, setTokenData] = useState({});
  useEffect(() => {
    fetch(globalData.apiServer + "/api/start/" + token, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        setTokenData(response);
        globalData.role = response.TokenClass;
        globalData.name = response.FirstName + " " + response.LastName;
      });
  }, []);
  if (typeof tokenData.TokenClass === "undefined") return null;
  if (tokenData.TokenClass === "Admin") {
    return <Navigate to={"/admin"} />;
  }
  if (tokenData.TokenClass === "Owner") {
    return <Navigate to={"/owner/" + tokenData.Otherid} />;
  }
  if (tokenData.TokenClass === "User") {
    return (
      <Navigate to={"/user/" + tokenData.Otherid + "/" + tokenData.Userid} />
    );
  }
}

export default Start;
