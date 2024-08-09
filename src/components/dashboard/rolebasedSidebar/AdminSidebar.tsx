import { Location } from "react-router-dom";
import { MdDashboard, MdInventory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FcLineChart } from "react-icons/fc";
import { NavList } from "../adminDashboard/SideBar";

type TProps = {
  location: Location;
  url: string;
};

export const AdminSidebar = ({ location, url }: TProps) => {
  return (
    <>
      {/* div one */}

      <div>
        <h5>Admin Panel</h5>
        <ul>
          <NavList
            url={`/${url}/dashboard`}
            Icon={MdDashboard}
            text="Dashboard"
            location={location}
          />
          <NavList
            Icon={MdInventory}
            url={`/${url}/inventory`}
            text="Inventory"
            location={location}
          />
          <NavList
            url={`/${url}/our-users`}
            Icon={FaUsers}
            text="Our Users"
            location={location}
          />
          <NavList
            url={`/${url}/transaction`}
            Icon={FaUsers}
            text="Transaction"
            location={location}
          />
        </ul>
      </div>

      {/* div two */}
      <div>
        <h5>App</h5>
        <ul>
          <NavList
            url="/admin/coupon"
            Icon={FcLineChart}
            text="Coupon"
            location={location}
          />
          <NavList
            url="/"
            Icon={FcLineChart}
            text="home"
            location={location}
          />
          <NavList
            url="/admin/stopwatch"
            Icon={FcLineChart}
            text="Stopwatch"
            location={location}
          />
        </ul>
      </div>
    </>
  );
};
