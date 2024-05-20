function FixtureHead({fixtures, fixtureIndex, handleFixtureSwitch, setViewTime, viewTime}) {
    if (!fixtures || fixtures.length === 0) return null;
    const f = fixtures[fixtureIndex];
    const description = f.description;
    const FixtureTime = f.FixtureTime;
    return (
        <div>
            <h2>{description + ' at '}
            <span style={{ color: 'red' }}> {FixtureTime}</span></h2>
            <button className="pure-button button-margin-right" onClick={() => handleFixtureSwitch((fixtureIndex + 1) % 2)}>
                Switch to {fixtures[(fixtureIndex+1)%2].description}</button>
            <button className="pure-button" onClick={() => setViewTime(viewTime + 1)}>
            Refresh</button>
        </div>
    );
}

export default FixtureHead;