import { useEffect, useState } from 'react';
import globalData from './GlobalData';
import { useNavigate } from "react-router-dom";

function Bar() {
    const [sessionData, setSessionData] = useState({sessionUser: '', sessionRole: ''});
    const navigate = useNavigate();
    const handleClick = () => {
        if (sessionData.sessionRole === 'Admin') {
            navigate('/admin'); // Navigate to the admin entry point
        }
    }
    useEffect(() => { 
        fetch(globalData.apiServer + '/api/session', {credentials: 'include'}) 
        .then(response => response.json())
        .then(setSessionData);
    } , []);
    if (sessionData.sessionUser === '') {
        return null;
    }
    return (
        <div className="pure-g" style={{backgroundColor: '#dfff4f', textAlign: 'center'}} onClick={handleClick}>
        <p style={{marginLeft: '25px'}}>
            {sessionData.sessionUser}  {sessionData.sessionRole === 'User' 
            || sessionData.sessionRole === '' ?
             '' : ' (' + sessionData.sessionRole + ')'}</p>
        </div>
        )
}

export default Bar;