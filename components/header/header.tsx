import { headers } from "next/headers";
import React from "react";
import Link from "next/link";
import Menu from "./Menu";
import { SearchBox } from "./SearchBox";

const Header = () => {
  return (
    <header className="bg-base-300 shadow-md">
      <nav className="navbar px-4 md:px-8 py-2 flex items-center justify-between">
        {/* Left: drawer + logo */}
        <div className="flex items-center gap-2">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <Link href="/" className="btn btn-ghost text-xl font-bold">
            Fashion Orbits
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Menu />
        </div>
      </nav>

      {/* Mobile SearchBox */}
      <div className="block md:hidden px-4 pb-2">
        <SearchBox />
      </div>
    </header>
  );
};

export default Header;
