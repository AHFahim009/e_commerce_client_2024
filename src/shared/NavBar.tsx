import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/bookLogo.jpg";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { userNotExit } from "../redux/slices/auth.slice";


const NavBar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(userNotExit())
    setDialogOpen(false)
    navigate("/")
  }


  const linkList = (
    <>
      <Link to="/"> <FaHome /> </Link>
      <Link to="/search"> <FaSearch /> </Link>
      <Link to="/product-cart"> <FaShoppingCart /> </Link>
      <button  >
        {
          user ? <FaUserAlt onClick={() => setDialogOpen((pre) => !pre)} /> :
            <Link to="/login"> <RiLoginBoxFill /> </Link>
        }
      </button>
    </>
  );

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navList">{linkList}</div>
      <dialog open={dialogOpen} onClose={() => setDialogOpen(false)} >
        <div>
          <img src={user?.photo} alt="" />
          <span>AH</span>
          <Link to="/orders">Orders</Link>
          {
            user?.role === "admin" ?
              <Link to={`/${user?.role}/dashboard`}>Dashboard</Link> : null
          }
          <button onClick={handleLogout}>logout</button>
        </div>
      </dialog>
    </nav >

  );
};
export default NavBar;
