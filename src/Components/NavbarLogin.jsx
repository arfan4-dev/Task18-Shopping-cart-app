import React from "react";
import logo from "../assests/image.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BsArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";
const NavbarLogin = () => {
  const { cart } = useSelector((state) => state);
  return (
    <div>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <div>
          <div className="ml-5">
            <img src={logo} className="h-20" alt="" />
          </div>
        </div>

        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6 ">
          <NavLink
            className="flex gap-x-3 items-center  border border-white rounded-xl p-2"
            to="/"
          >
            {" "}
            <span>
              <BsFillArrowLeftSquareFill />
            </span>{" "}
            <span className=" ">
              <p>Register</p>
            </span>{" "}
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default NavbarLogin;
