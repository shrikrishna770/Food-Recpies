import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { HiMagnifyingGlass } from "react-icons/hi2";
import RecipeList from "../../Components/RecipeList";
import RecipeBtn from "../../Components/Crud/AddRecipeBtn";

const MyRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state

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

  // Filter recipes based on search term
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
      <div className="mt-[30px] max-w-[1500px] m-[auto] relative">
        <HiMagnifyingGlass className="absolute text-[22px] text-gray-400 font-[200] top-[8px] left-[10px]" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search your recipes..."
          className="border border-gray-300 rounded-md h-[40px] w-full pl-[35px] outline-none text-[14px]"
        />
      </div>
      <RecipeList recipes={filteredRecipes} emptyMessage="No private recipes found." />
    </>
  );
};

export default MyRecipe;
