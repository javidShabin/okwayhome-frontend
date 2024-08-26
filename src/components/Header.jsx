import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [changeMenu, setChangeMenu] = useState(false);
  const navigate = useNavigate();
  const toggleMenuButton = () => {
    setChangeMenu((prevShowMenu) => !prevShowMenu);
  };
  return (
    <header className="flex justify-center items-center py-3 sm:py-4 shadow-lg sticky top-0 left-0 bg-[#fff6df] z-10">
      <div className="container flex justify-between items-center w-[95%] ">
        {/* Logo */}
        <div className="logo font-bold text-[20px]">OkwayHome</div>

        {/* Desktop menu */}
        <ul className="hidden sm:flex font-semibold gap-10 sm:gap-16 cursor-pointer">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          <Link to={"/products"}>
            <li>Furnitures</li>
          </Link>
        </ul>

        {/* Join button */}
        <div className="icon flex gap-5">
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="bg-[#ffd746] font-semibold px-2 py-1 rounded-md sm:py-2 sm:px-3"
            aria-label="Sign up"
          >
            Join us
          </button>

          {changeMenu ? (
            <X className="h-8 block sm:hidden" onClick={toggleMenuButton} />
          ) : (
            <Menu className="h-8 block sm:hidden" onClick={toggleMenuButton} />
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {changeMenu && (
        <ul className="absolute top-[100%] left-0 w-full bg-white shadow-lg flex flex-col items-center gap-6 py-6 font-semibold sm:hidden transition duration-300 ease-in-out">
          <Link to={"/"}>
            <li onClick={toggleMenuButton}>Home</li>
          </Link>
          <Link to={"/about"}>
            <li onClick={toggleMenuButton}>About</li>
          </Link>
          <Link to={"/products"}>
            <li onClick={toggleMenuButton}>Furnitures</li>
          </Link>
        </ul>
      )}
    </header>
  );
};

export default Header;
