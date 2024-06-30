// Display the header bar with the user name and role
// In the Admin role, clicking the bar navigates to the admin entry point
import globalData from "./GlobalData";
import { useNavigate } from "react-router-dom";

function Bar() {
  const navigate = useNavigate();
  const { role, name } = globalData;
  const handleClick = () => {
    if (role === "Admin") {
      navigate("/admin"); // Navigate to the admin entry point
    }
  };
  if (name === "") {
    return null;
  }
  return (
    <div
      className="pure-g"
      style={{ backgroundColor: "#dfff4f", textAlign: "center" }}
      onClick={handleClick}
    >
      <p style={{ marginLeft: "25px" }}>
        {name} {role === "User" || role === "" ? "" : " (" + role + ")"}
      </p>
    </div>
  );
}

export default Bar;
