import CourtsDialog from "./CourtsDialog";
import globalData from "./GlobalData";

function CourtsView({ fixtureid, FixtureCourts, TargetCourts, setViewTime }) {
  const setCourts = (type, scope, courts) => {
    fetch(
      globalData.apiServer +
        "/api/courts/" +
        fixtureid +
        "/" +
        type +
        "/" +
        scope +
        "/" +
        courts,
      {
        method: "PUT",
        credentials: "include",
      }
    ).then(() => setViewTime((vt) => vt + 1));
  };

  return (
    <div>
      <CourtsDialog
        type="courts"
        title="Courts"
        courts={FixtureCourts}
        setCourts={setCourts}
      />
      <CourtsDialog
        type="target"
        title="Courts to book"
        courts={TargetCourts}
        setCourts={setCourts}
      />
    </div>
  );
}

export default CourtsView;
