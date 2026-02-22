import { HiMenu, HiX, HiHome, HiHeart } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";
import profile from "../assets/profile.jpeg";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="mx-auto px-4 md:px-6 py-1 flex items-center justify-between">

        {/* Logo */}
        <div className="flex  items-center cursor-pointer">
          <Link to="/" className="hover:text-black transition">
            <HiHome className="w-7 h-7 md:w-8 md:h-8 text-blue-400" />
          </Link>
          <span className="mt-1 pl-1 text-base font-bold text-black">
            RENTALS
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/wishlist" className="text-gray-700 hover:text-gray-900 transition">
            Wishlist
          </Link>
           <Link to="/main" className="text-gray-700 hover:text-gray-900 transition">
            Home
          </Link>
         
        </nav>

       
        <div className="flex items-center gap-4">

          {/* Wishlist Icon */}
          <Link to="/wishlist"
            className="relative text-gray-700 hover:text-red-500 transition"
          >
            <HiHeart className="w-6 h-6 md:w-7 md:h-7" />
          </Link>

          {/* User / Login */}
          {user ? (
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <img
                src={profile}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <Link to="/login"
              className="bg-black text-white px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm hover:bg-gray-800 transition whitespace-nowrap"
            >
              Login
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <nav
            ref={menuRef}
            className="md:hidden absolute top-16 right-4 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-2 flex flex-col space-y-2 px-4 z-50"
          >
           <Link to="/main"
              className="text-gray-700 hover:text-gray-900 transition px-2 py-1 rounded"
            >
              Home
            </Link>
             <Link to="/wishlist"
              className="text-gray-700 hover:text-gray-900 transition px-2 py-1 rounded"
            >
              Wishlist
            </Link>
           
          </nav>
        )}
      </div>
    </header>
  );
}

