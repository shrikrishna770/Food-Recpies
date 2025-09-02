import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import frame from "../../assets/Frame.png";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex shadow-md rounded-lg fixed top-0 left-0 right-0 z-10 backdrop-blur-3xl bg-white/30">
      <nav className="flex max-w-[1500px] w-full h-[70px] mx-auto items-center justify-between px-4">
        <h1 className="text-[#16A34A] font-[600] text-[24px] flex items-center">
          <Link to="/">RecipeSync</Link>
        </h1>

        <ul className="hidden md:flex h-[36px] gap-[40px] mr-[20px] items-center text-[16px] font-medium">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/my-recipes">My Recipe</Link></li>
          <li><Link to="/public-feed">Public Feed</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>

          <div className="relative">
            {user?.photo ? (
              <img
                src={user.photo}
                alt="profile"
                className="w-9 h-9 rounded-full cursor-pointer"
                onClick={() => setShowAccountOptions(!showAccountOptions)}
              />
            ) : (
              <div
                onClick={() => setShowAccountOptions(!showAccountOptions)}
                className="w-9 h-9 flex items-center justify-center bg-green-600 text-white rounded-full cursor-pointer font-bold"
              >
                {user?.name ? user.name[0].toUpperCase() : "?"}
              </div>
            )}

            {showAccountOptions && (
              <div
                className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg shadow-lg py-4 z-50"
                onMouseLeave={() => setShowAccountOptions(false)}
              >
                {/* User Name */}
                <p className="px-4 py-2 border-b border-gray-600 font-semibold">
                  {user?.name || "Guest"}
                </p>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-600"
                >
                  <FaSignOutAlt className="mr-3" /> Logout
                </button>
              </div>
            )}
          </div>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className={`absolute top-[70px] left-[60%] right-0 bg-white/95 shadow-lg rounded-b-lg md:hidden border border-gray-200 overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-4 py-4 text-[16px] font-medium ml-[10px]">
            <li><Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
            <li><Link to="/my-recipes" onClick={() => setIsOpen(false)}>My Recipe</Link></li>
            <li><Link to="/public-feed" onClick={() => setIsOpen(false)}>Public Feed</Link></li>
            <li><Link to="/wishlist" onClick={() => setIsOpen(false)}>Wishlist</Link></li>

            <li className="flex items-center gap-2">
              <button onClick={handleLogout} className="flex items-center gap-2">
                <img src={frame} alt="Logout icon" className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
