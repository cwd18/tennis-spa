import FixtureView from './FixtureView';

function SeriesView( {seriesid} ) {
  const userid = 0;
  return (
      <div>
        <FixtureView seriesid={seriesid} userid={userid} />
      </div>
  );
}

export default SeriesView; 