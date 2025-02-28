import { NavLink } from "react-router";
import PassboltIcon from "@/assets/passbolt.svg";
import HamburgerIcon from "./icons/HamburgerIcon";

const DefaultLinkStyle =
  "rounded-md bg-[#2C2CFF] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
const ActiveLinkStyle = DefaultLinkStyle + " bg-indigo-500!";

const NavMenu = () => {
  return (
    <nav className="bg-white border-b-2 border-gray-200 shadow dark:bg-gray-900">
      <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={PassboltIcon} alt="Passbolt Logo" className="h-8 w-auto" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Password Manager
          </span>
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <HamburgerIcon className="size-6" />
        </button>
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/password-generator"
                className={({ isActive }) =>
                  isActive ? ActiveLinkStyle : DefaultLinkStyle
                }
              >
                Password Generator
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? ActiveLinkStyle : DefaultLinkStyle
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
