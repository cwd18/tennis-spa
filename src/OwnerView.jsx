import { useParams } from 'react-router-dom';
import Bar from './Bar';
import SeriesView from './SeriesView';

function OwnerView () {
    let params = useParams();
    let seriesid = params['seriesid'];
  return (
    <div>
    <Bar />
    <div className="pure-g">
      <div className="pure-u-1-24"></div>
      <div className="pure-u-23-24">
      <SeriesView seriesid={seriesid}/>
      <br /><br />
      </div>
    </div>
    <br /><br />
  </div>
);
}

export default OwnerView;