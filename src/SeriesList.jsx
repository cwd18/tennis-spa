import { useEffect, useState } from "react";
import globalData from "./GlobalData";
import { Link } from "react-router-dom";
import ErrorView from "./ErrorView";

function SeriesList() {
  const [seriesData, setSeriesData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(globalData.apiServer + "/api/serieslist", { credentials: "include" })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Not authorized");
        }
        return response.json();
      })
      .then((response) => setSeriesData(response))
      .catch((error) => {
        console.error(error.toString());
        setError(error.toString());
      });
  }, []);
  if (error) {
    return (
      <div>
        <ErrorView error={error} />
      </div>
    );
  }
  if (!seriesData || seriesData.length === 0) {
    return null;
  }
  return (
    <div>
      <h2>Series List</h2>
      <table className="pure-table">
        <thead>
          <tr>
            <th>Series</th>
            <th>Automated emails</th>
            <th>Future fixtures</th>
          </tr>
        </thead>
        <tbody>
          {seriesData.map((item, index) => (
            <tr key={index}>
              <td>
                <Link to={"/owner/" + item.Seriesid}>{item.description}</Link>
              </td>
              <td style={{ color: item.AutoEmail ? "red" : "black" }}>
                {item.AutoEmail ? "Enabled" : "Disabled"}
              </td>
              <td>{item.futureFixtures}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SeriesList;
