import { useEffect, useState } from "react";
import globalData from './GlobalData';
import { Link } from 'react-router-dom';

function SeriesList() {
    const [seriesData, setSeriesData] = useState([]);
    useEffect(() => {
        fetch(globalData.apiServer + '/api/serieslist', {credentials: 'include'})
        .then(response => response.json())
        .then(response => setSeriesData(response));
    }, []);
    return (
      <div>
        <h2>Series List</h2>
        <table className="pure-table">
          <thead><tr><th>Series</th><th>Automated emails</th><th>Future fixtures</th></tr></thead>
          <tbody>
            {seriesData.map((item, index) => (
              <tr key={index}>
                <td><Link to={"/owner/" + item.Seriesid}>{item.description}</Link></td>
                <td style={{ color: item.AutoEmail ? 'red' : 'black' }}>
                  {item.AutoEmail ? 'Enabled' : 'Disabled'}
                  </td>
                <td>{item.futureFixtures}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  export default SeriesList;