import { Location, NavLink, useLocation } from "react-router-dom";

import { IconType } from "react-icons";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";

import { useEffect, useState } from "react";
import { AdminSidebar } from "../rolebasedSidebar/AdminSidebar";
import { UserSideBar } from "../rolebasedSidebar/UserSideBar";
import { useAppSelector } from "../../../redux/store/hooks";



export const SideBar = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );


  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);


  const { role } = useAppSelector((state) => state.auth.user!)




  let navigationConfig;
  switch (role) {
    case "admin":
      navigationConfig = <AdminSidebar location={location} url={role} />;
      break;
    case "user":
      navigationConfig = <UserSideBar location={location} url={role} />;
      break;

    default:
      break;
  }

  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}

      <aside
        style={
          phoneActive
            ? {
              width: "15rem",
              height: "100vh",
              position: "fixed",
              top: 0,
              zIndex: 999,
              left: showModal ? "0" : "-20rem",
              transition: "all 0.5s",
            }
            : {}
        }
      >
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="sidebar-heading" style={{ width: "100%" }}>logo</h1>
          {phoneActive && (
            <button id="close-sidebar" onClick={() => setShowModal(false)}>
              <IoMdCloseCircle />
            </button>
          )}
        </span>
        {navigationConfig}
      </aside>
    </>
  );
};

type TNavList = {
  url: string
  Icon: IconType;
  text: string;
  location: Location;
};
export const NavList = ({ url, text, Icon, location }: TNavList) => {
  return (
    <li
      style={{
        backgroundColor: location.pathname === url ? "rgba(0,115,225,0.1)" : "",
      }}
    >
      <NavLink to={url}>
        <Icon /> {text}
      </NavLink>
    </li>
  );
};
