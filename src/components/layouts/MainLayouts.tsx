import { Outlet } from "react-router-dom";
import NavBar from "../../shared/NavBar";

const MainLayouts = () => {
  return (
    <div style={{ minHeight: "100%" }}>
      <NavBar />
      <Outlet />
      {/* footer */}
    </div>
  );
};
export default MainLayouts;
