import { useState, useEffect } from "react";
import Caloriestrade from "../../assets/Caloriestrade.png";

const Calories = () => {
  const [stats, setStats] = useState({
    averageCalories: 0,
    totalRecipes: 0,
    favoriteRecipes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authorization token found.");
        }

        // Fetch private recipes from the backend
        const response = await fetch(
          "https://food-recpies.onrender.com/api/recipes/private",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch private recipes.");
        }

        const recipes = await response.json();

        // Calculate statistics
        const totalRecipes = recipes.length;

        let totalCalories = 0;
        recipes.forEach((recipe) => {
          // Ensure calories is a number before adding
          if (recipe.calories && !isNaN(Number(recipe.calories))) {
            totalCalories += Number(recipe.calories);
          }
        });

        const averageCalories =
          totalRecipes > 0 ? Math.round(totalCalories / totalRecipes) : 0;

        // Fetch wishlist data from localStorage for favorite recipes count
        const user = localStorage.getItem("currentUser");
        const wishlistKey = `wishlist_${user}`;
        const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
        const favoriteRecipes = wishlist.length;

        // Update state with calculated stats
        setStats({
          averageCalories,
          totalRecipes,
          favoriteRecipes,
        });
      } catch (err) {
        console.error("Error fetching recipe stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeStats();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1400px] w-full mx-auto px-4 mb-8">
        <p className="text-center text-gray-500">Loading stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1400px] w-full mx-auto px-4 mb-8">
        <p className="text-center text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 mb-8">
      <div className="shadow-lg rounded-xl py-6 px-4 md:px-6 border border-gray-200 border-t-0">
        <h1 className="flex items-center gap-3 font-semibold text-xl text-gray-800">
          <img
            src={Caloriestrade}
            alt="Calories Icon"
            className="w-10 h-10 object-contain"
          />
          Calories Overview
        </h1>

        <div className="mt-6 grid md:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-[#c2e89e] rounded-xl px-4 py-4 lg:px-6 lg:py-6 shadow-md">
            <p className="text-gray-700 font-medium text-sm lg:text-base">
              Average Calories Per Recipe
            </p>
            <h1 className="text-2xl font-normal mt-2">
              {stats.averageCalories}
            </h1>
          </div>
          <div className="bg-[#deeafa] rounded-xl px-4 py-4 lg:px-6 lg:py-6 shadow-md">
            <p className="text-gray-700 font-medium text-sm lg:text-base">
              Total Recipes
            </p>
            <h1 className="text-2xl font-normal mt-2">{stats.totalRecipes}</h1>
          </div>
          <div className="bg-[#f0e9f7] rounded-xl px-4 py-4 lg:px-6 lg:py-6 shadow-md">
            <p className="text-gray-700 font-medium text-sm lg:text-base">
              Favorite Recipes
            </p>
            <h1 className="text-2xl font-normal mt-2">
              {stats.favoriteRecipes}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calories;
