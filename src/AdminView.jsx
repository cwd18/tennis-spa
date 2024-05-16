import Bar from './Bar';
import SeriesList from './SeriesList';

function AdminView() {
        return (
      <div>
        <Bar />
        <div className="pure-g">
          <div className="pure-u-1-24"></div>
          <div className="pure-u-23-24">
          <SeriesList />
          </div>
        </div>
      </div>
    );
  }
  
  export default AdminView;