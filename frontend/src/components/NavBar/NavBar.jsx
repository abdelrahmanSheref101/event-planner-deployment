import React, { useContext, useEffect, useState } from "react";
import styles from "./NavBar.module.css";

import { NavLink, useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/tokenContext";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function navBar() {
  let { token, logout } = useContext(tokenContext);
  let navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const navLinkStyle = ({ isActive }) =>
    `block w-full text-center text-gray-700 hover:text-gray-900 my-2 font-medium mx-2 py-1.5 hover:text-gray-900 hover:border-b-2 hover:border-gray-900 duration-50 ${
      isActive
        ? "text-gray-900 border-b-2 border-gray-900"
        : "text-gray-600 hover:text-gray-900"
    }`;
  return (
    <nav className="border-gray-200 ">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-gray-800 self-center text-2xl font-semibold whitespace-nowrap">
            Event Planner
          </span>
        </span>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="text-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {token ? (
              <>
                <li>
                  <NavLink to={"my-events"} className={navLinkStyle}>
                    My events
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"invites"} className={navLinkStyle}>
                    Invites
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"profile"} className={navLinkStyle}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <span
                    onClick={handleLogout}
                    className="cursor-pointer block w-full bg-gray-700 text-center hover:bg-gray-800 text-white my-2 md:text-white md:bg-gray-700 md:hover:bg-gray-800 duration-200 md:focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to={"login"}
                    className="block w-full bg-gray-700 text-center hover:bg-gray-800 text-white my-2 md:text-white md:bg-gray-700 md:hover:bg-gray-800 duration-200 md:focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"register"}
                    className="block w-full text-center bg-gray-700 hover:bg-gray-800 text-white my-2 md:text-white md:bg-gray-700 md:hover:bg-gray-800 duration-200 md:focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
