import { useState, useEffect } from "react";
import UserFixture from './UserFixture';   

function UserView({apiServer, seriesid, userid}) {
    const [fixtures, setFixtures] = useState([]);
    const [fixtureIndex, setFixtureIndex] = useState();
    const [fixtureid, setFixtureid] = useState();
    const [viewTime, setViewTime] = useState(0);

    useEffect(() => {
        fetch(apiServer + '/api/fixtures/' + seriesid, {credentials: 'include'})
        .then(response => response.json())
        .then(response => {
            setFixtures(response);
            const daysToNextFixture = (new Date(response[0].FixtureDate) - new Date()) / (1000 * 60 * 60 * 24);
            // show the next fixture if it's more than 1 day away, otherwise show the latest fixture
            const index = daysToNextFixture > 1 ? 0 : 1;
            setFixtureIndex(index);
            setFixtureid(response[index].Fixtureid)
        })
    }, [apiServer, seriesid]);
    const handleFixtureSwtch = (index) => { 
        setFixtureIndex(index);
        setFixtureid(fixtures[index].Fixtureid);
    }
    if (!fixtures || fixtures.length === 0) return null;
    const f = fixtures[fixtureIndex];
    const description = f.description;
    const FixtureTime = f.FixtureTime;
    return (
        <div>
            <h2>{description + ' at '}
            <span style={{ color: 'red' }}> {FixtureTime}</span></h2>
            <button className="pure-button button-margin-right" onClick={() => handleFixtureSwtch((fixtureIndex + 1) % 2)}>
                Switch to {fixtures[(fixtureIndex+1)%2].description}</button>
            <button className="pure-button" onClick={() => setViewTime(viewTime + 1)}>
                Refresh</button>
            <UserFixture 
                apiServer={apiServer} 
                fixtureid={fixtureid} 
                userid={userid}
                viewTime={viewTime} />
        </div>
    );
}

export default UserView;