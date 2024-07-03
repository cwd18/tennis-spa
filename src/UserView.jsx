import { useParams } from "react-router-dom";
import Bar from "./Bar";
import FixtureView from "./FixtureView";

function UserView() {
  let params = useParams();
  let seriesid = params["seriesid"];
  let userid = params["userid"];
  return (
    <div>
      <Bar />
      <div className="pure-g">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-23-24">
          <FixtureView seriesid={seriesid} userid={userid} />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default UserView;
