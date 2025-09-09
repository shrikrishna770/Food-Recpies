import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { HiMagnifyingGlass } from "react-icons/hi2";
import RecipeList from "../../Components/RecipeList";
import RecipeBtn from "../../Components/Crud/AddRecipeBtn";

const MyRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPrivateRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/recipes/private", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching private recipes:", err);
      }
    };
    fetchPrivateRecipes();
  }, []);

  const filteredRecipes = recipes.filter((item) => {
    const title = item.title || "";
    const description = item.description || "";
    const term = searchTerm.toLowerCase();
    return (
      title.toLowerCase().includes(term) ||
      description.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <Navbar />
      <RecipeBtn name="My Recipe" />
      <div className="mt-8 px-4 max-w-[1400px] mx-auto w-full">
        <div className="relative">
          <HiMagnifyingGlass className="absolute text-xl text-gray-400 font-light top-1/2 -translate-y-1/2 left-4 md:left-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search your recipes..."
            className="border border-gray-300 rounded-lg h-10 w-full pl-10 pr-4 outline-none text-sm focus:ring-2 focus:ring-green-500 transition-colors"
          />
        </div>
      </div>
      <div className="mt-8">
        <RecipeList recipes={filteredRecipes} emptyMessage="No private recipes found." />
      </div>
    </>
  );
};

export default MyRecipe;