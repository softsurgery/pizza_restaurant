import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/tailwind";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import cartModel from "../../models/CartModel";

const MenuItems = [
  { title: "Menu", href: "/layout/menu" },
  { title: "Custom Order", href: "/layout/custom-order" },
  { title: "My Account", href: "/layout/account" },
];

export const Navbar = observer(() => {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  const menuItemsBlock = React.useMemo(() => {
    return MenuItems.map((item, index) => (
      <li
        key={index}
        className={cn(
          "rounded-lg",
          location.pathname === item.href && "bg-slate-700"
        )}
        onClick={closeDropdown}
      >
        <Link to={item.href}>{item.title}</Link>
      </li>
    ));
  }, [location.pathname]);

  return (
    <div className="navbar bg-base-100 py-2">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Toggle navigation menu"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <ul
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              onBlur={closeDropdown}
            >
              {menuItemsBlock}
            </ul>
          )}
        </div>
        <Link className="btn btn-ghost text-xl" to="/menu">
          🍕 Pizza Shop
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">{menuItemsBlock}</ul>
      </div>

      <div className="navbar-end gap-4">
        <Link className="indicator cursor-pointer text-lg" to="/layout/basket">
          {cartModel.getCount !== 0 && (
            <span className="indicator-item indicator-end badge badge-primary text-xs w-5 h-4 text-white">
              {cartModel.getCount}
            </span>
          )}
          🛒
        </Link>

        <span className="btn btn-ghost text-base">Balance 0.00 $</span>
      </div>
    </div>
  );
});
