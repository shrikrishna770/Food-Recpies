import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      setUser(savedUser);
    };

    handleStorageChange(); // Load initial state on component mount
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Dispatch a storage event to update all tabs
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleAccountOptions = () => setShowAccountOptions(!showAccountOptions);

  // A single, reusable profile icon component for both desktop and mobile
  const profileIcon = (
    <div className="relative">
      {user?.photo ? (
        <img
          src={user.photo}
          alt="profile"
          className="w-9 h-9 rounded-full cursor-pointer object-cover"
          onClick={toggleAccountOptions}
          onError={(e) => {
            // Fallback to initial if image fails to load
            e.target.onerror = null;
            e.target.src = `https://placehold.co/36x36/cccccc/000000?text=${user?.name ? user.name[0].toUpperCase() : "?"}`;
          }}
        />
      ) : (
        <div
          onClick={toggleAccountOptions}
          className="w-9 h-9 flex items-center justify-center bg-green-600 text-white rounded-full cursor-pointer font-bold"
        >
          {user?.name ? user.name[0].toUpperCase() : "?"}
        </div>
      )}

      {/* Account options dropdown menu */}
      {showAccountOptions && (
        <div
          className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg shadow-lg py-4 z-50"
          onMouseLeave={() => setShowAccountOptions(false)}
        >
          <p className="px-4 py-2 border-b border-gray-600 font-semibold">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-600 transition-colors"
          >
            <LogOut className="mr-3" /> Logout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-10 backdrop-blur-3xl bg-white/30 shadow-md">
      <nav className="flex max-w-[1400px] w-full h-[70px] mx-auto items-center justify-between px-4">
        <h1 className="text-green-600 font-semibold text-2xl flex items-center">
          <Link to="/">RecipeSync</Link>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex h-9 gap-10 mr-5 items-center text-base font-medium">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/my-recipes">My Recipe</Link></li>
          <li><Link to="/public-feed">Public Feed</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>
          {profileIcon}
        </ul>

        {/* Mobile menu container */}
        <div className="flex md:hidden gap-4 items-center">
          {profileIcon}
          {/* Mobile Menu Icon */}
          <button
            className="p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute top-[70px] left-0 right-0 md:hidden bg-white/95 shadow-lg rounded-b-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <ul className="flex flex-col gap-4 py-4 text-base font-medium ml-4">
            <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
            <li><Link to="/my-recipes" onClick={toggleMenu}>My Recipe</Link></li>
            <li><Link to="/public-feed" onClick={toggleMenu}>Public Feed</Link></li>
            <li><Link to="/wishlist" onClick={toggleMenu}>Wishlist</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;