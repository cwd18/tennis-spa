import { useParams } from "react-router-dom";
import Bar from "./Bar";
import SeriesView from "./SeriesView";
import ErrorView from "./ErrorView";
import globalData from "./GlobalData";

function OwnerView() {
  let params = useParams();
  let seriesid = params["seriesid"];
  const { role } = globalData;
  if (role === "") {
    return null;
  }
  return (
    <div>
      <Bar />
      <div className="pure-g">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-23-24">
          {role !== "User" && <SeriesView seriesid={seriesid} />}
          {role === "User" && (
            <ErrorView error="A User cannot view this page" />
          )}
          <br />
          <br />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default OwnerView;
