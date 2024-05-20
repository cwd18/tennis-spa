import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import Bar from './Bar';
import UserFixture from './UserFixture';   
import globalData from './GlobalData';

function UserView() {
    const [fixtures, setFixtures] = useState([]);
    const [fixtureIndex, setFixtureIndex] = useState();
    const [fixtureid, setFixtureid] = useState();
    const [viewTime, setViewTime] = useState(0);

    let params = useParams();
    let seriesid = params['seriesid'];
    let userid = params['userid'];

    useEffect(() => {
        fetch(globalData.apiServer + '/api/fixtures/' + seriesid, {credentials: 'include'})
        .then(response => response.json())
        .then(response => {
            setFixtures(response);
            const daysToNextFixture = (new Date(response[0].FixtureDate) - new Date()) / (1000 * 60 * 60 * 24);
            // show the next fixture if it's more than 1 day away, otherwise show the latest fixture
            const index = daysToNextFixture > 1 ? 0 : 1;
            setFixtureIndex(index);
            setFixtureid(response[index].Fixtureid)
        })
    }, [seriesid]);
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
            <Bar />
            <div className="pure-g">
                <div className="pure-u-1-24"></div>
                <div className="pure-u-23-24">
                    <h2>{description + ' at '}
                    <span style={{ color: 'red' }}> {FixtureTime}</span></h2>
                    <button className="pure-button button-margin-right" onClick={() => handleFixtureSwtch((fixtureIndex + 1) % 2)}>
                        Switch to {fixtures[(fixtureIndex+1)%2].description}</button>
                    <button className="pure-button" onClick={() => setViewTime(viewTime + 1)}>
                        Refresh</button>
                    <UserFixture 
                        fixtureid={fixtureid} 
                        userid={userid}
                        viewTime={viewTime} />
                </div>
            </div>
            <br /><br />
        </div>
    );
}

export default UserView;