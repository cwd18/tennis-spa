import { Fragment } from "react";
import { Link } from "react-router-dom";
import Bar from "./Bar";
import globalData from "./GlobalData";
import SeriesList from "./SeriesList";
import ErrorView from "./ErrorView";

function AdminView() {
  const { role } = globalData;
  return (
    <div>
      <Bar />
      <div className="pure-g">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-23-24">
          {role === "Admin" && (
            <Fragment>
              <SeriesList />
              <br />
              <Link to="/userlist/0" className="pure-button">
                User List
              </Link>
              <br />
              <br />
              <a
                rel="noopener noreferrer"
                href={globalData.apiServer + "/serieslist"}
                target="_blank"
              >
                Legacy admin tab
              </a>
              <br />
              <br />
            </Fragment>
          )}
          {role !== "Admin" && (
            <ErrorView error="You need to be an Admin to view this page" />
          )}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default AdminView;
