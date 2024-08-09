import {Outlet} from "react-router-dom";
import {SideBar} from "../dashboard/adminDashboard/SideBar";

//

export const DashboardLayout = () => {
  return (
    <div className="dashboardContainer">
      <SideBar />
      <Outlet />
    </div>
  );
};
