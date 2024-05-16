import globalData from './GlobalData';

function Bar() {
    return (
        <div className="pure-g" style={{backgroundColor: '#dfff4f', textAlign: 'center'}}>
        <p style={{marginLeft: '25px'}}>
            {globalData.sessionUser}  {globalData.sessionRole === 'User' ?
             '' : ' (' + globalData.sessionRole + ')'}</p>
        </div>
        )
}

export default Bar;