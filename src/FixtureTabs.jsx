function FixtureTabs({ fixtureIndex, handleFixtureSwitch, tab1, tab2 }) {
  return (
    <div>
      <br />
      <div>
        <button
          className={
            fixtureIndex === 0
              ? "pure-button pure-button-primary button-margin-right"
              : "pure-button button-margin-right"
          }
          onClick={() => handleFixtureSwitch(0)}
        >
          {tab1}
        </button>
        <button
          className={
            fixtureIndex === 1
              ? "pure-button pure-button-primary"
              : "pure-button"
          }
          onClick={() => handleFixtureSwitch(1)}
        >
          {tab2}
        </button>
      </div>
    </div>
  );
}

export default FixtureTabs;
