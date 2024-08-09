import { Location } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { NavList } from "../adminDashboard/SideBar";

type TUserSideBar = {
  url: string;
  location: Location;
};

export const UserSideBar = ({ location, url }: TUserSideBar) => {

  return (
    <div>
      <h5>User Panel</h5>
      <ul>
        <NavList
          key={url}
          location={location}
          text="Dashboard"
          url={`/${url}`}
          Icon={MdDashboard}
        />
      </ul>
    </div>
  );
};
