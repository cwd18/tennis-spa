import { useEffect, useState } from 'react';
import globalData from './GlobalData';

function Bar() {
    const [sessionData, setSessionData] = useState({sessionUser: '', sessionRole: ''});
    useEffect(() => { 
        fetch(globalData.apiServer + '/api/session', {credentials: 'include'}) 
        .then(response => response.json())
        .then(setSessionData);
    } , []);
    return (
        <div className="pure-g" style={{backgroundColor: '#dfff4f', textAlign: 'center'}}>
        <p style={{marginLeft: '25px'}}>
            {sessionData.sessionUser}  {sessionData.sessionRole === 'User' 
            || sessionData.sessionRole === '' ?
             '' : ' (' + sessionData.sessionRole + ')'}</p>
        </div>
        )
}

export default Bar;