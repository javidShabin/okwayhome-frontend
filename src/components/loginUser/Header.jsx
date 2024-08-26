import React, { useState } from "react";
import { CircleUser, Menu, MessagesSquare, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserHeader = () => {
  // Show menubar function state
  const [showMenu, setShowMenu] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // Menubar toggle function
  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  // bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg sticky top-0 z-10

  return (
    <header className="flex justify-center items-center bg-[#eeebe0] py-3 sm:py-4 md:py-4 shadow-lg sticky top-0 left-0 z-10">
      <div className="container flex justify-between items-center w-[95%]">
        {/* Logo */}
        <div className="logo font-bold text-[20px] ">OkwayHome</div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex font-semibold gap-10 sm:gap-16 cursor-pointer">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          <Link to={""}>
            <li>Furnitures</li>
          </Link>
        </ul>

        {/* Icons */}
        <div className="icon flex gap-5 md:gap-10 items-center ">
          <div className="hidden sm:block">
            <Link to={'/user/chat'}>
              <div className="bg-orange-400 rounded-full p-3 shadow-lg hover:bg-orange-500 transition-all duration-300">
                <MessagesSquare className="text-white w-6 h-6" />
              </div>
            </Link>
          </div>
          {/* Cart Icon with Cart Count */}
          <Link to={"/user/cart"} className="relative">
            <ShoppingBag />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>
          <Link to={"/user/profile"}>
            <CircleUser />
          </Link>

          {/* Menu Icon for Mobile */}
          {showMenu ? (
            <X className="h-8 block sm:hidden" onClick={toggleMenu} />
          ) : (
            <Menu className="h-8 block sm:hidden" onClick={toggleMenu} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <ul className="absolute top-[100%] left-0 w-full bg-white shadow-lg flex flex-col items-center gap-6 py-6 font-semibold sm:hidden transition duration-300 ease-in-out">
          <Link to={"/"}>
            <li onClick={toggleMenu}>Home</li>
          </Link>
          <Link to={"/about"}>
            <li onClick={toggleMenu}>About</li>
          </Link>
          <Link to={""}>
            <li onClick={toggleMenu}>Furnitures</li>
          </Link>
          <Link to={'/user/chat'} onClick={toggleMenu} >
            <li className="bg-orange-400 rounded-full p-3 shadow-lg hover:bg-orange-500 transition-all duration-300">
              <MessagesSquare className="text-white w-6 h-6" />
            </li>
          </Link>
        </ul>
      )}
    </header>
  );
};

export default UserHeader;
