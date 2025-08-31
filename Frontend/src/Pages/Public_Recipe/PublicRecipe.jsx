import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import RecipeList from "../../Components/RecipeList";
import { HiMagnifyingGlass } from "react-icons/hi2";

const PublicFeed = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // 🔥 Updated: fetch only public recipes from backend
        const res = await fetch("http://localhost:5000/api/recipes"); 
        const data = await res.json();
        setRecipes(data); 
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };
    fetchRecipes();
  }, []);

  // 🔥 Filter search term for title or description
  const filteredRecipes = recipes.filter((recipe) => {
    const title = recipe.title || "";
    const description = recipe.description || "";
    const term = searchTerm.toLowerCase();
    return title.toLowerCase().includes(term) || description.toLowerCase().includes(term);
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between max-w-[1500px] w-full mx-auto gap-[30px] mt-[100px] mb-[30px] px-4">
        <h1 className="font-[500] text-[22px]">Community Recipes</h1>
        <div className="relative">
          <HiMagnifyingGlass className="absolute text-[22px] text-gray-400 font-[200] top-[8px] left-[10px]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md h-[40px] w-full pl-[35px] outline-none text-[14px]"
            placeholder="Search Community recipes..."
          />
        </div>
      </div>

      <RecipeList
        recipes={filteredRecipes.map((recipe) => ({
          ...recipe,
          creatorName: recipe.user?.name || "Anonymous" // add creator name
        }))}
        emptyMessage="No public recipes found."
      />
    </>
  );
};

export default PublicFeed;
