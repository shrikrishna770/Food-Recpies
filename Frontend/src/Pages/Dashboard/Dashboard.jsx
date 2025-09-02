import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import RecipeBtn from "../../Components/Crud/AddRecipeBtn";
import Calories from "../../Components/Calories/Calories";
import RecipeList from "../../Components/RecipeList";
// import WishlistCard from "../../Components/Card/WishlistCard";
import WishlistCard from "../Wishliat/WishlistCard";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recipes");
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };
    fetchRecipes();

    const user = localStorage.getItem("currentUser");
    const wishlistData = JSON.parse(localStorage.getItem(`wishlist_${user}`)) || [];
    setWishlist(wishlistData.slice(0, 3));
  }, []);

  useEffect(() => {
    const updateWishlist = () => {
      const user = localStorage.getItem("currentUser");
      const wishlistData = JSON.parse(localStorage.getItem(`wishlist_${user}`)) || [];
      setWishlist(wishlistData.slice(-3).reverse());
    };

    updateWishlist();

    window.addEventListener("wishlistUpdated", updateWishlist);
    return () => window.removeEventListener("wishlistUpdated", updateWishlist);
  }, []);

  return (
    <>
      <Navbar />
      <RecipeBtn name="Dashboard" />
      <Calories />

      <div className="max-w-[1500px] w-full m-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[500] text-[22px]">Wishlist</h2>
          <button
            className="text-green-600 font-medium hover:underline"
            onClick={() => navigate("/wishlist")}
          >
            View More
          </button>
        </div>
        <div className="flex flex-wrap gap-8">
          {wishlist.length === 0 ? (
            <h2 className="text-xl text-gray-600">No Wishlist recipe found.</h2>
          ) : (
            wishlist.map((item, idx) => (
              <WishlistCard
                key={idx}
                image={item.image}
                title={item.title}
                description={item.description}
                prepTime={item.prepTime}
                servings={item.servings}
                margin="0"
                onRemove={() => {
                  const user = localStorage.getItem("currentUser");
                  const wishlistKey = `wishlist_${user}`;
                  let wishlistLocal = JSON.parse(localStorage.getItem(wishlistKey)) || [];

                  // Remove this item
                  wishlistLocal = wishlistLocal.filter(i => i.title !== item.title);
                  localStorage.setItem(wishlistKey, JSON.stringify(wishlistLocal));

                  // Update Dashboard state
                  setWishlist(wishlistLocal.slice(-3).reverse());

                  // Optional: trigger event for Wishlist page to update
                  window.dispatchEvent(new Event("wishlistUpdated"));
                }}
              />
            ))
          )}
        </div>

      </div>
    </>
  );
};

export default Dashboard;
