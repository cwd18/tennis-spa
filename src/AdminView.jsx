import Bar from './Bar';
import SeriesList from './SeriesList';
import globalData from './GlobalData';

function AdminView() {
        return (
      <div>
        <Bar />
        <div className="pure-g">
          <div className="pure-u-1-24"></div>
          <div className="pure-u-23-24">
          <SeriesList />
          <br /><br />
          <a rel="noopener noreferrer" href={globalData.apiServer + "/serieslist"} 
          target="_blank">Legacy admin tab</a>
          </div>
        </div>
        <br /><br />
      </div>
    );
  }
  
  export default AdminView;