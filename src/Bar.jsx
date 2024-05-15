function Bar({sessionUser, role}) {
    return (
        <div className="pure-g" style={{backgroundColor: '#dfff4f', textAlign: 'center'}}>
        <p style={{marginLeft: '25px'}}>
            {sessionUser}  {role === 'User' ? '' : ' (' + role + ')'}</p>
        </div>
        )
}

export default Bar;