import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import RecipeBtn from "../../Components/Crud/AddRecipeBtn";
import Calories from "../../Components/Calories/Calories";
import WishlistCard from "../Wishliat/WishlistCard";

const Dashboard = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Load wishlist from localStorage
  useEffect(() => {
    const updateWishlist = () => {
      const user = localStorage.getItem("currentUser");
      const wishlistData = JSON.parse(localStorage.getItem(`wishlist_${user}`)) || [];
      // Only show the last 3 recipes, reversed to show the most recent first
      setWishlist(wishlistData.slice(-3).reverse());
    };

    updateWishlist();
    window.addEventListener("wishlistUpdated", updateWishlist);

    return () => window.removeEventListener("wishlistUpdated", updateWishlist);
  }, []);

  const handleRemove = (_id) => {
    const user = localStorage.getItem("currentUser");
    const wishlistKey = `wishlist_${user}`;
    let wishlistData = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    wishlistData = wishlistData.filter((item) => item._id !== _id);
    localStorage.setItem(wishlistKey, JSON.stringify(wishlistData));
    setWishlist(wishlistData.slice(-3).reverse());
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <>
      <Navbar />
      <RecipeBtn name="Dashboard" />
      <Calories />

      <div className="max-w-[1400px] w-full mx-auto px-4 mt-8 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-medium text-2xl">Wishlist</h2>
          <button
            className="text-green-600 font-medium hover:underline"
            onClick={() => navigate("/wishlist")}
          >
            View More
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.length === 0 ? (
            <h2 className="text-xl text-gray-600">No Wishlist recipe found.</h2>
          ) : (
            wishlist.map((item) => (
              <WishlistCard
                key={item._id}
                _id={item._id}
                image={item.image}
                title={item.title}
                description={item.description}
                prepTime={item.prepTime}
                cookTime={item.cookTime}
                servings={item.servings}
                onRemove={() => handleRemove(item._id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;