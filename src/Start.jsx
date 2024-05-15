import 'purecss/build/pure.css';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Bar from './Bar';
import SeriesList from './SeriesList';
import UserView from './UserView';

function Start({apiServer}) {
  let params = useParams();
  let token = params['token'];
  const [tokenData, setTokenData] = useState({});
  useEffect(() => {
    fetch(apiServer + '/api/start/' + token, {credentials: 'include'})
    .then(response => response.json())
    .then(setTokenData);
  }, [apiServer, token]);
  if (typeof tokenData.TokenClass === 'undefined') return null;
    return (
    <div>
      <Bar 
        sessionUser={tokenData.FirstName + ' ' + tokenData.LastName} 
        role={tokenData.TokenClass}
        />
      <div className="pure-g">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-23-24">
        {tokenData.TokenClass === 'Admin' && <SeriesList apiServer={apiServer} />}
        {tokenData.TokenClass === 'User' && <UserView 
          apiServer={apiServer} 
          seriesid={tokenData.Otherid} 
          userid={tokenData.Userid} />}
        </div>
      </div>
    </div>
  );
}

export default Start;
