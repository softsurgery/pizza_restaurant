export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Toggle navigation menu"
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Order</a>
              <ul className="p-2">
                <li>
                  <a>Existing Pizza</a>
                </li>
                <li>
                  <a>Custom Pizza</a>
                </li>
              </ul>
            </li>
            <li>
              <a>My Account</a>
            </li>
            <li>
              <a>Balance</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">🍕 Pizza Shop</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">
        <li>
            <a>Menu</a>
          </li>
          <li>
            <a>Custom Order</a>
          </li>
          <li>
            <a>My Account</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <span className="btn btn-ghost">Balance 0.00 $</span>
      </div>
    </div>
  );
}
