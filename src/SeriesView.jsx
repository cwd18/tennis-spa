import { useState } from "react";
import FixtureView from "./FixtureView";

function SeriesView({ seriesid }) {
  const [userid, setUserid] = useState(0);
  return (
    <div>
      <FixtureView seriesid={seriesid} userid={userid} setUserid={setUserid} />
    </div>
  );
}

export default SeriesView;
