import React, { useRef } from 'react';
import { LogoutBtn } from "../index";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeIcon, PlusCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const drawerToggleRef = useRef(null);

  const navItems = [
    { name: "Home", slug: "/", authRequired: false, icon: <HomeIcon className="h-5 w-5 mr-2" /> },
    { name: "Login", slug: "/login", authRequired: false, guestOnly: true },
    { name: "Signup", slug: "/signup", authRequired: false, guestOnly: true },
    { name: "All Posts", slug: "/all-posts", authRequired: true, icon: <DocumentTextIcon className="h-5 w-5 mr-2" /> },
    { name: "Add Post", slug: "/add-posts", authRequired: true, icon: <PlusCircleIcon className="h-5 w-5 mr-2" /> },
  ];

  const handleNavigation = () => {
    if (drawerToggleRef.current) {
      drawerToggleRef.current.checked = false; // Close the drawer
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="lg:hidden">
          <label htmlFor="header-drawer" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-2xl">
          Write Space
        </NavLink>
      </div>

      {/* Desktop Navigation - Hidden on Mobile */}
      <div className="navbar-center hidden lg:flex z-10">
        <ul className="menu menu-horizontal px-1">
          {navItems
            .filter(item => (item.authRequired && authStatus) || (!item.authRequired && (!item.guestOnly || !authStatus)))
            .map(item => (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) => isActive ? "flex items-center font-bold text-primary" : "flex items-center"}
                  onClick={handleNavigation}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>

      {/* Logout Button - Visible if Authenticated */}
      <div className="navbar-end">
        {authStatus && (
          <li>
            <LogoutBtn />
          </li>
        )}
      </div>

      {/* Drawer Toggle */}
      <input id="header-drawer" type="checkbox" className="drawer-toggle" ref={drawerToggleRef} />
      <div className="drawer-side lg:hidden">
        <label htmlFor="header-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 space-y-3 text-2xl bg-base-100 text-base-content h-full">
          {navItems
            .filter(item => (item.authRequired && authStatus) || (!item.authRequired && (!item.guestOnly || !authStatus)))
            .map(item => (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) => isActive ? "flex items-center font-bold text-primary" : "flex items-center"}
                  onClick={handleNavigation}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
