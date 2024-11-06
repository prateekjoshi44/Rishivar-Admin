
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { setAuthData } from '../redux/authSlice';
import { IoCall } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";
import { BsFilePost } from "react-icons/bs";
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import ProfilePicture from '../components/ProfilePicture';

export const sidebarLinks = [
  { text: "Dashboard", to: "/", icon: () => <MdDashboard /> },
  { text: "Astro", to: "/Astro", icon: () => <BsPersonBoundingBox /> },
  { text: "User", to: "/User", icon: () => <FaUser /> },
  { text: "Chat", to: "Chat", icon: () => <IoChatbubbleSharp /> },
  { text: "Call", to: "/Call", icon: () => <IoCall /> },
  { text: "Order", to: "/Order", icon: () => <RiBillFill /> },
  { text: "Post", to: "/Post", icon: () => <BsFilePost /> },
];
const Sidebar = () => {

  const dispatch = useDispatch()
  const handleSignOut = () => {
    dispatch(setAuthData(null))
  }

  const renderLink = ({ text, to, icon }) =>
    <li className="nav-item" key={text} data-bs-dismiss="offcanvas">
      <NavLink to={to} className="nav-link link-body-emphasis" aria-current="page">
        <span className='me-2 '>

          {icon()}
        </span>
        {text}
      </NavLink>
    </li>

  return (
    <>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
        <span className="fs-4">Rishivar Admin</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto  ">
        {sidebarLinks.map(renderLink)}
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <ProfilePicture name="Admin" size={50} />
          <strong className='ms-3'>Admin</strong>
        </a>
        <ul className="dropdown-menu text-small shadow">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><button type='button' className="dropdown-item" onClick={handleSignOut}>Sign Out</button></li>

        </ul>
      </div>
    </>
  )
}

export default Sidebar